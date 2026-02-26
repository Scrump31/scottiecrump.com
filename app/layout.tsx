import '@/css/tailwind.css'

import { ReactNode } from 'react'
import { Outfit, Plus_Jakarta_Sans } from 'next/font/google'

import Analytics from '@/components/analytics'
import Footer from '@/components/Footer'
import Link from '@/components/Link'
import MobileNav from '@/components/MobileNav'
import SectionContainer from '@/components/SectionContainer'
import ThemeSwitch from '@/components/ThemeSwitch'
import { Providers } from './providers'
import headerNavLinks from '@/data/headerNavLinks'
import siteMetadata from '@/data/siteMetadata'
import logoUrl from '@/data/logo.svg'
import { Metadata, Viewport } from 'next'

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
})

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  title: {
    default: siteMetadata.title,
    template: `%s | ${siteMetadata.title}`,
  },
  description: siteMetadata.description,
  icons: {
    icon: [
      { url: '/static/favicons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/static/favicons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: { url: '/static/favicons/apple-touch-icon.png', sizes: '76x76' },
    other: [
      {
        rel: 'mask-icon',
        url: '/static/favicons/safari-pinned-tab.svg',
      },
    ],
  },
  manifest: '/static/favicons/site.webmanifest',
  alternates: {
    types: {
      'application/rss+xml': '/feed.xml',
    },
  },
}

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  const logoSrc = (() => {
    const mod = (logoUrl as unknown) as any
    return typeof mod === 'string' ? mod : mod?.src || mod?.default?.src || String(mod)
  })()

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${outfit.variable} ${plusJakartaSans.variable} font-sans antialiased text-zinc-800 bg-zinc-50 dark:bg-[#0a0a0f] dark:text-zinc-200`}
      >
        <Providers>
          <Analytics />
          <div className="flex min-h-screen flex-col">
            {/* Sticky glassmorphism header */}
            <header className="sticky top-0 z-50 w-full border-b border-zinc-200/70 bg-zinc-50/80 backdrop-blur-xl dark:border-white/[0.06] dark:bg-[#0a0a0f]/80">
              <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 xl:px-0">
                {/* Logo + site name */}
                <Link href="/" aria-label="Scottie Crump — Home">
                  <div className="flex items-center gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={logoSrc}
                      alt="Scottie Crump logo"
                      width={34}
                      height={34}
                      className="rounded-lg"
                    />
                    <span className="hidden font-display text-[1.05rem] font-semibold text-zinc-900 dark:text-zinc-50 sm:block">
                      Scottie Crump
                    </span>
                  </div>
                </Link>

                {/* Desktop nav + controls */}
                <div className="flex items-center gap-1">
                  <nav className="hidden items-center sm:flex" aria-label="Main navigation">
                    {headerNavLinks.map((link) => (
                      <Link
                        key={link.title}
                        href={link.href}
                        className="rounded-lg px-3 py-2 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-white/[0.06] dark:hover:text-zinc-100"
                      >
                        {link.title}
                      </Link>
                    ))}
                  </nav>
                  <ThemeSwitch />
                  <MobileNav />
                </div>
              </div>
            </header>

            {/* Page content */}
            <main className="flex-1">
              <SectionContainer>{children}</SectionContainer>
            </main>

            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}
