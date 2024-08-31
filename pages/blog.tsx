import { getAllFilesFrontMatter } from '@/lib/mdx'
import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/layouts/ListLayout'
import { PageSEO } from '@/components/SEO'
import { ReactElement } from 'react'

export const POSTS_PER_PAGE = 5

export type FrontMatterProps = {
  slug: string
  date: string
  title: string
  summary: string
  tags: string[]
}

type BlogProps = {
  posts: Array<FrontMatterProps>
  initialDisplayPosts: Array<FrontMatterProps>
  pagination: {
    currentPage: number
    totalPages: number
  }
}

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
 * @param {FrontMatter[]} props.posts - An array of all blog posts
 * @param {FrontMatter[]} props.initialDisplayPosts - An array of posts to display on the initial page
 * @param {Object} props.pagination - Pagination information
 *
 * @returns {ReactElement<BlogProps>} A React element representing the blog page
 */
export default function Blog({
  posts,
  initialDisplayPosts,
  pagination,
}: BlogProps): ReactElement<BlogProps> {
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
