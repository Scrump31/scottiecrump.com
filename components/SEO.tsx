// SEO components are now no-ops in App Router
// Use metadata exports in page.tsx files instead
import { BlogSEOProps, SEOProps } from '@/types/seo'

export const PageSEO = ({ title, description }: SEOProps) => {
  // Metadata should be handled by page-level metadata exports
  return null
}

export const TagSEO = ({ title, description }: SEOProps) => {
  // Metadata should be handled by page-level metadata exports
  return null
}

export const BlogSEO = ({
  authorDetails,
  title,
  summary,
  date,
  lastmod,
  url,
  images = [],
}: BlogSEOProps) => {
  // Metadata should be handled by page-level metadata exports
  return null
}
