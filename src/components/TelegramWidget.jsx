import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

const TelegramWidget = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past hero section (approximately 100vh)
      if (window.scrollY > window.innerHeight) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.a
          href="https://t.me/your_channel" // Замени на свой канал
          target="_blank"
          rel="noopener noreferrer"
          initial={{ x: -200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -200, opacity: 0 }}
          transition={{ type: 'spring', damping: 20, stiffness: 100 }}
          className="fixed left-4 bottom-32 sm:left-6 sm:top-1/2 sm:-translate-y-1/2 sm:bottom-auto z-30 group"
        >
          <motion.div
            className="relative"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Glow effect */}
            <motion.div
              className="absolute inset-0 rounded-full sm:rounded-xl blur-lg"
              animate={{
                boxShadow: [
                  '0 0 15px #0088cc',
                  '0 0 25px #0088cc',
                  '0 0 15px #0088cc',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />

            {/* Main button */}
            <div className="relative bg-gradient-to-br from-[#0088cc] to-[#006699] rounded-full sm:rounded-xl p-3 shadow-xl border border-[#0088cc]/50">
              <div className="flex items-center gap-2">
                <img 
                  src="/telegram.png" 
                  alt="Telegram" 
                  className="w-7 h-7 sm:w-8 sm:h-8"
                />
                <div className="hidden sm:block text-white text-xs">
                  <div className="font-bold">Присоединяйся</div>
                  <div className="opacity-90">к нашему каналу</div>
                </div>
              </div>
            </div>

            {/* Pulse animation */}
            <motion.div
              className="absolute -inset-1 rounded-full sm:rounded-xl border-2 border-[#0088cc]"
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>

          {/* Tooltip on hover */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            className="absolute left-full ml-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
          >
            Подпишись на Telegram! 🚀
          </motion.div>
        </motion.a>
      )}
    </AnimatePresence>
  )
}

export default TelegramWidget
