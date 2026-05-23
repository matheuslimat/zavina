'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'

// ── Vertex: cloth drape + micro crochet displacement ──────────────────────────
const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform vec2  uMouse;
  varying vec2  vUv;
  varying vec3  vNormal;
  varying vec3  vViewPos;

  float drape(vec2 uv, float t) {
    float gravity = (1.0 - uv.y) * 0.18;
    float sway    = sin(uv.x * 2.6 + t * 0.45) * 0.05 * uv.y;
    float breathe = sin(t * 0.65) * 0.025 * (1.0 - uv.y * 0.4);
    float fold1   = sin(uv.x * 5.0 + t * 0.28) * 0.022 * uv.y;
    float fold2   = cos(uv.x * 3.1 - t * 0.18) * 0.014 * uv.y * uv.y;
    return gravity + sway + breathe + fold1 + fold2;
  }

  float microDisp(vec2 uv) {
    vec2  p   = uv * 22.0;
    float off = mod(floor(p.y), 2.0) * 0.5;
    vec2  f   = fract(vec2(p.x + off, p.y));
    vec2  q   = (f - 0.5) * vec2(1.55, 1.0);
    return exp(-dot(q,q) * 8.0) * 0.011;
  }

  void main() {
    vUv = uv;

    float d    = drape(uv, uTime);
    float micro = microDisp(uv);

    vec3 p  = position;
    p.z    += d + micro;
    p.x    += uMouse.x * (1.0 - uv.y) * 0.09;
    p.y    += uMouse.y * (1.0 - uv.y) * 0.05;
    p.y    -= (1.0 - uv.y) * 0.10;

    // Approximate deformed normal
    float eps  = 0.008;
    float dR   = drape(uv + vec2(eps, 0.0), uTime);
    float dU   = drape(uv + vec2(0.0, eps), uTime);
    vec3 tang  = normalize(vec3(eps, 0.0, dR - d));
    vec3 bitan = normalize(vec3(0.0, eps, dU - d));
    vNormal    = normalize(normalMatrix * cross(tang, bitan));

    vec4 mv  = modelViewMatrix * vec4(p, 1.0);
    vViewPos = -mv.xyz;

    gl_Position = projectionMatrix * mv;
  }
`

// ── Fragment: yarn SDF — ring + legs + depth shading ─────────────────────────
const fragmentShader = /* glsl */ `
  uniform vec3  uColor;
  uniform float uTime;
  varying vec2  vUv;
  varying vec3  vNormal;
  varying vec3  vViewPos;

  // SDF: thick ring (crochet loop cross-section)
  float sdRing(vec2 p, vec2 c, float R, float r) {
    return abs(length(p - c) - R) - r;
  }

  // SDF: line segment (connecting yarn)
  float sdSeg(vec2 p, vec2 a, vec2 b, float r) {
    vec2 pa = p - a, ba = b - a;
    float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
    return length(pa - ba * h) - r;
  }

  float stitch(vec2 uv, float scale) {
    vec2 p   = uv * scale;
    float row = floor(p.y);
    float off = mod(row, 2.0) * 0.5;
    vec2 cell = floor(vec2(p.x + off, p.y));
    vec2 f    = fract(vec2(p.x + off, p.y));

    float yr = 0.052; // yarn radius
    float lr = 0.265; // loop radius
    vec2  lc = vec2(0.5, 0.54); // loop center

    // Loop ring (only upper arc visible above the legs)
    float ring = sdRing(f, lc, lr, yr);
    float upperOnly = f.y < lc.y + 0.04 ? ring : 10.0;

    // Two legs descending to next row
    float legL = sdSeg(f, vec2(lc.x - lr + 0.04, lc.y), vec2(0.37, 0.0), yr);
    float legR = sdSeg(f, vec2(lc.x + lr - 0.04, lc.y), vec2(0.63, 0.0), yr);

    float d = min(upperOnly, min(legL, legR));
    return 1.0 - smoothstep(0.0, 0.018, d);
  }

  void main() {
    vec3 n    = normalize(vNormal);
    vec3 view = normalize(vViewPos);

    float pat  = stitch(vUv, 13.0);
    float pat2 = stitch(vUv + vec2(0.02), 26.0) * 0.18; // fine detail
    float p    = clamp(pat + pat2, 0.0, 1.0);

    // Three-tone colour: dark hole / mid base / bright yarn top
    vec3 holeCol = uColor * 0.28;
    vec3 baseCol = uColor * 0.78;
    vec3 yarnCol = uColor * 1.18;
    vec3 color   = mix(holeCol, mix(baseCol, yarnCol, p), p);

    // Lighting
    vec3 L1  = normalize(vec3(1.4, 2.0, 3.0));
    vec3 L2  = normalize(vec3(-1.2, -0.4, 1.5));
    float d1 = max(dot(n, L1), 0.0);
    float d2 = max(dot(n, L2), 0.0) * 0.28;

    // Specular (silky yarn sheen)
    vec3 H    = normalize(L1 + view);
    float sp  = pow(max(dot(n, H), 0.0), 65.0) * 0.22 * p;

    // Warm rim
    float rim     = pow(1.0 - max(dot(n, view), 0.0), 3.2) * 0.20;
    vec3 rimColor = vec3(0.96, 0.87, 0.62);

    // Subsurface-like warmth on yarn
    float sss = pow(1.0 - d1, 5.0) * 0.10 * p;

    vec3 lit = color * (0.22 + d1 * 0.68 + d2)
             + rimColor * rim
             + vec3(sp)
             + uColor * sss;

    // Soft vignette edge fade (fabric swatch silhouette)
    float ex = smoothstep(0.0, 0.08, vUv.x) * smoothstep(1.0, 0.92, vUv.x);
    float ey = smoothstep(0.0, 0.06, vUv.y) * smoothstep(1.0, 0.94, vUv.y);
    float alpha = ex * ey;

    gl_FragColor = vec4(lit, alpha);
  }
`

// ── Mesh ──────────────────────────────────────────────────────────────────────
function DrapedfFabric({ color }: { color: string }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const { size } = useThree()

  const uniforms = useMemo(
    () => ({
      uTime:  { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uColor: { value: new THREE.Color(color) },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  useFrame(({ clock, pointer }) => {
    uniforms.uTime.value = clock.elapsedTime
    uniforms.uMouse.value.lerp(pointer, 0.06) // smooth mouse tracking
    if (!uniforms.uColor.value.equals(new THREE.Color(color))) {
      uniforms.uColor.value.set(color)
    }
  })

  return (
    <mesh ref={meshRef} rotation={[0.12, 0.0, 0]}>
      {/* High-res plane for smooth cloth simulation */}
      <planeGeometry args={[3.4, 4.2, 100, 130]} />
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

// ── Canvas export ─────────────────────────────────────────────────────────────
export default function FabricViewer({ color = '#B87355' }: { color?: string }) {
  return (
    <div className="w-full h-full" aria-hidden="true">
      <Canvas dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0.3, 3.5]} fov={44} />
        <ambientLight intensity={0.45} color="#F0E6D3" />
        <pointLight position={[3, 4, 4]}  intensity={2.0} color="#C9A96E" />
        <pointLight position={[-2, -2, 2]} intensity={0.6} color="#E8D5B7" />
        <DrapedfFabric color={color} />
      </Canvas>
    </div>
  )
}
