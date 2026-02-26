import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import formatDate from '@/lib/utils/formatDate'
import { FrontMatterProps } from '@/types/blog'
import { ReactElement } from 'react'
import { AuthorPost } from '@/types/post-layout'

type PostLayoutProps = {
  children: ReactElement
  frontMatter: FrontMatterProps
  authorDetails: AuthorPost[]
  next: FrontMatterProps | null
  prev: FrontMatterProps | null
}

export default function PostSimpleLayout({
  frontMatter,
  next,
  prev,
  children,
}: Readonly<PostLayoutProps>) {
  const { date, title } = frontMatter

  return (
    <article className="py-12">
      <header className="mb-10 border-b border-zinc-200 pb-10 text-center dark:border-white/[0.07]">
        <p className="mb-3 text-sm text-zinc-400">
          <time dateTime={date}>{formatDate(date)}</time>
        </p>
        <PageTitle>{title}</PageTitle>
      </header>

      <div className="prose prose-zinc max-w-none dark:prose-dark">{children}</div>

      {(prev || next) && (
        <nav
          className="mt-10 flex flex-col gap-4 border-t border-zinc-200 pt-8 dark:border-white/[0.07] sm:flex-row sm:justify-between"
          aria-label="Article navigation"
        >
          {prev && (
            <Link
              href={`/blog/${prev.slug}`}
              className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
            >
              ← {prev.title}
            </Link>
          )}
          {next && (
            <Link
              href={`/blog/${next.slug}`}
              className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 sm:text-right"
            >
              {next.title} →
            </Link>
          )}
        </nav>
      )}
    </article>
  )
}
