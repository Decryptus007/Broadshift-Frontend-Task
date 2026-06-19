import { ArrowLeft, Heart, Star } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { MovieCard } from '../components/MovieCard'
import { ErrorState, LoadingPanel } from '../components/StateViews'
import { useMovieDetails, useSimilarMovies } from '../hooks/useMovies'
import {
  backdropUrl,
  compactVotes,
  formatCurrency,
  formatDate,
  formatRuntime,
  imageUrl,
  yearFromDate,
} from '../utils/format'

export function MovieDetailsPage() {
  const { movieId = '' } = useParams()
  const navigate = useNavigate()
  const { data: movie, isLoading, isError } = useMovieDetails(movieId)
  const { data: similarMovies = [] } = useSimilarMovies(movieId)

  if (isLoading) {
    return <LoadingPanel />
  }

  if (isError || !movie) {
    return (
      <div className="p-4 sm:p-6">
        <ErrorState
          title="Movie not found"
          message="We could not load details for this movie. Go back and choose another title."
        />
      </div>
    )
  }

  return (
    <div>
      <div
        className="border-b border-line bg-cover bg-center px-4 py-5 sm:px-6"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(255,255,255,0.98), rgba(255,255,255,0.9)), url(${backdropUrl(movie.backdropPath)})`,
        }}
      >
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mb-6 inline-flex items-center gap-2 text-sm font-extrabold text-ink hover:text-brand"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <div className="grid gap-6 lg:grid-cols-[minmax(240px,360px)_minmax(0,1fr)] lg:gap-8">
          <div className="max-w-[330px] overflow-hidden rounded-md shadow-xl ring-1 ring-slate-200">
            <img src={imageUrl(movie.posterPath, 'w780')} alt={`${movie.title} poster`} className="w-full" />
          </div>

          <article className="max-w-3xl">
            <h1 className="text-3xl font-black tracking-[0px] text-ink sm:text-4xl">{movie.title}</h1>
            <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm font-semibold text-slate-600 sm:text-base">
              <span>{yearFromDate(movie.releaseDate)}</span>
              <span aria-hidden="true">•</span>
              <span>{formatRuntime(movie.runtime)}</span>
              <span aria-hidden="true">•</span>
              <span>{movie.status}</span>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-4 border-b border-line pb-5">
              <div className="inline-flex items-center gap-2 rounded-md border border-line bg-white px-4 py-3 text-sm font-extrabold">
                <Star size={18} className="fill-amber-400 text-amber-400" />
                {movie.voteAverage.toFixed(1)}
              </div>
              <span className="text-sm font-semibold text-slate-600">({compactVotes(movie.voteCount)} votes)</span>
              <button
                type="button"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-brand px-5 text-sm font-extrabold text-white shadow-lg shadow-blue-500/20 hover:bg-brand-dark"
              >
                <Heart size={18} />
                Add to Favorites
              </button>
            </div>

            <section className="mt-5">
              <h2 className="text-lg font-black text-ink">Overview</h2>
              <p className="mt-3 max-w-2xl text-sm font-medium leading-7 text-slate-800 sm:text-base">
                {movie.overview}
              </p>
            </section>

            <section className="mt-6">
              <h2 className="text-lg font-black text-ink">Genres</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {movie.genres.map((genre) => (
                  <span key={genre.id} className="rounded-full bg-slate-100 px-4 py-2 text-xs font-extrabold text-slate-700">
                    {genre.name}
                  </span>
                ))}
              </div>
            </section>

            <dl className="mt-6 grid gap-4 text-sm sm:grid-cols-[140px_minmax(0,1fr)]">
              <Detail label="Release Date" value={formatDate(movie.releaseDate)} />
              <Detail label="Director" value={movie.director} />
              <Detail label="Cast" value={movie.cast.join(', ') || 'N/A'} />
              <Detail label="Language" value={movie.originalLanguage} />
              <Detail label="Budget" value={formatCurrency(movie.budget)} />
              <Detail label="Revenue" value={formatCurrency(movie.revenue)} />
            </dl>
          </article>
        </div>
      </div>

      <section className="px-4 py-6 sm:px-6">
        <h2 className="text-lg font-black text-ink">Similar Movies</h2>
        <div className="movie-scroll -mx-4 mt-4 flex gap-4 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:px-6">
          {similarMovies.map((movieItem) => (
            <MovieCard key={movieItem.id} movie={movieItem} compact />
          ))}
        </div>
        {!similarMovies.length ? (
          <p className="mt-3 text-sm font-semibold text-slate-500">No recommendations available yet.</p>
        ) : null}
      </section>
    </div>
  )
}

type DetailProps = {
  label: string
  value: string
}

function Detail({ label, value }: DetailProps) {
  return (
    <>
      <dt className="font-extrabold text-slate-800">{label}</dt>
      <dd className="font-semibold text-slate-700">{value}</dd>
    </>
  )
}
