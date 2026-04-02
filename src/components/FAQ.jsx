import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

const faqs = [
  {
    question: 'Какие типы переключателей используют клавиатуры KeyX?',
    answer: 'Все клавиатуры KeyX оснащены оригинальными переключателями Cherry MX. Мы предлагаем варианты Red (линейные), Blue (кликающие), Brown (тактильные), Silent (тихие), Speed (быстрые) и Black (тяжелые линейные) для вашего игрового стиля.',
  },
  {
    question: 'Совместимы ли клавиатуры KeyX с Mac и PC?',
    answer: 'Да! Все клавиатуры KeyX полностью совместимы с Windows, macOS и Linux. Наше программное обеспечение позволяет настраивать RGB подсветку и назначение клавиш на любой платформе.',
  },
  {
    question: 'Какой срок гарантии?',
    answer: 'Каждая клавиатура KeyX поставляется с 2-летней гарантией производителя, покрывающей дефекты и неисправности. Мы также предлагаем расширенные варианты гарантии при оформлении заказа.',
  },
  {
    question: 'Могу ли я настроить RGB подсветку?',
    answer: 'Абсолютно! Наше программное обеспечение KeyX обеспечивает полную настройку RGB для каждой клавиши с 16.8 миллионами цветов, реактивными эффектами, пользовательскими профилями и облачной синхронизацией между устройствами.',
  },
  {
    question: 'Осуществляете ли вы международную доставку?',
    answer: 'Да, мы доставляем по всему миру! Бесплатная доставка при заказе от ₽14 000. Сроки доставки варьируются в зависимости от местоположения, обычно 3-7 рабочих дней для России и 7-14 дней для международных заказов.',
  },
  {
    question: 'Какова ваша политика возврата?',
    answer: '30-дневная гарантия возврата денег, без вопросов. Если вы не удовлетворены своей клавиатурой KeyX, верните её для полного возврата средств в течение 30 дней с момента покупки.',
  },
]

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/10 to-black" />
      
      <div className="container mx-auto px-6 relative z-10 max-w-4xl">
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
            ЧАСТО ЗАДАВАЕМЫЕ ВОПРОСЫ
          </motion.h2>
          <p className="text-base sm:text-xl text-gray-400 px-4">Всё, что вам нужно знать о KeyX</p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-morphism rounded-xl overflow-hidden"
            >
              <motion.button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full p-6 text-left flex items-center justify-between group"
                whileHover={{ backgroundColor: 'rgba(168, 85, 247, 0.05)' }}
              >
                <span className="text-base sm:text-lg font-semibold text-white pr-8">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0"
                >
                  <svg
                    className="w-6 h-6 text-purple-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </motion.div>
              </motion.button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 text-gray-400 leading-relaxed border-t border-gray-800 pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FAQ
