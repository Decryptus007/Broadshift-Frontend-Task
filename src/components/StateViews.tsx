import { AlertCircle, Loader2, SearchX } from 'lucide-react'

export function LoadingGrid() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
      {Array.from({ length: 12 }).map((_, index) => (
        <div key={index} className="animate-pulse">
          <div className="aspect-[2/3] rounded-md bg-slate-100" />
          <div className="mt-3 h-4 rounded bg-slate-100" />
          <div className="mt-2 h-3 w-14 rounded bg-slate-100" />
        </div>
      ))}
    </div>
  )
}

export function LoadingPanel() {
  return (
    <div className="grid min-h-[24rem] place-items-center text-slate-500">
      <div className="flex items-center gap-3 text-sm font-bold">
        <Loader2 className="animate-spin" size={20} />
        Loading movies
      </div>
    </div>
  )
}

type StateProps = {
  title: string
  message: string
}

export function ErrorState({ title, message }: StateProps) {
  return (
    <div className="rounded-md border border-red-100 bg-red-50 px-4 py-5 text-red-800">
      <div className="flex items-start gap-3">
        <AlertCircle className="mt-0.5 shrink-0" size={20} />
        <div>
          <h2 className="font-extrabold">{title}</h2>
          <p className="mt-1 text-sm font-medium">{message}</p>
        </div>
      </div>
    </div>
  )
}

export function EmptyState({ title, message }: StateProps) {
  return (
    <div className="grid min-h-[12rem] place-items-center rounded-md border border-dashed border-line bg-soft px-4 py-8 text-center">
      <div>
        <SearchX className="mx-auto text-slate-400" size={28} />
        <h2 className="mt-3 font-extrabold text-ink">{title}</h2>
        <p className="mt-1 text-sm font-medium text-slate-500">{message}</p>
      </div>
    </div>
  )
}
