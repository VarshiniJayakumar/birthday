import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { config } from './config'
import { useCursor } from './hooks/useCursor'

import Hero     from './components/Hero'
import Timeline from './components/Timeline'
import Gallery  from './components/Gallery'
import Reasons  from './components/Reasons'
import Letter   from './components/Letter'
import Music    from './components/Music'
import Surprise from './components/Surprise'
import Future   from './components/Future'
import Ending   from './components/Ending'

const SECTIONS = [
  { id: 'hero',     label: 'Home'     },
  { id: 'timeline', label: 'Story'    },
  { id: 'gallery',  label: 'Gallery'  },
  { id: 'reasons',  label: 'Reasons'  },
  { id: 'letter',   label: 'Letter'   },
  { id: 'music',    label: 'Music'    },
  { id: 'surprise', label: 'Surprise' },
  { id: 'future',   label: 'Future'   },
  { id: 'ending',   label: 'Ending'   },
]

function LoadingScreen({ onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 1800)
    return () => clearTimeout(t)
  }, [onDone])

  return (
    <motion.div
      className="loading-screen"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="loading-heart"
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ repeat: Infinity, duration: 0.9 }}
      >
        ❤️
      </motion.div>
      <motion.p
        className="script"
        style={{ color: 'var(--gold-light)', fontSize: '1.2rem', marginTop: '1rem' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        Loading something special…
      </motion.p>
    </motion.div>
  )
}

function DotNav({ active }) {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }
  return (
    <nav className="dot-nav" aria-label="Section navigation">
      {SECTIONS.map(s => (
        <button
          key={s.id}
          className={active === s.id ? 'active' : ''}
          onClick={() => scrollTo(s.id)}
          aria-label={s.label}
          title={s.label}
        />
      ))}
    </nav>
  )
}

export default function App() {
  const [loading,       setLoading]       = useState(true)
  const [activeSection, setActiveSection] = useState('hero')
  const { dotRef, ringRef }               = useCursor()

  // Track active section via IntersectionObserver
  useEffect(() => {
    const observers = SECTIONS.map(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id) },
        { threshold: 0.4 }
      )
      obs.observe(el)
      return obs
    })
    return () => observers.forEach(o => o?.disconnect())
  }, [loading])

  const scrollToTimeline = () => {
    document.getElementById('timeline')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      {/* Custom cursor */}
      <div className="cursor-dot"  ref={dotRef}  />
      <div className="cursor-ring" ref={ringRef} />

      <AnimatePresence>
        {loading && <LoadingScreen key="loader" onDone={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <>
          <DotNav active={activeSection} />

          <main>
            <Hero     config={config} onOpenGift={scrollToTimeline} />
            <Timeline config={config} />
            <Gallery  config={config} />
            <Reasons  config={config} />
            <Letter   config={config} />
            <Music    config={config} />
            <Surprise config={config} />
            <Future   config={config} />
            <Ending   config={config} />
          </main>
        </>
      )}
    </>
  )
}
