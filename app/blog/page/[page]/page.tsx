import { ReactElement } from 'react'
import siteMetadata from '@/data/siteMetadata'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import ListLayout from '@/layouts/ListLayout'
import { POSTS_PER_PAGE } from '../../constants'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: siteMetadata.title,
  description: siteMetadata.description,
}

export async function generateStaticParams() {
  const totalPosts = await getAllFilesFrontMatter('blog')
  const totalPages = Math.ceil(totalPosts.length / POSTS_PER_PAGE)
  const paths = Array.from({ length: totalPages }, (_, i) => ({
    page: (i + 1).toString(),
  }))

  return paths
}

/**
 * Renders the main page for displaying blog posts with pagination.
 *
 * @param props - The props object containing page params.
 * @param props.params - The params object containing the page number.
 * @returns A React element representing the blog post page with SEO and list layout.
 */
export default async function PostPage({
  params,
}: {
  params: Promise<{ page: string }>
}): Promise<ReactElement> {
  const { page } = await params
  const posts = await getAllFilesFrontMatter('blog')
  const pageNumber = parseInt(page)
  const initialDisplayPosts = posts.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber
  )
  const pagination = {
    currentPage: pageNumber,
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
