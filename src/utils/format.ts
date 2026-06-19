export const imageUrl = (path: string | null, size = 'w500') => {
  if (!path) {
    return `https://placehold.co/500x750/f1f5f9/475467?text=No+Poster`
  }

  return `https://image.tmdb.org/t/p/${size}${path}`
}

export const backdropUrl = (path: string | null) => imageUrl(path, 'w1280')

export const yearFromDate = (date: string) => (date ? new Date(date).getFullYear().toString() : 'N/A')

export const formatRuntime = (minutes: number | null) => {
  if (!minutes) return 'N/A'
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  return `${hours}h ${mins}m`
}

export const formatCurrency = (value: number) => {
  if (!value) return 'N/A'

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value)
}

export const formatDate = (date: string) => {
  if (!date) return 'N/A'

  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(date))
}

export const compactVotes = (votes: number) =>
  new Intl.NumberFormat('en-US', { maximumFractionDigits: 1, notation: 'compact' }).format(votes)
