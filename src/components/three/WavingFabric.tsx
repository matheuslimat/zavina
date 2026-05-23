'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// ─────────────────────────────────────────────────────────
// Vertex shader: organic multi-layer fabric wave
// ─────────────────────────────────────────────────────────
const vertexShader = /* glsl */ `
  uniform float uTime;
  varying vec2  vUv;
  varying vec3  vNormal;
  varying vec3  vViewPos;
  varying float vWave;

  // Three overlapping sine waves → natural fabric motion
  float fabricWave(vec2 p, float t) {
    float w1 = sin(p.x * 1.2 + t * 0.55)              * 0.18;
    float w2 = sin(p.y * 0.9 + t * 0.38 + 0.8)        * 0.12;
    float w3 = sin((p.x * 0.6 + p.y * 0.7) + t * 0.28)* 0.08;
    float w4 = cos(p.x * 2.1 + p.y * 1.1 + t * 0.72) * 0.04;
    return w1 + w2 + w3 + w4;
  }

  void main() {
    vUv = uv;
    float w = fabricWave(position.xy, uTime);
    vWave = w;

    vec3 newPos = position + normal * w;

    vNormal  = normalize(normalMatrix * normal);
    vec4 mvPos = modelViewMatrix * vec4(newPos, 1.0);
    vViewPos = -mvPos.xyz;
    gl_Position = projectionMatrix * mvPos;
  }
`

// ─────────────────────────────────────────────────────────
// Fragment shader: organic crochet knit texture
//
// Each stitch = a rounded arch (U-shape) — NOT a circle.
// Stitches are staggered row-by-row, exactly like real crochê.
// The yarn has a tube-like profile (bright center, dark edges).
// ─────────────────────────────────────────────────────────
const fragmentShader = /* glsl */ `
  uniform float uTime;
  uniform vec3  uColor1;   // dark base
  uniform vec3  uColor2;   // gold/cream highlight
  varying vec2  vUv;
  varying vec3  vNormal;
  varying vec3  vViewPos;
  varying float vWave;

  #define PI 3.14159265

  // Returns a "yarn tube" profile: bright at center, dark at edges
  float yarnProfile(float t) {
    return pow(1.0 - abs(t * 2.0 - 1.0), 0.6);
  }

  // Single crochet stitch cell.
  // Each stitch looks like a ∪ arch when viewed from above.
  // Returns: (stitch intensity, yarn tube shading 0-1)
  vec2 stitchCell(vec2 uv, float scaleX, float scaleY) {
    vec2 p    = uv * vec2(scaleX, scaleY);
    vec2 cell = floor(p);
    vec2 f    = fract(p);

    // Stagger every other row by half a cell (hallmark of crochê)
    float stagger = mod(cell.y, 2.0) * 0.5;
    float fx = fract(f.x + stagger);
    float fy = f.y;

    // ── Arch shape (the top loop of the stitch) ──
    // The arch rises from fy≈0 at the sides to fy≈0.7 in the center
    float archHeight = 0.55 + 0.20 * sin(fx * PI);   // peaks at fx=0.5
    float archThick  = 0.11;
    float archDist   = abs(fy - archHeight);
    float arch = smoothstep(archThick, archThick * 0.3, archDist);

    // ── Leg posts (the two vertical sides of the U) ──
    float legWidth = 0.065;
    float leftLeg  = smoothstep(legWidth, legWidth * 0.2, abs(fx - 0.18)) *
                     smoothstep(0.0, 0.15, fy) * smoothstep(archHeight, archHeight - 0.1, fy);
    float rightLeg = smoothstep(legWidth, legWidth * 0.2, abs(fx - 0.82)) *
                     smoothstep(0.0, 0.15, fy) * smoothstep(archHeight, archHeight - 0.1, fy);

    float stitch = clamp(arch + leftLeg + rightLeg, 0.0, 1.0);

    // Yarn tube shading: bright where we're at the top of the arch, dark at legs
    float tubeT = arch * yarnProfile(fy / max(archHeight, 0.01));
    float tube  = clamp(tubeT + (leftLeg + rightLeg) * 0.5, 0.0, 1.0);

    return vec2(stitch, tube);
  }

  void main() {
    vec3 n    = normalize(vNormal);
    vec3 view = normalize(vViewPos);

    // ── Two-scale stitch pattern ──
    // Coarse layer: clearly visible individual stitches (scale ≈ 9)
    vec2 coarse = stitchCell(vUv, 9.0, 6.5);
    // Fine layer: subtle texture variation (half-scale overlay)
    vec2 fine   = stitchCell(vUv + vec2(0.03, 0.02), 18.0, 13.0);

    float stitchMask = coarse.x * 0.82 + fine.x * 0.18;
    float tubeMask   = coarse.y * 0.75 + fine.y * 0.25;

    // ── Base color: dark fabric ground + yarn color on stitches ──
    vec3 fabricBase  = uColor1 * 0.28;                // very dark ground
    vec3 yarnColor   = mix(uColor1 * 0.75, uColor2 * 1.05, tubeMask);
    vec3 base = mix(fabricBase, yarnColor, stitchMask);

    // ── Physical lighting ──
    vec3 lightDir = normalize(vec3(-0.5, 1.2, 2.0));
    float diff    = max(dot(n, lightDir), 0.0) * 0.7 + 0.3;

    // Yarn specular – thin highlight along the arch
    vec3 h    = normalize(lightDir + view);
    float nDotH = max(dot(n, h), 0.0);
    float spec = pow(nDotH, 28.0) * tubeMask * 0.22;

    // Rim light (gold warmth on silhouette edges)
    float rim = pow(1.0 - max(dot(n, view), 0.0), 3.0) * 0.18;

    // Wave-crest brightening: fabric shimmers on wave peaks
    float crestGlow = smoothstep(0.0, 0.25, vWave) * 0.14;

    vec3 lit = base * diff
             + uColor2 * spec
             + uColor2 * rim
             + uColor2 * crestGlow * stitchMask;

    // ── Soft edge fade so the fabric floats naturally ──
    float ex = smoothstep(0.0, 0.08, vUv.x) * smoothstep(1.0, 0.92, vUv.x);
    float ey = smoothstep(0.0, 0.06, vUv.y) * smoothstep(1.0, 0.94, vUv.y);
    float alpha = ex * ey * 0.88;

    gl_FragColor = vec4(lit, alpha);
  }
`

export default function WavingFabric() {
  const meshRef = useRef<THREE.Mesh>(null)

  const uniforms = useMemo(
    () => ({
      uTime:   { value: 0 },
      uColor1: { value: new THREE.Color('#8B5E45') }, // warm terracotta-brown
      uColor2: { value: new THREE.Color('#C9A96E') }, // brand gold
    }),
    []
  )

  useFrame(({ clock }) => {
    uniforms.uTime.value = clock.elapsedTime
  })

  return (
    <mesh
      ref={meshRef}
      position={[2.2, 0, 0]}
      rotation={[0.04, -0.18, 0.05]}
    >
      {/* High segment count for smooth wave deformation */}
      <planeGeometry args={[4.2, 5.6, 110, 140]} />
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
