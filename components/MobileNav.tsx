'use client'

import { useState } from 'react'
import Link from './Link'
import headerNavLinks from '@/data/headerNavLinks'

const MobileNav = () => {
  const [navShow, setNavShow] = useState<boolean>(false)

  const onToggleNav = () => {
    setNavShow((status: boolean) => {
      if (status) {
        document.body.style.overflow = 'auto'
      } else {
        document.body.style.overflow = 'hidden'
      }
      return !status
    })
  }

  return (
    <div className="sm:hidden">
      <button
        type="button"
        className="ml-1 flex h-9 w-9 items-center justify-center rounded-lg text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-white/[0.06] dark:hover:text-zinc-100"
        aria-label="Toggle Menu"
        aria-expanded={navShow}
        onClick={onToggleNav}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5"
          aria-hidden="true"
        >
          {navShow ? (
            <>
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </>
          ) : (
            <>
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </>
          )}
        </svg>
      </button>

      {/* Full-screen overlay */}
      <div
        className={`fixed inset-0 top-[65px] z-50 transition-all duration-300 ${
          navShow ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        {/* Backdrop */}
        <button
          type="button"
          aria-label="Close menu"
          className="absolute inset-0 cursor-default bg-black/40 backdrop-blur-sm"
          onClick={onToggleNav}
        />

        {/* Slide-in panel */}
        <nav
          className={`absolute right-0 top-0 h-full w-72 overflow-y-auto border-l border-zinc-200 bg-white shadow-2xl transition-transform duration-300 ease-out dark:border-white/[0.08] dark:bg-[#12121a] ${
            navShow ? 'translate-x-0' : 'translate-x-full'
          }`}
          aria-label="Mobile navigation"
        >
          <div className="px-6 pt-8 pb-10">
            <p className="mb-6 text-xs font-semibold uppercase tracking-widest text-zinc-400">
              Navigation
            </p>
            {headerNavLinks.map((link: { title: string; href: string }) => (
              <Link
                key={link.title}
                href={link.href}
                className="block border-b border-zinc-100 py-4 font-display text-xl font-semibold text-zinc-900 transition-colors last:border-b-0 hover:text-blue-600 dark:border-white/[0.06] dark:text-zinc-100 dark:hover:text-blue-400"
                onClick={onToggleNav}
              >
                {link.title}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </div>
  )
}

export default MobileNav
