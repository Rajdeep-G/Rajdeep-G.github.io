import { useEffect, useState } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, FileText, Search, SquareTerminal } from 'lucide-react'
import ThemeToggle from './ThemeToggle.jsx'
import { profile } from '../data/content.js'
import { openPalette, openTerminal } from '../lib/events.js'

const links = [
  { to: '/', label: 'About' },
  { to: '/education', label: 'Education' },
  { to: '/experience', label: 'Experience' },
  { to: '/projects', label: 'Projects' },
  { to: '/publications', label: 'Publications' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()
  // Old Jekyll URLs end in a slash (/education/), so compare without it.
  const current = pathname.replace(/\/+$/, '') || '/'
  const isCurrent = (to) => (to === '/' ? current === '/' || current === '/about' : current === to)

  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-40 transition-colors duration-300 ${
        scrolled ? 'border-b border-slate-200/70 bg-white/75 backdrop-blur-lg dark:border-slate-800/70 dark:bg-slate-950/70' : 'border-b border-transparent'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6" aria-label="Main">
        <Link to="/" className="group flex items-center gap-2.5 font-display text-lg font-semibold text-slate-900 dark:text-white">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-accent-500 to-fuchsia-500 text-sm font-bold text-white shadow-md shadow-accent-500/30 transition-transform group-hover:rotate-6">
            RG
          </span>
          <span className="hidden sm:inline">{profile.name}</span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                aria-current={isCurrent(l.to) ? 'page' : undefined}
                className={() =>
                  `relative isolate rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                    isCurrent(l.to) ? 'text-slate-900 dark:text-white' : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                  }`
                }
              >
                {() => (
                  <>
                    {isCurrent(l.to) && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 -z-10 rounded-full bg-white shadow-sm ring-1 ring-slate-200 dark:bg-slate-800 dark:ring-slate-700"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    {l.label}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            onClick={openPalette}
            aria-label="Search (Ctrl+K)"
            className="hidden items-center gap-2 rounded-full border border-slate-200 bg-white/60 py-1.5 pl-3 pr-1.5 text-sm text-slate-500 transition hover:border-accent-300 hover:text-slate-900 lg:flex dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-400 dark:hover:text-white"
          >
            <Search size={14} /> Search
            <kbd className="rounded-md bg-slate-100 px-1.5 py-0.5 text-[10px] font-semibold text-slate-500 dark:bg-slate-800 dark:text-slate-400">⌘K</kbd>
          </button>
          <button
            onClick={openPalette}
            aria-label="Search"
            className="grid h-9 w-9 place-items-center rounded-full text-slate-600 hover:bg-slate-100 lg:hidden dark:text-slate-300 dark:hover:bg-slate-800"
          >
            <Search size={18} />
          </button>
          <button
            onClick={openTerminal}
            aria-label="Open terminal mode"
            title="Terminal mode ( ` )"
            className="hidden h-9 w-9 place-items-center rounded-full text-slate-600 hover:bg-slate-100 sm:grid dark:text-slate-300 dark:hover:bg-slate-800"
          >
            <SquareTerminal size={18} />
          </button>
          <a
            href={profile.cv}
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-1.5 rounded-full bg-slate-900 px-4 py-1.5 text-sm font-medium text-white transition hover:bg-accent-600 sm:inline-flex dark:bg-white dark:text-slate-900 dark:hover:bg-accent-300"
          >
            <FileText size={15} /> CV
          </a>
          <ThemeToggle />
          <button
            className="grid h-9 w-9 place-items-center rounded-full text-slate-600 hover:bg-slate-100 md:hidden dark:text-slate-300 dark:hover:bg-slate-800"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-b border-slate-200 bg-white/95 backdrop-blur-lg md:hidden dark:border-slate-800 dark:bg-slate-950/95"
          >
            <ul className="space-y-1 px-4 py-3">
              {links.map((l) => (
                <li key={l.to}>
                  <NavLink
                    to={l.to}
                    end
                    className={() =>
                      `block rounded-lg px-3 py-2.5 text-base font-medium ${
                        isCurrent(l.to) ? 'bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-white' : 'text-slate-600 dark:text-slate-300'
                      }`
                    }
                  >
                    {l.label}
                  </NavLink>
                </li>
              ))}
              <li>
                <a href={profile.cv} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-base font-medium text-accent-600 dark:text-accent-300">
                  <FileText size={17} /> Download CV
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
