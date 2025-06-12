# Pictionary – Full-stack Take-Home

A small drawing game that runs on the web **and** as a native desktop app.

---

## Tech stack

* **Frontend** – React 18 + Vite + Tailwind CSS 3
* **Backend** – FastAPI (Python ≥3.9)
* **Desktop** – Tauri v2 (Rust ≥1.72)
* **Tooling** – pnpm (workspaces) · Cursor-powered IDE 💡

---

## Prerequisites

| Tool | Version |
|------|---------|
| Node | 18 or newer (pnpm included) |
| Python | 3.9 or newer |
| Rust | 1.72 or newer (install with `rustup`) |

---

## Quick start – Web + FastAPI

```bash
pnpm install               # workspace bootstrap
cp .env.example .env       # no secrets required
pnpm dev                   # http://localhost:5173  (frontend)
                           # http://localhost:8000  (FastAPI)
```

---

## Quick start – Desktop

```bash
pnpm dev:desktop           # hot-reload desktop window

# Production bundle (.app / .dmg under src-tauri/target/release/bundle)
pnpm build:desktop
```

---

## Scripts

| Script | What it does |
|--------|--------------|
| `pnpm dev` | Runs FastAPI + Vite dev server concurrently |
| `pnpm dev:desktop` | Starts the Tauri dev window with live reload |
| `pnpm build` | Builds the production frontend (Vite) |
| `pnpm preview` | Serves the production build locally |
| `pnpm build:desktop` | Builds the React app then packages the desktop app |

---

## Screenshots / GIF

> Coming soon – replace `docs/demo.gif` with a screencast.
>
> ```markdown
> ![Demo](docs/demo.gif)
> ```

---

## Project structure (partial)

```
.
├── backend/                 # FastAPI service
├── frontend/                # React + Tailwind UI
│   └── src/
├── src-tauri/               # Tauri v2 scaffold
│   ├── dist/                # Copied React build (embedded)
│   └── src/                 # Rust commands & setup
└── README.md
```

---

## Future work

* Real-time networking (WebSockets) for multiplayer drawing
* Cross-device room codes & lobby screen
* Custom game icons + high-res app icon
* Auto-update pipeline via GitHub Releases
* CI/CD (lint, test, build, codesign)

---

## Manual desktop build if CI fails

```bash
# one-liner
rm -rf src-tauri/dist && \
  pnpm --filter frontend build && \
  cp -R frontend/dist src-tauri/dist && \
  pnpm tauri build
```

---

Made with ❤️ and caffeine. Pull requests welcome! 🌟 