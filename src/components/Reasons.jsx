import React, { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import './Reasons.css'

function FlipCard({ reason, index, flipped, onFlip }) {
  return (
    <motion.div
      className={`flip-card-wrap ${flipped ? 'flipped' : ''}`}
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      onClick={onFlip}
    >
      <div className="flip-card-inner">
        <div className="flip-card-front glass">
          <span className="flip-front-icon">❤️</span>
          <span className="flip-front-num gold">#{index + 1}</span>
        </div>
        <div className="flip-card-back glass">
          <p className="flip-reason serif">{reason}</p>
        </div>
      </div>
    </motion.div>
  )
}

export default function Reasons({ config }) {
  const { reasons } = config
  const [flipped, setFlipped] = useState(new Set())
  const [allDone, setAllDone] = useState(false)
  const [highlighted, setHighlighted] = useState(null)
  const cardRefs = useRef([])

  const flip = useCallback((i) => {
    setFlipped(prev => {
      const next = new Set(prev)
      next.add(i)
      if (next.size === reasons.length) {
        setAllDone(true)
        confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 },
                   colors: ['#c9a84c','#e8c97a','#f5f0e8','#e8a0b0'] })
      }
      return next
    })
  }, [reasons.length])

  const showAnother = () => {
    const unflipped = reasons.map((_, i) => i).filter(i => !flipped.has(i))
    if (unflipped.length === 0) return
    const pick = unflipped[Math.floor(Math.random() * unflipped.length)]
    setHighlighted(pick)
    cardRefs.current[pick]?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    setTimeout(() => setHighlighted(null), 2000)
  }

  return (
    <section id="reasons" className="reasons-section">
      <div className="section-header">
        <motion.h2
          className="serif glow-text"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {reasons.length} Reasons I Love You
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          Tap each card to reveal 💛
        </motion.p>
      </div>

      <div className="reasons-grid">
        {reasons.map((reason, i) => (
          <div
            key={i}
            ref={el => cardRefs.current[i] = el}
            className={highlighted === i ? 'card-highlight' : ''}
          >
            <FlipCard
              reason={reason}
              index={i}
              flipped={flipped.has(i)}
              onFlip={() => flip(i)}
            />
          </div>
        ))}
      </div>

      <div className="reasons-actions">
        {!allDone ? (
          <button className="btn-another" onClick={showAnother}>
            Show Me Another 💫
          </button>
        ) : (
          <motion.p
            className="all-revealed serif gold"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            You've seen them all — every single reason 💛
          </motion.p>
        )}
      </div>
    </section>
  )
}
