import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { useCountdown } from '../hooks/useCountdown'
import './Hero.css'

function Particles() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx    = canvas.getContext('2d')
    let W = canvas.width  = window.innerWidth
    let H = canvas.height = window.innerHeight
    let raf

    const HEARTS = ['❤️','💛','✨','💫','⭐']
    const particles = Array.from({ length: 40 }, () => ({
      x:    Math.random() * W,
      y:    Math.random() * H + H,
      size: 10 + Math.random() * 18,
      speed:0.4 + Math.random() * 0.8,
      drift:(Math.random() - 0.5) * 0.5,
      sym:  HEARTS[Math.floor(Math.random() * HEARTS.length)],
      opacity: 0.3 + Math.random() * 0.5,
    }))

    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      particles.forEach(p => {
        ctx.globalAlpha = p.opacity
        ctx.font = `${p.size}px serif`
        ctx.fillText(p.sym, p.x, p.y)
        p.y    -= p.speed
        p.x    += p.drift
        if (p.y < -30) {
          p.y = H + 20
          p.x = Math.random() * W
        }
      })
      ctx.globalAlpha = 1
      raf = requestAnimationFrame(draw)
    }

    const onResize = () => {
      W = canvas.width  = window.innerWidth
      H = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', onResize)
    draw()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', onResize) }
  }, [])

  return <canvas ref={canvasRef} className="hero-particles" />
}

export default function Hero({ config, onOpenGift }) {
  const { hero, hisName } = config
  const { display, label } = useCountdown(hero.countdownTo, hero.countdownFrom)
  const [musicOn, setMusicOn] = useState(false)
  const audioRef = useRef(null)

  const toggleMusic = () => {
    if (!audioRef.current) return
    if (musicOn) { audioRef.current.pause(); setMusicOn(false) }
    else         { audioRef.current.play().catch(()=>{}); setMusicOn(true) }
  }

  return (
    <section id="hero" className="hero-section">
      {/* Background */}
      {hero.backgroundVideo
        ? <video className="hero-bg" src={hero.backgroundVideo} autoPlay muted loop playsInline />
        : hero.backgroundImage
          ? <div className="hero-bg" style={{ backgroundImage: `url(${hero.backgroundImage})` }} />
          : <div className="hero-bg hero-gradient" />
      }

      <Particles />

      {/* Audio */}
      {hero.musicTrack && (
        <audio ref={audioRef} src={hero.musicTrack} loop />
      )}

      {/* Content */}
      <div className="hero-content">
        <motion.div
          className="glass hero-card"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <motion.p
            className="hero-for script"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            For {hisName} 💛
          </motion.p>

          <h1 className="hero-title serif glow-text">
            <TypeAnimation
              sequence={[hero.greeting, 1000]}
              wrapper="span"
              speed={60}
              cursor={false}
            />
          </h1>

          <motion.p
            className="hero-sub"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            {hero.subGreeting}
          </motion.p>

          {display && (
            <motion.div
              className="hero-countdown"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.6 }}
            >
              <span className="countdown-display gold serif">{display}</span>
              {label && <span className="countdown-label">{label}</span>}
            </motion.div>
          )}

          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2 }}
          >
            <button className="btn-gift" onClick={onOpenGift}>
              Open Your Gift 🎁
            </button>
            {hero.musicTrack && (
              <button className="btn-music" onClick={toggleMusic} aria-label="Toggle music">
                {musicOn ? '🔊' : '🔇'}
              </button>
            )}
          </motion.div>
        </motion.div>
      </div>

      <div className="hero-scroll-hint">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >↓</motion.div>
      </div>
    </section>
  )
}
