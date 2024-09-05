import { AuthorDetails } from '@/types/author'
import { FrontMatterProps } from '@/types/blog'
import { ReactElement } from 'react'

export interface AuthorPost extends AuthorDetails {
  avatar: string
  linkedin: string
}

export type PostLayoutProps = {
  frontMatter: FrontMatterProps
  authorDetails: AuthorPost[]
  next?: FrontMatterProps
  prev?: FrontMatterProps
  children: ReactElement
}
