import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { profile, advisor, education, experience, projects, publications, awards, news } from '../data/content.js'
import { setTheme, copyText, scholarCiteUrl } from '../lib/events.js'

const USER = 'guest'
const HOST = 'rajdeep-g'

const slug = (s) =>
  s
    .toLowerCase()
    .replace(/[“”"’']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .split('-')
    .slice(0, 5)
    .join('-')

// A tiny read-only filesystem built from content.js. Directories map to site pages.
const FS = {
  '~': {
    page: '/',
    files: {
      'about.txt': () => [
        `${profile.name}`,
        `${profile.role}, ${profile.affiliation}`,
        `Advisor: ${advisor.name}`,
        '',
        `Interests: ${profile.interests.join(', ')}`,
      ],
      'contact.txt': () => [...profile.emails.map((e) => `email    ${e}`), '', ...profile.address],
      'news.txt': () => news.map((n) => `[${n.date}] ${n.text}`),
      'cv.pdf': 'open-cv',
    },
    dirs: ['education', 'experience', 'projects', 'publications'],
  },
  education: {
    page: '/education',
    files: Object.fromEntries([
      ...education.map((e) => [
        `${slug(e.degree)}.txt`,
        () => [e.degree, e.school, e.period, ...(e.score ? [e.score] : []), ...(e.badge ? [e.badge] : []), ...(e.details ?? [])],
      ]),
      ['awards.txt', () => awards.map((a) => `* ${a.title}${a.note ? ` (${a.note})` : ''}`)],
    ]),
  },
  experience: {
    page: '/experience',
    files: Object.fromEntries(
      experience.map((x) => [`${slug(x.org)}.txt`, () => [`${x.role} @ ${x.org}`, `${x.period} · ${x.mode}`, '', ...x.points.map((p) => `- ${p}`)]]),
    ),
  },
  projects: {
    page: '/projects',
    files: Object.fromEntries(
      projects.map((p) => [`${slug(p.title)}.md`, () => [`# ${p.title}`, `${p.where} · ${p.period}`, '', p.text, '', `tags: ${p.tags.join(', ')}`]]),
    ),
  },
  publications: {
    page: '/publications',
    files: Object.fromEntries(
      publications.map((p) => [
        `${p.year}-${slug(p.title)}.txt`,
        () => [
          p.title,
          p.authors.join(', '),
          `${p.venue}${p.tier ? ` · ${p.tier}` : ''}`,
          '',
          ...p.links.map((l) => `${l.label.padEnd(8)} [[${l.url}|${l.url}]]`),
          `${'BibTeX'.padEnd(8)} [[${scholarCiteUrl(p)}|Google Scholar → Cite → BibTeX]]`,
        ],
      ]),
    ),
  },
}

const COMMANDS = {
  help: 'list commands',
  whoami: 'who is this?',
  ls: 'list files  (ls publications)',
  cd: 'change directory, also opens that page  (cd projects)',
  cat: 'print a file  (cat about.txt)',
  open: 'open cv | scholar | github | linkedin | x | <page>',
  pwd: 'print working directory',
  email: 'copy my email address',
  theme: 'theme dark | light',
  history: 'show command history',
  clear: 'clear the screen',
  exit: 'leave terminal mode',
}

const BANNER = [
  '  ____        _     _                  ',
  ' |  _ \\ __ _ (_) __| | ___  ___ _ __   ',
  " | |_) / _` || |/ _` |/ _ \\/ _ \\ '_ \\  ",
  ' |  _ < (_| || | (_| |  __/  __/ |_) | ',
  ' |_| \\_\\__,_|/ |\\__,_|\\___|\\___| .__/  ',
  '           |__/                |_|     ',
]

// Turns [[url|label]] in output text into a clickable link.
function linkify(text) {
  return text.split(/(\[\[[^\]]+\]\])/).map((part, i) => {
    const m = part.match(/^\[\[([^|]+)\|(.+)\]\]$/)
    if (!m) return part
    return (
      <a key={i} href={m[1]} target="_blank" rel="noreferrer" className="text-cyan-300 underline decoration-cyan-300/40 underline-offset-2 hover:decoration-cyan-300">
        {m[2]}
      </a>
    )
  })
}

const welcome = () => [
  { type: 'banner', lines: BANNER },
  { type: 'out', lines: [`Welcome to ${profile.name}'s terminal. Type 'help' to get started, 'exit' to leave.`, ''] },
]

export default function Terminal() {
  const [open, setOpen] = useState(false)
  const [cwd, setCwd] = useState('~')
  const [lines, setLines] = useState(welcome)
  const [input, setInput] = useState('')
  const [history, setHistory] = useState([])
  const [hIndex, setHIndex] = useState(null)
  const inputRef = useRef(null)
  const bodyRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    const onKey = (e) => {
      const typing = /input|textarea/i.test(e.target.tagName) || e.target.isContentEditable
      if (e.key === '`' && !typing) {
        e.preventDefault()
        setOpen(true)
      }
    }
    const onOpen = () => setOpen(true)
    window.addEventListener('keydown', onKey)
    window.addEventListener('open-terminal', onOpen)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('open-terminal', onOpen)
    }
  }, [])

  useEffect(() => {
    if (!open) return
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    setTimeout(() => inputRef.current?.focus(), 50)
    return () => {
      document.body.style.overflow = overflow
    }
  }, [open])

  useEffect(() => {
    bodyRef.current?.scrollTo(0, bodyRef.current.scrollHeight)
  }, [lines])

  const prompt = (dir = cwd) => `${USER}@${HOST}:${dir === '~' ? '~' : `~/${dir}`}$`

  // Resolve "publications", "~/publications", "..", "~" relative to cwd.
  const resolveDir = (arg) => {
    if (!arg || arg === '~' || arg === '/' || arg === '..' || arg === '~/') return '~'
    const name = arg.replace(/^~\//, '').replace(/\/$/, '')
    return FS[name] && name !== '~' ? name : null
  }
  const resolveFile = (arg) => {
    const parts = arg.replace(/^~\//, '').split('/')
    const [dir, file] = parts.length > 1 ? [parts[0], parts[1]] : [cwd, parts[0]]
    return FS[dir]?.files[file]
  }

  const openUrl = (url) => window.open(url, '_blank', 'noopener')

  function execute(raw) {
    const [cmd, ...args] = raw.trim().split(/\s+/)
    const arg = args.join(' ')
    const out = (...l) => ({ type: 'out', lines: l.flat() })
    const err = (msg) => ({ type: 'err', lines: [msg] })

    switch (cmd) {
      case undefined:
      case '':
        return []
      case 'help':
        return [out(Object.entries(COMMANDS).map(([c, d]) => `${c.padEnd(9)} ${d}`), '', 'Tip: Tab completes, ↑/↓ browse history.')]
      case 'whoami':
        return [out(`${profile.name}: ${profile.role} at ${profile.affiliation}.`, `I work on ${profile.interests.slice(0, 3).join(', ').toLowerCase()}.`)]
      case 'pwd':
        return [out(cwd === '~' ? `/home/${USER}` : `/home/${USER}/${cwd}`)]
      case 'ls': {
        const dir = arg ? resolveDir(arg) : cwd
        if (!dir) return [err(`ls: cannot access '${arg}': No such file or directory`)]
        const entry = FS[dir]
        return [{ type: 'ls', dirs: entry.dirs ?? [], files: Object.keys(entry.files) }]
      }
      case 'cd': {
        const dir = resolveDir(arg)
        if (!dir) return [err(`cd: no such file or directory: ${arg}`)]
        setCwd(dir)
        navigate(FS[dir].page)
        return [out(`→ opened ${FS[dir].page === '/' ? 'About' : FS[dir].page.slice(1)} page in the background`)]
      }
      case 'cat': {
        if (!arg) return [err('cat: missing file operand')]
        const f = resolveFile(arg)
        if (f === 'open-cv') {
          openUrl(profile.cv)
          return [out('cv.pdf is a binary file. Opening it in a new tab…')]
        }
        if (!f) return [err(`cat: ${arg}: No such file or directory`)]
        return [out(f())]
      }
      case 'open': {
        const targets = { cv: profile.cv, 'cv.pdf': profile.cv, ...profile.socials }
        if (targets[arg]) {
          openUrl(targets[arg])
          return [out(`Opening ${arg}…`)]
        }
        const dir = resolveDir(arg)
        if (arg && dir) {
          navigate(FS[dir].page)
          return [out(`→ opened ${arg} page in the background`)]
        }
        return [err(`open: unknown target '${arg}'. Try: ${Object.keys(targets).join(', ')}`)]
      }
      case 'email':
        copyText(profile.emails[0])
        return [out(`${profile.emails[0]} (copied to clipboard)`)]
      case 'theme': {
        if (!['dark', 'light'].includes(arg)) return [err('usage: theme dark | light')]
        setTheme(arg)
        return [out(`theme set to ${arg}`)]
      }
      case 'history':
        return [out(history.map((h, i) => `${String(i + 1).padStart(4)}  ${h}`))]
      case 'clear':
        setLines([])
        return null
      case 'exit':
      case 'quit':
        setOpen(false)
        return []
      case 'date':
        return [out(new Date().toString())]
      case 'echo':
        return [out(arg)]
      case 'sudo':
        return [err(`${USER} is not in the sudoers file. This incident will be reported. 🙂`)]
      case 'rm':
        return [err('rm: read-only file system (nice try)')]
      case 'hack':
      case 'nmap':
        return [out('Responsible disclosure only, please: ' + profile.emails[0])]
      default:
        return [err(`command not found: ${cmd}. Type 'help' for a list.`)]
    }
  }

  const submit = () => {
    const raw = input
    const echo = { type: 'cmd', prompt: prompt(), text: raw }
    const result = execute(raw)
    if (raw.trim()) setHistory((h) => [...h, raw])
    setHIndex(null)
    setInput('')
    if (result === null) return // cleared
    setLines((l) => [...l, echo, ...result])
  }

  const complete = () => {
    const parts = input.split(/\s+/)
    if (parts.length === 1) {
      const m = Object.keys(COMMANDS).filter((c) => c.startsWith(parts[0]))
      if (m.length === 1) setInput(m[0] + ' ')
      else if (m.length > 1) setLines((l) => [...l, { type: 'cmd', prompt: prompt(), text: input }, { type: 'out', lines: [m.join('  ')] }])
      return
    }
    const last = parts.at(-1)
    const [dirPart, filePart] = last.includes('/') ? [last.slice(0, last.lastIndexOf('/')), last.slice(last.lastIndexOf('/') + 1)] : [null, last]
    const dir = dirPart ? resolveDir(dirPart) : cwd
    if (!dir) return
    const names = [...(FS[dir].dirs ?? []).map((d) => d + '/'), ...Object.keys(FS[dir].files)]
    const m = names.filter((n) => n.startsWith(filePart))
    if (m.length === 1) setInput([...parts.slice(0, -1), (dirPart ? dirPart + '/' : '') + m[0]].join(' '))
    else if (m.length > 1) setLines((l) => [...l, { type: 'cmd', prompt: prompt(), text: input }, { type: 'out', lines: [m.join('  ')] }])
  }

  const onKeyDown = (e) => {
    if (e.key === 'Enter') submit()
    else if (e.key === 'Tab') {
      e.preventDefault()
      complete()
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (!history.length) return
      const i = hIndex === null ? history.length - 1 : Math.max(0, hIndex - 1)
      setHIndex(i)
      setInput(history[i])
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (hIndex === null) return
      const i = hIndex + 1
      if (i >= history.length) {
        setHIndex(null)
        setInput('')
      } else {
        setHIndex(i)
        setInput(history[i])
      }
    } else if (e.key === 'Escape') setOpen(false)
    else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault()
      setLines([])
    }
  }

  if (typeof document === 'undefined') return null

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-3 backdrop-blur-sm sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={() => setOpen(false)}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Terminal"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            onMouseDown={(e) => e.stopPropagation()}
            onClick={() => inputRef.current?.focus()}
            className="flex h-[min(640px,85vh)] w-full max-w-3xl flex-col overflow-hidden rounded-xl border border-slate-700 bg-[#0b1020] font-mono text-[13px] leading-relaxed text-slate-200 shadow-2xl shadow-black/50"
          >
            <div className="flex items-center gap-2 border-b border-slate-800 bg-slate-900/80 px-4 py-2.5">
              <button aria-label="Close terminal" onClick={() => setOpen(false)} className="h-3 w-3 rounded-full bg-red-500 hover:brightness-110" />
              <span className="h-3 w-3 rounded-full bg-amber-400" />
              <span className="h-3 w-3 rounded-full bg-emerald-500" />
              <span className="flex-1 text-center text-xs text-slate-400">
                {USER}@{HOST}: {cwd === '~' ? '~' : `~/${cwd}`}
              </span>
              <span className="text-[10px] text-slate-500">esc to close</span>
            </div>

            <div ref={bodyRef} className="flex-1 overflow-y-auto px-4 py-3" aria-live="polite">
              {lines.map((l, i) => {
                if (l.type === 'banner')
                  return (
                    <pre key={i} className="hidden bg-gradient-to-r from-accent-300 to-fuchsia-300 bg-clip-text text-transparent sm:block">
                      {l.lines.join('\n')}
                    </pre>
                  )
                if (l.type === 'cmd')
                  return (
                    <div key={i} className="whitespace-pre-wrap break-words">
                      <span className="text-emerald-400">{l.prompt}</span> {l.text}
                    </div>
                  )
                if (l.type === 'ls')
                  return (
                    <div key={i} className="flex flex-wrap gap-x-6">
                      {l.dirs.map((d) => (
                        <span key={d} className="font-semibold text-accent-300">
                          {d}/
                        </span>
                      ))}
                      {l.files.map((f) => (
                        <span key={f} className={f.endsWith('.pdf') ? 'text-fuchsia-300' : ''}>
                          {f}
                        </span>
                      ))}
                    </div>
                  )
                return (
                  <div key={i} className={`whitespace-pre-wrap break-words ${l.type === 'err' ? 'text-red-400' : 'text-slate-300'}`}>
                    {l.lines.map((t, j) => (
                      <div key={j}>{t ? linkify(t) : '\u00a0'}</div>
                    ))}
                  </div>
                )
              })}

              <div className="flex items-center gap-2">
                <label htmlFor="term-input" className="shrink-0 text-emerald-400">
                  {prompt()}
                </label>
                <input
                  id="term-input"
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKeyDown}
                  autoComplete="off"
                  autoCapitalize="off"
                  spellCheck="false"
                  className="w-full bg-transparent text-slate-100 caret-emerald-400 outline-none"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
