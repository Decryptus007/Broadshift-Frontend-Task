# Broadshift Frontend Task

A responsive movie discovery dashboard built with React, TypeScript, Vite, Tailwind CSS, TanStack Query, React Router, and Axios.

## Features

- Home dashboard with sidebar navigation and movie sections.
- Debounced search with genre, year, rating, and sort filters.
- Movie details page with metadata and similar movies.
- Loading, error, and empty states.
- TMDB API integration through Axios and TanStack Query.
- Optional fallback data for offline/demo review when explicitly enabled.

## Getting Started

```bash
pnpm install
pnpm dev
```

Copy `.env.example` to `.env` and set either `VITE_TMDB_API_KEY` or `VITE_TMDB_ACCESS_TOKEN` to use the live TMDB API.

For offline review only, set `VITE_USE_FALLBACK_MOVIES=true`.

```bash
pnpm build
```
