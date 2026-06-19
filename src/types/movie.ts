export type Genre = {
  id: number
  name: string
}

export type Movie = {
  id: number
  title: string
  overview: string
  posterPath: string | null
  backdropPath: string | null
  releaseDate: string
  voteAverage: number
  voteCount: number
  genreIds: number[]
  popularity: number
}

export type MovieDetails = Movie & {
  runtime: number | null
  tagline: string
  genres: Genre[]
  status: string
  budget: number
  revenue: number
  originalLanguage: string
  director: string
  cast: string[]
}

export type SearchFilters = {
  query: string
  genre: string
  year: string
  rating: string
  sortBy: 'popularity' | 'rating' | 'releaseDate'
}

export type MovieCollection = {
  nowPlaying: Movie[]
  popular: Movie[]
  topRated: Movie[]
  upcoming: Movie[]
}
