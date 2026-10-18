import { useState } from 'react'
import { HashRouter, NavLink, Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import { LessonList, LessonPage } from './pages/Lessons'
import Drills from './pages/Drills'
import Mock from './pages/Mock'
import Mistakes from './pages/Mistakes'
import CheatSheet from './pages/CheatSheet'
import Essay from './pages/Essay'

const NAV: [string, string, string][] = [
  ['/', '🏠', 'Dashboard & Plan'],
  ['/lessons', '📚', 'All lessons'],
  ['/drills', '⚡', 'Drills'],
  ['/mock', '📝', 'Mock exam'],
  ['/mistakes', '🧠', 'Mistakes notebook'],
  ['/cheatsheet', '🧾', 'Tricks & formulas'],
  ['/essay', '✍️', 'Essay studio'],
]

export default function App() {
  const [open, setOpen] = useState(false)
  return (
    <HashRouter>
      <div className="top-mobile"><span>UA&amp;P Prep</span><button onClick={() => setOpen(!open)} aria-label="Menu">☰</button></div>
      <div className="app">
        <nav className={`side ${open ? 'open' : ''}`} onClick={() => setOpen(false)}>
          <div className="brand">UA&amp;P Prep<small>ENTRANCE EXAM TRAINER</small></div>
          {NAV.map(([to, ic, label]) => (
            <NavLink key={to} to={to} end={to === '/'} className={({ isActive }) => (isActive ? 'active' : '')}>
              <span>{ic}</span>{label}
            </NavLink>
          ))}
        </nav>
        <main className="main">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/lessons" element={<LessonList />} />
            <Route path="/lesson/:id" element={<LessonPage />} />
            <Route path="/drills" element={<Drills />} />
            <Route path="/mock" element={<Mock />} />
            <Route path="/mistakes" element={<Mistakes />} />
            <Route path="/cheatsheet" element={<CheatSheet />} />
            <Route path="/essay" element={<Essay />} />
            <Route path="*" element={<Dashboard />} />
          </Routes>
        </main>
      </div>
    </HashRouter>
  )
}
