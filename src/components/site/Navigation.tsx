"use client"

import Link from "next/link"
import { MenuIcon } from "lucide-react"
import { site } from "@/lib/config"
import { BookingCTA } from "@/components/site/BookingCTA"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"

export function Navigation() {
  return (
    <header className="bg-cream border-b border-panel">
      <div className="mx-auto flex max-w-[var(--container-content)] items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link
          href="/"
          className="font-serif text-ink text-lg font-semibold hover:text-teal transition-colors"
        >
          {site.name}
        </Link>

        {/* Desktop nav */}
        <nav
          aria-label="Main navigation"
          className="hidden md:flex items-center gap-6"
        >
          {site.nav.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-ink hover:text-teal text-sm font-medium transition-colors"
            >
              {label}
            </Link>
          ))}
          <BookingCTA />
        </nav>

        {/* Mobile menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger
              render={
                <Button variant="ghost" size="icon" aria-label="Open menu" />
              }
            >
              <MenuIcon className="size-5" />
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle className="font-serif text-ink">
                  {site.name}
                </SheetTitle>
              </SheetHeader>
              <nav
                aria-label="Mobile navigation"
                className="flex flex-col gap-4 px-4 pt-4"
              >
                {site.nav.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    className="text-ink hover:text-teal text-base font-medium transition-colors"
                  >
                    {label}
                  </Link>
                ))}
                <div className="pt-2">
                  <BookingCTA />
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
