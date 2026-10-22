import { GraduationCap, Award, ExternalLink, Trophy, Mic, BadgeDollarSign } from 'lucide-react'
import Page, { Reveal, SectionTitle, Card } from '../components/Page.jsx'
import { education, awards } from '../data/content.js'

const awardIcon = { talk: Mic, grant: BadgeDollarSign, rank: Trophy }

export default function Education() {
  return (
    <Page eyebrow="Background" title="Education" intro="Journey from my academic beginnings to my current research pursuits.">
      <SectionTitle icon={GraduationCap}>Degrees</SectionTitle>
      <ol className="relative space-y-6 border-l-2 border-slate-200 pl-8 dark:border-slate-800">
        {education.map((e, i) => (
          <li key={e.degree} className="relative">
            <span
              className={`absolute -left-[41px] top-6 grid h-5 w-5 place-items-center rounded-full border-4 border-white dark:border-slate-950 ${
                e.current ? 'bg-emerald-500' : 'bg-accent-500'
              }`}
            >
              {e.current && <span className="absolute h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />}
            </span>
            <Reveal delay={i * 0.05}>
              <Card>
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <h3 className="font-display text-lg font-semibold text-slate-900 dark:text-white">{e.degree}</h3>
                    <p className="text-slate-600 dark:text-slate-400">{e.school}</p>
                  </div>
                  <span className="shrink-0 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">{e.period}</span>
                </div>
                {(e.score || e.badge) && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {e.score && <span className="rounded-md bg-accent-50 px-2 py-0.5 text-sm font-semibold text-accent-700 dark:bg-accent-500/15 dark:text-accent-300">{e.score}</span>}
                    {e.badge && <span className="rounded-md bg-amber-50 px-2 py-0.5 text-sm font-semibold text-amber-700 dark:bg-amber-500/15 dark:text-amber-300">{e.badge}</span>}
                  </div>
                )}
                {e.details && (
                  <ul className="mt-3 space-y-1 text-sm">
                    {e.details.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                )}
              </Card>
            </Reveal>
          </li>
        ))}
      </ol>

      <section className="mt-20">
        <SectionTitle icon={Award}>Awards &amp; achievements</SectionTitle>
        <div className="grid gap-4 sm:grid-cols-2">
          {awards.map((a, i) => {
            const Icon = awardIcon[a.kind]
            const body = (
              <Card className="flex h-full items-start gap-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-accent-500 to-fuchsia-500 text-white">
                  <Icon size={18} />
                </span>
                <div>
                  <p className="flex items-center gap-1.5 font-semibold text-slate-900 dark:text-white">
                    {a.title} {a.url && <ExternalLink size={13} className="text-slate-400" />}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{a.note}</p>
                </div>
              </Card>
            )
            return (
              <Reveal key={a.title} delay={(i % 2) * 0.06}>
                {a.url ? (
                  <a href={a.url} target="_blank" rel="noreferrer" className="block h-full" aria-label={`${a.title} (certificate)`}>
                    {body}
                  </a>
                ) : (
                  body
                )}
              </Reveal>
            )
          })}
        </div>
      </section>
    </Page>
  )
}
