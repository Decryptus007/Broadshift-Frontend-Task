import { Route, Routes } from 'react-router-dom'
import { AppLayout } from './components/AppLayout'
import { HomePage } from './pages/HomePage'
import { MovieDetailsPage } from './pages/MovieDetailsPage'
import { CategoryPage } from './pages/CategoryPage'
import { SearchPage } from './pages/SearchPage'

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/popular" element={<CategoryPage type="popular" />} />
        <Route path="/top-rated" element={<CategoryPage type="topRated" />} />
        <Route path="/upcoming" element={<CategoryPage type="upcoming" />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/movie/:movieId" element={<MovieDetailsPage />} />
        <Route path="*" element={<HomePage />} />
      </Route>
    </Routes>
  )
}
