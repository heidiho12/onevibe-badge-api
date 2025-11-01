## Purpose

Short, actionable guidance for AI coding agents working on this repository. Focus on the single-page prototype `one_vibe_digitale_activatiepagina_prototype.jsx`, the site templates, and static asset patterns.

## Big picture

- This workspace currently contains a client-side React prototype implemented in a single file: `one_vibe_digitale_activatiepagina_prototype.jsx`.
- The component is a client-only UI (top line: `use client`) that combines UI (Tailwind-like utility classes), animations (`framer-motion`) and a 3D preview built with `@react-three/fiber` + `@react-three/drei`.
- There are two JSON/html template files: `one-vibe-template.json` (an HTML template blob) and `one-vibe-website.json` (structured site content). These are not a build system — they are content/templates the app references.
- Static 3D assets follow a simple pattern: `/avatars/*.glb`. Example referenced in code: `/avatars/mint.glb` and a local file `mintglow.glb` appears in the workspace root.

## Key files to read first

- `one_vibe_digitale_activatiepagina_prototype.jsx` — primary React component and the place to implement UI, 3D logic and small experiments. Contains inline Dutch comments and a `TESTS` export describing expected behaviours.
- `one-vibe-template.json` — an HTML/CSS template dump (includes references to jQuery, fonts, and legacy CSS). Useful when migrating or extracting static assets.
- `one-vibe-website.json` — structured site/content data (pages, sections) used for static rendering or seed content.

## Important patterns & guardrails (follow these exactly)

- Guard model loads: always validate model URLs before calling `useGLTF`. The project uses this helper:
  - looksLikeModel(url) => /\.(glb|gltf)(\?.*)?$/i
  - If a URL doesn't match, render the DOM silhouette (`AvatarSilhouetteBox`) and avoid any `useGLTF` or Canvas usage.
- Conditional Canvas: the code intentionally avoids mounting `<Canvas>` unless the URL looks like a model. Keep that pattern to prevent hook/runtime errors.
- Three.js resource lifecycle:
  - Canvas is keyed by `url` (e.g. `<Canvas key={url} ...>`). Preserve `key={url}` when changing how models are loaded.
  - When embedding the loaded scene, use `<primitive object={scene} dispose={null} />` (the project uses `dispose={null}` to rely on shared caching behavior).
- Error handling and UX:
  - `ErrorBoundary` + `Suspense` + `LoaderOverlay` are used to show fallback UI (see `AvatarFallback`). Keep this composition when adding or changing model loading.
- Animations & UI:
  - Motion animations use `framer-motion` with short delays; keep timing consistent when adding new motion elements.
- Tests (meta):
  - The file exports `TESTS` (an array of expected behaviours). Update that array when you change semantics so the human reviewer can run quick manual checks.

## Integration points & dependencies (discovered)

- React / Client runtime: `use client` implies this component runs fully client-side (likely inside a Next.js app or a standalone React app). No package.json detected in workspace, so exact setup is unknown.
- 3D ecosystem: `@react-three/fiber`, `@react-three/drei`, `three` (implicitly required). Code also references `useGLTF` and `useProgress` from `drei`.
- Animations: `framer-motion`.
- Template file uses older front-end libraries (jQuery, slick, fancybox, bootstrap) — treat `one-vibe-template.json` as a static asset source, not as the runtime for the React prototype.

If you need to run or extend locally, request the project's package.json or preferred dev commands from the maintainer — they are not present here.

## Editing rules for AI agents

1. Never call `useGLTF(url)` unless `looksLikeModel(url)` returns true.
2. Preserve the `Canvas key={url}` and `dispose={null}` patterns unless you understand three.js memory implications.
3. Keep user-visible strings and labels in Dutch as found in the file (UI text is intentionally Dutch). Leave copy edits to maintainers.
4. When adding or changing third-party packages, update a `package.json` and list the minimal versions in the PR description; do not modify the global environment.
5. Update the `TESTS` export in `one_vibe_digitale_activatiepagina_prototype.jsx` when behavior changes and include one-line rationale for the change.

## Quick examples (from the code)

- Model guard: `const looksLikeModel = (u) => /\.(glb|gltf)(\?.*)?$/i.test(u || "");`
- Canvas pattern: `<Canvas key={url} camera={{ position: [0, 1.3, 2.2], fov: 40 }}>` and `<primitive object={scene} dispose={null} />`
- Loader + fallback: `ErrorBoundary` -> `Suspense fallback={<LoaderOverlay/>}` -> `AvatarModel`

## Missing information / questions for maintainers

- There is no `package.json`, no build scripts and no instructions for local dev. Ask the maintainer:
  - Which framework/build (Next.js / Vite / CRA) should be used and provide the package.json if available?
  - Where are production assets (the `/avatars` folder) hosted or expected locally?

## When to create PRs vs edit directly

- Small cosmetic changes (wording, small Tailwind tweaks) can be made in a branch and pushed as a short PR.
- Structural changes (adding state management, changing 3D loading lifecycle, or introducing server-side code) must include:
  - updated `package.json` and lockfile
  - rationale and migration steps in the PR description
  - updates to the `TESTS` export to reflect new expected behaviour

---

If anything here is unclear or you want the file tuned to a particular CI/dev flow, tell me which dev command you'd like documented (e.g. `npm run dev`, `next dev`, `vite`) and I will update this file accordingly.
