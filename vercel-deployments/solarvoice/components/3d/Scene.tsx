"use client"

import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, Float, Html } from '@react-three/drei'
import { Suspense, ReactNode } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

interface SceneProps {
  children: ReactNode
  enableControls?: boolean
  enableEnvironment?: boolean
  camera?: {
    position?: [number, number, number]
    fov?: number
  }
  className?: string
}

export function Scene({ 
  children, 
  enableControls = true, 
  enableEnvironment = true,
  camera = { position: [0, 0, 5], fov: 75 },
  className = "w-full h-full"
}: SceneProps) {
  return (
    <ErrorBoundary
      fallback={
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-background to-muted">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">Loading 3D Experience...</p>
          </div>
        </div>
      }
    >
      <div className={className}>
        <Canvas
          camera={camera}
          gl={{ 
            antialias: true, 
            alpha: true,
            powerPreference: "high-performance"
          }}
          dpr={[1, 2]}
        >
          <Suspense fallback={
            <Html center>
              <div className="flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
              </div>
            </Html>
          }>
            {/* Lighting */}
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <spotLight
              position={[5, 5, 5]}
              angle={0.3}
              penumbra={1}
              intensity={1}
              castShadow
            />
            
            {/* Environment */}
            {enableEnvironment && (
              <Environment preset="studio" />
            )}
            
            {/* Controls */}
            {enableControls && (
              <OrbitControls
                enableZoom={false}
                enablePan={false}
                autoRotate
                autoRotateSpeed={0.5}
                dampingFactor={0.05}
                enableDamping
              />
            )}
            
            {children}
          </Suspense>
        </Canvas>
      </div>
    </ErrorBoundary>
  )
}

// Loading fallback component
export function SceneLoader() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5">
      <div className="text-center space-y-4">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
          <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-ai-500 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1s' }} />
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold gradient-text-ai">Initializing 3D Environment</h3>
          <p className="text-sm text-muted-foreground">Preparing immersive experience...</p>
        </div>
      </div>
    </div>
  )
}