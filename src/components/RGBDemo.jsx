import { motion, useInView } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { soundManager } from '../utils/sound'
import RealisticKeyboard from './RealisticKeyboard'

const RGBDemo = () => {
  const [activeEffect, setActiveEffect] = useState('wave')
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [hoveredEffect, setHoveredEffect] = useState(null)

  const effects = [
    { id: 'wave', name: 'Волна', icon: '🌊' },
    { id: 'ripple', name: 'Рябь', icon: '💧' },
    { id: 'reactive', name: 'Реактивная', icon: '⚡' },
    { id: 'breathing', name: 'Дыхание', icon: '💨' },
    { id: 'rainbow', name: 'Радуга', icon: '🌈' },
    { id: 'static', name: 'Статичная', icon: '✨' },
  ]

  const getIconAnimation = (effectId) => {
    return {} // Disabled animations for performance
  }

  const handleKeyClick = (key) => {
    if (soundEnabled) {
      soundManager.playSwitch('blue')
    }
  }

  const toggleSound = () => {
    const newState = soundManager.toggle()
    setSoundEnabled(newState)
  }

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-cyan-900/10 to-black" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2
            className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-4"
            style={{ 
              backgroundImage: 'linear-gradient(to right, #a855f7, #ec4899)',
              WebkitBackgroundClip: 'text', 
              WebkitTextFillColor: 'transparent' 
            }}
          >
            ДЕМО RGB ЭФФЕКТОВ
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-400 px-4">Испытайте магию подсветки в реальном времени</p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          {/* Effect Controls */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-morphism rounded-2xl p-6 mb-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Выберите эффект</h3>
              <motion.button
                onClick={toggleSound}
                className={`px-4 py-2 rounded-lg font-semibold ${
                  soundEnabled 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500' 
                    : 'bg-gray-700'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {soundEnabled ? '🔊 Звук ВКЛ' : '🔇 Звук ВЫКЛ'}
              </motion.button>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 sm:gap-4">
              {effects.map((effect) => (
                <motion.button
                  key={effect.id}
                  onClick={() => setActiveEffect(effect.id)}
                  onMouseEnter={() => setHoveredEffect(effect.id)}
                  onMouseLeave={() => setHoveredEffect(null)}
                  className={`glass-morphism rounded-xl p-3 sm:p-4 text-center relative ${
                    activeEffect === effect.id 
                      ? 'border-2 border-purple-500' 
                      : 'border border-gray-700'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* RGB Border on Hover */}
                  {hoveredEffect === effect.id && (
                    <div
                      className="absolute inset-0 rounded-xl"
                      style={{
                        boxShadow: '0 0 0 2px #a855f7, 0 0 20px #a855f7'
                      }}
                    />
                  )}
                  
                  <motion.div 
                    className="text-2xl sm:text-3xl mb-2 relative z-10"
                    animate={getIconAnimation(effect.id)}
                  >
                    {effect.icon}
                  </motion.div>
                  <div className="text-xs sm:text-sm font-semibold relative z-10">{effect.name}</div>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Interactive Keyboard */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex justify-center mb-8"
          >
            <RealisticKeyboard 
              activeEffect={activeEffect}
              onKeyClick={handleKeyClick}
              soundEnabled={soundEnabled}
            />
          </motion.div>

          <div className="text-center text-xs sm:text-sm text-gray-400 mb-8 px-4">
            Нажмите любую клавишу, чтобы услышать звук механического переключателя
          </div>

          {/* Info Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <CounterCard
              end={16.8}
              suffix="M"
              label="Вариантов цветов"
              delay={0.1}
            />
            
            <TypingCard
              text="Per-Key"
              label="RGB управление"
              delay={0.2}
            />
            
            <CounterCard
              end={20}
              suffix="+"
              label="Готовых эффектов"
              delay={0.3}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

// Counter animation component
const CounterCard = ({ end, suffix, label, delay }) => {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      let startTime
      const duration = 1500 // 1.5 seconds
      
      const animate = (currentTime) => {
        if (!startTime) startTime = currentTime
        const progress = Math.min((currentTime - startTime) / duration, 1)
        
        // Smoother easing function
        const easeOutCubic = 1 - Math.pow(1 - progress, 3)
        setCount(easeOutCubic * end)
        
        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }
      
      requestAnimationFrame(animate)
    }
  }, [isInView, end])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.4 }}
      className="glass-morphism rounded-xl p-6 text-center"
    >
      <div className="text-4xl mb-2 font-bold">
        {count.toFixed(1)}{suffix}
      </div>
      <div className="text-sm text-gray-400">{label}</div>
    </motion.div>
  )
}

// Typing animation component
const TypingCard = ({ text, label, delay }) => {
  const [displayText, setDisplayText] = useState('')
  const [isTypingComplete, setIsTypingComplete] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      let currentIndex = 0
      const typingInterval = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayText(text.slice(0, currentIndex))
          currentIndex++
        } else {
          setIsTypingComplete(true)
          clearInterval(typingInterval)
        }
      }, 100) // 100ms per character

      return () => clearInterval(typingInterval)
    }
  }, [isInView, text])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.4 }}
      className="glass-morphism rounded-xl p-6 text-center"
    >
      <div className="text-4xl mb-2 font-bold">
        {displayText}
        {!isTypingComplete && (
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.4, repeat: Infinity, ease: "easeInOut" }}
          >
            |
          </motion.span>
        )}
      </div>
      <div className="text-sm text-gray-400">{label}</div>
    </motion.div>
  )
}

export default RGBDemo
