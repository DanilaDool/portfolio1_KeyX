import { motion } from 'framer-motion'

const Contact = () => {
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
            КОНТАКТЫ
          </motion.h2>
          <p className="text-xl text-gray-400">Свяжитесь с нами любым удобным способом</p>
        </motion.div>

        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-morphism rounded-2xl p-8"
          >
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-purple-500 mb-2">Email</h3>
                <a href="mailto:support@keyx.com" className="text-gray-300 hover:text-white transition-colors">
                  support@keyx.com
                </a>
              </div>
              <div>
                <h3 className="text-xl font-bold text-cyan-500 mb-2">Телефон</h3>
                <a href="tel:+79991234567" className="text-gray-300 hover:text-white transition-colors">
                  +7 (999) 123-45-67
                </a>
              </div>
              <div>
                <h3 className="text-xl font-bold text-pink-500 mb-2">Адрес</h3>
                <p className="text-gray-300">
                  Москва, Россия
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact
