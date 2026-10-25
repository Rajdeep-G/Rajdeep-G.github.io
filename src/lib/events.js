// Tiny event helpers so the navbar, palette and terminal can open each other
// without threading state through every component.
export const openPalette = () => window.dispatchEvent(new Event('open-palette'))
export const openTerminal = () => window.dispatchEvent(new Event('open-terminal'))

export function setTheme(mode) {
  const dark = mode === 'toggle' ? !document.documentElement.classList.contains('dark') : mode === 'dark'
  document.documentElement.classList.toggle('dark', dark)
  try {
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  } catch {
    // Storage can be unavailable (private mode); the theme still applies for this visit.
  }
  window.dispatchEvent(new Event('themechange'))
  return dark
}

export async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    return false
  }
}

// Google Scholar search for the exact title; its "Cite" link gives the BibTeX.
export const scholarCiteUrl = (p) => p.scholar ?? `https://scholar.google.com/scholar?q=${encodeURIComponent(`"${p.title.replace(/[“”"]/g, '')}"`)}`
