import Link from '@/components/Link'

type PaginationProps = {
  totalPages: number
  currentPage: number
}

export default function Pagination({ totalPages, currentPage }: Readonly<PaginationProps>) {
  const prevPage = Number.parseInt(currentPage.toString()) - 1 > 0
  const nextPage =
    Number.parseInt(currentPage.toString()) + 1 <= Number.parseInt(totalPages.toString())

  return (
    <div className="pt-6 pb-8 space-y-2 md:space-y-5">
      <nav className="flex justify-between">
        {!prevPage && (
          <button rel="previous" className="cursor-auto disabled:opacity-50" disabled={!prevPage}>
            Previous
          </button>
        )}
        {prevPage && (
          <Link href={currentPage - 1 === 1 ? `/blog/` : `/blog/page/${currentPage - 1}`}>
            <button rel="previous">Previous</button>
          </Link>
        )}
        <span>
          {currentPage} of {totalPages}
        </span>
        {!nextPage && (
          <button rel="next" className="cursor-auto disabled:opacity-50" disabled={!nextPage}>
            Next
          </button>
        )}
        {nextPage && (
          <Link href={`/blog/page/${currentPage + 1}`}>
            <button rel="next">Next</button>
          </Link>
        )}
      </nav>
    </div>
  )
}
