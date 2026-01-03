import '@/css/tailwind.css'

import { ReactNode } from 'react'
import { Inter } from 'next/font/google'

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

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
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
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} antialiased text-black bg-white dark:bg-gray-900 dark:text-white`}
      >
        <Providers>
          <Analytics />
          <SectionContainer>
            <div className="flex flex-col justify-between h-screen">
              <header className="flex items-center justify-between py-10">
                <div>
                  <Link href="/" aria-label="Tailwind CSS Blog">
                    <div className="flex items-center justify-between">
                      <div className="mr-3">
                        {(() => {
                          const mod = (logoUrl as unknown) as any
                          const src =
                            typeof mod === 'string'
                              ? mod
                              : mod?.src || mod?.default?.src || String(mod)
                          // eslint-disable-next-line @next/next/no-img-element
                          return <img src={src} alt="Logo" width={60} height={60} />
                        })()}
                      </div>
                      {
                        <div className="hidden h-6 text-2xl font-semibold sm:block">
                          {siteMetadata.headerTitle}
                        </div>
                      }
                    </div>
                  </Link>
                </div>
                <div className="flex items-center text-base leading-5">
                  <div className="hidden sm:block">
                    {headerNavLinks.map((link) => (
                      <Link
                        key={link.title}
                        href={link.href}
                        className="p-1 font-medium text-gray-900 sm:p-4 dark:text-gray-100"
                      >
                        {link.title}
                      </Link>
                    ))}
                  </div>
                  <ThemeSwitch />
                  <MobileNav />
                </div>
              </header>
              <main className="mb-auto">{children}</main>
              <Footer />
            </div>
          </SectionContainer>
        </Providers>
      </body>
    </html>
  )
}
