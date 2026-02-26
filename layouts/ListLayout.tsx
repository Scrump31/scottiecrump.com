'use client'

import { ChangeEvent, useState } from 'react'

import Link from '@/components/Link'
import Tag from '@/components/Tag'
import Pagination from '@/components/Pagination'
import formatDate from '@/lib/utils/formatDate'
import { FrontMatterProps, BlogLayoutProps } from '@/types/blog'

export default function ListLayout({
  posts,
  title,
  initialDisplayPosts = [],
  pagination,
}: Readonly<BlogLayoutProps>) {
  const [searchValue, setSearchValue] = useState<string>('')

  const filteredBlogPosts = posts.filter((frontMatter: FrontMatterProps) => {
    const searchContent =
      frontMatter.title + frontMatter.summary + (frontMatter.tags?.join(' ') ?? '')
    return searchContent.toLowerCase().includes(searchValue.toLowerCase())
  })

  const displayPosts =
    initialDisplayPosts.length > 0 && !searchValue ? initialDisplayPosts : filteredBlogPosts

  return (
    <>
      {/* Page header */}
      <div className="py-12">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400">
          Writing
        </p>
        <h1 className="mb-6 font-display text-4xl font-bold text-zinc-900 dark:text-zinc-50 md:text-5xl">
          {title}
        </h1>

        {/* Search */}
        <div className="relative max-w-md">
          <svg
            className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            aria-label="Search articles"
            type="text"
            onChange={(event: ChangeEvent<HTMLInputElement>) => setSearchValue(event.target.value)}
            placeholder="Search articles..."
            className="block w-full rounded-xl border border-zinc-200 bg-white py-3 pl-11 pr-4 text-sm text-zinc-900 placeholder-zinc-400 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-white/[0.08] dark:bg-[#12121a] dark:text-zinc-100 dark:placeholder-zinc-600 dark:focus:border-blue-400"
          />
        </div>
      </div>

      {/* Article grid */}
      <div className="pb-12">
        {!filteredBlogPosts.length && (
          <p className="py-16 text-center text-zinc-500">No articles found.</p>
        )}
        <div className="grid gap-6 sm:grid-cols-2">
          {displayPosts.map((frontMatter: FrontMatterProps) => {
            const { slug, date, title: postTitle, summary, tags, readingTime } = frontMatter
            return (
              <article
                key={slug}
                className="group flex flex-col rounded-xl border border-zinc-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/10 dark:border-white/[0.08] dark:bg-[#12121a] dark:hover:border-blue-500/20"
              >
                {/* Meta row */}
                <div className="mb-3 flex items-center gap-2 text-xs text-zinc-400">
                  <time dateTime={date}>{formatDate(date)}</time>
                  {readingTime?.text && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span>{readingTime.text}</span>
                    </>
                  )}
                </div>

                {/* Title */}
                <h2 className="mb-3 font-display text-xl font-bold leading-snug text-zinc-900 dark:text-zinc-50">
                  <Link
                    href={`/blog/${slug}`}
                    className="transition-colors hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    {postTitle}
                  </Link>
                </h2>

                {/* Summary */}
                <p className="mb-4 flex-1 text-sm leading-relaxed text-zinc-500 line-clamp-3 dark:text-zinc-400">
                  {summary}
                </p>

                {/* Tags */}
                {tags && tags.length > 0 && (
                  <div className="flex flex-wrap" aria-label="Tags">
                    {tags.map((tag) => (
                      <Tag key={tag} text={tag} />
                    ))}
                  </div>
                )}
              </article>
            )
          })}
        </div>
      </div>

      {pagination && pagination.totalPages > 1 && !searchValue && (
        <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
      )}
    </>
  )
}
