import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import './Surprise2.css'

/* ── Tap Button mechanic ──────────────────────────────────── */
function TapUnlock({ onUnlock }) {
  const [taps, setTaps] = useState(0)
  const NEEDED = 10
  const unlockedRef = useRef(false)

  const handleTap = () => {
    if (unlockedRef.current) return
    const next = taps + 1
    setTaps(next)
    if (next >= NEEDED) {
      unlockedRef.current = true
      onUnlock()
    }
  }

  const pct = Math.min((taps / NEEDED) * 100, 100)

  return (
    <div className="tap-wrap">
      <p className="tap-hint">Tap the heart {NEEDED} times to unlock 💛</p>
      <div className="tap-progress-ring">
        <svg viewBox="0 0 120 120" className="tap-svg">
          <circle cx="60" cy="60" r="52" className="tap-track" />
          <circle
            cx="60" cy="60" r="52"
            className="tap-fill"
            strokeDasharray={`${2 * Math.PI * 52}`}
            strokeDashoffset={`${2 * Math.PI * 52 * (1 - pct / 100)}`}
          />
        </svg>
        <button className="tap-btn" onClick={handleTap} aria-label="Tap to unlock">
          <motion.span
            key={taps}
            initial={{ scale: 1.4 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2 }}
            style={{ display: 'block' }}
          >
            {taps >= NEEDED ? '🎉' : '❤️'}
          </motion.span>
        </button>
      </div>
      <p className="tap-count">{taps} / {NEEDED}</p>
    </div>
  )
}

/* ── Main Component ───────────────────────────────────────── */
export default function Surprise2() {
  const [unlocked, setUnlocked] = useState(false)

  const handleUnlock = () => {
    setUnlocked(true)
    confetti({ particleCount: 200, spread: 120, origin: { y: 0.5 }, colors: ['#c9a84c','#e8c97a','#ff69b4','#e8a0b0','#ffffff'] })
    setTimeout(() => confetti({ particleCount: 120, angle: 60,  spread: 70, origin: { x: 0 } }), 400)
    setTimeout(() => confetti({ particleCount: 120, angle: 120, spread: 70, origin: { x: 1 } }), 700)
  }

  return (
    <section id="surprise2" className="surprise2-section">
      <div className="section-header">
        <motion.h2
          className="serif glow-text"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          One More Thing… 🎀
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          There's still a little something waiting for you
        </motion.p>
      </div>

      <div className="surprise-container">
        {!unlocked ? (
          <motion.div
            className="surprise-lock glass"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <TapUnlock onUnlock={handleUnlock} />
          </motion.div>
        ) : (
          <motion.div
            className="surprise-reveal glass"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="reveal-icon">🎁💝</div>
            <h3 className="serif gold reveal-title">A Gift Made With Love</h3>
            <p className="reveal-message">
              I made this with my own hands, just for you, kuchupuchuu.
              Every bit of effort went into it because you deserved something
              that came straight from the heart — not bought, but built with love.
              I hope every time you see it, you feel how much you mean to me. 🥰💛
            </p>
          </motion.div>
        )}
      </div>
    </section>
  )
}
