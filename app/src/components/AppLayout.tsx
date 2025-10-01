import { useState } from 'react'
import type { ReactNode } from 'react'
import type { ViewKey } from '../modules/App.js'
import { classNames } from '../utils/classNames.js'

interface AppLayoutProps {
  activeView: ViewKey
  onNavigate: (view: ViewKey) => void
  children: ReactNode
}

const navItems: Array<{ label: string; key: ViewKey; icon: string }> = [
  { label: 'Auftragsannahme', key: 'auftragsannahme', icon: '🧾' },
  { label: 'Auftragsübersicht', key: 'auftragsuebersicht', icon: '📋' },
  { label: 'Kasse', key: 'kasse', icon: '💶' },
  { label: 'Reklamationen', key: 'reklamationen', icon: '⚠️' },
  { label: 'Statistik', key: 'statistik', icon: '📈' }
]

const AppLayout = ({ activeView, onNavigate, children }: AppLayoutProps): JSX.Element => {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="app-shell">
      <aside className={classNames('app-sidebar', menuOpen && 'open')}>
        <div className="sidebar-header">
          <span className="sidebar-logo">🧺</span>
          <div>
            <h1>Textilreinigung</h1>
            <p>Ettlingen</p>
          </div>
          <button className="sidebar-toggle" onClick={() => setMenuOpen((prev) => !prev)}>
            ☰
          </button>
        </div>
        <nav>
          <ul>
            {navItems.map((item) => (
              <li key={item.key}>
                <button
                  type="button"
                  className={classNames('nav-link', activeView === item.key && 'active')}
                  onClick={() => {
                    onNavigate(item.key)
                    setMenuOpen(false)
                  }}
                >
                  <span className="nav-icon" aria-hidden>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      <main className="app-content">
        <header className="app-header">
          <h2>Willkommen bei Textilreinigung Ettlingen</h2>
          <p>Touch-optimierte Oberfläche für den schnellen Alltag in der Annahme.</p>
        </header>
        <section className="app-view">{children}</section>
      </main>
    </div>
  )
}

export default AppLayout
