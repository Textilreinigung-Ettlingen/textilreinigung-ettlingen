import { useEffect, useState } from 'react'
import ChristmasGreeting from './ChristmasGreeting'
import christmasTree from '../../assets/seasonal/christmas-tree.svg'
import newYear from '../../assets/seasonal/new-year.svg'
import './SeasonalDecoration.css'

// Midnight in Ettlingen (CET). These dates apply only to the 2026 season.
const start = Date.parse('2026-11-25T00:00:00+01:00')
const christmasEve = Date.parse('2026-12-24T00:00:00+01:00')
const newYearsDay = Date.parse('2027-01-01T00:00:00+01:00')
const transitions = [start, christmasEve, newYearsDay]

function seasonAt(time) {
  if (time < start || time >= newYearsDay) return null
  return time < christmasEve ? 'christmas' : 'new-year'
}

// Fixed positions prevent the snow from jumping when React re-renders the hero.
const flakes = Array.from({ length: 28 }, (_, index) => ({
  left: `${(index * 37 + 3) % 100}%`,
  '--size': `${2 + (index % 4) * 0.8}px`,
  '--drift': `${index % 2 ? 18 : -24}px`,
  '--duration': `${14 + (index * 3) % 11}s`,
  '--delay': `-${(index * 5.7) % (14 + (index * 3) % 11)}s`,
  '--alpha': 0.26 + (index % 5) * 0.09,
}))

export default function SeasonalDecoration() {
  const [season, setSeason] = useState(() => seasonAt(Date.now()))

  useEffect(() => {
    let timer
    function sync() {
      window.clearTimeout(timer)
      const now = Date.now()
      setSeason(seasonAt(now))
      const next = transitions.find(time => time > now)
      // Browser timers accept at most a signed 32-bit delay.
      if (next) timer = window.setTimeout(sync, Math.min(next - now, 2147483647))
    }
    sync()
    window.addEventListener('pageshow', sync)
    document.addEventListener('visibilitychange', sync)
    return () => {
      window.clearTimeout(timer)
      window.removeEventListener('pageshow', sync)
      document.removeEventListener('visibilitychange', sync)
    }
  }, [])

  if (!season) return null

  return (
    <div className="seasonal-hero" data-season={season} aria-hidden="true">
      {season === 'christmas' && (
        <>
          <ChristmasGreeting />
          <div className="seasonal-hero__snow">
            {flakes.map((style, index) => <i key={index} style={style} />)}
          </div>
        </>
      )}
      <img
        className="seasonal-hero__art"
        src={season === 'christmas' ? christmasTree : newYear}
        width="240"
        height="248"
        alt=""
        draggable="false"
      />
    </div>
  )
}
