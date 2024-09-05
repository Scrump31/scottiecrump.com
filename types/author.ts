export type AuthorDetails = {
  mdxSource: string
  frontMatter: {
    layout?: string
  }
  name: string
}

export type AuthorFrontMatter = {
  name: string
  avatar: string
  occupation: string
  company: string
  email: string
  twitter: string
  linkedin: string
  github: string
}
