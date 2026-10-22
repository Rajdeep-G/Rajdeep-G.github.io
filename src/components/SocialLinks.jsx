import { FaGithub, FaLinkedin, FaXTwitter } from 'react-icons/fa6'
import { SiGooglescholar } from 'react-icons/si'
import { Mail } from 'lucide-react'
import { profile } from '../data/content.js'

const items = [
  { href: `mailto:${profile.emails[0]}`, label: 'Email', Icon: Mail },
  { href: profile.socials.scholar, label: 'Google Scholar', Icon: SiGooglescholar },
  { href: profile.socials.github, label: 'GitHub', Icon: FaGithub },
  { href: profile.socials.linkedin, label: 'LinkedIn', Icon: FaLinkedin },
  { href: profile.socials.x, label: 'X (Twitter)', Icon: FaXTwitter },
]

export default function SocialLinks({ size = 'md' }) {
  const box = size === 'sm' ? 'h-8 w-8' : 'h-10 w-10'
  const icon = size === 'sm' ? 15 : 18
  return (
    <ul className="flex flex-wrap items-center gap-2">
      {items.map(({ href, label, Icon }) => (
        <li key={label}>
          <a
            href={href}
            target={href.startsWith('mailto:') ? undefined : '_blank'}
            rel="noreferrer"
            aria-label={label}
            title={label}
            className={`${box} grid place-items-center rounded-full border border-slate-200 bg-white/70 text-slate-600 transition hover:-translate-y-0.5 hover:border-accent-400 hover:text-accent-600 hover:shadow-md hover:shadow-accent-500/10 dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-300 dark:hover:border-accent-400 dark:hover:text-accent-300`}
          >
            <Icon size={icon} />
          </a>
        </li>
      ))}
    </ul>
  )
}
