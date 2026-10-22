import { profile } from '../data/content.js'
import SocialLinks from './SocialLinks.jsx'

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-slate-500 sm:flex-row sm:px-6 dark:text-slate-400">
        <p>© {new Date().getFullYear()} {profile.name} · Built with React &amp; Tailwind CSS</p>
        <SocialLinks size="sm" />
      </div>
    </footer>
  )
}
