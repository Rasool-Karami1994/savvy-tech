# SavvyTech List Manager

> **Live Demo:** https://savvy-tech-nine.vercel.app/

A lightweight, production-ready **React + TypeScript** app (Vite) that lets you **create, edit, delete, and search** list items with **local persistence**. It ships with a polished UI, **design tokens** (CSS vars), **Tailwind utilities**, and **Light/Dark** theme toggle. Includes **Docker** & **Docker Compose** for both dev and prod.

---

## ✨ Features

* **Item CRUD** (title + subtitle) persisted to `localStorage`
* **Search** (instant filter on title/subtitle)
* **Undo delete** toast (5s window)
* **Responsive table** with x-scroll on small screens
* **Design tokens** (single source of truth for colors/shadows)
* **Light/Dark theme** with a Sun/Moon toggle (persists to `localStorage`)
* **Accessible** forms (labels, aria attributes, focus styles)
* **Modular components**: `SearchBar`, `ItemsTable`, `UndoToast`, `ItemForm`, `Modal`, `ThemeToggle`, `Button`
* **Containerized** workflows:
  * **Prod** image (serves built `dist/` via `serve`)
  * **Dev** container with hot-reload (Vite)

---

## 🛠 Tech Stack

* **React 19** + **TypeScript**
* **Vite** (build & dev server)
* **Tailwind CSS** (utility-first styling)
* **react-hook-form** + **zod** (form + validation)
* **react-icons** (Feather set)
* **Docker** & **Docker Compose** (dev/prod)

---

## 📂 Project Structure (key parts)

```

src/
components/
ItemForm.tsx
Modal.tsx
ThemeToggle.tsx
EmptyState.tsx
Table.tsx
SearchBar.tsx
ItemsTable.tsx
UndoToast.tsx
ui/
Button.tsx
utils/
date.ts
id.ts
storage.ts
types.ts
App.tsx
main.tsx
index.css               ← Tailwind import + token utilities (light/dark)
tailwind.config.ts

````

---

## 🚀 Getting Started (Local)

### Prerequisites

* **Node.js 20+**
* **npm** (or adapt commands to pnpm/yarn)

### Install & Run (Dev)

```bash
# install deps
npm install

# run vite dev server
npm run dev
# opens at http://localhost:5173
````

### Build & Preview (Local)

```bash
npm run build
npm run preview
# opens at http://localhost:4173
```

---

## 🎨 Theming & Tokens

All design tokens live in **`index.css`** as CSS variables:

```css
:root {
  --btn-rgb: 74 109 255;
  --secondary-rgb: 243 244 246;
  --title-rgb: 85 87 117;
  --selected-rgb: 219 226 255;
  --main-bg-rgb: 255 255 255;
  --shadow-rgb: 219 226 255;
  --border-rgb: 183 197 255;
  --fields-rgb: 243 244 246;
  --secondary-border: 229 231 235;
  --grid-rgb: 250 251 253;      /* space-separated for rgb(var(--*) / alpha) */
  --shadow-elev-1: 0 1px 2px 0 rgb(var(--shadow-rgb) / 0.35);
  --shadow-elev-2: 0 6px 24px -6px rgb(var(--shadow-rgb) / 0.35);
}
/* Dark mode overrides (also mirrored under .dark) */
@media (prefers-color-scheme: dark) {
  :root {
    --btn-rgb: 116 143 255;
    --secondary-rgb: 36 38 46;
    --title-rgb: 224 226 235;
    --selected-rgb: 62 76 120;
    --main-bg-rgb: 18 20 24;
    --shadow-rgb: 31 41 55;
    --border-rgb: 183 197 255;
    --fields-rgb: 28 30 38;
    --secondary-border: 229 231 235;
    --grid-rgb: 243 244 246;
    --shadow-elev-1: 0 1px 2px 0 rgb(var(--shadow-rgb) / 0.45);
    --shadow-elev-2: 0 8px 30px -10px rgb(var(--shadow-rgb) / 0.45);
  }
}
```

Custom **Tailwind utilities** (with `!important`) map tokens to classes, e.g.:

```css
@layer utilities {
  .bg-main { background-color: rgb(var(--main-bg-rgb) / 1) !important; }
  .bg-fields { background-color: rgb(var(--fields-rgb) / 1) !important; }
  .text-title { color: rgb(var(--title-rgb) / 1) !important; }
  .border-border { border-color: rgb(var(--border-rgb) / 0.3) !important; }
  .ring-btn { --tw-ring-color: rgb(var(--btn-rgb) / 1) !important; }
  .shadow-elev-1 { box-shadow: var(--shadow-elev-1) !important; }

  /* hover/active variants (recommended because base classes use !important) */
  .hover\:bg-selected\/60:hover { background-color: rgb(var(--selected-rgb) / 0.6) !important; }
  .hover\:border-btn:hover { border-color: rgb(var(--btn-rgb) / 1) !important; }

  /* subtle grid background for wrappers */
  .bg-grid-soft {
    --grid-cell: 34px;
    --grid-line-rgb: var(--border-rgb);
    --grid-alpha: 0.06;
    background-image:
      linear-gradient(to right, rgb(var(--grid-line-rgb) / var(--grid-alpha)) 1px, transparent 1px),
      linear-gradient(to bottom, rgb(var(--grid-line-rgb) / var(--grid-alpha)) 1px, transparent 1px);
    background-size: var(--grid-cell) var(--grid-cell);
    background-color: rgb(var(--grid-rgb) / 1);
  }
  .dark .bg-grid-soft { --grid-alpha: 0.14; }
  @media (prefers-color-scheme: dark) { :root:not(.light) .bg-grid-soft { --grid-alpha: 0.14; } }
}
```

### Theme Toggle

`ThemeToggle` toggles `document.documentElement.classList` between `light` and `dark` and stores the choice in `localStorage`.
Classes `.light`/`.dark` override the `@media (prefers-color-scheme: dark)` defaults.

---

## 🧩 Key Components

* **`SearchBar`** – input with a left search icon, focus ring + shadow using tokens.
* **`ItemsTable`** – responsive table with zebra hover and x-scroll on small screens. Uses `Th`/`Td` helpers.
* **`ItemForm`** – `react-hook-form` + `zod` validation:

  * Title: required, 3–80 chars, no links, must include a letter/number.
  * Subtitle: optional, ≤ 140 chars, if present ≥ 5 chars.
  * Strong focus styles using token utilities.
* **`Button`** – reusable button with variants (`primary`, `secondary`, `outline`, `ghost`), sizes, left/right icons, loading overlay, and full-width option.
* **`UndoToast`** – fixed bottom-center toast to restore last deleted item.
* **`Modal`** – portal-like overlay (Escape to close, click outside to dismiss).

---

## 🧪 Scripts

Defined in `package.json`:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

---

## 🐳 Docker

Two options: **Prod** (optimized build served via Node’s `serve`) and **Dev** (hot reload with Vite).

### Files to include in project root

**`Dockerfile`** (multi-stage, production):

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json* ./
RUN if [ -f package-lock.json ]; then npm ci; else npm install; fi
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
RUN npm i -g serve@14
COPY --from=builder /app/dist ./dist
EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]
```

**`Dockerfile.dev`** (development, hot reload):

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package.json package-lock.json* ./
RUN if [ -f package-lock.json ]; then npm ci; else npm install; fi
COPY . .
EXPOSE 5173
ENV CHOKIDAR_USEPOLLING=true
ENV HOST=0.0.0.0
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173"]
```

**`.dockerignore`**:

```
node_modules
dist
.git
.gitignore
.vscode
*.log
Dockerfile
Dockerfile.dev
docker-compose.yml
```

### Build & Run (without Compose)

**Prod:**

```bash
docker build -t savvytech-list:prod .
docker run --rm -p 3000:3000 savvytech-list:prod
# http://localhost:3000
```

**Dev:**

```bash
docker build -f Dockerfile.dev -t savvytech-list:dev .
docker run --rm -it -p 5173:5173 -v "$PWD:/app" -v /app/node_modules savvytech-list:dev
# http://localhost:5173
```

---

## 🧩 Docker Compose

Place **`docker-compose.yml`** in the project root:

```yaml
version: "3.9"

services:
  web:                       # production
    profiles: ["prod"]
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    restart: unless-stopped

  web-dev:                   # development (hot reload)
    profiles: ["dev"]
    build:
      context: .
      dockerfile: Dockerfile.dev
    ports:
      - "5173:5173"
    environment:
      CHOKIDAR_USEPOLLING: "true"
      HOST: "0.0.0.0"
    volumes:
      - .:/app
      - /app/node_modules
    command: ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173"]
    restart: unless-stopped
```

**Run:**

```bash
# Production
docker compose --profile prod up --build
# http://localhost:3000

# Development (hot reload)
docker compose --profile dev up --build
# http://localhost:5173
```

---

## 🔐 Environment Variables

*Not required* for this assignment. If you add API calls later, use Vite env files:

* `.env` (default), `.env.development`, `.env.production`
* Access in code via `import.meta.env.VITE_YOUR_KEY`

---

## ♿ Accessibility & UX Notes

* Labels + `aria-*` for inputs and errors.
* Focus styles use `ring-btn` token for visibility.
* Buttons support `aria-label` when text is hidden on mobile (icon-only).
* Table is horizontally scrollable on small screens (`overflow-x-auto`) and prevents cell wrapping via `whitespace-nowrap` (restores wrapping on `sm:` and up).

```

