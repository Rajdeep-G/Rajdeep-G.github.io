import { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search, FileText, Home, GraduationCap, Briefcase, FolderGit2, BookOpen, Mail, Moon, SquareTerminal,
  ArrowUpRight, Quote, CornerDownLeft, Check,
} from 'lucide-react'
import { FaGithub, FaLinkedin, FaXTwitter } from 'react-icons/fa6'
import { SiGooglescholar } from 'react-icons/si'
import { profile, publications, projects } from '../data/content.js'
import { openTerminal, setTheme, copyText, scholarCiteUrl } from '../lib/events.js'

// Every searchable thing on the site. `run` receives helpers from the palette.
function buildItems() {
  const pages = [
    { title: 'About', to: '/', icon: Home, keywords: 'home bio news contact' },
    { title: 'Education', to: '/education', icon: GraduationCap, keywords: 'degrees phd mtech btech awards' },
    { title: 'Experience', to: '/experience', icon: Briefcase, keywords: 'internships teaching ta service' },
    { title: 'Projects', to: '/projects', icon: FolderGit2, keywords: 'research work' },
    { title: 'Publications', to: '/publications', icon: BookOpen, keywords: 'papers usenix' },
  ].map((p) => ({ ...p, group: 'Pages', run: ({ go }) => go(p.to) }))

  const pubs = publications.map((p) => ({
    group: 'Publications',
    title: p.title,
    hint: p.venue,
    icon: BookOpen,
    keywords: `${p.authors.join(' ')} ${p.venue} ${p.year}`,
    run: ({ go }) => go('/publications'),
  }))

  const cites = publications.map((p) => ({
    group: 'Cite',
    title: `BibTeX: ${p.title}`,
    hint: 'Google Scholar',
    icon: Quote,
    keywords: `cite bibtex citation ${p.venue}`,
    run: ({ open }) => open(scholarCiteUrl(p)),
  }))

  const projs = projects.map((p) => ({
    group: 'Projects',
    title: p.title,
    hint: p.period,
    icon: FolderGit2,
    keywords: `${p.tags.join(' ')} ${p.where}`,
    run: ({ go }) => go('/projects'),
  }))

  const actions = [
    { title: 'Download CV', icon: FileText, keywords: 'resume pdf', run: ({ open }) => open(profile.cv) },
    {
      title: 'Copy email address',
      hint: profile.emails[0],
      icon: Mail,
      keywords: 'contact mail',
      run: async ({ flash }) => flash((await copyText(profile.emails[0])) ? 'Email copied' : profile.emails[0]),
    },
    { title: 'Toggle dark / light theme', icon: Moon, keywords: 'dark mode light mode theme', run: ({ close }) => (setTheme('toggle'), close()) },
    { title: 'Open terminal mode', hint: 'or press `', icon: SquareTerminal, keywords: 'shell console cli hacker', run: ({ close }) => (close(), openTerminal()) },
  ].map((a) => ({ ...a, group: 'Actions' }))

  const links = [
    { title: 'Google Scholar', url: profile.socials.scholar, icon: SiGooglescholar },
    { title: 'GitHub', url: profile.socials.github, icon: FaGithub },
    { title: 'LinkedIn', url: profile.socials.linkedin, icon: FaLinkedin },
    { title: 'X (Twitter)', url: profile.socials.x, icon: FaXTwitter },
  ].map((l) => ({ ...l, group: 'Links', hint: 'external', run: ({ open }) => open(l.url) }))

  return [...pages, ...actions, ...pubs, ...projs, ...cites, ...links]
}

// Simple ranking: every query word must appear; title matches and prefix matches rank higher.
function score(item, words) {
  const title = item.title.toLowerCase()
  const hay = `${title} ${item.hint ?? ''} ${item.keywords ?? ''} ${item.group}`.toLowerCase()
  let s = 0
  for (const w of words) {
    if (!hay.includes(w)) return -1
    if (title.startsWith(w)) s += 3
    else if (title.includes(w)) s += 2
    else s += 1
  }
  return s
}

const DEFAULT_GROUPS = ['Pages', 'Actions', 'Links']

export default function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const [toast, setToast] = useState('')
  const navigate = useNavigate()
  const listRef = useRef(null)
  const items = useMemo(buildItems, [])

  const results = useMemo(() => {
    const words = query.toLowerCase().split(/\s+/).filter(Boolean)
    if (!words.length) return items.filter((i) => DEFAULT_GROUPS.includes(i.group))
    return items
      .map((i) => ({ i, s: score(i, words) }))
      .filter((r) => r.s >= 0)
      .sort((a, b) => b.s - a.s)
      .slice(0, 12)
      .map((r) => r.i)
  }, [items, query])

  // Global shortcuts: ⌘K / Ctrl+K anywhere, "/" when not typing.
  useEffect(() => {
    const onKey = (e) => {
      const typing = /input|textarea/i.test(e.target.tagName) || e.target.isContentEditable
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen((o) => !o)
      } else if (e.key === '/' && !typing) {
        e.preventDefault()
        setOpen(true)
      }
    }
    const onOpen = () => setOpen(true)
    window.addEventListener('keydown', onKey)
    window.addEventListener('open-palette', onOpen)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('open-palette', onOpen)
    }
  }, [])

  useEffect(() => {
    if (open) {
      setQuery('')
      setActive(0)
      setToast('')
    }
  }, [open])
  useEffect(() => setActive(0), [query])
  useEffect(() => {
    listRef.current?.querySelector(`[data-index="${active}"]`)?.scrollIntoView({ block: 'nearest' })
  }, [active])

  const close = () => setOpen(false)
  const helpers = {
    close,
    go: (to) => (navigate(to), close()),
    open: (url) => (window.open(url, '_blank', 'noopener'), close()),
    flash: (msg) => {
      setToast(msg)
      setTimeout(close, 900)
    },
  }
  const run = (item) => item && item.run(helpers)

  const onKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((a) => Math.min(a + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((a) => Math.max(a - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      run(results[active])
    } else if (e.key === 'Escape') {
      close()
    }
  }

  if (typeof document === 'undefined') return null

  let lastGroup = null
  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-start justify-center bg-slate-950/40 px-4 pt-[12vh] backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={close}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            initial={{ opacity: 0, scale: 0.96, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -8 }}
            transition={{ duration: 0.15 }}
            onMouseDown={(e) => e.stopPropagation()}
            className="w-full max-w-xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-900"
          >
            <div className="flex items-center gap-3 border-b border-slate-200 px-4 dark:border-slate-800">
              <Search size={18} className="shrink-0 text-slate-400" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Search pages, papers, projects, actions…"
                aria-label="Search"
                role="combobox"
                aria-expanded="true"
                aria-controls="palette-list"
                aria-activedescendant={results[active] ? `palette-${active}` : undefined}
                className="h-14 w-full bg-transparent text-base text-slate-900 outline-none placeholder:text-slate-400 dark:text-white"
              />
              <kbd className="hidden rounded border border-slate-200 px-1.5 py-0.5 text-[10px] font-semibold text-slate-400 sm:block dark:border-slate-700">ESC</kbd>
            </div>

            <ul id="palette-list" ref={listRef} role="listbox" className="max-h-[50vh] overflow-y-auto p-2">
              {results.length === 0 && <li className="px-3 py-8 text-center text-sm text-slate-500">No results for “{query}”</li>}
              {results.map((item, idx) => {
                const header = item.group !== lastGroup ? item.group : null
                lastGroup = item.group
                const Icon = item.icon
                const selected = idx === active
                return (
                  <li key={item.group + item.title} role="presentation">
                    {header && <p className="px-3 pb-1 pt-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">{header}</p>}
                    <button
                      id={`palette-${idx}`}
                      data-index={idx}
                      role="option"
                      aria-selected={selected}
                      onMouseMove={() => setActive(idx)}
                      onClick={() => run(item)}
                      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                        selected ? 'bg-accent-50 text-accent-700 dark:bg-accent-500/15 dark:text-accent-200' : 'text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <Icon size={16} className="shrink-0 opacity-70" />
                      <span className="min-w-0 flex-1 truncate">{item.title}</span>
                      {item.hint && <span className="hidden shrink-0 text-xs text-slate-400 sm:inline">{item.hint}</span>}
                      {item.url || item.group === 'Cite' ? <ArrowUpRight size={14} className="shrink-0 opacity-50" /> : selected && <CornerDownLeft size={14} className="shrink-0 opacity-50" />}
                    </button>
                  </li>
                )
              })}
            </ul>

            <div className="flex items-center justify-between border-t border-slate-200 px-4 py-2 text-[11px] text-slate-400 dark:border-slate-800">
              {toast ? (
                <span className="flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400">
                  <Check size={13} /> {toast}
                </span>
              ) : (
                <span>↑↓ to move · ↵ to open</span>
              )}
              <span>
                Try <kbd className="font-semibold">`</kbd> for terminal mode
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
