import { TagSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/layouts/ListLayout'
import generateRss from '@/lib/generate-rss'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import { getAllTags } from '@/lib/tags'
import kebabCase from '@/lib/utils/kebabCase'
import fs from 'fs'
import path from 'path'
import { ReactElement } from 'react'
import { BlogLayoutProps, FrontMatterProps } from '@/types/blog'

const root = process.cwd()

export async function getStaticPaths() {
  const tags = await getAllTags('blog')

  return {
    paths: Object.keys(tags).map((tag) => ({
      params: {
        tag,
      },
    })),
    fallback: false,
  }
}

type TagParamsProps = {
  params: {
    tag: string
  }
}

export async function getStaticProps({ params }: TagParamsProps) {
  const allPosts = await getAllFilesFrontMatter('blog')
  const filteredPosts = allPosts.filter(
    (post: FrontMatterProps) =>
      post.draft !== true && (post.tags?.map((t) => kebabCase(t)).includes(params.tag) ?? '')
  )

  // rss
  const rss = generateRss(filteredPosts, `tags/${params.tag}/feed.xml`)
  const rssPath = path.join(root, 'public', 'tags', params.tag)
  fs.mkdirSync(rssPath, { recursive: true })
  fs.writeFileSync(path.join(rssPath, 'feed.xml'), rss)

  return { props: { posts: filteredPosts, tag: params.tag } }
}

type IdvBlogProps = BlogLayoutProps & {
  tag: string
}

/**
 * Renders a page for a specific tag, displaying a list of posts associated with that tag.
 *
 * @param {Object} props - The component props
 * @param {FrontMatterProps[]} props.posts - An array of blog post objects filtered by the current tag
 * @param {string} props.tag - The current tag being displayed
 * @returns {ReactElement} A React component that renders the tag page with SEO metadata and a list of posts
 */
export default function Tag({ posts, tag }: IdvBlogProps): ReactElement<IdvBlogProps> {
  // Capitalize the first letter and convert space to dash
  const title = tag[0].toUpperCase() + tag.split(' ').join('-').slice(1)
  const pagination = {
    currentPage: 1,
    totalPages: 1,
  }
  return (
    <>
      <TagSEO
        title={`${tag} - ${siteMetadata.author}`}
        description={`${tag} tags - ${siteMetadata.author}`}
      />
      <ListLayout posts={posts} title={title} pagination={pagination} />
    </>
  )
}
