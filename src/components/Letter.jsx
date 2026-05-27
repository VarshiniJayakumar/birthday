import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import './Letter.css'

export default function Letter({ config }) {
  const { letter, yourName } = config
  const [stage, setStage]   = useState('closed') // closed → opening → typing → done
  const [typed,  setTyped]  = useState('')
  const [ref, inView]       = useInView({ triggerOnce: true, threshold: 0.3 })
  const audioRef            = useRef(null)

  // Trigger envelope open when section enters view
  useEffect(() => {
    if (inView && stage === 'closed') {
      setTimeout(() => setStage('opening'), 400)
      setTimeout(() => setStage('typing'),  1800)
    }
  }, [inView, stage])

  // Typing animation
  useEffect(() => {
    if (stage !== 'typing') return
    let i = 0
    const body = letter.body
    const id = setInterval(() => {
      setTyped(body.slice(0, i + 1))
      i++
      if (i >= body.length) { clearInterval(id); setStage('done') }
    }, 22)
    return () => clearInterval(id)
  }, [stage, letter.body])

  // Music
  useEffect(() => {
    if (!letter.musicEnabled || !audioRef.current) return
    if (inView) audioRef.current.play().catch(() => {})
    else        audioRef.current.pause()
  }, [inView, letter.musicEnabled])

  return (
    <section id="letter" className="letter-section" ref={ref}>
      <div className="section-header">
        <motion.h2
          className="serif glow-text"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          A Letter For You
        </motion.h2>
      </div>

      <div className="letter-scene">
        {/* Envelope */}
        <AnimatePresence>
          {stage === 'closed' && (
            <motion.div
              className="envelope"
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <div className="envelope-body">
                <div className="envelope-flap" />
                <div className="envelope-seal">❤️</div>
              </div>
            </motion.div>
          )}
          {stage === 'opening' && (
            <motion.div
              className="envelope"
              initial={{ opacity: 1 }}
              animate={{ opacity: 0, y: -30, scale: 0.9 }}
              transition={{ duration: 0.8 }}
            >
              <div className="envelope-body">
                <motion.div
                  className="envelope-flap"
                  animate={{ rotateX: -160 }}
                  transition={{ duration: 0.7 }}
                />
                <div className="envelope-seal">💌</div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Letter paper */}
        <AnimatePresence>
          {(stage === 'typing' || stage === 'done') && (
            <motion.div
              className="letter-paper"
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="letter-lines" aria-hidden="true" />
              <div className="letter-text serif">
                {typed}
                {stage === 'typing' && <span className="letter-cursor">|</span>}
              </div>

              {stage === 'done' && (
                <motion.div
                  className="letter-signature script"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 1 }}
                >
                  With all my love,<br />
                  <span className="signature-name">{yourName} ❤️</span>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
