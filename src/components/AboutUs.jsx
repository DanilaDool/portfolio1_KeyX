import { motion } from 'framer-motion'
import { useState } from 'react'

const AboutUs = () => {
  const [hoveredValue, setHoveredValue] = useState(null)

  const values = [
    { id: 'innovation', icon: '⚡', title: 'Инновации', description: 'Постоянно внедряем передовые технологии в наши продукты', color: 'text-purple-500' },
    { id: 'quality', icon: '🎯', title: 'Качество', description: 'Каждая деталь проходит строгий контроль качества', color: 'text-cyan-500' },
    { id: 'community', icon: '🤝', title: 'Сообщество', description: 'Слушаем наших пользователей и развиваемся вместе с ними', color: 'text-pink-500' },
  ]

  const getIconAnimation = (valueId) => {
    if (hoveredValue !== valueId) return {}

    switch (valueId) {
      case 'innovation':
        return {
          rotate: [0, -10, 10, -10, 10, 0],
          scale: [1, 1.2, 1],
          transition: { duration: 0.5, repeat: Infinity }
        }
      case 'quality':
        return {
          scale: [1, 1.3, 1],
          rotate: [0, 360],
          transition: { duration: 1, repeat: Infinity }
        }
      case 'community':
        return {
          y: [0, -10, 0],
          scale: [1, 1.2, 1],
          transition: { duration: 0.6, repeat: Infinity }
        }
      default:
        return {}
    }
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
            className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-4"
            style={{ 
              backgroundImage: 'linear-gradient(to right, #a855f7, #ec4899)',
              WebkitBackgroundClip: 'text', 
              WebkitTextFillColor: 'transparent' 
            }}
          >
            О НАС
          </motion.h2>
          <p className="text-base sm:text-xl text-gray-400 max-w-3xl mx-auto px-4">
            Мы создаём будущее игровых периферийных устройств
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto space-y-16">
          {/* Наша история */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-morphism rounded-2xl p-8"
          >
            <h3 className="text-2xl sm:text-3xl font-bold mb-6 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              Наша История
            </h3>
            <p className="text-lg text-gray-300 leading-relaxed mb-4">
              KeyX была основана в 2024 году группой энтузиастов киберспорта и инженеров, 
              которые разделяли одну мечту — создать идеальную игровую клавиатуру. 
              Мы верим, что каждое нажатие клавиши должно быть безупречным.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              Сегодня наши клавиатуры используют более 500 000 геймеров по всему миру, 
              от любителей до профессиональных киберспортсменов.
            </p>
          </motion.div>

          {/* Наша миссия */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-morphism rounded-2xl p-8"
          >
            <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
              Наша Миссия
            </h3>
            <p className="text-lg text-gray-300 leading-relaxed">
              Мы стремимся раздвигать границы возможного в мире игровых периферийных устройств. 
              Каждая клавиатура KeyX — это результат бесконечных часов исследований, 
              тестирований и совершенствования. Мы не просто создаём клавиатуры — 
              мы создаём инструменты для победы.
            </p>
          </motion.div>

          {/* Наши ценности */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              Наши Ценности
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {values.map((value) => (
                <motion.div
                  key={value.id}
                  onMouseEnter={() => setHoveredValue(value.id)}
                  onMouseLeave={() => setHoveredValue(null)}
                  whileHover={{ scale: 1.05 }}
                  className="glass-morphism rounded-xl p-6 text-center relative"
                >
                  {/* RGB Border Animation on Hover */}
                  {hoveredValue === value.id && (
                    <motion.div
                      className="absolute inset-0 rounded-xl"
                      animate={{
                        boxShadow: [
                          '0 0 0 2px #a855f7, 0 0 20px #a855f7',
                          '0 0 0 2px #ec4899, 0 0 20px #ec4899',
                          '0 0 0 2px #06b6d4, 0 0 20px #06b6d4',
                          '0 0 0 2px #10b981, 0 0 20px #10b981',
                          '0 0 0 2px #f59e0b, 0 0 20px #f59e0b',
                          '0 0 0 2px #a855f7, 0 0 20px #a855f7',
                        ],
                      }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    />
                  )}

                  <motion.div 
                    className="text-5xl mb-4 relative z-10"
                    animate={getIconAnimation(value.id)}
                  >
                    {value.icon}
                  </motion.div>
                  <h4 className={`text-xl font-bold mb-3 ${value.color} relative z-10`}>{value.title}</h4>
                  <p className="text-gray-400 relative z-10">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Статистика */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-4 gap-6"
          >
            <div className="glass-morphism rounded-xl p-6 text-center">
              <motion.div
                className="text-4xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent mb-2"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                500K+
              </motion.div>
              <div className="text-sm text-gray-400">Довольных клиентов</div>
            </div>

            <div className="glass-morphism rounded-xl p-6 text-center">
              <motion.div
                className="text-4xl font-bold bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent mb-2"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
              >
                50+
              </motion.div>
              <div className="text-sm text-gray-400">Стран доставки</div>
            </div>

            <div className="glass-morphism rounded-xl p-6 text-center">
              <motion.div
                className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent mb-2"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
              >
                2 года
              </motion.div>
              <div className="text-sm text-gray-400">Гарантия</div>
            </div>

            <div className="glass-morphism rounded-xl p-6 text-center">
              <motion.div
                className="text-4xl font-bold bg-gradient-to-r from-green-500 to-cyan-500 bg-clip-text text-transparent mb-2"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.9 }}
              >
                24/7
              </motion.div>
              <div className="text-sm text-gray-400">Поддержка</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default AboutUs
