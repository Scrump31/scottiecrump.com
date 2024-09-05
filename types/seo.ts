import { AuthorPost } from '@/types/post-layout'

export type CommonSEOProps = {
  title: string
  description: string
  ogType: string
  ogImage: string | string[]
  twImage: string
}

export type SEOProps = {
  title: string
  description: string
}

export type BlogSEOProps = {
  authorDetails: AuthorPost[]
  title: string
  summary: string
  date: string | undefined
  lastmod: string | undefined
  url: string
  images?: string | string[]
}
