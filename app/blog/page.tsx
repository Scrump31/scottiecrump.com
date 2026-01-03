import { POSTS_PER_PAGE } from './constants'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/layouts/ListLayout'
import { ReactElement } from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: `Blog - ${siteMetadata.author}`,
  description: siteMetadata.description,
}

/**
 * Renders the main blog page.
 *
 * This component displays a list of blog posts with pagination and SEO metadata.
 *
 * @returns {ReactElement} A React element representing the paginated blog page
 */
export default async function Blog(): Promise<ReactElement> {
  const posts = await getAllFilesFrontMatter('blog')
  const initialDisplayPosts = posts.slice(0, POSTS_PER_PAGE)
  const pagination = {
    currentPage: 1,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  }

  return (
    <ListLayout
      posts={posts}
      initialDisplayPosts={initialDisplayPosts}
      pagination={pagination}
      title="All Posts"
    />
  )
}
