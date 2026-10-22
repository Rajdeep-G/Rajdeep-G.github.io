import { Fragment } from 'react'
import { profile, publications } from '../data/content.js'
import Page, { Reveal, LinkButton } from '../components/Page.jsx'
import { ArrowUpRight } from 'lucide-react'

function Authors({ list }) {
  return (
    <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
      {list.map((a, i) => (
        <Fragment key={a}>
          {i > 0 && ', '}
          {a === profile.name ? <strong className="font-semibold text-slate-900 underline decoration-accent-400 decoration-2 underline-offset-2 dark:text-white">{a}</strong> : a}
        </Fragment>
      ))}
    </p>
  )
}

export default function Publications() {
  const years = [...new Set(publications.map((p) => p.year))].sort((a, b) => b - a)
  return (
    <Page eyebrow="Research" title="Publications" intro="Recent research papers authored or co-authored by me.">
      <div className="space-y-12">
        {years.map((y) => (
          <section key={y} className="grid gap-4 sm:grid-cols-[80px_1fr]">
            <h2 className="font-display text-2xl font-bold text-slate-300 sm:sticky sm:top-24 sm:self-start dark:text-slate-700">{y}</h2>
            <div className="space-y-4">
              {publications
                .filter((p) => p.year === y)
                .map((p) => (
                  <Reveal key={p.title}>
                    <article className="group relative rounded-2xl border border-slate-200 bg-white/80 p-6 transition hover:border-accent-300 hover:shadow-lg hover:shadow-accent-500/5 dark:border-slate-800 dark:bg-slate-900/60 dark:hover:border-accent-500/50">
                      <span className="absolute left-0 top-6 h-10 w-1 -translate-x-px rounded-r bg-gradient-to-b from-accent-500 to-fuchsia-500 opacity-0 transition group-hover:opacity-100" />
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-md bg-slate-900 px-2 py-0.5 text-xs font-semibold text-white dark:bg-white dark:text-slate-900">{p.venue}</span>
                        {p.tier && <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{p.tier}</span>}
                      </div>
                      <h3 className="mt-3 font-display text-lg font-semibold leading-snug text-slate-900 dark:text-white">{p.title}</h3>
                      <Authors list={p.authors} />
                      <div className="mt-4 flex flex-wrap gap-2">
                        {p.links.map((l) => (
                          <LinkButton key={l.label} href={l.url}>
                            {l.label} <ArrowUpRight size={13} />
                          </LinkButton>
                        ))}
                      </div>
                    </article>
                  </Reveal>
                ))}
            </div>
          </section>
        ))}
      </div>
    </Page>
  )
}
