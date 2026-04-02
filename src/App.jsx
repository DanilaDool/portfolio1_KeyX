import { lazy, Suspense, useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Lenis from 'lenis'
import Cart from './components/Cart'
import { useCart } from './context/CartContext'

// Lazy load components
const Hero = lazy(() => import('./components/Hero'))
const Products = lazy(() => import('./components/Products'))
const RGBDemo = lazy(() => import('./components/RGBDemo'))
const AboutUs = lazy(() => import('./components/AboutUs'))
const FAQ = lazy(() => import('./components/FAQ'))
const SupportChat = lazy(() => import('./components/SupportChat'))
const TelegramWidget = lazy(() => import('./components/TelegramWidget'))

// Loading component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center py-20">
    <motion.div
      className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full"
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    />
  </div>
)

function App() {
  const [showScrollTop, setShowScrollTop] = useState(false)
  const { scrollYProgress } = useScroll()
  const lenisRef = useRef(null)
  const { isCartOpen } = useCart()
  
  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    })

    lenisRef.current = lenis

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  // Stop Lenis when cart is open
  useEffect(() => {
    if (lenisRef.current) {
      if (isCartOpen) {
        lenisRef.current.stop()
      } else {
        lenisRef.current.start()
      }
    }
  }, [isCartOpen])
  
  // Animated background gradients based on scroll
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ['#000000', '#1a0a2e', '#0f0a1e']
  )
  
  const gradientOpacity = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.3, 0.6, 0.3]
  )

  // Show/hide scroll to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    lenisRef.current?.scrollTo(0, { duration: 1.5 })
  }

  return (
    <motion.div 
      className="relative min-h-screen"
      style={{ backgroundColor }}
    >
      {/* Animated background gradients */}
      <motion.div 
        className="fixed inset-0 pointer-events-none z-0"
        style={{ opacity: gradientOpacity }}
      >
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/30 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-pink-600/30 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-cyan-600/30 rounded-full blur-3xl" />
      </motion.div>
      {/* Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-[100] glass-morphism border-b border-gray-800"
      >
        <div className="container mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex-1"></div>
          <motion.div
            className="text-3xl sm:text-4xl font-bold"
            whileHover={{ scale: 1.05 }}
            style={{
              textShadow: '0 0 8px #a855f7, 0 0 15px #a855f780',
            }}
          >
            <span className="text-white">Key</span>
            <span className="text-purple-500">X</span>
          </motion.div>
          <div className="flex-1 flex justify-end">
            <Cart />
          </div>
        </div>
      </motion.nav>

      {/* Main content */}
      <main className="relative z-10">
        <Suspense fallback={<LoadingSpinner />}>
          <Hero />
        </Suspense>
        <div className="pt-20">
        <Suspense fallback={<LoadingSpinner />}>
          <div id="products">
            <Products />
          </div>
        </Suspense>
        <Suspense fallback={<LoadingSpinner />}>
          <div id="about">
            <AboutUs />
          </div>
        </Suspense>
        <Suspense fallback={<LoadingSpinner />}>
          <div id="rgb-demo" className="hidden md:block">
            <RGBDemo />
          </div>
        </Suspense>
        <Suspense fallback={<LoadingSpinner />}>
          <div id="faq">
            <FAQ />
          </div>
        </Suspense>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative py-8 sm:py-12 lg:py-16 border-t border-gray-800 z-10">
        <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent" />
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-10 lg:gap-12 mb-8 sm:mb-10 lg:mb-12">
            {/* Brand Section */}
            <div>
              <h3 className="text-3xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4">
                Key<span className="text-purple-500">X</span>
              </h3>
              <p className="text-gray-400 text-sm sm:text-xs lg:text-sm mb-4 sm:mb-6 leading-relaxed">
                Премиальные игровые механические клавиатуры для чемпионов. Раскройте свой потенциал.
              </p>
            </div>
            
            {/* Navigation */}
            <div>
              <h4 className="font-semibold mb-3 sm:mb-4 text-cyan-400 text-sm sm:text-base">Навигация</h4>
              <ul className="space-y-2 sm:space-y-3 text-sm sm:text-xs lg:text-sm text-gray-400">
                <li><a href="#products" className="hover:text-white hover:translate-x-1 inline-block transition-all">Продукты</a></li>
                <li><a href="#rgb-demo" className="hover:text-white hover:translate-x-1 inline-block transition-all hidden md:block">RGB Демо</a></li>
                <li><a href="#about" className="hover:text-white hover:translate-x-1 inline-block transition-all">О нас</a></li>
                <li><a href="#faq" className="hover:text-white hover:translate-x-1 inline-block transition-all">FAQ</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-semibold mb-3 sm:mb-4 text-green-400 text-sm sm:text-base">Контакты</h4>
              <ul className="space-y-2 sm:space-y-3 text-xs sm:text-xs lg:text-sm">
                <li>
                  <a href="mailto:support@keyx.com" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="break-all">support@keyx.com</span>
                  </a>
                </li>
                <li>
                  <a href="tel:+79991234567" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span>+7 (999) 123-45-67</span>
                  </a>
                </li>
                <li>
                  <div className="text-gray-400 flex items-center gap-2">
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>Москва, Россия</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 pt-6 sm:pt-8 flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4 text-center">
            <p className="text-xs sm:text-sm text-gray-400">
              &copy; 2026 KeyX. Все права защищены.
            </p>
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 lg:gap-6 text-xs text-gray-500">
              <a href="#" className="hover:text-gray-300 transition-colors">Политика конфиденциальности</a>
              <a href="#" className="hover:text-gray-300 transition-colors">Условия использования</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to top button */}
      {showScrollTop && !isCartOpen && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          onClick={scrollToTop}
          className="fixed bottom-24 right-4 sm:bottom-8 sm:right-24 z-30 p-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full shadow-lg hover:shadow-purple-500/50 transition-shadow min-w-[56px] min-h-[56px] flex items-center justify-center"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Прокрутить наверх"
        >
          <svg 
            className="w-6 h-6 text-white" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M5 10l7-7m0 0l7 7m-7-7v18" 
            />
          </svg>
        </motion.button>
      )}

      {/* Support Chat */}
      <Suspense fallback={null}>
        <SupportChat />
      </Suspense>

      {/* Telegram Widget */}
      <Suspense fallback={null}>
        <TelegramWidget />
      </Suspense>
    </motion.div>
  )
}

export default App
