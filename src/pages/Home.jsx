import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, MapPin, Newspaper, Sparkles, Mail, Trophy, BookOpen, GraduationCap } from 'lucide-react'
import Page, { Reveal, SectionTitle, Card } from '../components/Page.jsx'
import SocialLinks from '../components/SocialLinks.jsx'
import { profile, advisor, news, publications } from '../data/content.js'

const rotating = ['developer-centric security', 'open-source supply chains', 'usable security & privacy', 'software vulnerabilities', 'location-related privacy and security']

const stats = [
  { value: '2', label: 'USENIX Security papers', Icon: BookOpen },
  { value: '9.76', label: 'M.Tech CGPA, Dept. rank 3', Icon: GraduationCap },
  { value: '156', label: 'GATE CS 2023 All-India Rank', Icon: Trophy },
]

function RotatingWord() {
  const [i, setI] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % rotating.length), 2600)
    return () => clearInterval(id)
  }, [])
  return (
    <span className="relative inline-grid">
      <AnimatePresence mode="wait">
        <motion.span
          key={rotating[i]}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3 }}
          className="bg-gradient-to-r from-accent-600 to-fuchsia-500 bg-clip-text text-transparent dark:from-accent-300 dark:to-fuchsia-300"
        >
          {rotating[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

export default function Home() {
  return (
    <Page>
      {/* Hero */}
      <section className="grid items-center gap-10 md:grid-cols-[1fr_auto]">
        <div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-300/60 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-300"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Open to collaborations
          </motion.p>
          <h1 className="font-display text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-6xl dark:text-white">
            Hi, I’m Rajdeep.
          </h1>
          <p className="mt-4 text-xl leading-relaxed text-slate-600 sm:text-2xl dark:text-slate-300">
            Ph.D. student at IIT Kharagpur working on <RotatingWord />
          </p>
          <p className="mt-5 flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
            <MapPin size={15} /> {profile.affiliation}, India
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Link
              to="/publications"
              className="group inline-flex items-center gap-2 rounded-full bg-accent-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-accent-600/25 transition hover:bg-accent-700"
            >
              See my research <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <SocialLinks />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="relative mx-auto w-52 sm:w-64"
        >
          <div className="absolute -inset-1.5 animate-[spin_12s_linear_infinite] rounded-full bg-[conic-gradient(from_0deg,var(--color-accent-500),#d946ef,#22d3ee,var(--color-accent-500))] opacity-70 blur-sm" />
          <img
            src={profile.photo}
            alt="Portrait of Rajdeep Ghosh"
            width="560"
            height="560"
            className="relative aspect-square w-full rounded-full border-4 border-white object-cover dark:border-slate-950"
          />
        </motion.div>
      </section>

      {/* Stats */}
      {/* <section className="mt-16 grid gap-4 sm:grid-cols-3">
        {stats.map(({ value, label, Icon }, i) => (
          <Reveal key={label} delay={i * 0.08}>
            <Card className="flex items-center gap-4 !p-5">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent-50 text-accent-600 dark:bg-accent-500/15 dark:text-accent-300">
                <Icon size={20} />
              </span>
              <div>
                <p className="font-display text-2xl font-bold text-slate-900 dark:text-white">{value}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
              </div>
            </Card>
          </Reveal>
        ))}
      </section> */}

      {/* About */}
      <section className="mt-20 grid gap-12 lg:grid-cols-[3fr_2fr]">
        <Reveal>
          <SectionTitle icon={Sparkles}>About me</SectionTitle>
          <div className="space-y-4 text-[1.05rem] leading-relaxed">
            <p>
              I’m a Ph.D. student in Computer Science &amp; Engineering at IIT Kharagpur, advised by{' '}
              <a href={advisor.url} target="_blank" rel="noreferrer" className="font-medium text-accent-600 underline decoration-accent-300 underline-offset-4 hover:decoration-2 dark:text-accent-300">
                {advisor.name}
              </a>
              . I work on developer-centric usable security: understanding how developers report, triage and fix security
              problems in open-source software, and building tools that make the ecosystem safer and friendlier for them. I also study norms around how location data should be shared and used, and the security of small office/home office (SOHO) devices, where supply-chain dependencies lock firmware into outdated, vulnerable Linux kernels.
              I am a part of the {" "} 
              <a href="https://cnerg-iitkgp.github.io/" className="font-medium text-accent-600 underline decoration-accent-300 underline-offset-4 hover:decoration-2 dark:text-accent-300">
                CNeRG Lab 
              </a>
              {" "} at IIT Kharagpur.
            </p>
            <p>
              I completed my M.Tech at IIT Kharagpur in 2025 and my B.Tech in Computer Science &amp; Technology at IIEST Shibpur
              in 2023, which gave me a strong foundation in core computer science alongside hands-on research experience.
            </p>
            <p>
              Beyond research I love playing football and cricket, and I’m a devoted FC Barcelona supporter. Messi’s relentless
              pursuit of excellence is a constant inspiration.
            </p>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {profile.interests.map((t) => (
              <span key={t} className="rounded-full bg-gradient-to-r from-accent-50 to-fuchsia-50 px-3 py-1 text-sm font-medium text-accent-700 dark:from-accent-500/15 dark:to-fuchsia-500/10 dark:text-accent-300">
                {t}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <SectionTitle icon={Newspaper}>Latest News</SectionTitle>
          <ol className="relative space-y-5 border-l border-slate-200 pl-6 dark:border-slate-800">
            {news.map((n) => (
              <li key={n.text} className="relative">
                <span className="absolute -left-[29px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-accent-500 dark:border-slate-950" />
                <p className="text-xs font-semibold uppercase tracking-wide text-accent-600 dark:text-accent-300">{n.date}</p>
                <p className="mt-0.5 text-sm leading-relaxed">{n.text}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </section>

      {/* Selected publications */}
      <section className="mt-20">
        <Reveal>
          <div className="flex items-baseline justify-between gap-4">
            <SectionTitle icon={BookOpen}>Selected publications</SectionTitle>
            <Link to="/publications" className="mb-6 inline-flex items-center gap-1 text-sm font-medium text-accent-600 hover:underline dark:text-accent-300">
              All <ArrowRight size={14} />
            </Link>
          </div>
        </Reveal>
        <div className="grid gap-4 md:grid-cols-2">
          {publications.slice(0, 2).map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <Card className="h-full">
                <span className="rounded-md bg-slate-900 px-2 py-0.5 text-xs font-semibold text-white dark:bg-white dark:text-slate-900">{p.venue}</span>
                <h3 className="mt-3 font-display text-lg font-semibold leading-snug text-slate-900 dark:text-white">{p.title}</h3>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{p.authors.join(', ')}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="mt-20">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-slate-900 p-8 text-slate-300 sm:p-10 dark:bg-slate-900/80 dark:ring-1 dark:ring-slate-800">
            <div aria-hidden className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-accent-500/30 blur-3xl" />
            <div aria-hidden className="absolute -bottom-24 left-10 h-56 w-56 rounded-full bg-fuchsia-500/20 blur-3xl" />
            <div className="relative grid gap-8 md:grid-cols-2">
              <div>
                <h2 className="font-display text-2xl font-semibold text-white sm:text-3xl">Let’s talk</h2>
                <p className="mt-3 leading-relaxed">
                  Feel free to reach out for collaborations, discussions, or just a friendly chat. I’m always open to new
                  opportunities and exciting challenges.
                </p>
                <div className="mt-5 space-y-2">
                  {profile.emails.map((e) => (
                    <a key={e} href={`mailto:${e}`} className="flex items-center gap-2 break-all text-sm font-medium text-white hover:text-accent-300">
                      <Mail size={16} className="shrink-0" /> {e}
                    </a>
                  ))}
                </div>
              </div>
              <address className="not-italic">
                <p className="mb-2 flex items-center gap-1.5 text-sm font-semibold uppercase tracking-wide text-accent-300">
                  <MapPin size={15} /> Find me at
                </p>
                {profile.address.map((line) => (
                  <p key={line} className="leading-relaxed">{line}</p>
                ))}
              </address>
            </div>
          </div>
        </Reveal>
      </section>
    </Page>
  )
}
