import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../context/CartContext'
import { useRef, useEffect } from 'react'

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice, getTotalItems, clearCart, isCartOpen, setIsCartOpen } = useCart()
  const scrollRef = useRef(null)

  // Prevent body scroll when cart is open and allow cart scroll
  useEffect(() => {
    if (isCartOpen) {
      // Save current scroll position
      const scrollY = window.scrollY
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.width = '100%'
      document.body.style.overflow = 'hidden'
    } else {
      // Restore scroll position
      const scrollY = document.body.style.top
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      document.body.style.overflow = ''
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1)
      }
    }
    return () => {
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      document.body.style.overflow = ''
    }
  }, [isCartOpen])

  return (
    <>
      {/* Cart Icon Button */}
      <motion.button
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          setIsCartOpen(true)
        }}
        className="relative p-3 glass-morphism rounded-lg"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        type="button"
      >
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        {getTotalItems() > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-xs font-bold"
          >
            {getTotalItems()}
          </motion.div>
        )}
      </motion.button>

      {/* Cart Modal */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                setIsCartOpen(false)
              }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[60]"
              style={{ touchAction: 'none' }}
            />

            {/* Cart Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 h-[100dvh] w-full sm:w-[500px] bg-gradient-to-b from-gray-900 to-black border-l border-purple-500/30 z-[70] shadow-2xl overflow-hidden"
              style={{ WebkitOverflowScrolling: 'touch' }}
            >
              <div className="h-full flex flex-col">
                {/* Header */}
                <div className="p-6 border-b border-gray-800 bg-black/50 backdrop-blur-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-3xl font-bold text-white mb-1">Корзина</h2>
                      <p className="text-sm text-gray-400">{getTotalItems()} товар(ов)</p>
                    </div>
                    <motion.button
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        setIsCartOpen(false)
                      }}
                      className="p-3 hover:bg-gray-800 rounded-xl transition-colors"
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      type="button"
                    >
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </motion.button>
                  </div>
                </div>

                {/* Cart Items */}
                <div 
                  ref={scrollRef}
                  className="flex-1 overflow-y-auto p-6 bg-black/30 scrollbar-thin scrollbar-thumb-purple-500 scrollbar-track-gray-800"
                  onWheel={(e) => e.stopPropagation()}
                >
                  {cartItems.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-gray-400">
                      <svg className="w-32 h-32 mb-6 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <p className="text-xl font-semibold">Корзина пуста</p>
                      <p className="text-sm mt-2">Добавьте товары для оформления заказа</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {cartItems.map((item) => (
                        <motion.div
                          key={item.id}
                          layout
                          initial={{ opacity: 0, x: 50 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -50 }}
                          className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-2xl p-5 border border-gray-700/50 hover:border-purple-500/50 transition-all"
                        >
                          {/* Product Header */}
                          <div className="flex gap-4 mb-4">
                            <div className="w-24 h-24 rounded-xl flex items-center justify-center border border-purple-500/30 flex-shrink-0 overflow-hidden bg-gray-800">
                              {item.image ? (
                                <img 
                                  src={item.image} 
                                  alt={item.name}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <span className="text-5xl">⌨️</span>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">{item.name}</h3>
                              <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                ₽{item.price.toLocaleString()}
                              </div>
                            </div>
                            <motion.button
                              onClick={() => removeFromCart(item.id)}
                              className="text-red-400 hover:text-red-300 hover:bg-red-500/10 p-2 rounded-lg transition-colors h-fit"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </motion.button>
                          </div>

                          {/* Features */}
                          {item.features && item.features.length > 0 && (
                            <div className="mb-4 space-y-1">
                              {item.features.slice(0, 2).map((feature, idx) => (
                                <div key={idx} className="flex items-center text-sm text-gray-400">
                                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mr-2 flex-shrink-0" />
                                  <span>{feature}</span>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Quantity and Total */}
                          <div className="flex items-center justify-between pt-4 border-t border-gray-700/50">
                            <div className="flex items-center gap-3 bg-black/40 rounded-xl p-2">
                              <motion.button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="w-12 h-12 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center justify-center text-white font-bold transition-colors"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                aria-label="Уменьшить количество"
                              >
                                -
                              </motion.button>
                              <span className="w-12 text-center font-bold text-white text-lg">{item.quantity}</span>
                              <motion.button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="w-12 h-12 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center justify-center text-white font-bold transition-colors"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                aria-label="Увеличить количество"
                              >
                                +
                              </motion.button>
                            </div>
                            <div className="text-right">
                              <div className="text-xs text-gray-500 mb-1">Сумма</div>
                              <div className="text-xl font-bold text-purple-400">
                                ₽{(item.price * item.quantity).toLocaleString()}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer */}
                {cartItems.length > 0 && (
                  <div className="p-6 border-t border-gray-800 bg-black/80 backdrop-blur-xl space-y-4">
                    <div className="flex justify-between items-center text-2xl font-bold">
                      <span className="text-white">Итого:</span>
                      <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        ₽{getTotalPrice().toLocaleString()}
                      </span>
                    </div>
                    <motion.button
                      className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 rounded-xl font-bold text-white text-lg shadow-lg shadow-purple-500/50"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        alert('Демо версия: Заказ оформлен!')
                        clearCart()
                        setIsCartOpen(false)
                      }}
                    >
                      Оформить заказ
                    </motion.button>
                    <motion.button
                      className="w-full py-3 text-gray-400 hover:text-white transition-colors text-sm"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={clearCart}
                    >
                      Очистить корзину
                    </motion.button>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default Cart
