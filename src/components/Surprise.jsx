import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import './Surprise.css'

/* ── Scratch Card ─────────────────────────────────────────── */
function ScratchCard({ onUnlock }) {
  const canvasRef = useRef(null)
  const [scratched, setScratched] = useState(0)
  const drawing = useRef(false)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx    = canvas.getContext('2d')
    ctx.fillStyle = '#2a2a3a'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = 'rgba(201,168,76,0.3)'
    ctx.font = 'bold 18px Inter'
    ctx.textAlign = 'center'
    ctx.fillText('Scratch to reveal ✨', canvas.width / 2, canvas.height / 2)
  }, [])

  const scratch = (e) => {
    if (!drawing.current) return
    const canvas = canvasRef.current
    const ctx    = canvas.getContext('2d')
    const rect   = canvas.getBoundingClientRect()
    const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left
    const y = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top
    ctx.globalCompositeOperation = 'destination-out'
    ctx.beginPath()
    ctx.arc(x, y, 22, 0, Math.PI * 2)
    ctx.fill()

    // Check coverage
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data
    let transparent = 0
    for (let i = 3; i < data.length; i += 4) if (data[i] < 128) transparent++
    const pct = (transparent / (canvas.width * canvas.height)) * 100
    setScratched(pct)
    if (pct >= 70) onUnlock()
  }

  return (
    <div className="scratch-wrap">
      <canvas
        ref={canvasRef}
        width={300} height={120}
        className="scratch-canvas"
        onMouseDown={() => drawing.current = true}
        onMouseUp={()   => drawing.current = false}
        onMouseMove={scratch}
        onTouchStart={() => drawing.current = true}
        onTouchEnd={()   => drawing.current = false}
        onTouchMove={scratch}
      />
      <div className="scratch-progress">
        <div style={{ width: `${Math.min(scratched, 100)}%` }} />
      </div>
    </div>
  )
}

/* ── Hold Button ──────────────────────────────────────────── */
function HoldButton({ onUnlock }) {
  const [progress, setProgress] = useState(0)
  const intervalRef = useRef(null)

  const start = () => {
    intervalRef.current = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(intervalRef.current); onUnlock(); return 100 }
        return p + (100 / 30)
      })
    }, 100)
  }
  const stop = () => {
    clearInterval(intervalRef.current)
    setProgress(0)
  }

  return (
    <div className="hold-wrap">
      <div className="hold-ring" style={{ '--p': `${progress}%` }}>
        <button
          className="hold-btn"
          onMouseDown={start} onMouseUp={stop} onMouseLeave={stop}
          onTouchStart={start} onTouchEnd={stop}
        >
          {progress >= 100 ? '🎉' : 'Hold Me'}
        </button>
      </div>
      <p className="hold-hint">Press and hold for 3 seconds</p>
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

/* ── Main Component ───────────────────────────────────────── */
export default function Surprise({ config }) {
  const { surprise } = config
  const [unlocked, setUnlocked] = useState(false)

  const handleUnlock = () => {
    setUnlocked(true)
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.5 },
      colors: ['#c9a84c','#e8c97a','#f5f0e8','#e8a0b0','#ffffff'],
    })
    setTimeout(() => confetti({ particleCount: 80, angle: 60,  spread: 55, origin: { x: 0 } }), 400)
    setTimeout(() => confetti({ particleCount: 80, angle: 120, spread: 55, origin: { x: 1 } }), 600)
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
          Your Surprise
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          Something special is waiting for you 🎁
        </motion.p>
      </div>

      <div className="surprise-container">
        <AnimatePresence mode="wait">
          {!unlocked ? (
            <motion.div
              key="lock"
              className="surprise-lock glass"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              {surprise.mechanic === 'scratch' && <ScratchCard onUnlock={handleUnlock} />}
              {surprise.mechanic === 'hold'    && <HoldButton  onUnlock={handleUnlock} />}
              {surprise.mechanic === 'password' && (
                <PasswordUnlock
                  password={surprise.password}
                  hint={surprise.hint}
                  onUnlock={handleUnlock}
                />
              )}
            </motion.div>
          ) : (
            <motion.div
              key="reveal"
              className="surprise-reveal glass"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="reveal-icon">🎉</div>
              <h3 className="serif gold reveal-title">{surprise.content.title}</h3>
              <p className="reveal-message">{surprise.content.message}</p>
              {surprise.content.video && (
                <video src={surprise.content.video} controls className="reveal-video" />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
