import { MovieCard } from '../components/MovieCard'
import { EmptyState, ErrorState, LoadingGrid } from '../components/StateViews'
import { useHomeCollections } from '../hooks/useMovies'
import type { Movie, MovieCollection } from '../types/movie'

type CategoryType = 'popular' | 'topRated' | 'upcoming'

type CategoryPageProps = {
  type: CategoryType
}

const categoryMeta: Record<CategoryType, { title: string; description: string; getMovies: (data: MovieCollection) => Movie[] }> = {
  popular: {
    title: 'Popular Movies',
    description: 'Explore the movies audiences are watching and talking about right now.',
    getMovies: (data) => data.popular,
  },
  topRated: {
    title: 'Top Rated Movies',
    description: 'Browse highly rated films from the movie catalog.',
    getMovies: (data) => data.topRated,
  },
  upcoming: {
    title: 'Upcoming Movies',
    description: 'See upcoming releases and new movies arriving soon.',
    getMovies: (data) => data.upcoming,
  },
}

export function CategoryPage({ type }: CategoryPageProps) {
  const { data, isLoading, isError } = useHomeCollections()
  const meta = categoryMeta[type]
  const movies = data ? meta.getMovies(data) : []

  return (
    <div className="space-y-5 px-4 py-6 sm:px-6">
      <header>
        <h1 className="text-2xl font-black tracking-[0px] text-ink sm:text-3xl">{meta.title}</h1>
        <p className="mt-2 max-w-2xl text-sm font-medium text-slate-600 sm:text-base">{meta.description}</p>
      </header>

      {isLoading ? (
        <LoadingGrid />
      ) : isError ? (
        <ErrorState
          title="Unable to load movies"
          message="Please check your connection or TMDB credentials and try again."
        />
      ) : movies.length ? (
        <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} compact />
          ))}
        </div>
      ) : (
        <EmptyState title="No movies found" message="This category has no movies available right now." />
      )}
    </div>
  )
}
