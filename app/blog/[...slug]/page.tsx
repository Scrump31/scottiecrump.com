import fs from 'node:fs'
import { ReactElement } from 'react'
import PageTitle from '@/components/PageTitle'
import generateRss from '@/lib/generate-rss'
import { MDXLayoutRenderer } from '@/components/MDXComponents'
import { formatSlug, getAllFilesFrontMatter, getFileBySlug, getFiles } from '@/lib/mdx'
import { FrontMatterProps } from '@/types/blog'

const DEFAULT_LAYOUT = 'PostLayout'

export async function generateStaticParams() {
  const posts = getFiles('blog')
  return posts.map((p) => ({
    slug: formatSlug(p).split('/'),
  }))
}

/**
 * Renders a blog post or a placeholder for drafts.
 *
 * This component displays either the full blog post content using MDXLayoutRenderer
 * or an "Under Construction" message for draft posts.
 *
 * @param {object} props - The component props.
 * @param {object} props.params - The params object containing the slug.
 * @returns {ReactElement} A React element representing the rendered blog post or draft placeholder.
 */
export default async function Blog({
  params,
}: {
  params: Promise<{ slug: string[] }>
}): Promise<ReactElement> {
  const { slug } = await params
  const allPosts: FrontMatterProps[] = await getAllFilesFrontMatter('blog')
  const postIndex: number = allPosts.findIndex(
    (post: FrontMatterProps) => formatSlug(post.slug) === slug.join('/')
  )
  const prev: FrontMatterProps = allPosts[postIndex + 1] || null
  const next: FrontMatterProps = allPosts[postIndex - 1] || null
  const post = await getFileBySlug('blog', slug.join('/'))
  const authorList = (post.frontMatter as any).authors || ['default']
  const authorPromise = authorList.map(async (author: string) => {
    const authorResults = await getFileBySlug('authors', [author])
    return authorResults.frontMatter
  })
  const authorDetails = await Promise.all(authorPromise)

  // rss
  const rss = generateRss(allPosts)
  fs.writeFileSync('./public/feed.xml', rss)

  const { mdxSource, toc, frontMatter } = post

  return (
    <>
      {(frontMatter as any).draft === true ? (
        <div className="mt-24 text-center">
          <PageTitle>
            Under Construction <span aria-label="roadwork sign">🚧</span>
          </PageTitle>
        </div>
      ) : (
        <MDXLayoutRenderer
          layout={(frontMatter as any).layout || DEFAULT_LAYOUT}
          toc={toc}
          mdxSource={mdxSource}
          frontMatter={frontMatter}
          authorDetails={authorDetails}
          prev={prev}
          next={next}
        />
      )}
    </>
  )
}
