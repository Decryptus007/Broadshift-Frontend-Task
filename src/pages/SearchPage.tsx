import { SlidersHorizontal } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { MovieCard } from '../components/MovieCard'
import { EmptyState, ErrorState, LoadingGrid } from '../components/StateViews'
import { useGenres, useSearchMovies } from '../hooks/useMovies'
import type { SearchFilters } from '../types/movie'

const years = ['2024', '2023', '2022', '2021', '2020', '2017', '2014', '2012', '2010', '2008', '2005']
const ratings = [
  { label: 'All Ratings', value: '' },
  { label: '7.0+', value: '7' },
  { label: '8.0+', value: '8' },
  { label: '8.5+', value: '8.5' },
]

export function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const { data: genres = [] } = useGenres()

  const [filters, setFilters] = useState<SearchFilters>({
    query: searchParams.get('q') ?? '',
    genre: searchParams.get('genre') ?? '',
    year: searchParams.get('year') ?? '',
    rating: searchParams.get('rating') ?? '',
    sortBy: (searchParams.get('sort') as SearchFilters['sortBy']) ?? 'popularity',
  })

  useEffect(() => {
    setFilters({
      query: searchParams.get('q') ?? '',
      genre: searchParams.get('genre') ?? '',
      year: searchParams.get('year') ?? '',
      rating: searchParams.get('rating') ?? '',
      sortBy: (searchParams.get('sort') as SearchFilters['sortBy']) ?? 'popularity',
    })
  }, [searchParams])

  useEffect(() => {
    const params = new URLSearchParams()
    if (filters.query) params.set('q', filters.query)
    if (filters.genre) params.set('genre', filters.genre)
    if (filters.year) params.set('year', filters.year)
    if (filters.rating) params.set('rating', filters.rating)
    if (filters.sortBy !== 'popularity') params.set('sort', filters.sortBy)
    setSearchParams(params, { replace: true })
  }, [filters, setSearchParams])

  const { data: movies = [], isLoading, isError } = useSearchMovies(filters)
  const resultTitle = filters.query ? `Search Results for "${filters.query}"` : 'Search Movies'
  const activeFilters = useMemo(
    () => Boolean(filters.query || filters.genre || filters.year || filters.rating || filters.sortBy !== 'popularity'),
    [filters],
  )

  const updateFilter = (key: keyof SearchFilters, value: string) => {
    setFilters((current) => ({ ...current, [key]: value }))
  }

  const clearFilters = () => {
    setFilters({ query: '', genre: '', year: '', rating: '', sortBy: 'popularity' })
  }

  return (
    <div className="space-y-5 px-4 py-5 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-black tracking-[0px] text-ink sm:text-2xl">{resultTitle}</h1>
          <p className="mt-1 text-sm font-semibold text-slate-500">{movies.length} results found</p>
        </div>
        {activeFilters ? (
          <button
            type="button"
            onClick={clearFilters}
            className="text-sm font-extrabold text-brand hover:text-brand-dark"
          >
            Clear Filters
          </button>
        ) : null}
      </div>

      <section className="rounded-md border border-line bg-soft p-3 sm:p-4">
        <div className="mb-3 flex items-center gap-2 text-sm font-extrabold text-ink">
          <SlidersHorizontal size={16} />
          Filters
        </div>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <FilterSelect
            label="Genre"
            value={filters.genre}
            onChange={(value) => updateFilter('genre', value)}
            options={[{ label: 'All Genres', value: '' }, ...genres.map((genre) => ({ label: genre.name, value: genre.id.toString() }))]}
          />
          <FilterSelect
            label="Year"
            value={filters.year}
            onChange={(value) => updateFilter('year', value)}
            options={[{ label: 'All Years', value: '' }, ...years.map((year) => ({ label: year, value: year }))]}
          />
          <FilterSelect
            label="Rating"
            value={filters.rating}
            onChange={(value) => updateFilter('rating', value)}
            options={ratings}
          />
          <FilterSelect
            label="Sort By"
            value={filters.sortBy}
            onChange={(value) => updateFilter('sortBy', value)}
            options={[
              { label: 'Popularity', value: 'popularity' },
              { label: 'Rating', value: 'rating' },
              { label: 'Release Date', value: 'releaseDate' },
            ]}
          />
        </div>
      </section>

      {isLoading ? (
        <LoadingGrid />
      ) : isError ? (
        <ErrorState title="Search failed" message="The movie service did not respond. Try again shortly." />
      ) : movies.length ? (
        <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} compact />
          ))}
        </div>
      ) : (
        <EmptyState title="No matching movies" message="Try a broader search term or remove a filter." />
      )}
    </div>
  )
}

type FilterOption = {
  label: string
  value: string
}

type FilterSelectProps = {
  label: string
  value: string
  options: FilterOption[]
  onChange: (value: string) => void
}

function FilterSelect({ label, value, options, onChange }: FilterSelectProps) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-extrabold text-slate-700">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 w-full rounded-md border border-line bg-white px-3 text-sm font-semibold text-slate-800 outline-none transition focus:border-brand focus:ring-4 focus:ring-blue-100"
      >
        {options.map((option) => (
          <option key={`${label}-${option.value}`} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  )
}
