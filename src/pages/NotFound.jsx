import { Link } from 'react-router-dom'
import Page from '../components/Page.jsx'

export default function NotFound() {
  return (
    <Page>
      <div className="py-24 text-center">
        <p className="font-display text-7xl font-bold text-accent-500">404</p>
        <h1 className="mt-4 font-display text-2xl font-semibold text-slate-900 dark:text-white">This page doesn’t exist</h1>
        <p className="mt-2 text-slate-500 dark:text-slate-400">It may have moved when the site was redesigned.</p>
        <Link to="/" className="mt-8 inline-block rounded-full bg-accent-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-accent-700">
          Back home
        </Link>
      </div>
    </Page>
  )
}
