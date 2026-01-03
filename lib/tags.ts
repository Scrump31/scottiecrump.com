import fs from 'node:fs'
import matter from 'gray-matter'
import path from 'node:path'
import { getFiles } from './mdx'
import kebabCase from './utils/kebabCase'

const root = process.cwd()

/**
 * Retrieves a count of all tags used in the specified type of content (for example, blog posts, tutorials).
 *
 * @param type - The type of content (for example, 'blog', 'tutorials') for which to retrieve tags.
 * @returns An object where keys are unique tags and values are the number of times each tag is used.
 *
 * @remarks
 * This function reads all Markdown files in the specified media type's data directory, extracts their front matter,
 * and counts the occurrences of each tag.
 * It ignores tags found in draft content.
 *
 * @example
 * ```typescript
 * const blogTagCount = await getAllTags('blog');
 * console.log(blogTagCount); // { 'typescript': 5, 'react': 3, 'nextjs': 2, ... }
 * ```
 */
export async function getAllTags(type: string): Promise<Record<string, number>> {
  const files = getFiles(type)

  let tagCount: Record<string, number> = {}
  // Iterate through each post, putting all found tags into `tags`
  files.forEach((file) => {
    const source = fs.readFileSync(path.join(root, 'data', type, file), 'utf8')
    const { data } = matter(source)
    if (data.tags && data.draft !== true) {
      data.tags.forEach((tag: any) => {
        const formattedTag = kebabCase(tag)
        if (formattedTag in tagCount) {
          tagCount[formattedTag] += 1
        } else {
          tagCount[formattedTag] = 1
        }
      })
    }
  })

  return tagCount
}
