# Photo editor

A small React app for previewing a photo with **CSS `filter`** adjustments. Pick a control in the sidebar, move the slider, and see the image update in real time. Filters are combined into one `filter` string so every effect applies at once.

**Stack:** React 19, TypeScript, Vite 8.

## Features

- **Preview** — Full-viewport image (`src/assets/main-image.jpg`) with `background-size: cover`
- **Adjustments** — Brightness, contrast, saturate, grayscale, sepia, hue-rotate, blur (each with its own range and unit)
- **Reset** — Restores all options to their defaults

## Run locally

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

Other scripts:

| Command        | Description              |
| -------------- | ------------------------ |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Serve the production build |
| `npm run lint`    | Run ESLint               |

## Project layout

| Path | Role |
| ---- | ---- |
| `src/App.tsx` | Filter state, sidebar selection, slider handler, `getImageStyles()` |
| `src/components/Slider.jsx` | Range input wrapper |
| `src/components/SidebarItem.jsx` | Sidebar button |
| `src/index.css` | Grid layout (image / sidebar / slider areas) |
| `src/assets/main-image.jpg` | Demo photo |

## How filtering works

Each option has a `property` (e.g. `brightness`), `value`, and `unit`. The app builds values like `brightness(100%)` and joins them with spaces into a single string passed to React’s `style={{ filter: '...' }}` on the `.main-image` element.
