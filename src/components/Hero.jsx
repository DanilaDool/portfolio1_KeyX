import { motion } from 'framer-motion'

const Hero = () => {
  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden p-0 m-0 pt-16 sm:pt-0">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <img 
          src="/images/optimized/pexels-atahandemir-28842075.jpg"
          alt="KeyX Gaming Keyboard Background"
          className="w-full h-full object-cover"
          loading="eager"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/80"></div>
      </div>
      
      {/* Floating particles - disabled on mobile */}
      <div className="absolute inset-0 hidden sm:block">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-purple-500 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 1, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center sm:text-left sm:mx-0 sm:ml-12">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              className="text-4xl sm:text-7xl lg:text-8xl font-bold mb-4 sm:mb-6 text-glow"
              style={{
                textShadow: '0 0 20px #a855f7'
              }}
            >
              Key<span className="text-purple-500">X</span>
            </motion.h1>
            
            <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-6 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 bg-clip-text text-transparent">
              РАСКРОЙТЕ СВОЙ ИГРОВОЙ ПОТЕНЦИАЛ
            </h2>
            
            <p className="text-sm sm:text-xl text-gray-300 mb-6 sm:mb-8 leading-relaxed px-2 sm:px-0">
              Испытайте максимальную механическую клавиатуру, созданную для чемпионов. 
              RGB совершенство встречается с киберпанк эстетикой.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <motion.button
                className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-bold text-base sm:text-lg relative overflow-hidden group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">КУПИТЬ</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-pink-500 to-cyan-500 opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
              
              <motion.button
                onClick={() => {
                  const aboutSection = document.getElementById('about')
                  aboutSection?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="px-6 sm:px-8 py-3 sm:py-4 glass-morphism rounded-lg font-bold text-base sm:text-lg border-2 border-cyan-500"
                whileHover={{ scale: 1.05, borderColor: '#ec4899' }}
                whileTap={{ scale: 0.95 }}
              >
                УЗНАТЬ БОЛЬШЕ
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator - hidden on mobile */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden sm:block"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-purple-500 rounded-full flex justify-center">
          <motion.div
            className="w-1 h-2 bg-purple-500 rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  )
}

export default Hero
