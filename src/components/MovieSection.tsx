import { Link } from 'react-router-dom'
import type { Movie } from '../types/movie'
import { EmptyState } from './StateViews'
import { MovieCard } from './MovieCard'

type MovieSectionProps = {
  title: string
  movies: Movie[]
  viewAllTo?: string
}

export function MovieSection({ title, movies, viewAllTo = '/search' }: MovieSectionProps) {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-base font-extrabold tracking-[0px] text-ink">{title}</h2>
        <Link to={viewAllTo} className="text-sm font-extrabold text-brand hover:text-brand-dark">
          View all
        </Link>
      </div>

      {movies.length ? (
        <div className="movie-scroll -mx-4 flex gap-4 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:px-6">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <EmptyState title="No movies here yet" message="Try another category or search term." />
      )}
    </section>
  )
}
