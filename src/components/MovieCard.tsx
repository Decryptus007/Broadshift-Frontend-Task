import { Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Movie } from '../types/movie'
import { imageUrl, yearFromDate } from '../utils/format'

type MovieCardProps = {
  movie: Movie
  compact?: boolean
}

export function MovieCard({ movie, compact = false }: MovieCardProps) {
  return (
    <Link
      to={`/movie/${movie.id}`}
      className={[
        'group block min-w-0 rounded-md outline-none focus-visible:ring-4 focus-visible:ring-blue-100',
        compact ? 'w-[138px] sm:w-[154px]' : 'w-[126px] sm:w-[144px] xl:w-[158px]',
      ].join(' ')}
    >
      <div className="relative aspect-[2/3] overflow-hidden rounded-md bg-slate-100 shadow-sm ring-1 ring-slate-200">
        <img
          src={imageUrl(movie.posterPath)}
          alt={`${movie.title} poster`}
          loading="lazy"
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
        <span className="absolute right-2 top-2 inline-flex items-center gap-1 rounded bg-slate-950/85 px-2 py-1 text-xs font-extrabold text-white">
          <Star size={12} className="fill-amber-400 text-amber-400" />
          {movie.voteAverage.toFixed(1)}
        </span>
      </div>
      <div className="mt-3">
        <h3 className="line-clamp-2 min-h-[2.4rem] text-sm font-extrabold leading-5 text-ink">
          {movie.title}
        </h3>
        <p className="mt-1 text-sm font-medium text-slate-500">{yearFromDate(movie.releaseDate)}</p>
      </div>
    </Link>
  )
}
