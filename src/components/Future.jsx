import React from 'react'
import { motion } from 'framer-motion'
import './Future.css'

function FutureCard({ item, index }) {
  const handleMove = (e) => {
    const el   = e.currentTarget
    const rect = el.getBoundingClientRect()
    const x    = ((e.clientX - rect.left) / rect.width  - 0.5) * 12
    const y    = ((e.clientY - rect.top)  / rect.height - 0.5) * -12
    el.style.transform = `perspective(600px) rotateX(${y}deg) rotateY(${x}deg) translateY(-4px)`
  }
  const handleLeave = (e) => {
    e.currentTarget.style.transform = 'perspective(600px) rotateX(0) rotateY(0) translateY(0)'
  }

  return (
    <motion.div
      className="future-card glass"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ transition: 'transform 0.3s ease' }}
    >
      <div className="future-emoji">{item.emoji}</div>
      <h3 className="future-title serif">{item.title}</h3>
      <p className="future-detail">{item.detail}</p>
    </motion.div>
  )
}

export default function Future({ config }) {
  return (
    <section id="future" className="future-section">
      <div className="section-header">
        <motion.h2
          className="serif glow-text"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Our Future Together
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          Everything I'm looking forward to — with you 🌍
        </motion.p>
      </div>

      <div className="future-grid">
        {config.future.map((item, i) => (
          <FutureCard key={i} item={item} index={i} />
        ))}
      </div>
    </section>
  )
}
