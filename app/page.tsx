import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import productList from '@/data/productList'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import formatDate from '@/lib/utils/formatDate'
import { FrontMatterProps } from '@/types/blog'
import { Product } from '@/types/product'
import { Metadata } from 'next'
import Image from '@/components/Image'
import HeroSection from '@/components/HeroSection'
import StatsStrip from '@/components/StatsStrip'
import AnimateIn from '@/components/AnimateIn'

export const metadata: Metadata = {
  title: siteMetadata.title,
  description: siteMetadata.description,
}

export default async function Home() {
  const posts = await getAllFilesFrontMatter('blog')
  const recentPosts = posts.slice(0, 3)
  const featuredProducts = productList.slice(0, 3)

  return (
    <>
      {/* ─── Hero ─────────────────────────────────────── */}
      <HeroSection />

      {/* ─── Stats ────────────────────────────────────── */}
      <StatsStrip />

      {/* ─── Featured Courses ─────────────────────────── */}
      <section className="py-20">
        <AnimateIn className="mb-10 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400">
              Courses &amp; Books
            </p>
            <h2 className="font-display text-3xl font-bold text-zinc-900 dark:text-zinc-50 md:text-4xl">
              Level Up Your Testing Skills
            </h2>
          </div>
          <Link
            href="/products"
            className="text-sm font-semibold text-blue-600 transition-colors hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
          >
            View all courses →
          </Link>
        </AnimateIn>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProducts.map((product: Product, i) => (
            <AnimateIn key={product.title} delay={i * 0.1}>
              <div className="group flex h-full flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/10 dark:border-white/[0.08] dark:bg-[#12121a] dark:hover:border-blue-500/20">
                <div className="overflow-hidden">
                  <Link
                    href={product.href ?? '#'}
                    aria-label={`View ${product.title}`}
                    tabIndex={-1}
                  >
                    <Image
                      alt={product.title}
                      src={product.imgSrc}
                      className="h-44 w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                      width={544}
                      height={306}
                    />
                  </Link>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="mb-3 font-display text-lg font-bold leading-snug text-zinc-900 dark:text-zinc-50">
                    <Link
                      href={product.href ?? '#'}
                      className="transition-colors hover:text-blue-600 dark:hover:text-blue-400"
                    >
                      {product.title}
                    </Link>
                  </h3>
                  <p className="mb-4 flex-1 text-sm leading-relaxed text-zinc-500 line-clamp-2 dark:text-zinc-400">
                    {product.description}
                  </p>
                  <Link
                    href={product.href ?? '#'}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 transition-colors hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    Learn more
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>
      </section>

      {/* ─── Latest Articles ──────────────────────────── */}
      <section className="border-t border-zinc-200 py-20 dark:border-white/[0.07]">
        <AnimateIn className="mb-10 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400">
              Latest Articles
            </p>
            <h2 className="font-display text-3xl font-bold text-zinc-900 dark:text-zinc-50 md:text-4xl">
              From the Blog
            </h2>
          </div>
          <Link
            href="/blog"
            className="text-sm font-semibold text-blue-600 transition-colors hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
          >
            View all articles →
          </Link>
        </AnimateIn>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {!recentPosts.length && (
            <p className="col-span-3 py-8 text-center text-zinc-500">No posts found.</p>
          )}
          {recentPosts.map((post: FrontMatterProps, i) => {
            const { slug, date, title, summary, tags, readingTime } = post
            return (
              <AnimateIn key={slug} delay={i * 0.1}>
                <article className="group flex h-full flex-col rounded-xl border border-zinc-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/10 dark:border-white/[0.08] dark:bg-[#12121a] dark:hover:border-blue-500/20">
                  <div className="mb-3 flex items-center gap-2 text-xs text-zinc-400">
                    <time dateTime={date}>{formatDate(date)}</time>
                    {readingTime?.text && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span>{readingTime.text}</span>
                      </>
                    )}
                  </div>
                  <h3 className="mb-3 font-display text-xl font-bold leading-snug text-zinc-900 dark:text-zinc-50">
                    <Link
                      href={`/blog/${slug}`}
                      className="transition-colors hover:text-blue-600 dark:hover:text-blue-400"
                    >
                      {title}
                    </Link>
                  </h3>
                  <p className="mb-4 flex-1 text-sm leading-relaxed text-zinc-500 line-clamp-3 dark:text-zinc-400">
                    {summary}
                  </p>
                  {tags && tags.length > 0 && (
                    <div className="flex flex-wrap" aria-label="Article tags">
                      {tags.slice(0, 3).map((tag) => (
                        <Tag key={tag} text={tag} />
                      ))}
                    </div>
                  )}
                </article>
              </AnimateIn>
            )
          })}
        </div>
      </section>

      {/* ─── CTA ──────────────────────────────────────── */}
      <section className="mb-20">
        <AnimateIn>
          <div className="relative overflow-hidden rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-600/10 via-blue-500/5 to-transparent px-8 py-14 text-center dark:from-blue-600/15 dark:via-blue-500/8">
            {/* Background glow */}
            <div
              className="absolute inset-0 -z-10 opacity-30"
              style={{
                background:
                  'radial-gradient(ellipse at center, rgba(59,130,246,0.2) 0%, transparent 70%)',
              }}
            />
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400">
              Level Up
            </p>
            <h2 className="mb-4 font-display text-3xl font-bold text-zinc-900 dark:text-zinc-50 md:text-4xl">
              Ready to level up your testing career?
            </h2>
            <p className="mx-auto mb-8 max-w-xl text-zinc-500 dark:text-zinc-400">
              Explore my courses on ISTQB certifications, test automation, and software quality — or
              read the blog for free insights.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition-all hover:bg-blue-500 hover:shadow-blue-500/35"
              >
                Browse Courses
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 rounded-xl border border-zinc-300 bg-white px-7 py-3.5 text-sm font-semibold text-zinc-700 transition-all hover:border-blue-400 hover:text-blue-600 dark:border-white/[0.12] dark:bg-white/[0.04] dark:text-zinc-300 dark:hover:border-blue-500/50 dark:hover:text-blue-400"
              >
                Read the Blog
              </Link>
            </div>
          </div>
        </AnimateIn>
      </section>
    </>
  )
}
