// Per-page <title> and meta description. Used by the browser (App.jsx) and by the
// build-time prerender (scripts/prerender.mjs), so search engines see the same text.
export const SITE_URL = 'https://rajdeep-g.github.io'

export const routes = {
  '/': {
    title: 'Rajdeep Ghosh | Ph.D. Student, IIT Kharagpur',
    description:
      'Rajdeep Ghosh is a Ph.D. student in Computer Science & Engineering at IIT Kharagpur (IITKGP), advised by Prof. Mainack Mondal, researching developer-centric usable security, open-source supply chains and SOHO device security.',
  },
  '/education': {
    title: 'Education | Rajdeep Ghosh, IIT Kharagpur',
    description:
      'Education of Rajdeep Ghosh: Ph.D. and M.Tech in Computer Science & Engineering at IIT Kharagpur, B.Tech at IIEST Shibpur, plus awards including GATE CS 2023 AIR 156.',
  },
  '/experience': {
    title: 'Experience | Rajdeep Ghosh, IIT Kharagpur',
    description:
      'Research internships, teaching assistantships at IIT Kharagpur and academic service (USENIX Security, ACM CCS artifact evaluation) by Rajdeep Ghosh.',
  },
  '/projects': {
    title: 'Projects | Rajdeep Ghosh, IIT Kharagpur',
    description:
      'Research projects by Rajdeep Ghosh at IIT Kharagpur on npm security issue reporting, SOHO firmware supply chains, privacy and ML-based cipher detection.',
  },
  '/publications': {
    title: 'Publications | Rajdeep Ghosh, IIT Kharagpur',
    description:
      'Peer-reviewed publications by Rajdeep Ghosh (IIT Kharagpur), including papers at USENIX Security 2025 and USENIX Security 2026.',
  },
}

export const notFound = { title: 'Page not found | Rajdeep Ghosh', description: 'This page does not exist.' }
