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
python3 -m venv .venv && source .venv/bin/activate
pip install -r backend/requirements.txt   # fastapi, uvicorn
pnpm dev:web               # web frontend + API
```

• Front-end  – http://localhost:5173  
• API        – http://localhost:8000/api/word

---

## One-time Rust Setup (macOS / Windows / Linux)

```bash
# Install Rust + cargo in one line
curl https://sh.rustup.rs -sSf | sh -s -- -y
source "$HOME/.cargo/env"

# Install / upgrade the Tauri CLI
cargo install tauri-cli --locked --force

# macOS only – ensure Xcode Command Line Tools are present (required by the linker)
if [[ "$OSTYPE" == "darwin"* ]]; then
  xcode-select -p >/dev/null 2>&1 || xcode-select --install
fi
```

Once the commands above succeed, verify the tool-chain:

```bash
pnpm tauri info   # shows versions & system checks
```

If everything is green, continue below.

---

## Quick start – Desktop

```bash
pnpm dev:desktop           # FastAPI + Tauri dev (opens window)

# Production bundle (.app / .dmg under src-tauri/target/release/bundle)
pnpm build:desktop
```

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