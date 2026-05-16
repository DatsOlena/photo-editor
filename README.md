# Photo editor

A client-side React app for editing photos with **CSS `filter`** adjustments. Upload an image, tweak filters in real time, then download the result as a PNG. No backend required.

**Stack:** React 19, TypeScript, Vite 8.

## Features

- **Upload & remove** — Pick a local image file; remove it to start over
- **Live preview** — Filters applied via CSS on the preview (`brightness`, `contrast`, `saturate`, `grayscale`, `sepia`, `hue-rotate`, `blur`)
- **Sidebar + slider** — Select a filter, adjust its value; controls are disabled until an image is loaded
- **Reset filters** — Restores all options to defaults (disabled when there is no image or filters are already at default)
- **Download** — Exports the edited image at full resolution as PNG using Canvas (`downloadFilteredImage`)

## Run locally

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

| Command | Description |
| ------- | ----------- |
| `npm run dev` | Development server |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Serve the production build |
| `npm run lint` | Run ESLint |

## Project layout

| Path | Role |
| ---- | ---- |
| `src/App.tsx` | Filter state, upload/remove handlers, download & reset actions |
| `src/components/ImagePlaceholder.tsx` | Image preview, file input, upload/remove UI |
| `src/components/Slider.tsx` | Range input for the active filter |
| `src/components/SidebarItem.tsx` | Sidebar filter buttons |
| `src/utils/downloadFilteredImage.ts` | Canvas export + PNG download |
| `src/index.css` | Grid layout and component styles |

## How filtering works

Each filter option has a `property` (e.g. `brightness`), `value`, `range`, and `unit`. The app builds a CSS filter string such as `brightness(100%) contrast(120%)` and passes it to the preview via `style={{ filter: ... }}` on the image container.

All filters are combined in one string so multiple effects apply at once.

## How download works

1. `getFilterString()` builds the same filter string used for preview.
2. `downloadFilteredImage(imageUrl, filterString)` loads the image into an off-screen `Image`, draws it on a canvas at **natural width/height** with `ctx.filter`, then encodes **PNG** via `canvas.toBlob`.
3. A temporary `<a download>` triggers the file save in the browser.

Preview uses CSS filters on the DOM; export uses `CanvasRenderingContext2D.filter` with the same syntax, so results stay aligned (minor differences possible on effects like blur).

## Notes

- Images are loaded with `URL.createObjectURL`; object URLs are revoked when replacing or removing an image to avoid memory leaks.
- Export is always PNG (lossless). Large photos use full resolution and may use significant memory during export.
