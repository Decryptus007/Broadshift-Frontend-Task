import { useQuery } from '@tanstack/react-query'
import { movieApi } from '../api/tmdb'
import type { SearchFilters } from '../types/movie'

export const useGenres = () =>
  useQuery({
    queryKey: ['genres'],
    queryFn: movieApi.getGenres,
  })

export const useHomeCollections = () =>
  useQuery({
    queryKey: ['home-collections'],
    queryFn: movieApi.getHomeCollections,
  })

export const useSearchMovies = (filters: SearchFilters) =>
  useQuery({
    queryKey: ['search-movies', filters],
    queryFn: () => movieApi.searchMovies(filters),
  })

export const useMovieDetails = (movieId: string) =>
  useQuery({
    queryKey: ['movie-details', movieId],
    queryFn: () => movieApi.getMovieDetails(movieId),
    enabled: Boolean(movieId),
  })

export const useSimilarMovies = (movieId: string) =>
  useQuery({
    queryKey: ['similar-movies', movieId],
    queryFn: () => movieApi.getSimilarMovies(movieId),
    enabled: Boolean(movieId),
  })
