'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'

const vertexShader = /* glsl */ `
  uniform float uTime;
  varying vec2 vUv;
  varying vec3 vNormal;

  float crochetDisp(vec2 uv) {
    vec2 p = uv * 20.0;
    vec2 cell = floor(p);
    vec2 f = fract(p);
    float off = mod(cell.y, 2.0) * 0.5;
    f.x = fract(f.x + off);
    vec2 q = (f - 0.5) * vec2(1.75, 1.1);
    float d = length(q);
    return exp(-d * d * 9.0) * 0.07;
  }

  void main() {
    vUv = uv;
    vNormal = normalMatrix * normal;
    float disp = crochetDisp(uv);
    vec3 newPos = position + normal * disp;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1.0);
  }
`

const fragmentShader = /* glsl */ `
  uniform vec3 uColor;
  uniform float uTime;
  varying vec2 vUv;
  varying vec3 vNormal;

  float pattern(vec2 uv, float scale) {
    vec2 p = uv * scale;
    vec2 cell = floor(p);
    vec2 f = fract(p);
    float off = mod(cell.y, 2.0) * 0.5;
    f.x = fract(f.x + off);
    vec2 q = (f - 0.5) * vec2(1.75, 1.1);
    float d = length(q);
    float outer = smoothstep(0.56, 0.44, d);
    float inner = smoothstep(0.35, 0.23, d);
    return outer - inner;
  }

  void main() {
    vec3 n = normalize(vNormal);
    float p1 = pattern(vUv, 20.0);
    float p2 = pattern(vUv, 40.0) * 0.24;
    vec3 color = mix(uColor * 0.68, uColor * 1.22, p1 + p2);

    vec3 light = normalize(vec3(1.0, 1.2, 2.5));
    float diff = max(dot(n, light), 0.0);
    float ambient = 0.38;
    vec3 lit = color * (ambient + diff * 0.62);

    vec3 view = normalize(vec3(0.0, 0.0, 1.0));
    vec3 h = normalize(light + view);
    float spec = pow(max(dot(n, h), 0.0), 40.0) * 0.15;
    lit += vec3(spec);

    gl_FragColor = vec4(lit, 1.0);
  }
`

function CrochetFabric({ color }: { color: string }) {
  const meshRef = useRef<THREE.Mesh>(null)

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor: { value: new THREE.Color(color) },
    }),
    [color]
  )

  useFrame(({ clock }) => {
    uniforms.uTime.value = clock.elapsedTime
    if (uniforms.uColor.value.getHexString() !== new THREE.Color(color).getHexString()) {
      uniforms.uColor.value.set(color)
    }
  })

  return (
    <mesh ref={meshRef} rotation={[-0.3, 0.2, 0]}>
      <planeGeometry args={[3.2, 3.2, 128, 128]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

interface FabricViewerProps {
  color?: string
}

export default function FabricViewer({ color = '#B87355' }: FabricViewerProps) {
  return (
    <div className="w-full h-full" aria-hidden="true">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 3.2]} fov={48} />
        <ambientLight intensity={0.55} color="#F0E6D3" />
        <pointLight position={[4, 4, 4]} intensity={1.6} color="#C9A96E" />
        <pointLight position={[-3, -2, 2]} intensity={0.5} color="#E8D5B7" />

        <CrochetFabric color={color} />

        <OrbitControls
          enablePan={false}
          minDistance={1.8}
          maxDistance={5.5}
          autoRotate
          autoRotateSpeed={0.6}
        />
      </Canvas>
    </div>
  )
}
