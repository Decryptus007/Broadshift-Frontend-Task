import axios from 'axios'
import { fallbackGenres, fallbackMovies } from '../data/fallbackMovies'
import type { Genre, Movie, MovieCollection, MovieDetails, SearchFilters } from '../types/movie'

type TmdbMovie = {
  id: number
  title?: string
  name?: string
  overview: string
  poster_path: string | null
  backdrop_path: string | null
  release_date?: string
  first_air_date?: string
  vote_average: number
  vote_count: number
  genre_ids?: number[]
  popularity: number
}

type TmdbMovieDetails = TmdbMovie & {
  runtime: number | null
  tagline: string
  genres: Genre[]
  status: string
  budget: number
  revenue: number
  original_language: string
  credits?: {
    crew: Array<{ job: string; name: string }>
    cast: Array<{ name: string }>
  }
}

type TmdbListResponse = {
  results: TmdbMovie[]
}

const apiKey = import.meta.env.VITE_TMDB_API_KEY as string | undefined
const accessToken = import.meta.env.VITE_TMDB_ACCESS_TOKEN as string | undefined
const canUseTmdb = Boolean(apiKey || accessToken)

const tmdb = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: apiKey ? { api_key: apiKey } : undefined,
  headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : undefined,
  timeout: 10000,
})

const mapMovie = (movie: TmdbMovie): Movie => ({
  id: movie.id,
  title: movie.title ?? movie.name ?? 'Untitled',
  overview: movie.overview,
  posterPath: movie.poster_path,
  backdropPath: movie.backdrop_path,
  releaseDate: movie.release_date ?? movie.first_air_date ?? '',
  voteAverage: movie.vote_average,
  voteCount: movie.vote_count,
  genreIds: movie.genre_ids ?? [],
  popularity: movie.popularity,
})

const mapMovieDetails = (movie: TmdbMovieDetails): MovieDetails => {
  const director = movie.credits?.crew.find((member) => member.job === 'Director')?.name ?? 'N/A'
  const cast = movie.credits?.cast.slice(0, 3).map((member) => member.name) ?? []

  return {
    ...mapMovie({ ...movie, genre_ids: movie.genres.map((genre) => genre.id) }),
    runtime: movie.runtime,
    tagline: movie.tagline,
    genres: movie.genres,
    status: movie.status,
    budget: movie.budget,
    revenue: movie.revenue,
    originalLanguage: movie.original_language.toUpperCase(),
    director,
    cast,
  }
}

const delay = (ms = 250) => new Promise((resolve) => window.setTimeout(resolve, ms))

const uniqueMovies = (movies: Movie[]) =>
  Array.from(new Map(movies.map((movie) => [movie.id, movie])).values())

export const movieApi = {
  async getGenres(): Promise<Genre[]> {
    if (!canUseTmdb) return fallbackGenres

    const response = await tmdb.get<{ genres: Genre[] }>('/genre/movie/list')
    return response.data.genres
  },

  async getHomeCollections(): Promise<MovieCollection> {
    if (!canUseTmdb) {
      await delay()
      return {
        nowPlaying: fallbackMovies.slice(0, 5),
        popular: fallbackMovies.slice(5, 11),
        topRated: [...fallbackMovies].sort((a, b) => b.voteAverage - a.voteAverage).slice(0, 6),
        upcoming: fallbackMovies.slice(0, 5).reverse(),
      }
    }

    const [nowPlaying, popular, topRated, upcoming] = await Promise.all([
      tmdb.get<TmdbListResponse>('/movie/now_playing'),
      tmdb.get<TmdbListResponse>('/movie/popular'),
      tmdb.get<TmdbListResponse>('/movie/top_rated'),
      tmdb.get<TmdbListResponse>('/movie/upcoming'),
    ])

    return {
      nowPlaying: nowPlaying.data.results.map(mapMovie),
      popular: popular.data.results.map(mapMovie),
      topRated: topRated.data.results.map(mapMovie),
      upcoming: upcoming.data.results.map(mapMovie),
    }
  },

  async searchMovies(filters: SearchFilters): Promise<Movie[]> {
    if (!canUseTmdb) {
      await delay()
      const query = filters.query.trim().toLowerCase()
      let results = fallbackMovies.filter((movie) => {
        const matchesQuery = query
          ? `${movie.title} ${movie.overview}`.toLowerCase().includes(query)
          : true
        const matchesGenre = filters.genre ? movie.genreIds.includes(Number(filters.genre)) : true
        const matchesYear = filters.year
          ? new Date(movie.releaseDate).getFullYear().toString() === filters.year
          : true
        const matchesRating = filters.rating ? movie.voteAverage >= Number(filters.rating) : true
        return matchesQuery && matchesGenre && matchesYear && matchesRating
      })

      results = [...results].sort((a, b) => {
        if (filters.sortBy === 'rating') return b.voteAverage - a.voteAverage
        if (filters.sortBy === 'releaseDate') return b.releaseDate.localeCompare(a.releaseDate)
        return b.popularity - a.popularity
      })

      return results
    }

    const params = {
      query: filters.query || undefined,
      with_genres: filters.genre || undefined,
      primary_release_year: filters.year || undefined,
      'vote_average.gte': filters.rating || undefined,
      sort_by:
        filters.sortBy === 'rating'
          ? 'vote_average.desc'
          : filters.sortBy === 'releaseDate'
            ? 'primary_release_date.desc'
            : 'popularity.desc',
      include_adult: false,
    }

    const endpoint = filters.query ? '/search/movie' : '/discover/movie'
    const response = await tmdb.get<TmdbListResponse>(endpoint, { params })
    return response.data.results.map(mapMovie)
  },

  async getMovieDetails(movieId: string): Promise<MovieDetails> {
    const fallback = fallbackMovies.find((movie) => movie.id.toString() === movieId)

    if (!canUseTmdb) {
      await delay()
      if (!fallback) throw new Error('Movie not found')
      return fallback
    }

    const response = await tmdb.get<TmdbMovieDetails>(`/movie/${movieId}`, {
      params: { append_to_response: 'credits' },
    })
    return mapMovieDetails(response.data)
  },

  async getSimilarMovies(movieId: string): Promise<Movie[]> {
    if (!canUseTmdb) {
      await delay()
      return fallbackMovies.filter((movie) => movie.id.toString() !== movieId).slice(0, 6)
    }

    const response = await tmdb.get<TmdbListResponse>(`/movie/${movieId}/similar`)
    return uniqueMovies(response.data.results.map(mapMovie)).slice(0, 8)
  },
}
