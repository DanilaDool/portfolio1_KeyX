import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { motion } from 'framer-motion'

const Keyboard3D = () => {
  const keyboardRef = useRef()
  const keysRef = useRef([])

  useFrame((state) => {
    if (keyboardRef.current) {
      keyboardRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
    }
    
    // Animate individual keys with RGB effect
    keysRef.current.forEach((key, i) => {
      if (key) {
        const time = state.clock.elapsedTime
        const offset = i * 0.1
        key.position.y = Math.sin(time + offset) * 0.02
      }
    })
  })

  // Keyboard layout
  const rows = [
    { keys: 15, width: 1 },
    { keys: 15, width: 1 },
    { keys: 14, width: 1 },
    { keys: 13, width: 1 },
    { keys: 12, width: 1 },
  ]

  const colors = ['#a855f7', '#ec4899', '#06b6d4', '#10b981']

  return (
    <group ref={keyboardRef}>
      {/* Keyboard base */}
      <mesh position={[0, -0.3, 0]}>
        <boxGeometry args={[8, 0.4, 3]} />
        <meshStandardMaterial 
          color="#1a1a1a" 
          metalness={0.8} 
          roughness={0.2}
        />
      </mesh>

      {/* Keys */}
      {rows.map((row, rowIndex) => (
        <group key={rowIndex} position={[0, 0, rowIndex * 0.5 - 1]}>
          {Array.from({ length: row.keys }).map((_, keyIndex) => {
            const color = colors[(rowIndex + keyIndex) % colors.length]
            return (
              <mesh
                key={keyIndex}
                ref={(el) => (keysRef.current[rowIndex * 15 + keyIndex] = el)}
                position={[keyIndex * 0.5 - 3.5, 0, 0]}
              >
                <boxGeometry args={[0.45, 0.3, 0.45]} />
                <meshStandardMaterial 
                  color="#2a2a2a"
                  emissive={color}
                  emissiveIntensity={0.5}
                  metalness={0.6}
                  roughness={0.4}
                />
              </mesh>
            )
          })}
        </group>
      ))}

      {/* Lighting effects */}
      <pointLight position={[0, 2, 0]} intensity={1} color="#a855f7" />
      <pointLight position={[-3, 1, 2]} intensity={0.5} color="#ec4899" />
      <pointLight position={[3, 1, 2]} intensity={0.5} color="#06b6d4" />
    </group>
  )
}

const Keyboard3DViewer = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      className="w-full h-[500px] rounded-2xl overflow-hidden glass-morphism"
    >
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 3, 8]} />
        <OrbitControls 
          enableZoom={true}
          enablePan={false}
          minDistance={5}
          maxDistance={15}
          autoRotate
          autoRotateSpeed={0.5}
        />
        
        <ambientLight intensity={0.3} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
        
        <Keyboard3D />
        
        {/* Background */}
        <mesh position={[0, 0, -5]}>
          <planeGeometry args={[50, 50]} />
          <meshStandardMaterial color="#000000" />
        </mesh>
      </Canvas>
      
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center">
        <p className="text-sm text-gray-400 bg-black/50 px-4 py-2 rounded-lg backdrop-blur-sm">
          Drag to rotate • Scroll to zoom
        </p>
      </div>
    </motion.div>
  )
}

export default Keyboard3DViewer
