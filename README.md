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

### Open source

Open source projects live in `src/data/opensource.ts`. They appear in the Open source section on the home page (entries marked `featured`) and in full on `/open-source`, in two groups: organizations and communities, then libraries and tools by theme. Adding a library takes one line: its `owner/name` and a theme. Repos outside your own account can set a `role` (e.g. Contributor), which is shown as a tag.

At build time, `src/lib/github.ts` fetches stars, language, description, and last push from the GitHub API, using one paginated call per owner with several repos and single calls for the rest. A curated `blurb` overrides the GitHub description. If the fetch fails, the build still succeeds and entries render without stats, so give featured repos a `blurb`. Set `GITHUB_TOKEN` to raise the API rate limit. The deploy workflow passes it in and also rebuilds weekly so the counts stay fresh.

## Project layout

```
src/
  data/profile.ts     single source of truth for site copy and links
  layouts/Base.astro  HTML shell, meta tags, Open Graph, theme bootstrap
  data/opensource.ts  curated open source projects
  lib/github.ts       build-time GitHub repo stats
  lib/schema.ts       Schema.org JSON-LD builders
  pages/              index.astro, open-source.astro, 404.astro, sitemap.xml.ts and llms.txt.ts
  components/         hero, site nav, highlights, experience, open source, focus, footer, theme toggle
  styles/global.css   design tokens and base styles, light and dark themes
public/               static assets copied as-is: favicons, headshot, CNAME, robots.txt
scripts/gen-favicon.mjs  one-off generator for favicon.svg, favicon.ico and icon.png
scripts/gen-og-image.mjs one-off generator for the 1200x630 social share card
```

The favicon generator is not part of the build. Run it manually when the brand mark changes:

```sh
node scripts/gen-favicon.mjs
```

It depends on `sharp`, which is installed as a transitive dependency of Astro.

## Search, answer, and AI engines

- Each page's head carries a title, description, canonical URL, Open Graph and Twitter tags, and Schema.org JSON-LD built by `src/lib/schema.ts` from the same data the pages render: a `ProfilePage` + `Person` on the home page, and a `CollectionPage` listing the open source repos on `/open-source`. The 404 page is `noindex`.
- `/sitemap.xml` (`src/pages/sitemap.xml.ts`) lists the pages; add new paths there. `robots.txt` points to it and allows all crawlers, including AI crawlers.
- `/llms.txt` (`src/pages/llms.txt.ts`) is a Markdown brief for AI answer engines, generated from `profile.ts` and `opensource.ts`.
- Social profile links carry `rel="me"` for identity verification.
- The share image `public/img/og-card.jpg` is generated manually. Re-run `node scripts/gen-og-image.mjs` when the name, tagline, or headshot changes.

## Theming

The site supports light and dark modes. It follows the system preference by default, and the toggle in the hero stores an explicit choice in `localStorage`. A small inline script in the base layout applies the stored theme before first paint to avoid a flash.

## Deployment

Pushing to the `gh-pages` branch triggers `.github/workflows/deploy.yml`, which builds the site with `withastro/action` on Node 22 and publishes it with `actions/deploy-pages`. The `gh-pages` branch is the default branch and the source for the live site. There is no CI on pull requests, so run `npm run build` locally before merging.

Dependabot opens PRs for dependency updates. Astro is the only direct dependency; everything else moves in `package-lock.json`.

## License

MIT. See `LICENSE.txt`.
