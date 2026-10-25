import { motion } from 'framer-motion'

// Page enter/exit: fade + slide + soft blur, with the header lines staggering in.
const pageVariants = {
  initial: { opacity: 0, y: 16, filter: 'blur(6px)' },
  enter: { opacity: 1, y: 0, filter: 'blur(0px)', transitionEnd: { filter: 'none' }, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1], staggerChildren: 0.06 } },
  exit: { opacity: 0, y: -12, filter: 'blur(4px)', transition: { duration: 0.2, ease: 'easeIn' } },
}
const headerItem = {
  initial: { opacity: 0, y: 10 },
  enter: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
}

// Wraps each route with an enter/exit transition and a consistent page header.
export default function Page({ eyebrow, title, intro, children }) {
  return (
    <motion.div variants={pageVariants} initial="initial" animate="enter" exit="exit">
      {title && (
        <header className="mb-12">
          {eyebrow && (
            <motion.p variants={headerItem} className="mb-2 font-display text-sm font-semibold uppercase tracking-widest text-accent-600 dark:text-accent-300">
              {eyebrow}
            </motion.p>
          )}
          <motion.h1 variants={headerItem} className="font-display text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl dark:text-white">
            {title}
          </motion.h1>
          {intro && (
            <motion.p variants={headerItem} className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-600 dark:text-slate-400">
              {intro}
            </motion.p>
          )}
        </header>
      )}
      {children}
    </motion.div>
  )
}

export function Reveal({ children, delay = 0, className = '' }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

export function SectionTitle({ children, icon: Icon }) {
  return (
    <h2 className="mb-6 flex items-center gap-2.5 font-display text-2xl font-semibold text-slate-900 dark:text-white">
      {Icon && (
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent-50 text-accent-600 dark:bg-accent-500/15 dark:text-accent-300">
          <Icon size={17} />
        </span>
      )}
      {children}
    </h2>
  )
}

export function Tag({ children }) {
  return (
    <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-xs font-medium text-slate-600 dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-300">
      {children}
    </span>
  )
}

export function Card({ children, className = '' }) {
  return (
    <div
      className={`rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:border-accent-300 hover:shadow-lg hover:shadow-accent-500/5 dark:border-slate-800 dark:bg-slate-900/60 dark:hover:border-accent-500/50 ${className}`}
    >
      {children}
    </div>
  )
}

export function LinkButton({ href, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-1 rounded-full bg-accent-50 px-3 py-1 text-xs font-semibold text-accent-700 transition hover:bg-accent-600 hover:text-white dark:bg-accent-500/15 dark:text-accent-300 dark:hover:bg-accent-500 dark:hover:text-white"
    >
      {children}
    </a>
  )
}
