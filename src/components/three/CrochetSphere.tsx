'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const vertexShader = /* glsl */ `
  uniform float uTime;
  varying vec2 vUv;
  varying vec3 vNormal;

  float crochetDisp(vec2 uv) {
    float scale = 14.0;
    vec2 p = uv * scale;
    vec2 cell = floor(p);
    vec2 f = fract(p);
    float rowOff = mod(cell.y, 2.0) * 0.5;
    f.x = fract(f.x + rowOff);
    vec2 q = (f - 0.5) * vec2(1.75, 1.1);
    float d = length(q);
    return exp(-d * d * 9.0) * 0.14;
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
  uniform float uTime;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uColor3;
  varying vec2 vUv;
  varying vec3 vNormal;

  float crochetPattern(vec2 uv, float scale) {
    vec2 p = uv * scale;
    vec2 cell = floor(p);
    vec2 f = fract(p);
    float rowOff = mod(cell.y, 2.0) * 0.5;
    f.x = fract(f.x + rowOff);
    vec2 q = (f - 0.5) * vec2(1.75, 1.1);
    float d = length(q);
    float outer = smoothstep(0.56, 0.44, d);
    float inner = smoothstep(0.36, 0.24, d);
    float highlight = smoothstep(0.1, 0.0, abs(d - 0.46)) * 0.6;
    return outer - inner + highlight;
  }

  void main() {
    vec3 n = normalize(vNormal);

    float p1 = crochetPattern(vUv, 14.0);
    float p2 = crochetPattern(vUv * 2.8, 5.0) * 0.22;
    float pattern = clamp(p1 + p2, 0.0, 1.0);

    vec3 base = mix(uColor1, uColor2, pattern);
    float colorMix = sin(vUv.x * 8.0 + uTime * 0.15) * 0.5 + 0.5;
    base = mix(base, uColor3, colorMix * 0.15);

    // Lighting
    vec3 light1 = normalize(vec3(1.2, 2.0, 3.0));
    vec3 light2 = normalize(vec3(-2.0, -1.0, 1.5));
    float diff1 = max(dot(n, light1), 0.0) * 0.65;
    float diff2 = max(dot(n, light2), 0.0) * 0.2;
    float ambient = 0.3;

    // Rim glow
    vec3 view = normalize(vec3(0.0, 0.0, 1.0));
    float rim = pow(1.0 - max(dot(n, view), 0.0), 3.5) * 0.45;

    vec3 color = base * (ambient + diff1 + diff2);
    color += uColor2 * rim;

    // Specular
    vec3 h = normalize(light1 + view);
    float spec = pow(max(dot(n, h), 0.0), 48.0) * 0.18;
    color += vec3(spec);

    gl_FragColor = vec4(color, 1.0);
  }
`

export default function CrochetSphere() {
  const meshRef = useRef<THREE.Mesh>(null)

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor1: { value: new THREE.Color('#B87355') },
      uColor2: { value: new THREE.Color('#C9A96E') },
      uColor3: { value: new THREE.Color('#7A9E7E') },
    }),
    []
  )

  useFrame(({ clock }) => {
    uniforms.uTime.value = clock.elapsedTime
  })

  return (
    <mesh ref={meshRef} position={[1.8, 0.2, 0]}>
      <sphereGeometry args={[1.9, 192, 192]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  )
}
