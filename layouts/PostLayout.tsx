import Image from '@/components/Image'
import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { PostLayoutProps } from '@/types/post-layout'

const postDateTemplate: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}

export default function PostLayout({
  frontMatter,
  authorDetails,
  next,
  prev,
  children,
}: Readonly<PostLayoutProps>) {
  const { date, title, tags } = frontMatter

  return (
    <article className="py-12">
      {/* Article header */}
      <header className="mb-10 text-center">
        <div className="mb-3 text-sm text-zinc-400">
          <time dateTime={date}>
            {new Date(date || '').toLocaleDateString(siteMetadata.locale, postDateTemplate)}
          </time>
          <span className="mx-2" aria-hidden="true">
            ·
          </span>
          <span>{`${frontMatter.readingTime.text}`}</span>
        </div>
        <PageTitle>{title}</PageTitle>
      </header>

      {/* Content + sidebar layout */}
      <div className="xl:grid xl:grid-cols-4 xl:gap-x-8">
        {/* Author sidebar */}
        <aside className="xl:col-span-1">
          <div className="mb-6 xl:sticky xl:top-24">
            <h2 className="sr-only">Author</h2>
            <ul className="flex flex-wrap justify-center gap-6 xl:block xl:space-y-6">
              {authorDetails.map((author) => (
                <li key={author.name} className="flex items-center gap-3">
                  {author.avatar && (
                    <Image
                      src={author.avatar}
                      width={40}
                      height={40}
                      alt={`${author.name} avatar`}
                      className="h-10 w-10 rounded-full"
                    />
                  )}
                  <div className="text-sm">
                    <p className="font-semibold text-zinc-900 dark:text-zinc-100">{author.name}</p>
                    {author.linkedin && (
                      <Link
                        href={author.linkedin}
                        className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        LinkedIn
                      </Link>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            {/* Tags */}
            {tags && tags.length > 0 && (
              <div className="mt-6 hidden xl:block">
                <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-zinc-400">
                  Tags
                </h2>
                <div className="flex flex-wrap">
                  {tags.map((tag) => (
                    <Tag key={tag} text={tag} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </aside>

        {/* Article body */}
        <div className="xl:col-span-3">
          <div className="prose prose-zinc max-w-none dark:prose-dark">{children}</div>

          {/* Mobile tags */}
          {tags && tags.length > 0 && (
            <div className="mt-8 xl:hidden">
              <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-zinc-400">
                Tags
              </h2>
              <div className="flex flex-wrap">
                {tags.map((tag) => (
                  <Tag key={tag} text={tag} />
                ))}
              </div>
            </div>
          )}

          {/* Prev / Next navigation */}
          {(next || prev) && (
            <nav
              className="mt-10 grid gap-4 border-t border-zinc-200 pt-8 dark:border-white/[0.07] sm:grid-cols-2"
              aria-label="Article navigation"
            >
              {prev && (
                <div>
                  <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-zinc-400">
                    Previous Article
                  </p>
                  <Link
                    href={`/blog/${prev.slug}`}
                    className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    ← {prev.title}
                  </Link>
                </div>
              )}
              {next && (
                <div className={prev ? '' : 'sm:col-start-2'}>
                  <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-zinc-400">
                    Next Article
                  </p>
                  <Link
                    href={`/blog/${next.slug}`}
                    className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    {next.title} →
                  </Link>
                </div>
              )}
            </nav>
          )}

          <div className="mt-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
            >
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
                  d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                />
              </svg>
              Back to the Blog
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}
