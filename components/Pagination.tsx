import Link from '@/components/Link'

type PaginationProps = {
  totalPages: number
  currentPage: number
}

export default function Pagination({ totalPages, currentPage }: Readonly<PaginationProps>) {
  const prevPage = Number.parseInt(currentPage.toString()) - 1 > 0
  const nextPage =
    Number.parseInt(currentPage.toString()) + 1 <= Number.parseInt(totalPages.toString())

  const btnBase =
    'inline-flex items-center gap-1.5 rounded-lg border px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
  const btnActive =
    'border-zinc-200 bg-white text-zinc-700 hover:border-blue-400 hover:text-blue-600 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-zinc-300 dark:hover:border-blue-500/50 dark:hover:text-blue-400'
  const btnDisabled =
    'cursor-not-allowed border-zinc-100 bg-zinc-50 text-zinc-300 dark:border-white/[0.04] dark:bg-white/[0.02] dark:text-zinc-600'

  return (
    <div className="flex items-center justify-between py-8">
      {prevPage ? (
        <Link
          href={currentPage - 1 === 1 ? '/blog/' : `/blog/page/${currentPage - 1}`}
          className={`${btnBase} ${btnActive}`}
        >
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
          Previous
        </Link>
      ) : (
        <button disabled className={`${btnBase} ${btnDisabled}`}>
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
          Previous
        </button>
      )}

      <span className="text-sm text-zinc-400">
        Page {currentPage} of {totalPages}
      </span>

      {nextPage ? (
        <Link href={`/blog/page/${currentPage + 1}`} className={`${btnBase} ${btnActive}`}>
          Next
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            />
          </svg>
        </Link>
      ) : (
        <button disabled className={`${btnBase} ${btnDisabled}`}>
          Next
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            />
          </svg>
        </button>
      )}
    </div>
  )
}
