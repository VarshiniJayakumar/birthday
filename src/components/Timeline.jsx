import React, { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import './Timeline.css'

const PLACEHOLDER_ICONS = ['💑','💬','🌹','✈️','🌟']

function TimelineItem({ item, index, isLast }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-20% 0px' })
  const [audioPlaying, setAudioPlaying] = useState(false)
  const audioRef = useRef(null)

  const toggleAudio = () => {
    if (!audioRef.current) return
    if (audioPlaying) { audioRef.current.pause(); setAudioPlaying(false) }
    else              { audioRef.current.play().catch(()=>{}); setAudioPlaying(true) }
  }

  const isLeft = index % 2 === 0

  return (
    <div className={`tl-item ${isLeft ? 'tl-left' : 'tl-right'}`} ref={ref}>
      {/* Connector dot */}
      <motion.div
        className="tl-dot"
        animate={{ boxShadow: ['0 0 0px #c9a84c', '0 0 14px #c9a84c', '0 0 0px #c9a84c'] }}
        transition={{ repeat: Infinity, duration: 2, delay: index * 0.3 }}
      />

      {/* Card */}
      <motion.div
        className="tl-card glass"
        initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
      >
        <span className="tl-date gold">{item.date}</span>
        <h3 className="tl-title serif">{item.title}</h3>
        <p className="tl-desc">{item.description}</p>

        {item.photo
          ? <img src={item.photo} alt={item.title} className="tl-photo" />
          : <div className="tl-photo-placeholder">{PLACEHOLDER_ICONS[index % PLACEHOLDER_ICONS.length]}</div>
        }

        {item.audio && (
          <>
            <audio ref={audioRef} src={item.audio} />
            <button className="tl-audio-btn" onClick={toggleAudio}>
              {audioPlaying ? '⏸ Pause memory' : '▶ Play memory'}
            </button>
          </>
        )}
      </motion.div>

      {!isLast && <div className="tl-line" />}
    </div>
  )
}

export default function Timeline({ config }) {
  return (
    <section id="timeline" className="timeline-section">
      <div className="section-header">
        <motion.h2
          className="serif glow-text"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          Our Story
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          Every chapter that brought us here ✨
        </motion.p>
      </div>

      <div className="tl-container">
        <div className="tl-spine" />
        {config.timeline.map((item, i) => (
          <TimelineItem
            key={i}
            item={item}
            index={i}
            isLast={i === config.timeline.length - 1}
          />
        ))}
      </div>
    </section>
  )
}
