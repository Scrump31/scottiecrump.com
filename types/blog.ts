export type FrontMatterProps = {
  slug: string
  date: string | undefined
  title: string
  summary: string
  tags?: string[]
  [key: string]: any
  draft?: boolean
}

export type BlogLayoutProps = {
  posts: Array<FrontMatterProps>
  title: string
  initialDisplayPosts?: Array<FrontMatterProps>
  pagination: {
    currentPage: number
    totalPages: number
  }
}
