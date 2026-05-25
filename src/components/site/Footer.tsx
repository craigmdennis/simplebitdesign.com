import Link from "next/link"
import { site } from "@/lib/config"

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-panel border-t border-panel">
      <div className="mx-auto flex max-w-[var(--container-content)] flex-col gap-4 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1">
          <span className="font-serif text-ink text-base font-semibold">
            {site.name}
          </span>
          <span className="text-teal-soft text-sm">
            Design judgement for AI products.
          </span>
        </div>

        <div className="flex flex-col gap-2 sm:items-end">
          <Link
            href={site.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal hover:text-ink text-sm font-medium transition-colors"
          >
            Book a teardown
          </Link>
          <span className="text-xs text-teal-soft">
            &copy; {year} {site.name}
          </span>
        </div>
      </div>
    </footer>
  )
}
