import { Briefcase, Presentation, Users, ExternalLink } from "lucide-react";
import Page, { Reveal, SectionTitle, Card, Tag } from "../components/Page.jsx";
import { experience, teaching, service } from "../data/content.js";
export default function Experience() {
  return (
    <Page
      eyebrow="Work"
      title="Experience"
      intro="Research internships, industry work, and teaching across IIT Kharagpur programs."
    >
      <SectionTitle icon={Briefcase}>Internships &amp; work</SectionTitle>
      <div className="space-y-5">
        {experience.map((x, i) => (
          <Reveal key={x.role + x.org} delay={i * 0.05}>
            <Card>
              <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="font-display text-lg font-semibold text-slate-900 dark:text-white">
                    {x.role}
                  </h3>
                  <p className="font-medium text-accent-600 dark:text-accent-300">
                    {x.url ? (
                      <a
                        href={x.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 hover:underline"
                      >
                        {x.org} <ExternalLink size={13} />
                      </a>
                    ) : (
                      x.org
                    )}
                  </p>
                  {x.mentor && (
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {x.mentor}
                    </p>
                  )}
                </div>
                <div className="text-sm sm:text-right">
                  <p className="font-semibold text-slate-700 dark:text-slate-300">
                    {x.period}
                  </p>
                  <p className="text-slate-500 dark:text-slate-400">{x.mode}</p>
                </div>
              </div>
              <ul className="mt-4 list-disc space-y-1.5 pl-5 marker:text-accent-400">
                {x.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
              <div className="mt-4 flex flex-wrap gap-2">
                {x.tags.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>
            </Card>
          </Reveal>
        ))}
      </div>
      <section className="mt-20">
        <SectionTitle icon={Presentation}>
          Teaching &amp; instruction
        </SectionTitle>
        <div className="grid gap-4 md:grid-cols-2">
          {teaching.map((t, i) => {
            // period can be a string ('Mar 2026') or an array (['November 2024', 'February 2026'])
            const periods = [].concat(t.period);
            return (
              <Reveal key={t.title + periods.join()} delay={(i % 2) * 0.06}>
                <Card className="h-full">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          t.role === "Instructor"
                            ? "bg-fuchsia-50 text-fuchsia-700 dark:bg-fuchsia-500/15 dark:text-fuchsia-300"
                            : "bg-accent-50 text-accent-700 dark:bg-accent-500/15 dark:text-accent-300"
                        }`}
                      >
                        {t.role}
                      </span>
                    </div>
                    <ul
                      className="flex flex-wrap justify-end gap-1"
                      aria-label="When"
                    >
                      {periods.map((p) => (
                        <li
                          key={p}
                          className="rounded-md border border-slate-200 px-1.5 py-0.5 text-xs font-semibold text-slate-500 dark:border-slate-700 dark:text-slate-400"
                        >
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <h3 className="mt-3 font-display text-lg font-semibold text-slate-900 dark:text-white">
                    {t.title}
                  </h3>
                  {t.people && (
                    <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">
                      with{" "}
                      {t.people.map((p, j) => (
                        <span key={p.name}>
                          {j > 0 && " & "}
                          <a
                            href={p.url}
                            target="_blank"
                            rel="noreferrer"
                            className="underline decoration-slate-300 underline-offset-2 hover:text-accent-600 dark:decoration-slate-600 dark:hover:text-accent-300"
                          >
                            {p.name}
                          </a>
                        </span>
                      ))}
                    </p>
                  )}
                  <p className="mt-3 text-sm leading-relaxed">{t.text}</p>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </section>
      <section className="mt-20">
        <SectionTitle icon={Users}>Academic service</SectionTitle>
        <div className="grid gap-4 sm:grid-cols-2">
          {service.map((s, i) => (
            <Reveal key={s.role + s.venue} delay={(i % 2) * 0.06}>
              <Card className="flex h-full items-center justify-between gap-4 !p-5">
                <p className="font-semibold text-slate-900 dark:text-white">
                  {s.role}
                </p>
                <span className="shrink-0 rounded-md border border-slate-200 px-2 py-0.5 text-xs font-semibold text-slate-500 dark:border-slate-700 dark:text-slate-400">
                  {s.venue}
                </span>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>
    </Page>
  );
}
