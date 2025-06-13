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

## Zero-to-Running (copy–paste)

```bash
# 1. Clone
 git clone https://github.com/ranjithbantu/pictionary-fullstack.git
 cd pictionary-fullstack

# 2. Tool-chain bootstrap (safe to re-run)
## Node + pnpm (Corepack)
 corepack enable && corepack prepare pnpm@latest --activate

## Python venv + FastAPI deps
 python3 -m venv .venv && source .venv/bin/activate
 pip install -r backend/requirements.txt

## Rust + Tauri CLI (desktop build)
 curl https://sh.rustup.rs -sSf | sh -s -- -y
 source "$HOME/.cargo/env"
 cargo install tauri-cli --locked --force
 # macOS only – linker tool-chain
 [[ "$OSTYPE" == "darwin"* ]] && (xcode-select -p >/dev/null 2>&1 || xcode-select --install)

# 3. Project JS deps
 pnpm install

# 4. RUN!
 ## Web + API ONLY
 pnpm dev:web         # http://localhost:5173  +  http://localhost:8000/api/word

 ## Desktop (includes API) – recommended for demo
 pnpm dev:desktop     # Opens Pictionary.app and also serves web
```

`pnpm dev:desktop` is one command: backend, frontend build+reload, and the desktop window all start together. No Ctrl-C juggling.

---

## Scripts

| Script | What it does |
|--------|--------------|
| `pnpm dev:web` | Runs FastAPI + Vite dev server (web only) |
| `pnpm dev:desktop` | Runs FastAPI + Tauri dev (opens desktop window) |
| `pnpm dev` | Alias to `dev:web` |
| `pnpm build` | Builds the production frontend (Vite) |
| `pnpm preview` | Serves the production build locally |
| `pnpm build:desktop` | Builds the React app then packages the desktop app |


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