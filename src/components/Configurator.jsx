import { motion } from 'framer-motion'
import { useState } from 'react'

const Configurator = () => {
  const [config, setConfig] = useState({
    switch: 'red',
    color: 'purple',
    layout: 'full',
  })

  const switches = [
    { id: 'red', name: 'Cherry MX Red', type: 'Линейные', color: 'from-red-600 to-red-800' },
    { id: 'blue', name: 'Cherry MX Blue', type: 'Кликающие', color: 'from-blue-600 to-blue-800' },
    { id: 'brown', name: 'Cherry MX Brown', type: 'Тактильные', color: 'from-amber-600 to-amber-800' },
    { id: 'silent', name: 'Cherry MX Silent', type: 'Тихие', color: 'from-gray-600 to-gray-800' },
  ]

  const colors = [
    { id: 'purple', name: 'Неоновый фиолетовый', gradient: 'from-purple-600 to-pink-600' },
    { id: 'cyan', name: 'Кибер голубой', gradient: 'from-cyan-600 to-blue-600' },
    { id: 'green', name: 'Матричный зеленый', gradient: 'from-green-600 to-emerald-600' },
    { id: 'rainbow', name: 'RGB радуга', gradient: 'from-purple-600 via-pink-600 to-cyan-600' },
  ]

  const layouts = [
    { id: 'full', name: 'Полный размер', keys: '104 клавиши' },
    { id: 'tkl', name: 'TKL', keys: '87 клавиш' },
    { id: 'compact', name: '75%', keys: '84 клавиши' },
    { id: 'mini', name: '60%', keys: '61 клавиша' },
  ]

  const handleConfigChange = (key, value) => {
    setConfig({ ...config, [key]: value })
  }

  const selectedColor = colors.find(c => c.id === config.color)

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
            className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-4"
            style={{ 
              backgroundImage: 'linear-gradient(to right, #a855f7, #ec4899)',
              WebkitBackgroundClip: 'text', 
              WebkitTextFillColor: 'transparent' 
            }}
          >
            СОЗДАЙТЕ КЛАВИАТУРУ МЕЧТЫ
          </motion.h2>
          <p className="text-base sm:text-xl text-gray-400 px-4">Настройте каждую деталь под свой стиль</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* 2D Keyboard Preview */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="glass-morphism rounded-2xl p-8 relative overflow-hidden">
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${selectedColor.gradient} opacity-10`}
                animate={{ opacity: [0.1, 0.2, 0.1] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              
              {/* Keyboard visualization */}
              <div className="relative z-10 aspect-video flex items-center justify-center">
                <div className="space-y-2">
                  {[0, 1, 2, 3, 4].map((row) => (
                    <div key={row} className="flex gap-2 justify-center">
                      {Array.from({ length: 15 - row }).map((_, i) => (
                        <motion.div
                          key={i}
                          className={`w-8 h-8 rounded bg-gradient-to-br ${selectedColor.gradient}`}
                          animate={{
                            boxShadow: [
                              '0 0 5px currentColor',
                              '0 0 15px currentColor',
                              '0 0 5px currentColor',
                            ],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: (row * 15 + i) * 0.02,
                          }}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
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
                  <p className="text-sm text-gray-400">Ваша конфигурация</p>
                  <p className="text-4xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                    ₽17 990
                  </p>
                </div>
                <motion.button
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-bold"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  ДОБАВИТЬ В КОРЗИНУ
                </motion.button>
              </div>
              <div className="text-sm text-gray-400 space-y-1">
                <p>✓ Бесплатная доставка при заказе от ₽14 000</p>
                <p>✓ 2 года гарантии включены</p>
                <p>✓ 30-дневная гарантия возврата денег</p>
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
              <h3 className="text-2xl font-bold mb-4 text-purple-500">Тип переключателей</h3>
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
              <h3 className="text-2xl font-bold mb-4 text-cyan-500">RGB подсветка</h3>
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
              <h3 className="text-2xl font-bold mb-4 text-pink-500">Раскладка клавиатуры</h3>
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
