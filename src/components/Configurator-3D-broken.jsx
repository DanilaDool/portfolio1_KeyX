import { motion } from 'framer-motion'
import { useState } from 'react'
import Keyboard3DViewer from './Keyboard3D'

const Configurator = () => {
  const [config, setConfig] = useState({
    switch: 'red',
    color: 'purple',
    layout: 'full',
  })

  const switches = [
    { id: 'red', name: 'Cherry MX Red', type: 'Linear', color: 'from-red-600 to-red-800' },
    { id: 'blue', name: 'Cherry MX Blue', type: 'Clicky', color: 'from-blue-600 to-blue-800' },
    { id: 'brown', name: 'Cherry MX Brown', type: 'Tactile', color: 'from-amber-600 to-amber-800' },
    { id: 'silent', name: 'Cherry MX Silent', type: 'Quiet', color: 'from-gray-600 to-gray-800' },
  ]

  const colors = [
    { id: 'purple', name: 'Neon Purple', gradient: 'from-purple-600 to-pink-600' },
    { id: 'cyan', name: 'Cyber Cyan', gradient: 'from-cyan-600 to-blue-600' },
    { id: 'green', name: 'Matrix Green', gradient: 'from-green-600 to-emerald-600' },
    { id: 'rainbow', name: 'RGB Rainbow', gradient: 'from-purple-600 via-pink-600 to-cyan-600' },
  ]

  const layouts = [
    { id: 'full', name: 'Full Size', keys: '104 Keys' },
    { id: 'tkl', name: 'TKL', keys: '87 Keys' },
    { id: 'compact', name: '75%', keys: '84 Keys' },
    { id: 'mini', name: '60%', keys: '61 Keys' },
  ]

  const handleConfigChange = (key, value) => {
    setConfig({ ...config, [key]: value })
  }

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/10 to-black" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h2
            className="text-5xl lg:text-6xl font-bold mb-4"
            animate={{
              backgroundImage: [
                'linear-gradient(to right, #a855f7, #ec4899)',
                'linear-gradient(to right, #ec4899, #06b6d4)',
                'linear-gradient(to right, #06b6d4, #a855f7)',
                'linear-gradient(to right, #a855f7, #ec4899)',
              ],
            }}
            transition={{ duration: 5, repeat: Infinity }}
            style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
          >
            BUILD YOUR DREAM KEYBOARD
          </motion.h2>
          <p className="text-xl text-gray-400">Customize every detail to match your style</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* 3D Preview */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Keyboard3DViewer />
            
            {/* Price and CTA */}
            <motion.div
              className="mt-8 glass-morphism rounded-2xl p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-400">Your Configuration</p>
                  <p className="text-4xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                    $189
                  </p>
                </div>
                <motion.button
                  className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-bold"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  ADD TO CART
                </motion.button>
              </div>
              <div className="text-sm text-gray-400 space-y-1">
                <p>✓ Free shipping on orders over $150</p>
                <p>✓ 2-year warranty included</p>
                <p>✓ 30-day money-back guarantee</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Configuration Options */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Switch Type */}
            <div>
              <h3 className="text-2xl font-bold mb-4 text-purple-500">Switch Type</h3>
              <div className="grid grid-cols-2 gap-4">
                {switches.map((sw) => (
                  <motion.button
                    key={sw.id}
                    onClick={() => handleConfigChange('switch', sw.id)}
                    className={`glass-morphism rounded-xl p-4 text-left relative overflow-hidden ${
                      config.switch === sw.id ? 'border-2 border-purple-500' : 'border border-gray-700'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${sw.color} opacity-10`} />
                    <div className="relative z-10">
                      <p className="font-bold text-white">{sw.name}</p>
                      <p className="text-sm text-gray-400">{sw.type}</p>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* RGB Color */}
            <div>
              <h3 className="text-2xl font-bold mb-4 text-cyan-500">RGB Lighting</h3>
              <div className="grid grid-cols-2 gap-4">
                {colors.map((col) => (
                  <motion.button
                    key={col.id}
                    onClick={() => handleConfigChange('color', col.id)}
                    className={`glass-morphism rounded-xl p-4 text-left relative overflow-hidden ${
                      config.color === col.id ? 'border-2 border-cyan-500' : 'border border-gray-700'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className={`h-12 rounded-lg bg-gradient-to-r ${col.gradient} mb-2`} />
                    <p className="font-bold text-white">{col.name}</p>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Layout */}
            <div>
              <h3 className="text-2xl font-bold mb-4 text-pink-500">Keyboard Layout</h3>
              <div className="grid grid-cols-2 gap-4">
                {layouts.map((layout) => (
                  <motion.button
                    key={layout.id}
                    onClick={() => handleConfigChange('layout', layout.id)}
                    className={`glass-morphism rounded-xl p-4 text-left relative overflow-hidden ${
                      config.layout === layout.id ? 'border-2 border-pink-500' : 'border border-gray-700'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <p className="font-bold text-white">{layout.name}</p>
                    <p className="text-sm text-gray-400">{layout.keys}</p>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Configurator
