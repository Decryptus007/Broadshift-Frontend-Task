import { Calendar, Clapperboard, Flame, Home, TrendingUp } from 'lucide-react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { SearchBar } from './SearchBar'

const navItems = [
  { label: 'Home', icon: Home, to: '/' },
  { label: 'Popular', icon: Flame, to: '/search?sort=popularity' },
  { label: 'Top Rated', icon: TrendingUp, to: '/search?sort=rating' },
  { label: 'Upcoming', icon: Calendar, to: '/search?year=2024' },
]

const activeNavClass =
  'bg-[linear-gradient(135deg,#075eea_0%,#1677ff_58%,#f5f9ff_145%)] !text-white shadow-lg shadow-blue-500/20 [&_*]:!text-white'

export function AppLayout() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen px-3 py-3 text-ink sm:px-5 lg:px-6">
      <div className="mx-auto grid max-w-[1480px] gap-4 lg:grid-cols-[184px_minmax(0,1fr)]">
        <aside className="min-w-0 rounded-lg border border-line bg-panel shadow-panel lg:min-h-[calc(100vh-1.5rem)]">
          <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-4 lg:block lg:border-b-0 lg:px-5 lg:py-7">
            <NavLink to="/" className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-md bg-[linear-gradient(135deg,#075eea_0%,#1677ff_60%,#f5f9ff_145%)] text-white shadow-lg shadow-blue-500/20">
                <Clapperboard size={21} />
              </span>
              <span className="text-lg font-extrabold tracking-[0px]">MovieHub</span>
            </NavLink>
          </div>

          <nav className="movie-scroll flex gap-2 overflow-x-auto px-3 pb-3 lg:mt-5 lg:block lg:space-y-5 lg:overflow-visible lg:px-4">
            {navItems.map(({ label, icon: Icon, to }) => (
              <NavLink
                key={label}
                to={to}
                className={({ isActive }) =>
                  [
                    'flex min-w-max items-center gap-3 rounded-md px-3 py-3 text-sm font-semibold transition lg:min-w-0 lg:px-4',
                    isActive ? activeNavClass : 'text-slate-700 hover:bg-blue-50 hover:text-brand',
                  ].join(' ')
                }
              >
                <Icon size={18} />
                {label}
              </NavLink>
            ))}
          </nav>
        </aside>

        <main className="min-w-0 rounded-lg border border-line bg-panel shadow-panel">
          <div className="border-b border-line px-4 py-4 sm:px-6">
            <SearchBar
              placeholder="Search movies..."
              onSubmit={(query) => navigate(`/search?q=${encodeURIComponent(query)}`)}
            />
          </div>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
