import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import CommandPalette from './components/CommandPalette.jsx'
import Terminal from './components/Terminal.jsx'
import Home from './pages/Home.jsx'
import Education from './pages/Education.jsx'
import Experience from './pages/Experience.jsx'
import Projects from './pages/Projects.jsx'
import Publications from './pages/Publications.jsx'
import NotFound from './pages/NotFound.jsx'
import { routes, notFound } from './seo.js'


export default function App() {
  const location = useLocation()
  const path = location.pathname.replace(/\/+$/, '') || '/'

  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = (routes[path === '/about' ? '/' : path] ?? notFound).title
  }, [path])

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative flex min-h-screen flex-col">
        <div aria-hidden className="bg-grid pointer-events-none absolute inset-x-0 top-0 -z-10 h-[520px]" />
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-[-180px] -z-10 h-[420px] w-[760px] max-w-full -translate-x-1/2 rounded-full bg-gradient-to-r from-accent-400/25 via-fuchsia-400/15 to-cyan-400/20 blur-3xl dark:from-accent-500/20 dark:via-fuchsia-500/10 dark:to-cyan-500/10"
        />
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-accent-600 focus:px-3 focus:py-2 focus:text-white">
          Skip to content
        </a>
        {/* Thin gradient bar that sweeps across the top on every page change. */}
        <motion.div
          key={path}
          aria-hidden
          className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-gradient-to-r from-accent-500 via-fuchsia-500 to-cyan-400"
          initial={{ scaleX: 0, opacity: 1 }}
          animate={{ scaleX: 1, opacity: 0 }}
          transition={{ scaleX: { duration: 0.5, ease: 'easeOut' }, opacity: { duration: 0.3, delay: 0.45 } }}
        />
        <Navbar />
        <main id="main" className="mx-auto w-full max-w-5xl flex-1 px-4 pb-24 pt-10 sm:px-6 sm:pt-16">
          <AnimatePresence mode="wait">
            <Routes location={location} key={path}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<Home />} />
              <Route path="/education" element={<Education />} />
              <Route path="/experience" element={<Experience />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/publications" element={<Publications />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
        <CommandPalette />
        <Terminal />
      </div>
    </MotionConfig>
  )
}
