import { useState } from 'react'
import Page, { Reveal, SectionTitle, Card } from '../components/Page.jsx'
import { education, awards } from '../data/content.js'
import Lightbox from '../components/Lightbox.jsx'

import { GraduationCap, Award, ExternalLink, Trophy, Mic, BadgeDollarSign, Users, Presentation } from 'lucide-react'

const awardIcon = { talk: Mic, poster: Presentation, grant: BadgeDollarSign, rank: Trophy, service: Users }


export default function Education() {
  // Photos open in the lightbox: { images, index, caption }, or null when closed.
  const [viewer, setViewer] = useState(null)

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
                {/* Text on the left; year and photos on the right (stacked on phones). */}
                <div className="grid gap-3 sm:grid-cols-[1fr_auto] sm:gap-x-6">
                  <div className="order-2 min-w-0 sm:order-none sm:col-start-1 sm:row-span-2 sm:row-start-1">
                    <h3 className="font-display text-lg font-semibold text-slate-900 dark:text-white">{e.degree}</h3>
                    <p className="text-slate-600 dark:text-slate-400">{e.school}</p>
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
                  </div>

                  <span className="order-1 self-start justify-self-start rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 sm:order-none sm:col-start-2 sm:row-start-1 sm:justify-self-end dark:bg-slate-800 dark:text-slate-300">{e.period}</span>
                  {e.images?.length > 0 && (
                    <div className="order-3 mt-1 flex gap-2 sm:order-none sm:col-start-2 sm:row-start-2 sm:mt-0 sm:self-start sm:justify-self-end">
                      {e.images.map((src, j) => (
                        <button
                          key={src}
                          onClick={() => setViewer({ images: e.images, index: j, caption: e.degree })}
                          aria-label={`View ${e.degree} photo ${j + 1}`}
                          className="group/thumb relative h-16 w-16 overflow-hidden rounded-lg border border-slate-200 transition hover:-translate-y-0.5 hover:border-accent-400 hover:shadow-md focus-visible:outline-2 focus-visible:outline-accent-500 sm:h-[4.5rem] sm:w-[4.5rem] dark:border-slate-700"
                        >
                          <img src={src} alt="" loading="lazy" className="h-full w-full object-cover transition duration-300 group-hover/thumb:scale-110" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
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
            return (
              <Reveal key={a.title} delay={(i % 2) * 0.06}>
                <Card className="flex h-full items-start gap-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-accent-500 to-fuchsia-500 text-white">
                    <Icon size={18} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-slate-900 dark:text-white">
                      {a.url ? (
                        <a href={a.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-accent-600 dark:hover:text-accent-300" aria-label={`${a.title} (certificate)`}>
                          {a.title} <ExternalLink size={13} className="text-slate-400" />
                        </a>
                      ) : (
                        a.title
                      )}
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{a.note}</p>
                  </div>
                  {a.image && (
                    <button
                      onClick={() => setViewer({ images: [a.image], index: 0, caption: a.title })}
                      aria-label={`View photo: ${a.title}`}
                      className="group/thumb h-14 w-14 shrink-0 overflow-hidden rounded-lg border border-slate-200 transition hover:-translate-y-0.5 hover:border-accent-400 hover:shadow-md focus-visible:outline-2 focus-visible:outline-accent-500 dark:border-slate-700"
                    >
                      <img src={a.image} alt="" loading="lazy" className="h-full w-full object-cover transition duration-300 group-hover/thumb:scale-110" />
                    </button>
                  )}
                </Card>
              </Reveal>
            )
          })}
        </div>
      </section>

      <Lightbox
        images={viewer?.images}
        index={viewer ? viewer.index : null}
        caption={viewer?.caption}
        onChange={(index) => setViewer((v) => ({ ...v, index }))}
        onClose={() => setViewer(null)}
      />
    </Page>
  )
}
