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

type IReadTimeResults = {
  text: string
  time: number
  words: number
  minutes: number
}

export type BlogProps = {
  post: {
    mdxSource: string
    toc: any
    frontMatter: {
      date: string | null
      readingTime: IReadTimeResults
      slug: string | string[] | null
      fileName: string
      draft?: boolean
      layout?: string
    }
  }
  authorDetails: any[]
  prev: FrontMatterProps | null
  next: FrontMatterProps | null
}
