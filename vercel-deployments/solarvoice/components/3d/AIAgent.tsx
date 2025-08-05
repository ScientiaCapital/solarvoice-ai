"use client"

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, Sphere, Text, RoundedBox } from '@react-three/drei'
import { Mesh, Color } from 'three'
import * as THREE from 'three'

interface AIAgentProps {
  name: string
  position?: [number, number, number]
  color?: string
  size?: number
  floatSpeed?: number
  rotationSpeed?: number
}

export function AIAgent({ 
  name, 
  position = [0, 0, 0], 
  color = "#3b82f6",
  size = 1,
  floatSpeed = 1,
  rotationSpeed = 0.5
}: AIAgentProps) {
  const meshRef = useRef<Mesh>(null)
  const coreRef = useRef<Mesh>(null)
  const particleGroupRef = useRef<THREE.Group>(null)
  
  // Create particle system for energy field
  const particles = useMemo(() => {
    const particleCount = 50
    const positions = new Float32Array(particleCount * 3)
    
    for (let i = 0; i < particleCount; i++) {
      const radius = 2 + Math.random() * 2
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = radius * Math.cos(phi)
    }
    
    return positions
  }, [])
  
  // Animation loop
  useFrame((state) => {
    const time = state.clock.elapsedTime
    
    // Rotate the main mesh
    if (meshRef.current) {
      meshRef.current.rotation.y = time * rotationSpeed
      meshRef.current.rotation.x = Math.sin(time * 0.5) * 0.1
    }
    
    // Pulse the core
    if (coreRef.current) {
      coreRef.current.scale.setScalar(1 + Math.sin(time * 2) * 0.1)
    }
    
    // Animate particles
    if (particleGroupRef.current) {
      particleGroupRef.current.rotation.y = time * 0.2
      particleGroupRef.current.rotation.x = time * 0.1
    }
  })
  
  return (
    <Float
      speed={floatSpeed}
      rotationIntensity={0.2}
      floatIntensity={0.5}
      position={position}
    >
      <group ref={meshRef}>
        {/* Main agent body */}
        <RoundedBox
          args={[size, size, size]}
          radius={0.2}
          smoothness={4}
          ref={coreRef}
        >
          <meshStandardMaterial
            color={color}
            metalness={0.8}
            roughness={0.2}
            transparent
            opacity={0.9}
          />
        </RoundedBox>
        
        {/* Energy core */}
        <Sphere args={[size * 0.3, 32, 32]} position={[0, 0, 0]}>
          <meshStandardMaterial
            color={new Color(color).multiplyScalar(2)}
            emissive={color}
            emissiveIntensity={0.5}
            transparent
            opacity={0.8}
          />
        </Sphere>
        
        {/* Particle system */}
        <group ref={particleGroupRef}>
          <points>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                array={particles}
                itemSize={3}
                count={particles.length / 3}
              />
            </bufferGeometry>
            <pointsMaterial
              size={0.05}
              color={color}
              transparent
              opacity={0.6}
              sizeAttenuation
            />
          </points>
        </group>
        
        {/* Agent name label */}
        <Text
          position={[0, size + 0.8, 0]}
          fontSize={0.3}
          color={color}
          anchorX="center"
          anchorY="middle"
          font="/fonts/inter-bold.woff"
        >
          {name}
        </Text>
        
        {/* Energy rings */}
        {[1.5, 2.0, 2.5].map((radius, index) => (
          <mesh key={index} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[radius * size, 0.02, 8, 32]} />
            <meshStandardMaterial
              color={color}
              transparent
              opacity={0.3 - index * 0.1}
              emissive={color}
              emissiveIntensity={0.2}
            />
          </mesh>
        ))}
      </group>
    </Float>
  )
}

// Specialized agent variants
export function CommercialManagerAgent(props: Omit<AIAgentProps, 'name' | 'color'>) {
  return (
    <AIAgent
      {...props}
      name="Commercial Manager"
      color="#f97316"
    />
  )
}

export function CustomerSuccessAgent(props: Omit<AIAgentProps, 'name' | 'color'>) {
  return (
    <AIAgent
      {...props}
      name="Customer Success"
      color="#8b5cf6"
    />
  )
}

export function PerformanceAnalystAgent(props: Omit<AIAgentProps, 'name' | 'color'>) {
  return (
    <AIAgent
      {...props}
      name="Performance Analyst"
      color="#10b981"
    />
  )
}

export function SalesSpecialistAgent(props: Omit<AIAgentProps, 'name' | 'color'>) {
  return (
    <AIAgent
      {...props}
      name="Sales Specialist"
      color="#ec4899"
    />
  )
}

export function UtilityCoordinatorAgent(props: Omit<AIAgentProps, 'name' | 'color'>) {
  return (
    <AIAgent
      {...props}
      name="Utility Coordinator"
      color="#ef4444"
    />
  )
}