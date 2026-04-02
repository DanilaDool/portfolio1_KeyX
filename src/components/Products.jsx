import { motion } from 'framer-motion'
import { useState } from 'react'
import { useCart } from '../context/CartContext'

const products = [
  {
    id: 1,
    name: 'KeyX Pro Elite',
    price: 18990,
    features: ['Cherry MX Red', 'Полная RGB', 'Алюминиевый корпус'],
    color: 'from-purple-600 to-pink-600',
    image: '/images/optimized/pexels-zeleboba-24449067.jpg',
  },
  {
    id: 2,
    name: 'KeyX Cyber',
    price: 14990,
    features: ['Cherry MX Blue', 'RGB подсветка', 'Компактная 75%'],
    color: 'from-cyan-600 to-blue-600',
    image: '/images/optimized/pexels-tanphuc-14008190.jpg',
  },
  {
    id: 3,
    name: 'KeyX Phantom',
    price: 16990,
    features: ['Cherry MX Brown', 'RGB на клавишу', 'Беспроводная'],
    color: 'from-pink-600 to-purple-600',
    image: '/images/optimized/pexels-jethro-c-703137695-18382824.jpg',
  },
  {
    id: 4,
    name: 'KeyX Stealth',
    price: 13990,
    features: ['Cherry MX Silent', 'RGB волна', 'TKL дизайн'],
    color: 'from-green-600 to-cyan-600',
    image: '/images/optimized/pexels-atahandemir-28842075.jpg',
  },
  {
    id: 5,
    name: 'KeyX Neon',
    price: 17990,
    features: ['Cherry MX Speed', 'Динамическая RGB', 'Hot-Swap'],
    color: 'from-yellow-600 to-pink-600',
    image: '/images/optimized/pexels-jonathan-cordova-r-2637981-35120415.jpg',
  },
  {
    id: 6,
    name: 'KeyX Matrix',
    price: 20990,
    features: ['Cherry MX Black', 'Реактивная RGB', 'Премиум сборка'],
    color: 'from-purple-600 to-cyan-600',
    image: '/images/optimized/pexels-huy-phan-316220-16222011.jpg',
  },
]

const ProductCard = ({ product, index }) => {
  const [isHovered, setIsHovered] = useState(false)
  const { addToCart, cartItems, updateQuantity } = useCart()

  const cartItem = cartItems.find(item => item.id === product.id)
  const isInCart = !!cartItem

  const handleAddToCart = () => {
    addToCart(product)
  }

  const handleIncrement = () => {
    updateQuantity(product.id, cartItem.quantity + 1)
  }

  const handleDecrement = () => {
    if (cartItem.quantity > 1) {
      updateQuantity(product.id, cartItem.quantity - 1)
    } else {
      updateQuantity(product.id, 0)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative group"
    >
      <motion.div
        className="glass-morphism rounded-2xl p-6 relative overflow-hidden"
        whileHover={{ y: -10 }}
        transition={{ duration: 0.3 }}
      >
        {/* Animated gradient background */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${product.color} opacity-0 group-hover:opacity-20`}
          transition={{ duration: 0.3 }}
        />

        {/* Product image */}
        <div className="relative aspect-video mb-6 rounded-xl overflow-hidden">
          <motion.div
            className="absolute inset-0 -z-10"
            animate={isHovered ? {
              boxShadow: [
                `0 0 20px ${product.color.includes('purple') ? '#a855f7' : '#06b6d4'}`,
                `0 0 40px ${product.color.includes('purple') ? '#ec4899' : '#10b981'}`,
                `0 0 20px ${product.color.includes('purple') ? '#a855f7' : '#06b6d4'}`,
              ],
            } : {}}
            transition={{ duration: 2, repeat: Infinity }}
          />
          
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover rounded-xl"
            loading="lazy"
            decoding="async"
          />
        </div>

        {/* Product info */}
        <div className="relative z-10">
          <h3 className="text-xl sm:text-2xl font-bold mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            {product.name}
          </h3>
          
          <div className="flex items-center justify-between mb-4">
            <span className={`text-2xl sm:text-3xl font-bold bg-gradient-to-r ${product.color} bg-clip-text text-transparent`}>
              ₽{product.price.toLocaleString()}
            </span>
            <div className="px-2 sm:px-3 py-1 glass-morphism rounded-full text-xs border border-purple-500">
              В НАЛИЧИИ
            </div>
          </div>

          {/* Features */}
          <ul className="space-y-2 mb-6">
            {product.features.map((feature, i) => (
              <motion.li
                key={i}
                className="flex items-center text-sm text-gray-300"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * i }}
              >
                <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${product.color} mr-2`} />
                {feature}
              </motion.li>
            ))}
          </ul>

          {/* CTA Button */}
          {!isInCart ? (
            <motion.button
              onClick={handleAddToCart}
              className={`w-full py-3 rounded-lg font-bold bg-gradient-to-r ${product.color} relative overflow-hidden`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.span
                className="relative z-10"
                animate={isHovered ? { scale: [1, 1.05, 1] } : {}}
                transition={{ duration: 0.3 }}
              >
                ДОБАВИТЬ В КОРЗИНУ
              </motion.span>
              <motion.div
                className="absolute inset-0 bg-white"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.5 }}
                style={{ opacity: 0.2 }}
              />
            </motion.button>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`w-full py-3 rounded-lg font-bold bg-gradient-to-r ${product.color} flex items-center justify-between px-6`}
            >
              <motion.button
                onClick={handleDecrement}
                className="w-12 h-12 bg-black/30 rounded-lg flex items-center justify-center text-xl"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Уменьшить количество"
              >
                -
              </motion.button>
              <span className="text-xl font-bold">{cartItem.quantity}</span>
              <motion.button
                onClick={handleIncrement}
                className="w-12 h-12 bg-black/30 rounded-lg flex items-center justify-center text-xl"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Увеличить количество"
              >
                +
              </motion.button>
            </motion.div>
          )}
        </div>

        {/* Hover glow effect */}
        <motion.div
          className={`absolute -inset-1 bg-gradient-to-r ${product.color} rounded-2xl blur-xl opacity-0 group-hover:opacity-30 -z-10`}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </motion.div>
  )
}

const Products = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/10 to-black" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
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
            ВЫБЕРИТЕ СВОЕ ОРУЖИЕ
          </motion.h2>
          <p className="text-base sm:text-xl text-gray-400 max-w-2xl mx-auto px-4">
            Премиальные механические клавиатуры для максимальной производительности
          </p>
        </motion.div>

        {/* Products grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Products
