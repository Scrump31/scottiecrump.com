import Link from 'next/link'
import { ReactElement } from 'react'
import kebabCase from '@/lib/utils/kebabCase'

type TagProps = {
  text: string
}

/**
 * A functional component that renders a tag link.
 *
 * @remarks
 * This component takes a `text` prop, which represents the tag's text.
 * It uses the `kebabCase` function to format the tag text.
 * The tag link is rendered as a Next.js `Link` component with the appropriate href and className.
 *
 * @param props - The props for the Tag component.
 * @param props.text - The text of the tag.
 *
 * @returns A ReactElement representing the Tag component.
 */
const Tag = ({ text }: TagProps): ReactElement<TagProps> => {
  return (
    <Link
      href={`/tags/${kebabCase(text)}`}
      className="mr-3 text-sm font-medium uppercase text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
    >
      {text.split(' ').join('-')}
    </Link>
  )
}

export default Tag
