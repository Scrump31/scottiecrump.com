import fs from 'fs'
import { ReactElement } from 'react'
import PageTitle from '@/components/PageTitle'
import generateRss from '@/lib/generate-rss'
import { MDXLayoutRenderer } from '@/components/MDXComponents'
import { formatSlug, getAllFilesFrontMatter, getFileBySlug, getFiles } from '@/lib/mdx'
import { BlogProps, FrontMatterProps } from '@/types/blog'

const DEFAULT_LAYOUT = 'PostLayout'

export async function getStaticPaths() {
  const posts = getFiles('blog')
  return {
    paths: posts.map((p) => ({
      params: {
        slug: formatSlug(p).split('/'),
      },
    })),
    fallback: false,
  }
}

export async function getStaticProps({ params }: { params: { slug: string[] } }) {
  const allPosts: FrontMatterProps[] = await getAllFilesFrontMatter('blog')
  const postIndex: number = allPosts.findIndex(
    (post: FrontMatterProps) => formatSlug(post.slug) === params.slug.join('/')
  )
  const prev: FrontMatterProps = allPosts[postIndex + 1] || null
  const next: FrontMatterProps = allPosts[postIndex - 1] || null
  const post = await getFileBySlug('blog', params.slug.join('/'))
  const authorList = (post.frontMatter as any).authors || ['default']
  const authorPromise = authorList.map(async (author: string) => {
    const authorResults = await getFileBySlug('authors', [author])
    return authorResults.frontMatter
  })
  const authorDetails = await Promise.all(authorPromise)

  // rss
  const rss = generateRss(allPosts)
  fs.writeFileSync('./public/feed.xml', rss)

  return { props: { post, authorDetails, prev, next } }
}

/**
 * Renders a blog post or a placeholder for drafts.
 *
 * This component displays either the full blog post content using MDXLayoutRenderer
 * or an "Under Construction" message for draft posts.
 *
 * @param {object} props - The component props.
 * @param {object} props.post - The blog post object containing mdxSource, toc, and frontMatter.
 * @param {Array<object>} props.authorDetails - An array of author information.
 * @param {object|null} props.prev - The previous blog post object or null if there's no previous post.
 * @param {object|null} props.next - The next blog post object or null if there's no next post.
 * @returns {ReactElement<BlogProps>} A React element representing the rendered blog post or draft placeholder.
 */
export default function Blog({
  post,
  authorDetails,
  prev,
  next,
}: BlogProps): ReactElement<BlogProps> {
  const { mdxSource, toc, frontMatter } = post

  return (
    <>
      {frontMatter.draft !== true ? (
        <MDXLayoutRenderer
          layout={frontMatter.layout || DEFAULT_LAYOUT}
          toc={toc}
          mdxSource={mdxSource}
          frontMatter={frontMatter}
          authorDetails={authorDetails}
          prev={prev}
          next={next}
        />
      ) : (
        <div className="mt-24 text-center">
          <PageTitle>
            Under Construction{' '}
            <span role="img" aria-label="roadwork sign">
              🚧
            </span>
          </PageTitle>
        </div>
      )}
    </>
  )
}
