import { getAllFilesFrontMatter } from '@/lib/mdx'
import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/layouts/ListLayout'
import { PageSEO } from '@/components/SEO'
import { ReactElement } from 'react'
import { BlogLayoutProps } from '@/types/blog'

export const POSTS_PER_PAGE = 5

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter('blog')
  const initialDisplayPosts = posts.slice(0, POSTS_PER_PAGE)
  const pagination = {
    currentPage: 1,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  }

  return { props: { initialDisplayPosts, posts, pagination } }
}

/**
 * Renders the main blog page.
 *
 * This component displays a list of blog posts with pagination and SEO metadata.
 *
 * @param {Object} props - The component props
 * @param {BlogLayoutProps} props.posts - An array of all blog posts
 * @param {BlogLayoutProps} props.initialDisplayPosts - An array of posts to display on the initial page
 * @param {Object} props.pagination - Pagination information
 *
 * @returns {ReactElement<BlogLayoutProps>} A React element representing the blog page
 */
export default function Blog({
  posts,
  initialDisplayPosts,
  pagination,
}: BlogLayoutProps): ReactElement<BlogLayoutProps> {
  return (
    <>
      <PageSEO title={`Blog - ${siteMetadata.author}`} description={siteMetadata.description} />
      <ListLayout
        posts={posts}
        initialDisplayPosts={initialDisplayPosts}
        pagination={pagination}
        title="All Posts"
      />
    </>
  )
}
