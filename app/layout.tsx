import '@/css/tailwind.css'

import { ReactNode } from 'react'

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

export const metadata = {
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="apple-touch-icon" sizes="76x76" href="/static/favicons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/static/favicons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/static/favicons/favicon-16x16.png" />
        <link rel="manifest" href="/static/favicons/site.webmanifest" />
        <link rel="mask-icon" href="/static/favicons/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="theme-color" content="#000000" />
        <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.13.11/dist/katex.min.css"
          integrity="sha384-Um5gpz1odJg5Z4HAmzPtgZKdTBHZdw8S29IecapCSB31ligYPhHQZMIlWLYQGVoc"
          crossOrigin="anonymous"
        />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9102724327915994"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body className="antialiased text-black bg-white dark:bg-gray-900 dark:text-white">
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
