import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Page, { Card, Tag } from '../components/Page.jsx'
import { projects } from '../data/content.js'

export default function Projects() {
  const tags = useMemo(() => ['All', ...new Set(projects.flatMap((p) => p.topics))], [])
  const [active, setActive] = useState('All')
  const shown = active === 'All' ? projects : projects.filter((p) => p.topics.includes(active))

  return (
    <Page eyebrow="Research" title="Projects" intro="All the research projects I have been involved in, including my own work and collaborations with others.">
      <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label="Filter projects by topic">
        {tags.map((t) => (
          <button
            key={t}
            onClick={() => setActive(t)}
            aria-pressed={active === t}
            className={`relative isolate rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
              active === t ? 'text-white dark:text-slate-900' : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
            }`}
          >
            {active === t && <motion.span layoutId="filter-pill" className="absolute inset-0 -z-10 rounded-full bg-slate-900 dark:bg-white" />}
            {t}
          </button>
        ))}
      </div>

      <motion.div layout className="grid gap-5 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {shown.map((p) => (
            <motion.div
              layout
              key={p.title}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25 }}
            >
              <Card className="group flex h-full flex-col">
                <div className="flex items-center justify-between gap-2 text-xs font-semibold">
                  <span className="text-slate-500 dark:text-slate-400">{p.period}</span>
                  {p.status && (
                    <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">{p.status}</span>
                  )}
                </div>
                <h2 className="mt-3 font-display text-xl font-semibold leading-snug text-slate-900 transition-colors group-hover:text-accent-600 dark:text-white dark:group-hover:text-accent-300">
                  {p.title}
                </h2>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{p.where}</p>
                <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed">{p.text}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </div>
                {p.links && (
                  <div className="mt-4 flex gap-4 border-t border-slate-100 pt-4 dark:border-slate-800">
                    {p.links.map((l) => (
                      <a key={l.label} href={l.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-0.5 text-sm font-semibold text-accent-600 hover:underline dark:text-accent-300">
                        {l.label} <ArrowUpRight size={15} />
                      </a>
                    ))}
                  </div>
                )}
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </Page>
  )
}
