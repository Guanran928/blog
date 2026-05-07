# AGENTS.md — blog.ny4.dev

Personal blog powered by **SvelteKit 2 + MDSveX**, deployed to **Cloudflare Workers**.
Written in **TypeScript 6** (ESM), styled with **Tailwind CSS 4**.

## Development environment

```bash
# Requires nix + direnv (flake.nix provides nodejs, pnpm, prettier)
direnv allow
pnpm install
```

Package manager is **pnpm** (not npm). `.npmrc` has `engine-strict=true`.

## Commands

| Task                       | Command        |
| -------------------------- | -------------- |
| dev server                 | `pnpm dev`     |
| typecheck + build          | `pnpm build`   |
| typecheck only (no build)  | `pnpm check`   |
| lint (prettier + eslint)   | `pnpm lint`    |
| format (prettier write)    | `pnpm format`  |
| deploy to Cloudflare       | `pnpm deploy`  |
| generate wrangler types    | `pnpm gen`     |
| preview (build + wrangler) | `pnpm preview` |

**Order matters**: `pnpm build` runs `wrangler types --check` before `vite build`. If wrangler types fail, the build fails.
`pnpm check` does `wrangler types --check && svelte-kit sync && svelte-check`. The sync step generates `.svelte-kit/tsconfig.json`, which the main tsconfig extends — errors about missing `.svelte-kit` files usually mean you need to run `svelte-kit sync` first.

## Architecture

### Blog posts

Posts live at `src/posts/YYYY-MM-DD-slug/+page.svx` and become routes at `/posts/YYYY-MM-DD-slug`. Each post is a SvelteKit file-based route with YAML frontmatter (`title`, `date`, `tags`).

`src/lib/posts.ts` uses `import.meta.glob` with `{ eager: true }` to collect post metadata at build time. Post content is loaded dynamically via `import()` at request time. Posts are sorted by date descending.

### Svelte 5 runes mode (forced project-wide)

`svelte.config.js` forces runes mode for all non-`node_modules` files. Always use `$state()`, `$derived()`, `$effect()`, `$props()`, `{@render}`, `{#snippet}` — never the legacy Svelte 4 syntax.

### View Transitions

The project uses the View Transition API for page navigation. Elements set `style:--tag="..."` with unique names and `layout.css` maps `--tag` to `view-transition-name`. The `+layout.svelte` wraps navigation in `document.startViewTransition()` via `onNavigate`.

### MDSveX quirks

- `.svx` files mix Markdown with Svelte components. You can use `<script>` tags inside `.svx` files for interactive content.
- MDSveX has poor IDE support and **no Prettier formatting** for `.svx` frontmatter — only lint rules apply.
- The About page's game stats render in `+layout.svelte` (not the `.svx`) because MDSveX breaks Svelte syntax in some cases.
- `remark-footnotes` version is pinned to `~2.0.0` (newer versions are ESM-only with breaking API changes).
- Tables are automatically wrapped in `<div class="overflow-x-auto">` via a custom rehype plugin.

### Server-side caching

`src/lib/server/fetchCached.ts` caches external API responses in module-level variables with a 60s TTL. These persist across requests within a single Cloudflare Worker instance (no external cache). Used for osu!, Steam, Valorant, MonkeyType, and Maimai API calls.

### Styling

**Tailwind CSS 4** — uses `@import 'tailwindcss'` and `@plugin` directives in `src/routes/layout.css`, not the v3 `tailwind.config.*` approach. The `@tailwindcss/typography` plugin is configured for prose styling of blog content. Theme colors are set as CSS custom properties via `@theme inline`.

### Adapter

`@sveltejs/adapter-cloudflare` with `nodejs_compat` and `NODE_VERSION: "24"` (configured in `wrangler.jsonc`).
`vite.config.ts` marks `@icons-pack/svelte-simple-icons` and `@lucide/svelte` as `ssr.noExternal` for SSR compatibility.

## Lint and format

- **ESLint 10 flat config** (`eslint.config.js`) — JS recommended, TS recommended, Svelte recommended, Prettier, browser+node globals. `no-undef` is off per ts-eslint guidance.
- **Prettier** with `prettier-plugin-svelte` and `prettier-plugin-tailwindcss`. Config: tabs, single quotes, no trailing commas, print width 100.
- **Prettier ignores `static/`** entirely.
- `pnpm lint` runs Prettier check first, then ESLint. Both must pass.

## No testing

There are **zero tests** and no test runner configured. Verification is manual: `pnpm check` for types and `pnpm lint` for style.

## No CI/CD

No GitHub Actions or other CI pipelines. Deployment is manual via `pnpm deploy`.
