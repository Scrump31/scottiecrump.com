/* eslint-disable jsx-a11y/anchor-has-content */
import Link from 'next/link'

type CustomLinkProps = {
  href: string
  [key: string]: any
}

/**
 * A custom React component for rendering links, handling internal, anchor, and external links.
 *
 * @remarks
 * This component uses Next.js' Link component for internal links and the native anchor tag for anchor and external links.
 *
 * @param props - The props for the CustomLink component.
 * @param props.href - The href attribute for the link.
 * @param props.[key: string] - Additional props to be spread onto the anchor or Link component.
 *
 * @returns - A React element representing the link.
 *
 * @example
 * ```tsx
 * <CustomLink href="/about">About</CustomLink>
 * <CustomLink href="#section1">Section 1</CustomLink>
 * <CustomLink href="https://example.com">External Link</CustomLink>
 * ```
 */
const CustomLink = ({ href, ...rest }: CustomLinkProps) => {
  const isInternalLink = href && href.startsWith('/')
  const isAnchorLink = href && href.startsWith('#')

  if (isInternalLink) {
    return <Link href={href} {...rest}></Link>
  }

  if (isAnchorLink) {
    return <a href={href} {...rest} />
  }

  return <a target="_blank" rel="noopener noreferrer" href={href} {...rest} />
}

export default CustomLink
