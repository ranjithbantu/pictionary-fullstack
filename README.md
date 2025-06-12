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
git clone https://github.com/ranjithbantu/pictionary-fullstack.git
cd pictionary-fullstack
pnpm install               # workspace bootstrap
cp .env.example .env       # no secrets required
pip install -r backend/requirements.txt   # fastapi, uvicorn
pnpm dev                   # see below for ports
```

• Front-end  – http://localhost:5173  
• API        – http://localhost:8000/api/word

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

> _GIF incoming  📸 (shows web + desktop in one clip)_

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

## Manual desktop build if CI fails

```bash
# one-liner
rm -rf src-tauri/dist && \
  pnpm --filter frontend build && \
  cp -R frontend/dist src-tauri/dist && \
  pnpm tauri build
```

---

MIT License

Made with ❤️ and caffeine. Pull requests welcome! 🌟 