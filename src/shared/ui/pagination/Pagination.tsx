import '@material/web/focus/md-focus-ring.js'
import '@material/web/iconbutton/icon-button.js'
import '@material/web/ripple/ripple.js'
import { Icon } from '../icon'

interface PaginationProps {
  /** Current page, starting at 1. */
  page: number
  pageSize: number
  total: number
  onPageChange: (page: number) => void
}

// First, last and the pages around the current one; null marks a gap.
function getPageItems(page: number, pageCount: number) {
  const pages = [...new Set([1, page - 1, page, page + 1, pageCount])]
    .filter((item) => item >= 1 && item <= pageCount)
    .sort((a, b) => a - b)

  return pages.flatMap((item, index) =>
    index > 0 && item - pages[index - 1] > 1 ? [null, item] : [item],
  )
}

export function Pagination({ page, pageSize, total, onPageChange }: PaginationProps) {
  const pageCount = Math.ceil(total / pageSize)
  if (pageCount <= 1) return null

  const first = (page - 1) * pageSize + 1
  const last = Math.min(page * pageSize, total)

  return (
    <nav aria-label="Pagination" className="flex flex-wrap items-center justify-between gap-3">
      <p className="text-sm text-on-surface-variant">
        {first}–{last} of {total}
      </p>

      <div className="flex items-center gap-1">
        <md-icon-button
          aria-label="Previous page"
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
        >
          <Icon name="chevronLeft" />
        </md-icon-button>

        {getPageItems(page, pageCount).map((item, index) =>
          item === null ? (
            <span key={`gap-${index}`} className="w-6 text-center text-on-surface-variant">
              …
            </span>
          ) : (
            <button
              key={item}
              type="button"
              aria-label={`Page ${item}`}
              aria-current={item === page ? 'page' : undefined}
              onClick={() => onPageChange(item)}
              className="relative size-10 cursor-pointer rounded-full text-sm font-medium text-on-surface-variant outline-none aria-[current=page]:bg-secondary-container aria-[current=page]:text-on-secondary-container"
            >
              <md-ripple />
              <md-focus-ring />
              {item}
            </button>
          ),
        )}

        <md-icon-button
          aria-label="Next page"
          disabled={page === pageCount}
          onClick={() => onPageChange(page + 1)}
        >
          <Icon name="chevronRight" />
        </md-icon-button>
      </div>
    </nav>
  )
}
