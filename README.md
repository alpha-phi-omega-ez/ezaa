# Alpha Phi Omega, Epsilon Zeta Alumni Association Website

Official website for the **Epsilon Zeta Alumni Association (EZAA)** — the alumni association for the Epsilon Zeta Chapter of Alpha Phi Omega at RPI. The site keeps alumni informed about events, news, meeting minutes, and ways to stay connected.

**View site:** https://apoezaa.org

## Features

- **News** — Articles and updates from markdown files; listing at `/news` and individual pages at `/news/[id]`
- **Meeting minutes** — Minutes from ECOM and other meetings; generated from markdown; listed on the Documents page and at `/minutes/[id]`
- **Documents & resources** — Central page for minutes, bylaws (PDF), and presentations
- **About** — Mission, donation info, and current officers
- **Find us** — Mailing list signup, Facebook, and calendar

Built with [Astro](https://astro.build). Content is authored in Markdown with frontmatter; the site is static and can be deployed to any static host.

## Project structure

```text
/
├── public/                    # Static assets (served as-is)
│   ├── docs/                  # PDFs: bylaws, presentations
│   ├── imgs/                  # Images referenced in content
│   └── favicon.png
├── src/
│   ├── assets/                # Theme images, global CSS
│   ├── components/            # Reusable Astro components
│   │   ├── News/              # NewsFeed, NewsItem
│   │   ├── DocsList.astro     # Minutes list for docs page
│   │   ├── Header.astro, Footer.astro, Navigation.astro
│   │   ├── OfficersBlock.astro, Calendar.astro, SEO.astro
│   │   └── ...
│   ├── config/
│   │   └── site.ts            # Site name, URL, description, helpers
│   ├── content/               # Content collections (Markdown)
│   │   ├── news/              # News articles (*.md)
│   │   ├── minutes/           # Meeting minutes (*.md)
│   │   ├── index.ts           # Re-exports collection configs
│   │   └── (config.ts per collection)
│   ├── content.config.ts      # Astro content collections definition
│   ├── layouts/
│   │   ├── BaseLayout.astro
│   │   ├── SingleColumn.astro
│   │   └── SidebarRight.astro
│   ├── pages/
│   │   ├── index.astro        # Home
│   │   ├── about.astro, docs.astro, find-us.astro
│   │   ├── news/
│   │   │   ├── index.astro    # News listing
│   │   │   └── [id].astro     # Single news article
│   │   └── minutes/
│   │       └── [id].astro     # Single minutes page
│   └── scripts/               # Shared utilities (e.g. date formatting)
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

## Adding content

### News articles

1. Add a new `.md` file under `src/content/news/`. The filename (without `.md`) becomes the URL slug, e.g. `my-post.md` → `/news/my-post`.
2. Use this frontmatter (required fields):

```yaml
---
title: Your Post Title
date: 1/15/2026          # Any parseable date
author: Your Name
tags:
  - tag1
  - tag2
summary: Optional short summary for listings and SEO.
image: /imgs/optional-hero.png   # Optional
---

Your content in **Markdown**…
```

3. Write the body in Markdown. Images in `public/imgs/` can be referenced as `/imgs/filename.jpg`.

### Meeting minutes

1. Add a new `.md` file under `src/content/minutes/`. Filename becomes the URL slug, e.g. `02-15-2026.md` → `/minutes/02-15-2026`.
2. Use this frontmatter:

```yaml
---
title: ECOM Meeting - 2/15/2026
date: 2/15/2026
participants:
  - Name (Role)
  - Name (Role)
tags: []                  # Optional
summary: Optional summary.
image: /imgs/optional.png # Optional
---

## Section

Minutes content in Markdown…
```

### Static documents (PDFs)

Place PDFs in `public/docs/` (e.g. `public/docs/bylaws/`, `public/docs/presentations/`). They are served at `/docs/bylaws/…` and can be linked from the docs page or anywhere on the site.

## Development

| Command           | Action                                      |
| ----------------- | ------------------------------------------- |
| `npm install`     | Install dependencies                         |
| `npm run dev`     | Start dev server at `http://localhost:4321` |
| `npm run build`   | Build production site to `./dist/`          |
| `npm run preview` | Preview the production build locally         |

## Configuration

- **Site metadata** — Edit `src/config/site.ts` for site name, URL, description, and default image. Used for SEO and social meta tags.
- **Content schemas** — Each collection has a schema in `src/content/<collection>/config.ts`. Adjust fields there and in `src/content.config.ts` if you add new frontmatter.

## Tech stack

- **Astro 5** — Static site generator
- **Content collections** — Type-safe Markdown with Zod schemas (`astro:content` + glob loaders)
- **TypeScript** — Used across the project
