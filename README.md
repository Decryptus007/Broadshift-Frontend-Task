# Broadshift Frontend Task

A responsive movie discovery dashboard built with React, TypeScript, Vite, Tailwind CSS, TanStack Query, React Router, and Axios.

## Features

- Home dashboard with sidebar navigation and movie sections.
- Debounced search with genre, year, rating, and sort filters.
- Movie details page with metadata and similar movies.
- Loading, error, and empty states.
- TMDB integration with local fallback data when no API key is provided.

## Getting Started

```bash
pnpm install
pnpm dev
```

The app works without credentials using fallback data. To use live TMDB data, copy `.env.example` to `.env` and set either `VITE_TMDB_API_KEY` or `VITE_TMDB_ACCESS_TOKEN`.

```bash
pnpm build
```
