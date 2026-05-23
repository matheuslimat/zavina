'use client'

import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import WavingFabric from './WavingFabric'

export default function FabricCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.5], fov: 48 }}
      gl={{ antialias: true, alpha: true }}
      aria-hidden="true"
      style={{ width: '100%', height: '100%' }}
    >
      <Suspense fallback={null}>
        {/* Key light – quente, vem de cima à esquerda, ilumina os arcos do crochê */}
        <directionalLight position={[-4, 6, 5]}  intensity={2.2} color="#F5ECD8" />
        {/* Fill gold – vem da direita, cria brilho dourado nas cristas dos pontos */}
        <pointLight      position={[7, 1, 4]}    intensity={1.8} color="#D4AA70" />
        {/* Back rim – contorno suave azul-sálvia no silhouette */}
        <pointLight      position={[-3, -4, -3]} intensity={0.5} color="#7A9E7E" />
        {/* Ambient baixo para preservar contraste do padrão */}
        <ambientLight intensity={0.18} color="#E8D5B7" />

        <WavingFabric />
      </Suspense>
    </Canvas>
  )
}
