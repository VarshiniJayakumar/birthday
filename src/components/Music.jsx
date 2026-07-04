import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Music.css'

function VinylRecord({ spinning }) {
  return (
    <motion.div
      className="vinyl"
      animate={{ rotate: spinning ? 360 : 0 }}
      transition={spinning
        ? { repeat: Infinity, duration: 3, ease: 'linear' }
        : { duration: 0.3 }
      }
    >
      <div className="vinyl-label">♪</div>
    </motion.div>
  )
}

export default function Music({ config }) {
  const { songs, spotifyPlaylist } = config
  const [active,  setActive]  = useState(null)
  const [playing, setPlaying] = useState(false)
  const [lyrics,  setLyrics]  = useState(false)
  const audioRef = useRef(null)

  // When active song changes, load and play it
  useEffect(() => {
    if (!audioRef.current) return
    if (active === null) {
      audioRef.current.pause()
      setPlaying(false)
      return
    }
    const song = songs[active]
    if (song?.src) {
      audioRef.current.src = song.src
      audioRef.current.play().then(() => setPlaying(true)).catch(() => setPlaying(false))
    } else {
      // No audio file — still show vinyl spinning as visual-only
      setPlaying(true)
    }
  }, [active])

  const handleSongClick = (i) => {
    if (active === i) {
      // Toggle play/pause on same song
      if (playing) {
        audioRef.current?.pause()
        setPlaying(false)
      } else {
        audioRef.current?.play().catch(() => {})
        setPlaying(true)
      }
    } else {
      setActive(i)
      setLyrics(false)
    }
  }

  const handleEnded = () => {
    // Auto-advance to next song
    setActive(prev => (prev !== null && prev < songs.length - 1 ? prev + 1 : null))
  }

  return (
    <section id="music" className="music-section">
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        onEnded={handleEnded}
        onPause={() => setPlaying(false)}
        onPlay={() => setPlaying(true)}
      />

      <div className="section-header">
        <motion.h2
          className="serif glow-text"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Songs That Remind Me of You
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          A playlist made with love 🎵
        </motion.p>
      </div>

      <div className="music-player">
        {/* Vinyl display */}
        <div className="vinyl-stage">
          <VinylRecord spinning={playing} />
          {active !== null && (
            <motion.div
              className="now-playing"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <span className="np-title serif">{songs[active].title}</span>
              <span className="np-occasion">{songs[active].occasion}</span>
            </motion.div>
          )}
        </div>

        {/* Song list */}
        <div className="song-list">
          {songs.map((song, i) => (
            <motion.div
              key={i}
              className={`song-card glass ${active === i ? 'song-active' : ''}`}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onClick={() => handleSongClick(i)}
            >
              <div className="song-art">
                {song.albumArt
                  ? <img src={song.albumArt} alt={song.title} />
                  : <div className="song-art-placeholder">🎵</div>
                }
              </div>
              <div className="song-info">
                <span className="song-title">{song.title}</span>
                <span className="song-occasion">{song.occasion}</span>
              </div>
              <div className="song-controls">
                <button
                  className="song-play-btn"
                  aria-label={active === i && playing ? 'Pause' : 'Play'}
                  onClick={e => { e.stopPropagation(); handleSongClick(i) }}
                >
                  {active === i && playing ? '⏸' : '▶'}
                </button>
                {song.lyrics && active === i && (
                  <button
                    className="song-lyrics-btn"
                    onClick={e => { e.stopPropagation(); setLyrics(v => !v) }}
                    aria-label="Show lyrics"
                  >
                    ♪
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lyrics popup */}
        <AnimatePresence>
          {lyrics && active !== null && songs[active]?.lyrics && (
            <motion.div
              className="lyrics-popup glass"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              <button className="lyrics-close" onClick={() => setLyrics(false)}>✕</button>
              <h4 className="serif gold">{songs[active].title}</h4>
              <p className="lyrics-text">{songs[active].lyrics}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Spotify embed */}
        {spotifyPlaylist && (
          <div className="spotify-embed">
            <iframe
              src={spotifyPlaylist.replace('open.spotify.com/playlist', 'open.spotify.com/embed/playlist')}
              width="100%"
              height="152"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              title="Spotify Playlist"
            />
          </div>
        )}
      </div>
    </section>
  )
}
