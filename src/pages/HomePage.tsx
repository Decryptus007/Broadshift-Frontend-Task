import { MovieSection } from '../components/MovieSection'
import { ErrorState, LoadingPanel } from '../components/StateViews'
import { useHomeCollections } from '../hooks/useMovies'

export function HomePage() {
  const { data, isLoading, isError } = useHomeCollections()

  if (isLoading) {
    return <LoadingPanel />
  }

  if (isError || !data) {
    return (
      <div className="p-4 sm:p-6">
        <ErrorState
          title="Unable to load movies"
          message="Please check your connection or TMDB credentials and try again."
        />
      </div>
    )
  }

  return (
    <div className="space-y-8 px-4 py-6 sm:px-6">
      <header>
        <h1 className="text-2xl font-black tracking-[0px] text-ink sm:text-3xl">Discover Movies</h1>
        <p className="mt-2 text-sm font-medium text-slate-600 sm:text-base">
          Find and explore your next favorite movie.
        </p>
      </header>

      <MovieSection title="Now Playing" movies={data.nowPlaying.slice(0, 6)} />
      <MovieSection title="Popular Movies" movies={data.popular.slice(0, 6)} viewAllTo="/search" />
      <MovieSection title="Top Rated" movies={data.topRated.slice(0, 6)} viewAllTo="/search?sort=rating" />
    </div>
  )
}
