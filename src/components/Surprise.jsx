import React, { useState } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import './Surprise.css'

/* ── Password ─────────────────────────────────────────────── */
function PasswordUnlock({ password, hint, onUnlock }) {
  const [val,   setVal]   = useState('')
  const [error, setError] = useState(false)
  const [shake, setShake] = useState(false)

  const tryUnlock = () => {
    const entered = val.trim().toLowerCase()
    const correct = String(password).trim().toLowerCase()
    if (entered === correct) {
      onUnlock()
    } else {
      setError(true)
      setShake(true)
      setTimeout(() => { setError(false); setShake(false) }, 2000)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    e.stopPropagation()
    tryUnlock()
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      tryUnlock()
    }
  }

  return (
    <div className="password-form">
      <p className="password-prompt">Enter the secret code 🔐</p>
      <input
        className={`password-input ${shake ? 'password-error' : ''}`}
        type="text"
        value={val}
        onChange={e => setVal(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your answer..."
        maxLength={50}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
      />
      <button
        type="button"
        className="btn-gift"
        onClick={tryUnlock}
      >
        Unlock 🎁
      </button>
      {error && (
        <motion.p
          className="password-wrong"
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
        >
          That's not quite right 💛 Try again!
        </motion.p>
      )}
    </div>
  )
}

/* ── Main Component ───────────────────────────────────────── */
export default function Surprise({ config }) {
  const { surprise } = config
  const [unlocked, setUnlocked] = useState(false)

  const handleUnlock = () => {
    setUnlocked(true)
    confetti({ particleCount: 150, spread: 100, origin: { y: 0.5 }, colors: ['#c9a84c','#e8c97a','#f5f0e8','#e8a0b0','#ffffff'] })
    setTimeout(() => confetti({ particleCount: 80, angle: 60,  spread: 55, origin: { x: 0 } }), 400)
    setTimeout(() => confetti({ particleCount: 80, angle: 120, spread: 55, origin: { x: 1 } }), 600)
  }

  const scrollToFuture = () => {
    document.getElementById('future')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="surprise" className="surprise-section">
      <div className="section-header">
        <motion.h2
          className="serif glow-text"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Your Surprise 🎁
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          Something special is waiting for you
        </motion.p>
      </div>

      <div className="surprise-container">
        {!unlocked ? (
          <motion.div
            className="surprise-lock glass"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <PasswordUnlock
              password={surprise.password}
              hint={surprise.hint}
              onUnlock={handleUnlock}
            />
          </motion.div>
        ) : (
          <motion.div
            className="surprise-reveal glass"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="reveal-icon">🎉</div>
            <h3 className="serif gold reveal-title">{surprise.content.title}</h3>
            <p className="reveal-message">{surprise.content.message}</p>
            <motion.button
              type="button"
              className="btn-gift"
              onClick={scrollToFuture}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              See Our Future ✨
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  )
}
