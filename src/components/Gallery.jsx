import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Gallery.css'

const PLACEHOLDER_COLORS = ['#2a1a2e','#1a2a1e','#2a2010','#1a1a2e','#2a1018','#102a20']

function TiltCard({ children, className }) {
  const handleMove = (e) => {
    const el   = e.currentTarget
    const rect = el.getBoundingClientRect()
    const x    = ((e.clientX - rect.left) / rect.width  - 0.5) * 15
    const y    = ((e.clientY - rect.top)  / rect.height - 0.5) * -15
    el.style.transform = `perspective(600px) rotateX(${y}deg) rotateY(${x}deg) scale(1.03)`
  }
  const handleLeave = (e) => {
    e.currentTarget.style.transform = 'perspective(600px) rotateX(0) rotateY(0) scale(1)'
  }
  return (
    <div className={className} onMouseMove={handleMove} onMouseLeave={handleLeave}
         style={{ transition: 'transform 0.3s ease' }}>
      {children}
    </div>
  )
}

function Modal({ item, onClose }) {
  return (
    <AnimatePresence>
      <motion.div
        className="gallery-modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="gallery-modal-content glass"
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.85, opacity: 0 }}
          onClick={e => e.stopPropagation()}
        >
          <button className="modal-close" onClick={onClose}>✕</button>
          {item.type === 'video' && item.src
            ? <video src={item.src} controls className="modal-media" />
            : item.src
              ? <img src={item.src} alt={item.caption} className="modal-media" />
              : <div className="modal-placeholder">📷</div>
          }
          {item.caption && <p className="modal-caption script">{item.caption}</p>}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

function BeforeNowSlider({ before, now, label }) {
  const [pos, setPos] = useState(50)

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const clientX = e.touches ? e.touches[0].clientX : e.clientX
    const pct = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100))
    setPos(pct)
  }

  return (
    <div className="before-now-wrap">
      <h3 className="serif gold before-now-label">{label}</h3>
      <div
        className="before-now-slider"
        onMouseMove={handleMove}
        onTouchMove={handleMove}
      >
        <div className="bn-now" style={{ backgroundImage: now ? `url(${now})` : 'none' }}>
          {!now && <span className="bn-placeholder">Now 💛</span>}
        </div>
        <div className="bn-before" style={{ width: `${pos}%`, backgroundImage: before ? `url(${before})` : 'none' }}>
          {!before && <span className="bn-placeholder">Then 🌸</span>}
        </div>
        <div className="bn-handle" style={{ left: `${pos}%` }}>
          <div className="bn-handle-line" />
          <div className="bn-handle-circle">⟺</div>
        </div>
      </div>
    </div>
  )
}

export default function Gallery({ config }) {
  const [selected, setSelected] = useState(null)
  const { gallery, beforeNow } = config

  return (
    <section id="gallery" className="gallery-section">
      <div className="section-header">
        <motion.h2
          className="serif glow-text"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Our Memories
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          Every photo tells a story 📸
        </motion.p>
      </div>

      <div className="gallery-grid">
        {gallery.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
          >
            <TiltCard className="polaroid" onClick={() => setSelected(item)}>
              {item.src
                ? <img
                    src={item.src}
                    alt={item.caption}
                    className="polaroid-img"
                    onError={e => {
                      e.currentTarget.style.display = 'none'
                      e.currentTarget.nextSibling.style.display = 'flex'
                    }}
                  />
                : null
              }
              <div
                className="polaroid-img polaroid-placeholder"
                style={{
                  background: PLACEHOLDER_COLORS[i % PLACEHOLDER_COLORS.length],
                  display: item.src ? 'none' : 'flex',
                }}
              >
                📷
              </div>
              <p className="polaroid-caption script">{item.caption}</p>
            </TiltCard>
          </motion.div>
        ))}
      </div>

      {beforeNow && (beforeNow.before || beforeNow.now) && (
        <BeforeNowSlider
          before={beforeNow.before}
          now={beforeNow.now}
          label={beforeNow.label}
        />
      )}

      {selected && <Modal item={selected} onClose={() => setSelected(null)} />}
    </section>
  )
}
