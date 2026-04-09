# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Install dependencies
pnpm install

# Development (all apps in parallel, ports 3000–3003)
pnpm dev

# Build all apps
pnpm build

# Preview production builds
pnpm preview

# Lint, format, or check (Biome)
pnpm lint
pnpm format
pnpm check

# Run a single app
pnpm --filter shell dev
pnpm --filter claims dev
pnpm --filter coverage dev
pnpm --filter policy dev
```

There are no test scripts configured in this repository.

## Architecture

This is a **pnpm monorepo** with a **Module Federation** micro-frontend architecture built on **Rsbuild**.

### Workspace layout

```
apps/
  shell/      # Host app (port 3000) — loads all remotes
  policy/     # Remote MFE (port 3001)
  claims/     # Remote MFE (port 3002)
  coverage/   # Remote MFE (port 3003)
libs/
  auth/       # @acme/auth — shared auth state (nanostores)
  ui-kit/     # @acme/ui-kit — shared component library
```

### Module Federation

The **shell** is the host: it dynamically imports the `App` component from each remote at runtime via `mf-manifest.json`:

```
policy@http://localhost:3001/mf-manifest.json
claims@http://localhost:3002/mf-manifest.json
coverage@http://localhost:3003/mf-manifest.json
```

Each remote exposes `'./App': './src/App'` in its `module-federation.config.ts`. The shell lazy-loads these with `React.lazy()` wrapped in `<Suspense>` + `<ErrorBoundary>`.

All apps share `react`, `react-dom`, `@acme/auth`, and `@acme/ui-kit` as **singleton + eager** to prevent duplicate instances across remotes. Type declarations for federated modules live in `apps/shell/src/remote.d.ts`.

Each remote app's entry (`index.tsx`) uses the bootstrap pattern:
```ts
import('./bootstrap');
```

### Shared libraries

- **`@acme/auth`**: Exposes `authStore` (nanostores atom) and `useAuth()` hook. Auth state (`user`, `isAuthenticated`, `token`) is shared as a singleton across all remotes via MF shared config.
- **`@acme/ui-kit`**: Exports `Button`, `StatusBadge`, `Table`, `PageLayout`. Components use CSS Modules; design tokens are CSS variables in `libs/ui-kit/src/tokens/index.css`.

### Adding a new remote MFE

1. Create `apps/<name>/` with the same rsbuild + MF config pattern as the existing remotes.
2. Add it to `pnpm-workspace.yaml`.
3. Add the remote entry in `apps/shell/module-federation.config.ts`.
4. Add a type declaration in `apps/shell/src/remote.d.ts`.

### Dependency versions

Canonical versions are managed via **pnpm catalogs** in `pnpm-workspace.yaml`. Reference them in `package.json` with `"catalog:"` instead of pinning versions directly.

## Tooling

- **Biome** (`biome.json`): single tool for linting and formatting across the entire monorepo. Configured with strict rules (exhaustive deps, hook rules, `const` enforcement, `import type`, no unused vars). Run `pnpm check` to lint + format together.
- **TypeScript**: base config in `tsconfig.base.json` (`strict: true`, `moduleResolution: bundler`). Each package extends it.
