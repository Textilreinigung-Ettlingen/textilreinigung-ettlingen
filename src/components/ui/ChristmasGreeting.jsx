import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import './ChristmasGreeting.css'

// A fresh page load can play the greeting again. Internal navigation does not replay it.
let greetedThisPage = false
const lifetime = 3500
const dissolveStart = 1850
const dissolveDuration = 960
const cardTiming = {
  '--dissolve-start': `${dissolveStart}ms`,
  '--dissolve-duration': `${dissolveDuration}ms`,
}

// Each flake starts where the left-to-right dissolve reaches its part of the greeting.
const snow = Array.from({ length: 72 }, (_, index) => {
  const x = 4 + ((index * 37) % 93)
  return {
    left: `${x}%`,
    top: `${20 + ((index * 19) % 60)}%`,
    '--release': `${Math.round(dissolveStart + dissolveDuration * (x + 10) / 120)}ms`,
    '--drift': `${((index * 13) % 63) - 29}px`,
    '--drop': `${70 + ((index * 17) % 64)}px`,
    '--flake-size': `${index % 4 === 0 ? 14 + (index % 5) : 3 + (index % 3)}px`,
  }
})

export default function ChristmasGreeting() {
  const [visible, setVisible] = useState(() => !greetedThisPage)

  useEffect(() => {
    if (!visible) return
    greetedThisPage = true
    const timer = window.setTimeout(() => setVisible(false), lifetime)
    return () => window.clearTimeout(timer)
  }, [visible])

  if (!visible) return null

  return createPortal(
    <div className="christmas-greeting">
      <div className="christmas-greeting__card" style={cardTiming}>
        <span className="christmas-greeting__star" aria-hidden="true">✦</span>
        <p className="christmas-greeting__title">Frohe Weihnachten</p>
        <p className="christmas-greeting__signature">
          wünscht Ihnen Ihre Textilreinigung Ettlingen
        </p>
      </div>
      <div className="christmas-greeting__flakes" aria-hidden="true">
        {snow.map((style, index) => (
          <i key={index} style={style}>{index % 4 === 0 ? '❄︎' : ''}</i>
        ))}
      </div>
    </div>,
    document.body,
  )
}
