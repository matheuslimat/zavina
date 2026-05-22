'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const vertexShader = /* glsl */ `
  uniform float uTime;
  varying vec2  vUv;
  varying vec3  vNormal;
  varying vec3  vViewPos;

  // Multi-frequency fabric wave (simulates fabric in breeze)
  float wave(vec2 p, float t) {
    return sin(p.x * 1.7 + t * 0.65) * 0.14
         + sin(p.y * 1.3 + t * 0.50) * 0.10
         + cos((p.x + p.y) * 0.85 + t * 0.38) * 0.06
         + sin(p.x * 3.2 + p.y * 1.5 + t * 0.9) * 0.03;
  }

  // Micro crochet-loop displacement (very subtle on a flat fabric)
  float loopDisp(vec2 uv) {
    vec2 p    = uv * 18.0;
    vec2 cell = floor(p);
    vec2 f    = fract(p);
    float off = mod(cell.y, 2.0) * 0.5;
    f.x = fract(f.x + off);
    vec2 q = (f - 0.5) * vec2(1.75, 1.1);
    float d = length(q);
    return exp(-d * d * 9.5) * 0.022;
  }

  void main() {
    vUv = uv;
    float w    = wave(position.xy, uTime);
    float micro = loopDisp(uv);
    vec3 newPos = position;
    newPos.z += w + micro;

    vNormal = normalMatrix * normal;
    vec4 mvPos = modelViewMatrix * vec4(newPos, 1.0);
    vViewPos = -mvPos.xyz;
    gl_Position = projectionMatrix * mvPos;
  }
`

const fragmentShader = /* glsl */ `
  uniform float uTime;
  uniform vec3  uColor1;
  uniform vec3  uColor2;
  varying vec2  vUv;
  varying vec3  vNormal;
  varying vec3  vViewPos;

  float crochet(vec2 uv, float scale) {
    vec2 p    = uv * scale;
    vec2 cell = floor(p);
    vec2 f    = fract(p);
    float off = mod(cell.y, 2.0) * 0.5;
    f.x = fract(f.x + off);
    vec2 q  = (f - 0.5) * vec2(1.75, 1.1);
    float d = length(q);
    float outer  = smoothstep(0.56, 0.44, d);
    float inner  = smoothstep(0.36, 0.24, d);
    float thread = smoothstep(0.08, 0.0, abs(d - 0.46)) * 0.55;
    return outer - inner + thread;
  }

  void main() {
    vec3 n    = normalize(vNormal);
    vec3 view = normalize(vViewPos);

    // Two-scale crochet pattern (coarse + fine)
    float p1 = crochet(vUv, 18.0);
    float p2 = crochet(vUv * 3.5, 5.0) * 0.18;
    float pat = clamp(p1 + p2, 0.0, 1.0);

    vec3 base = mix(uColor1 * 0.72, uColor2 * 1.12, pat);

    // Lighting
    vec3 light = normalize(vec3(0.6, 1.2, 2.5));
    float diff  = max(dot(n, light), 0.0);
    float rim   = pow(1.0 - max(dot(n, view), 0.0), 2.8) * 0.26;
    vec3 h      = normalize(light + view);
    float spec  = pow(max(dot(n, h), 0.0), 45.0) * 0.14;

    vec3 lit = base * (0.32 + diff * 0.68) + uColor2 * rim + vec3(spec);

    // Soft edge fade — fabric floats, no hard border
    float ex = smoothstep(0.0, 0.09, vUv.x) * smoothstep(1.0, 0.91, vUv.x);
    float ey = smoothstep(0.0, 0.06, vUv.y) * smoothstep(1.0, 0.94, vUv.y);
    float alpha = ex * ey * 0.90;

    gl_FragColor = vec4(lit, alpha);
  }
`

export default function WavingFabric() {
  const meshRef = useRef<THREE.Mesh>(null)

  const uniforms = useMemo(
    () => ({
      uTime:   { value: 0 },
      uColor1: { value: new THREE.Color('#B87355') }, // terracotta
      uColor2: { value: new THREE.Color('#C9A96E') }, // gold
    }),
    []
  )

  useFrame(({ clock }) => {
    uniforms.uTime.value = clock.elapsedTime
  })

  return (
    <mesh
      ref={meshRef}
      position={[2.4, 0.2, 0]}
      rotation={[0.05, -0.22, 0.06]}
    >
      {/* Enough segments for smooth wave + micro-displacement */}
      <planeGeometry args={[3.8, 5.0, 90, 120]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}
