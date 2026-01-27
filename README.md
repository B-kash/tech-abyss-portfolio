# Tech Abyss – Full-Stack Portfolio Website

A professional, dark, and calm single-page portfolio for **The Abyss Systems Consultant** (Bikash Chapagain) built with **TypeScript**, **Vite**, and **semantic HTML/CSS**.  
It focuses on full‑stack web development, clear problem–solution–outcome messaging, strong SEO, and AI‑readable structure.

## 🌐 What this app is

- **Full‑stack focus**: Content emphasizes complete web applications (frontend + backend + integration)
- **Clear sections**:
  - Hero (who you are and what you do)
  - What I Do (services)
  - Who Should Work With Me (ideal clients and problems)
  - How I Work (process)
  - Projects (real GitHub projects)
  - About (short, one‑screen bio)
  - Contact (email, GitHub, LinkedIn, message)
- **Content from files**:
  - `public/content/about.md` – About text in Markdown
  - `public/content/projects.json` – Projects list (title, description, tech, links)
  - `public/content/contact.json` – Contact details and message
- **Branding & typography**:
  - Custom logo emblem + wordmark
  - Fonts: `Space Grotesk` as primary, `Inter` as fallback
- **Dark, trustworthy UI**:
  - CSS variables for colors
  - Gradient hero background and subtle effects
  - Responsive layout with cards and grids

## 🧰 Tech stack

- **Vite** – dev server and build tooling
- **TypeScript** – type-safe main script (`src/main.ts`)
- **Vanilla JS + DOM** – no frontend framework
- **Semantic HTML** – sections, headings, and ARIA attributes in `index.html`
- **CSS** – custom styling in `src/styles/main.css`
- **JSON/Markdown content** – loaded at runtime via `fetch`

## 📦 Project structure (current)

```text
tech-abyss_website/
├── public/
│   ├── content/
│   │   ├── about.md        # About section content (Markdown)
│   │   ├── projects.json   # Project cards (GitHub links, tech stack, etc.)
│   │   └── contact.json    # Contact info (email, GitHub, LinkedIn, message)
│   ├── logo_icon.svg
│   ├── WordMark Variant.svg
│   ├── favicon.ico
│   ├── robots.txt          # Crawler and AI-bot rules
│   └── sitemap.xml         # Sitemap for search engines
├── src/
│   ├── main.ts             # Entry point: loads content, sets up nav, animations
│   └── styles/
│       └── main.css        # Dark theme, layout, responsive styles
├── index.html              # Page structure + meta + JSON-LD
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 🚀 Getting started

### Prerequisites

- Node.js 18+ and npm (or yarn/pnpm)

### Install dependencies

```bash
npm install
```

### Run in development

```bash
npm run dev
```

By default the site runs at `http://localhost:3000` (configured in `vite.config.ts`).

### Build for production

```bash
npm run build
```

### Preview the production build

```bash
npm run preview
```

## 📄 Content editing

- **About section** (`/public/content/about.md`)
  - Edit the Markdown file to change the About copy (headings and paragraphs).
- **Projects** (`/public/content/projects.json`)
  - JSON array of project objects. Each project can include:
    - `title`
    - `description`
    - `tech`
    - `github`
    - optional `try_now` link
  - These are rendered into the Projects grid and used to generate `SoftwareApplication` JSON‑LD.
- **Contact** (`/public/content/contact.json`)
  - Update `email`, `github`, `linkedin`, and `message` fields.

Changes to these files are picked up by the frontend at runtime without changing TypeScript code.

## 📱 Responsiveness & UX

- **Mobile‑first layout**:
  - Stacked sections and cards on small screens
  - Generous spacing and legible font sizes
- **Navigation**:
  - Desktop: horizontal nav bar
  - Mobile: hamburger menu (`.nav-toggle`) to open/close nav links
- **Animations**:
  - Intersection Observer adds fade‑in animations for sections as they scroll into view.

## 🔍 SEO & AI readiness

- **SEO meta tags** in `index.html`:
  - `<title>` and `<meta name="description">` tuned for full‑stack development in Belgium/Flanders/Leuven
  - `<meta name="keywords">`, `author`, `canonical` URL
  - Open Graph (`og:*`) and Twitter Card (`twitter:*`) tags (title, description, URL, image)
- **Structured data (JSON‑LD)**:
  - `Person` (Bikash Chapagain)
  - `ProfessionalService` (The Abyss Systems Consultant)
  - `WebSite` and `BreadcrumbList`
  - Per‑project `SoftwareApplication` entries generated dynamically from `projects.json`
- **Robots & AI training control**:
  - `robots.txt` allows crawling the site
  - Additional directives to disallow several AI training bots
  - `meta` tags for `robots`, `googlebot`, `bingbot`, `noai`, `noimageai`
- **AI‑readable content**:
  - Clear headings and semantic sections
  - Problem–solution–outcome wording for services and process
  - `noscript` fallbacks for key content blocks (Projects, About, Contact)

## 📝 License

MIT License – you can reuse or adapt this setup for your own portfolio.

