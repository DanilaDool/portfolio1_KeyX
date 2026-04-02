import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

const RealisticKeyboard = ({ activeEffect, onKeyClick, soundEnabled }) => {
  const [time, setTime] = useState(0)
  const [pressedKey, setPressedKey] = useState(null)
  const [reactiveKeys, setReactiveKeys] = useState({})

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((t) => t + 0.2)
    }, 300) // Reduced to 300ms for better performance
    return () => clearInterval(interval)
  }, [])

  // Clean up reactive keys
  useEffect(() => {
    if (activeEffect === 'reactive') {
      const cleanup = setInterval(() => {
        setReactiveKeys(prev => {
          const now = Date.now()
          const filtered = {}
          Object.keys(prev).forEach(key => {
            if (now - prev[key] < 1000) {
              filtered[key] = prev[key]
            }
          })
          return filtered
        })
      }, 100)
      return () => clearInterval(cleanup)
    }
  }, [activeEffect])

  // Keyboard layout - full keyboard
  const keyboardLayout = [
    // Row 1
    ['Esc', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12'],
    // Row 2
    ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Back'],
    // Row 3
    ['Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', '\\'],
    // Row 4
    ['Caps', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', "'", 'Enter'],
    // Row 5
    ['Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/', 'Shift'],
  ]

  const getKeyColor = (row, col, effect, time, keyId) => {
    const colors = ['#a855f7', '#ec4899', '#06b6d4', '#10b981', '#f59e0b']
    
    switch (effect) {
      case 'wave':
        return colors[Math.floor((col + time) % colors.length)]
      case 'ripple':
        const distance = Math.sqrt(Math.pow(row - 2, 2) + Math.pow(col - 7, 2))
        return colors[Math.floor((distance + time) % colors.length)]
      case 'breathing':
        return colors[Math.floor(time % colors.length)]
      case 'rainbow':
        return colors[(row + col + Math.floor(time)) % colors.length]
      case 'static':
        return colors[(row + col) % colors.length]
      case 'reactive':
        // Show color only if key was recently pressed
        if (reactiveKeys[keyId]) {
          const elapsed = Date.now() - reactiveKeys[keyId]
          const fadeProgress = elapsed / 1000 // 1 second fade
          return fadeProgress < 1 ? colors[(row + col) % colors.length] : '#666666'
        }
        return '#666666'
      default:
        return colors[0]
    }
  }

  const getKeyWidth = (key) => {
    if (key === 'Back') return 'w-10 md:w-16 lg:w-20'
    if (key === 'Tab') return 'w-8 md:w-12 lg:w-16'
    if (key === 'Caps') return 'w-10 md:w-14 lg:w-20'
    if (key === 'Enter') return 'w-12 md:w-16 lg:w-24'
    if (key === 'Shift') return 'w-14 md:w-20 lg:w-28'
    if (key === 'Space') return 'w-28 md:w-40 lg:w-64'
    if (key === 'Ctrl' || key === 'Alt' || key === 'Win' || key === 'Fn') return 'w-7 md:w-10 lg:w-14'
    return 'w-6 md:w-8 lg:w-12'
  }

  const handleKeyPress = (key, row, col) => {
    const keyId = `${row}-${col}`
    setPressedKey(keyId)
    
    // Track reactive key press
    if (activeEffect === 'reactive') {
      setReactiveKeys(prev => ({
        ...prev,
        [keyId]: Date.now()
      }))
    }
    
    onKeyClick(key)
    setTimeout(() => setPressedKey(null), 150)
  }

  return (
    <div className="inline-block p-3 md:p-6 lg:p-8 glass-morphism rounded-3xl overflow-x-auto max-w-full">
      <div className="space-y-1 md:space-y-1.5 lg:space-y-2 min-w-max">
        {keyboardLayout.map((row, rowIndex) => (
          <div key={rowIndex} className="flex gap-1 md:gap-1.5 lg:gap-2 justify-center">
            {row.map((key, colIndex) => {
              const keyId = `${rowIndex}-${colIndex}`
              const isPressed = pressedKey === keyId
              const color = getKeyColor(rowIndex, colIndex, activeEffect, time, keyId)
              
              return (
                <button
                  key={keyId}
                  onClick={() => handleKeyPress(key, rowIndex, colIndex)}
                  className={`${getKeyWidth(key)} h-7 md:h-10 lg:h-12 rounded-lg relative overflow-hidden font-semibold text-xs md:text-xs lg:text-sm transition-transform duration-50`}
                  style={{
                    backgroundColor: '#2a2a2a',
                    transform: isPressed ? 'translateY(4px)' : 'translateY(0)',
                    borderBottom: `3px solid ${color}`,
                  }}
                >
                  {/* Key label */}
                  <div className="relative z-10 flex items-center justify-center h-full text-white">
                    {key}
                  </div>

                  {/* Bottom LED strip */}
                  <div
                    className="absolute bottom-0 left-2 right-2 h-1 rounded-full"
                    style={{ 
                      backgroundColor: color,
                      opacity: isPressed ? 0.5 : 0.9,
                    }}
                  />
                </button>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}

export default RealisticKeyboard
