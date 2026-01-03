export type FrontMatterProps = {
  slug: string
  date: string | undefined
  title: string
  summary: string
  tags?: string[]
  layout?: string
  draft?: boolean
  lastmod?: string
  readingTime: { text: string; words: string }
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
