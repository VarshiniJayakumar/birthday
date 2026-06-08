import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import './Surprise.css'

/* ── Scratch Card ─────────────────────────────────────────── */
function ScratchCard({ onUnlock }) {
  const canvasRef = useRef(null)
  const scratchedRef = useRef(0)
  const drawing = useRef(false)
  const unlockedRef = useRef(false)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    // Scale for device pixel ratio
    const dpr = window.devicePixelRatio || 1
    canvas.width  = 300 * dpr
    canvas.height = 120 * dpr
    canvas.style.width  = '300px'
    canvas.style.height = '120px'
    ctx.scale(dpr, dpr)
    ctx.fillStyle = '#2a2a3a'
    ctx.fillRect(0, 0, 300, 120)
    ctx.fillStyle = 'rgba(201,168,76,0.6)'
    ctx.font = 'bold 16px Inter, sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText('🎀 Scratch to reveal', 150, 55)
    ctx.font = '13px Inter, sans-serif'
    ctx.fillStyle = 'rgba(245,240,232,0.5)'
    ctx.fillText('Use your finger or mouse', 150, 80)
  }, [])

  const getPos = (e, canvas) => {
    const rect = canvas.getBoundingClientRect()
    const scaleX = canvas.width  / rect.width  / (window.devicePixelRatio || 1)
    const scaleY = canvas.height / rect.height / (window.devicePixelRatio || 1)
    const clientX = e.touches ? e.touches[0].clientX : e.clientX
    const clientY = e.touches ? e.touches[0].clientY : e.clientY
    return {
      x: (clientX - rect.left),
      y: (clientY - rect.top),
    }
  }

  const doScratch = (e) => {
    if (!drawing.current || unlockedRef.current) return
    e.preventDefault()
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const { x, y } = getPos(e, canvas)
    ctx.globalCompositeOperation = 'destination-out'
    ctx.beginPath()
    ctx.arc(x, y, 24, 0, Math.PI * 2)
    ctx.fill()

    // Sample every 4th pixel for performance
    const dpr = window.devicePixelRatio || 1
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data
    let transparent = 0
    const total = (canvas.width * canvas.height) / (dpr * dpr)
    for (let i = 3; i < data.length; i += 16) {
      if (data[i] < 128) transparent++
    }
    const pct = (transparent / (data.length / 16)) * 100
    scratchedRef.current = pct
    if (pct >= 60 && !unlockedRef.current) {
      unlockedRef.current = true
      onUnlock()
    }
  }

  return (
    <div className="scratch-wrap">
      <p className="scratch-instruction">Scratch the card below 👇</p>
      <canvas
        ref={canvasRef}
        className="scratch-canvas"
        style={{ cursor: 'crosshair', touchAction: 'none' }}
        onMouseDown={() => { drawing.current = true }}
        onMouseUp={()   => { drawing.current = false }}
        onMouseLeave={()=> { drawing.current = false }}
        onMouseMove={doScratch}
        onTouchStart={(e) => { e.preventDefault(); drawing.current = true }}
        onTouchEnd={()   => { drawing.current = false }}
        onTouchMove={doScratch}
      />
    </div>
  )
}

/* ── Password ─────────────────────────────────────────────── */
function PasswordUnlock({ password, hint, onUnlock }) {
  const [val,   setVal]   = useState('')
  const [error, setError] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    if (val.trim() === String(password)) { onUnlock() }
    else { setError(true); setTimeout(() => setError(false), 2000) }
  }

  return (
    <form className="password-form" onSubmit={submit}>
      <p className="password-prompt">Enter the secret code 🔐</p>
      <input
        className={`password-input ${error ? 'password-error' : ''}`}
        type="text"
        value={val}
        onChange={e => setVal(e.target.value)}
        placeholder="Your answer..."
        maxLength={50}
        autoComplete="off"
      />
      <button type="submit" className="btn-gift">Unlock 🎁</button>
      {error && <p className="password-hint">{hint}</p>}
    </form>
  )
}

/* ── Confetti helper ──────────────────────────────────────── */
function fireConfetti(big = false) {
  const count = big ? 200 : 150
  confetti({ particleCount: count, spread: 100, origin: { y: 0.5 }, colors: ['#c9a84c','#e8c97a','#f5f0e8','#e8a0b0','#ff69b4','#ffffff'] })
  setTimeout(() => confetti({ particleCount: big ? 100 : 80, angle: 60,  spread: 60, origin: { x: 0 } }), 400)
  setTimeout(() => confetti({ particleCount: big ? 100 : 80, angle: 120, spread: 60, origin: { x: 1 } }), 700)
}

/* ── Main Component ───────────────────────────────────────── */
export default function Surprise({ config }) {
  const { surprise } = config
  const [unlocked1, setUnlocked1] = useState(false)
  const [unlocked2, setUnlocked2] = useState(false)

  const handleUnlock1 = () => { setUnlocked1(true); fireConfetti(false) }
  const handleUnlock2 = () => { setUnlocked2(true); fireConfetti(true)  }

  return (
    <section id="surprise" className="surprise-section">
      <div className="section-header">
        <motion.h2
          className="serif glow-text"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Your Surprises
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          Two special things waiting just for you 🎁🎀
        </motion.p>
      </div>

      <div className="surprise-container">

        {/* ══ SURPRISE 1 ══ */}
        <div className="surprise-label serif gold">🎁 Surprise #1</div>

        {!unlocked1 ? (
          <motion.div
            className="surprise-lock glass"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            {surprise.mechanic === 'password' && (
              <PasswordUnlock
                password={surprise.password}
                hint={surprise.hint}
                onUnlock={handleUnlock1}
              />
            )}
            {surprise.mechanic === 'scratch' && <ScratchCard key="s1" onUnlock={handleUnlock1} />}
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
            {surprise.content.video && (
              <video src={surprise.content.video} controls className="reveal-video" />
            )}
          </motion.div>
        )}

        {/* ══ SURPRISE 2 — only shows after #1 unlocked ══ */}
        {unlocked1 && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.7 }}
          >
            <div className="surprise-divider">
              <span>✨ But wait… there's more ✨</span>
            </div>

            <div className="surprise-label serif gold">🎀 Surprise #2</div>

            {!unlocked2 ? (
              <motion.div
                className="surprise-lock glass"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                <ScratchCard key="s2" onUnlock={handleUnlock2} />
              </motion.div>
            ) : (
              <motion.div
                className="surprise-reveal glass"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="reveal-icon">🎁💝</div>
                <h3 className="serif gold reveal-title">A Gift Just For You</h3>
                <p className="reveal-message">
                  I have a gift waiting in my hands for you, kuchupuchuu.
                  Something I picked with all my love — because you deserve
                  to be spoiled on your special day. 🥰✨
                </p>
              </motion.div>
            )}
          </motion.div>
        )}

      </div>
    </section>
  )
}
