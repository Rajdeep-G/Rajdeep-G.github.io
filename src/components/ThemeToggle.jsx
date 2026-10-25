import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Moon, Sun } from 'lucide-react'
import { setTheme } from '../lib/events.js'

export default function ThemeToggle() {
  const [dark, setDark] = useState(
    () => typeof document !== 'undefined' && document.documentElement.classList.contains('dark'),
  )

  // Stay in sync when the palette or terminal changes the theme.
  useEffect(() => {
    const sync = () => setDark(document.documentElement.classList.contains('dark'))
    window.addEventListener('themechange', sync)
    return () => window.removeEventListener('themechange', sync)
  }, [])

  return (
    <button
      onClick={() => setTheme('toggle')}
      aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
      className="grid h-9 w-9 place-items-center overflow-hidden rounded-full text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={dark ? 'moon' : 'sun'}
          initial={{ y: -16, opacity: 0, rotate: -60 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: 16, opacity: 0, rotate: 60 }}
          transition={{ duration: 0.2 }}
        >
          {dark ? <Moon size={18} /> : <Sun size={18} />}
        </motion.span>
      </AnimatePresence>
    </button>
  )
}
