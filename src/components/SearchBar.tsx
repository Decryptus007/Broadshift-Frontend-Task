import { SlidersHorizontal, Search, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'

type SearchBarProps = {
  placeholder?: string
  defaultValue?: string
  onChange?: (value: string) => void
  onSubmit?: (value: string) => void
  onFilterClick?: () => void
  showFilterButton?: boolean
}

export function SearchBar({
  placeholder = 'Search movies...',
  defaultValue = '',
  onChange,
  onSubmit,
  onFilterClick,
  showFilterButton = true,
}: SearchBarProps) {
  const [value, setValue] = useState(defaultValue)
  const hasSearchValue = value.trim().length > 0

  useEffect(() => {
    setValue(defaultValue)
  }, [defaultValue])

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (hasSearchValue) {
      onSubmit?.(value.trim())
      return
    }

    onFilterClick?.()
  }

  const handleChange = (nextValue: string) => {
    setValue(nextValue)
    onChange?.(nextValue)
  }

  return (
    <form className="flex gap-3" onSubmit={handleSubmit}>
      <label className="relative min-w-0 flex-1">
        <span className="sr-only">{placeholder}</span>
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={19} />
        <input
          value={value}
          onChange={(event) => handleChange(event.target.value)}
          placeholder={placeholder}
          className="h-11 w-full rounded-md border border-line bg-white pl-12 pr-11 text-sm font-medium text-slate-800 outline-none transition placeholder:text-slate-500 focus:border-brand focus:ring-4 focus:ring-blue-100"
        />
        {value ? (
          <button
            type="button"
            onClick={() => handleChange('')}
            className="absolute right-3 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-md text-slate-500 hover:bg-slate-100"
            aria-label="Clear search"
          >
            <X size={17} />
          </button>
        ) : null}
      </label>

      {showFilterButton ? (
        <button
          type="submit"
          className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-md bg-[linear-gradient(135deg,#075eea_0%,#1677ff_58%,#f5f9ff_145%)] px-4 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition hover:brightness-95 sm:px-6"
        >
          {hasSearchValue ? <Search size={17} /> : <SlidersHorizontal size={17} />}
          <span className="hidden sm:inline">{hasSearchValue ? 'Search' : 'Filters'}</span>
        </button>
      ) : null}
    </form>
  )
}
