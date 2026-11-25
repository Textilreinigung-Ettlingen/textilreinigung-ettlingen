import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import './ChristmasGreeting.css'

// A fresh page load can play the greeting again. Internal navigation does not replay it.
let greetedThisPage = false
const lifetime = 1950

// Each flake starts where the left-to-right dissolve reaches its part of the greeting.
const snow = Array.from({ length: 42 }, (_, index) => {
  const x = 4 + ((index * 37) % 93)
  return {
    left: `${x}%`,
    top: `${20 + ((index * 19) % 60)}%`,
    '--release': `${Math.round(1140 + x * 4.7)}ms`,
    '--drift': `${((index * 11) % 31) - 13}px`,
    '--drop': `${22 + ((index * 17) % 48)}px`,
    '--flake-size': `${index % 5 === 0 ? 9 : 2 + (index % 3)}px`,
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
      <div className="christmas-greeting__card">
        <span className="christmas-greeting__star" aria-hidden="true">✦</span>
        <p className="christmas-greeting__title">Frohe Weihnachten</p>
        <p className="christmas-greeting__signature">
          wünscht Ihnen Ihre Textilreinigung Ettlingen
        </p>
      </div>
      <div className="christmas-greeting__flakes" aria-hidden="true">
        {snow.map((style, index) => (
          <i key={index} style={style}>{index % 5 === 0 ? '❄︎' : ''}</i>
        ))}
      </div>
    </div>,
    document.body,
  )
}
