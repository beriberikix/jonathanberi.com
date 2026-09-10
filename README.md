# jonathanberi.com

Personal site for Jonathan Beri, built with [Astro](https://astro.build) as a fully static site and deployed to GitHub Pages at <https://jonathanberi.com>.

## Requirements

- Node.js 22.12 or newer (Astro 7 requirement)
- npm

## Development

```sh
npm ci          # install dependencies from the lockfile
npm run dev     # start the dev server with hot reload
npm run build   # build the static site into dist/
npm run preview # serve the built dist/ locally
```

## Editing content

All site copy and links live in one place: `src/data/profile.ts`. Edit that file to change the tagline, summary, highlights, experience, and contact links. The components under `src/components/` read from it and rarely need to change for a content update.

## Project layout

```
src/
  data/profile.ts     single source of truth for site copy and links
  layouts/Base.astro  HTML shell, meta tags, Open Graph, theme bootstrap
  pages/              index.astro and 404.astro
  components/         hero, highlights, experience, focus, footer, theme toggle
  styles/global.css   design tokens and base styles, light and dark themes
public/               static assets copied as-is: favicons, headshot, CNAME, robots.txt
scripts/gen-favicon.mjs  one-off generator for favicon.svg, favicon.ico and icon.png
```

The favicon generator is not part of the build. Run it manually when the brand mark changes:

```sh
node scripts/gen-favicon.mjs
```

It depends on `sharp`, which is installed as a transitive dependency of Astro.

## Theming

The site supports light and dark modes. It follows the system preference by default, and the toggle in the hero stores an explicit choice in `localStorage`. A small inline script in the base layout applies the stored theme before first paint to avoid a flash.

## Deployment

Pushing to the `gh-pages` branch triggers `.github/workflows/deploy.yml`, which builds the site with `withastro/action` on Node 22 and publishes it with `actions/deploy-pages`. The `gh-pages` branch is the default branch and the source for the live site. There is no CI on pull requests, so run `npm run build` locally before merging.

Dependabot opens PRs for dependency updates. Astro is the only direct dependency; everything else moves in `package-lock.json`.

## License

MIT. See `LICENSE.txt`.
