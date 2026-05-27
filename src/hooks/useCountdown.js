import { useState, useEffect } from 'react'

export function useCountdown(targetDate, fromDate) {
  const [display, setDisplay] = useState('')
  const [label,   setLabel]   = useState('')

  useEffect(() => {
    const tick = () => {
      if (targetDate) {
        const diff = new Date(targetDate) - new Date()
        if (diff <= 0) { setDisplay('🎂 Today!'); setLabel(''); return }
        const d = Math.floor(diff / 86400000)
        const h = Math.floor((diff % 86400000) / 3600000)
        const m = Math.floor((diff % 3600000)  / 60000)
        const s = Math.floor((diff % 60000)    / 1000)
        setDisplay(`${String(d).padStart(2,'0')}:${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`)
        setLabel('days : hrs : min : sec')
      } else if (fromDate) {
        const diff = new Date() - new Date(fromDate)
        const d = Math.floor(diff / 86400000)
        setDisplay(`${d.toLocaleString()} days`)
        setLabel('together and counting 💛')
      }
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [targetDate, fromDate])

  return { display, label }
}
