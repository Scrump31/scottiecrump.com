import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/layouts/ListLayout'
import generateRss from '@/lib/generate-rss'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import { getAllTags } from '@/lib/tags'
import kebabCase from '@/lib/utils/kebabCase'
import fs from 'node:fs'
import path from 'node:path'
import { ReactElement } from 'react'
import { FrontMatterProps } from '@/types/blog'
import { Metadata } from 'next'

const root = process.cwd()

export async function generateStaticParams() {
  const tags = await getAllTags('blog')

  return Object.keys(tags).map((tag) => ({
    tag,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>
}): Promise<Metadata> {
  const { tag } = await params
  return {
    title: `${tag} - ${siteMetadata.author}`,
    description: `${tag} tags - ${siteMetadata.author}`,
  }
}

/**
 * Renders a page for a specific tag, displaying a list of posts associated with that tag.
 *
 * @param {Object} props - The component props
 * @param {Object} props.params - The params object containing the tag
 * @returns {ReactElement} A React component that renders the tag page with SEO metadata and a list of posts
 */
export default async function Tag({
  params,
}: {
  params: Promise<{ tag: string }>
}): Promise<ReactElement> {
  const { tag } = await params
  const allPosts = await getAllFilesFrontMatter('blog')
  const filteredPosts = allPosts.filter(
    (post: FrontMatterProps) =>
      post.draft !== true && (post.tags?.map((t) => kebabCase(t)).includes(tag) ?? '')
  )

  // rss
  const rss = generateRss(filteredPosts, `tags/${tag}/feed.xml`)
  const rssPath = path.join(root, 'public', 'tags', tag)
  fs.mkdirSync(rssPath, { recursive: true })
  fs.writeFileSync(path.join(rssPath, 'feed.xml'), rss)

  // Capitalize the first letter and convert space to dash
  const title = tag[0].toUpperCase() + tag.split(' ').join('-').slice(1)
  const pagination = {
    currentPage: 1,
    totalPages: 1,
  }

  return <ListLayout posts={filteredPosts} title={title} pagination={pagination} />
}
