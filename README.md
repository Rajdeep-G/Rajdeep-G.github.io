# Rajdeep Ghosh · Portfolio

Personal website built with **React 19**, **Vite**, **Tailwind CSS v4**, **Framer Motion** and **React Router**.
Live at https://rajdeep-g.github.io.

## Editing content

Everything on the site (bio, news, education, experience, teaching, projects, publications, links) lives in
[`src/data/content.js`](src/data/content.js). Edit that file and push; you rarely need to touch the components.

- Profile photo: `public/images/profile.jpg` (square, about 560×560)
- CV: `public/files/Rajdeep_Ghosh_CV.pdf` (keep the filename so the link never changes)

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
npm run preview  # serve the build
```

## Deploying to GitHub Pages

The workflow in `.github/workflows/deploy.yml` builds and deploys on every push to `main` (or `master`).

1. In the repo on GitHub go to **Settings → Pages → Build and deployment** and set **Source** to **GitHub Actions**.
2. Push. The site is live a minute or two later; progress shows under the **Actions** tab.

`npm run build` also copies `index.html` to `404.html` so direct links such as `/education/` work on GitHub Pages.

## Structure

```
src/
  data/content.js     all site content
  components/         Navbar, Footer, ThemeToggle, SocialLinks, shared UI (Page.jsx)
  pages/              Home, Education, Experience, Projects, Publications, NotFound
public/               static files copied as-is (images, CV, favicon)
```
