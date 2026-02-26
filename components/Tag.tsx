import Link from 'next/link'
import { ReactElement } from 'react'
import kebabCase from '@/lib/utils/kebabCase'

type TagProps = {
  text: string
}

const Tag = ({ text }: TagProps): ReactElement<TagProps> => {
  return (
    <Link
      href={`/tags/${kebabCase(text)}`}
      className="mr-1.5 mb-1.5 inline-flex items-center rounded-full bg-blue-500/10 px-2.5 py-0.5 text-xs font-medium text-blue-600 transition-colors hover:bg-blue-500/20 dark:bg-blue-400/10 dark:text-blue-400 dark:hover:bg-blue-400/20"
    >
      {text.split(' ').join('-')}
    </Link>
  )
}

export default Tag
