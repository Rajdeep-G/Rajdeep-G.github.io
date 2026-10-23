// Writes a static HTML file per route (dist/<route>/index.html) so search engines
// get real content, titles and descriptions without running JavaScript.
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const dist = path.resolve('dist')
const { render } = await import(pathToFileURL(path.resolve('dist-ssr/entry-server.js')).href)
const { routes, notFound, SITE_URL } = await import(pathToFileURL(path.resolve('src/seo.js')).href)

const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8')
const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

function page(url, meta, { noindex = false } = {}) {
  const canonical = SITE_URL + (url === '/' ? '/' : `${url}/`)
  const head = [
    `<title>${esc(meta.title)}</title>`,
    `<meta name="description" content="${esc(meta.description)}" />`,
    noindex ? '<meta name="robots" content="noindex" />' : `<link rel="canonical" href="${canonical}" />`,
    `<meta property="og:type" content="${url === '/' ? 'profile' : 'website'}" />`,
    `<meta property="og:title" content="${esc(meta.title)}" />`,
    `<meta property="og:description" content="${esc(meta.description)}" />`,
    `<meta property="og:url" content="${canonical}" />`,
    `<meta name="twitter:title" content="${esc(meta.title)}" />`,
    `<meta name="twitter:description" content="${esc(meta.description)}" />`,
  ].join('\n    ')
  return template
    .replace(/<title>.*?<\/title>/s, '')
    .replace('<!--app-head-->', head)
    .replace('<div id="root"></div>', `<div id="root">${render(url)}</div>`)
}

for (const [url, meta] of Object.entries(routes)) {
  const file = url === '/' ? path.join(dist, 'index.html') : path.join(dist, url, 'index.html')
  fs.mkdirSync(path.dirname(file), { recursive: true })
  fs.writeFileSync(file, page(url, meta))
  console.log('prerendered', url)
}
fs.writeFileSync(path.join(dist, '404.html'), page('/404', notFound, { noindex: true }))

const today = new Date().toISOString().slice(0, 10)
const urls = Object.keys(routes)
  .map((u) => `  <url><loc>${SITE_URL}${u === '/' ? '/' : `${u}/`}</loc><lastmod>${today}</lastmod></url>`)
  .join('\n')
fs.writeFileSync(
  path.join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
)
fs.rmSync(path.resolve('dist-ssr'), { recursive: true, force: true })
console.log('wrote sitemap.xml and 404.html')
