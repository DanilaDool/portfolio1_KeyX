import { motion } from 'framer-motion'

const About = () => {
  const features = [
    {
      title: 'ТОЧНАЯ ИНЖЕНЕРИЯ',
      description: 'Каждое нажатие клавиши совершенно с немецкими переключателями Cherry MX',
      icon: '⚙️',
      color: 'from-purple-600 to-pink-600',
    },
    {
      title: 'МАСТЕРСТВО RGB',
      description: '16.8 миллионов цветов с настройкой каждой клавиши и реактивными эффектами',
      icon: '🌈',
      color: 'from-cyan-600 to-blue-600',
    },
    {
      title: 'КИБЕРПАНК ДИЗАЙН',
      description: 'Футуристическая эстетика встречается с премиальным алюминиевым корпусом',
      icon: '🎮',
      color: 'from-pink-600 to-purple-600',
    },
  ]

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-cyan-900/10 to-black" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2
              className="text-5xl lg:text-6xl font-bold mb-6"
              animate={{
                backgroundImage: [
                  'linear-gradient(to right, #a855f7, #ec4899)',
                  'linear-gradient(to right, #ec4899, #06b6d4)',
                  'linear-gradient(to right, #a855f7, #ec4899)',
                ],
              }}
              transition={{ duration: 4, repeat: Infinity }}
              style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
            >
              НАСЛЕДИЕ KEYX
            </motion.h2>
            
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Рожденный из слияния передовых технологий и киберпанк эстетики, 
              KeyX представляет вершину инноваций игровых клавиатур.
            </p>
            
            <p className="text-lg text-gray-400 mb-8 leading-relaxed">
              С 2024 года мы раздвигаем границы возможного в дизайне механических 
              клавиатур. Каждая клавиатура KeyX создана для чемпионов, которые требуют только 
              совершенства в своем игровом арсенале.
            </p>

            <div className="grid grid-cols-3 gap-6 mb-8">
              <motion.div
                className="text-center"
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  className="text-4xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent mb-2"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  500K+
                </motion.div>
                <div className="text-sm text-gray-400">Геймеров по всему миру</div>
              </motion.div>
              
              <motion.div
                className="text-center"
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  className="text-4xl font-bold bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent mb-2"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                >
                  50M+
                </motion.div>
                <div className="text-sm text-gray-400">Нажатий клавиш ежедневно</div>
              </motion.div>
              
              <motion.div
                className="text-center"
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  className="text-4xl font-bold bg-gradient-to-r from-green-500 to-cyan-500 bg-clip-text text-transparent mb-2"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                >
                  99.9%
                </motion.div>
                <div className="text-sm text-gray-400">Уровень удовлетворенности</div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right content - Features */}
          <div className="space-y-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                whileHover={{ x: 10 }}
                className="glass-morphism rounded-2xl p-6 relative overflow-hidden group"
              >
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-10`}
                  transition={{ duration: 0.3 }}
                />
                
                <div className="relative z-10 flex items-start gap-4">
                  <motion.div
                    className="text-4xl"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                  >
                    {feature.icon}
                  </motion.div>
                  
                  <div className="flex-1">
                    <h3 className={`text-xl font-bold mb-2 bg-gradient-to-r ${feature.color} bg-clip-text text-transparent`}>
                      {feature.title}
                    </h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </div>
                </div>

                <motion.div
                  className={`absolute -inset-1 bg-gradient-to-r ${feature.color} rounded-2xl blur-xl opacity-0 group-hover:opacity-20 -z-10`}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
