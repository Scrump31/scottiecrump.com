import productList from '@/data/productList'
import siteMetadata from '@/data/siteMetadata'
import { Product } from '@/types/product'
import { Metadata } from 'next'
import Image from '@/components/Image'
import Link from '@/components/Link'

export const metadata: Metadata = {
  title: `Products - ${siteMetadata.author}`,
  description: siteMetadata.description,
}

export default function Products() {
  return (
    <div className="py-12">
      {/* Header */}
      <div className="mb-12">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400">
          Courses &amp; Books
        </p>
        <h1 className="mb-4 font-display text-4xl font-bold text-zinc-900 dark:text-zinc-50 md:text-5xl">
          Educational Products
        </h1>
        <p className="max-w-2xl text-lg text-zinc-500 dark:text-zinc-400">
          Courses, books, and learning resources to help you master software testing and advance
          your QA career.
        </p>
      </div>

      {/* Product grid */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {productList.map((product: Product) => (
          <article
            key={product.title}
            className="group flex flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/10 dark:border-white/[0.08] dark:bg-[#12121a] dark:hover:border-blue-500/20"
          >
            {/* Thumbnail */}
            <div className="overflow-hidden">
              {product.href ? (
                <Link href={product.href} aria-label={`View ${product.title}`} tabIndex={-1}>
                  <Image
                    alt={product.title}
                    src={product.imgSrc}
                    className="h-48 w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    width={544}
                    height={306}
                  />
                </Link>
              ) : (
                <Image
                  alt={product.title}
                  src={product.imgSrc}
                  className="h-48 w-full object-cover object-center"
                  width={544}
                  height={306}
                />
              )}
            </div>

            {/* Body */}
            <div className="flex flex-1 flex-col p-6">
              <h2 className="mb-3 font-display text-xl font-bold leading-snug text-zinc-900 dark:text-zinc-50">
                {product.href ? (
                  <Link
                    href={product.href}
                    aria-label={`Link to ${product.title}`}
                    className="transition-colors hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    {product.title}
                  </Link>
                ) : (
                  product.title
                )}
              </h2>
              <p className="mb-6 flex-1 text-sm leading-relaxed text-zinc-500 line-clamp-4 dark:text-zinc-400">
                {product.description}
              </p>
              {product.href && (
                <Link
                  href={product.href}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-blue-500/20 transition-all hover:bg-blue-500 hover:shadow-blue-500/30"
                >
                  Learn More
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
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
