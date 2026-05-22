'use client'

import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import WavingFabric from './WavingFabric'

export default function FabricCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 52 }}
      gl={{ antialias: true, alpha: true }}
      aria-hidden="true"
      style={{ width: '100%', height: '100%' }}
    >
      <Suspense fallback={null}>
        {/* Warm key light from upper-left */}
        <directionalLight position={[-3, 5, 4]} intensity={1.8} color="#F0E6D3" />
        {/* Gold fill from right */}
        <pointLight position={[6, 2, 3]} intensity={1.4} color="#C9A96E" />
        {/* Cool back rim */}
        <pointLight position={[-4, -3, -2]} intensity={0.6} color="#7A9E7E" />
        <ambientLight intensity={0.28} color="#F0E6D3" />

        <WavingFabric />
      </Suspense>
    </Canvas>
  )
}
