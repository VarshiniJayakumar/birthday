import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import confetti from 'canvas-confetti'
import './Ending.css'

function Lanterns({ count = 6 }) {
  return (
    <div className="lanterns-wrap" aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <motion.div
          key={i}
          className="lantern"
          initial={{ y: '100vh', opacity: 0, x: `${(i / count) * 80 + 10}vw` }}
          animate={{ y: '-20vh', opacity: [0, 0.8, 0.8, 0] }}
          transition={{
            duration: 6 + i * 0.8,
            delay: i * 0.6,
            repeat: Infinity,
            repeatDelay: 2,
            ease: 'easeInOut',
          }}
        >
          🏮
        </motion.div>
      ))}
    </div>
  )
}

export default function Ending({ config }) {
  const { ending } = config
  const [calm, setCalm] = useState(false)
  const [ref, inView]   = useInView({ triggerOnce: true, threshold: 0.3 })
  const fired = useRef(false)

  useEffect(() => {
    if (!inView || fired.current) return
    fired.current = true

    // Fireworks burst
    const fire = (opts) => confetti({ ...opts, colors: ['#c9a84c','#e8c97a','#f5f0e8','#e8a0b0','#fff'] })
    fire({ particleCount: 100, spread: 70, origin: { y: 0.6 } })
    setTimeout(() => fire({ particleCount: 80, angle: 60,  spread: 55, origin: { x: 0, y: 0.6 } }), 500)
    setTimeout(() => fire({ particleCount: 80, angle: 120, spread: 55, origin: { x: 1, y: 0.6 } }), 800)
    setTimeout(() => fire({ particleCount: 60, spread: 100, origin: { y: 0.4 } }), 1400)
    setTimeout(() => fire({ particleCount: 40, spread: 60,  origin: { y: 0.7 } }), 2200)
    setTimeout(() => setCalm(true), 5000)
  }, [inView])

  return (
    <section id="ending" className="ending-section" ref={ref}>
      <Lanterns count={7} />

      <div className="ending-content">
        <motion.div
          className="heartbeat-wrap"
          animate={{ scale: [1, 1.18, 1] }}
          transition={{ repeat: Infinity, duration: 1, ease: 'easeInOut' }}
        >
          ❤️
        </motion.div>

        <motion.h2
          className="ending-message serif glow-text"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          {ending.message}
        </motion.h2>

        <motion.p
          className="ending-sub"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1.2 }}
        >
          {ending.subMessage}
        </motion.p>

        {calm && (
          <motion.div
            className="ending-particles"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {['✨','💛','🌟','💫','⭐'].map((s, i) => (
              <motion.span
                key={i}
                className="ending-star"
                animate={{ y: [0, -12, 0], opacity: [0.4, 1, 0.4] }}
                transition={{ repeat: Infinity, duration: 2 + i * 0.4, delay: i * 0.3 }}
              >
                {s}
              </motion.span>
            ))}
          </motion.div>
        )}

        <motion.p
          className="ending-footer script"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 2 }}
        >
          Made with love, just for you 💛
        </motion.p>
      </div>
    </section>
  )
}
