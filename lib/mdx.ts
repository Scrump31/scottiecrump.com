import { bundleMDX } from 'mdx-bundler'
import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'
import readingTime from 'reading-time'
import { visit } from 'unist-util-visit'
import getAllFilesRecursively from './utils/files'
import remarkSlug from 'remark-slug'
import remarkAutolinkHeadings from 'remark-autolink-headings'
import remarkGfm from 'remark-gfm'
import remarkFootnotes from 'remark-footnotes'
import remarkMath from 'remark-math'
import remarkCodeTitles from './remark-code-title'
import remarkTocHeadings from './remark-toc-headings'
import remarkImgToJsx from './remark-img-to-jsx'
import rehypeKatex from 'rehype-katex'
import rehypePrismPlus from 'rehype-prism-plus'
import { FrontMatterProps } from '@/types/blog'

const root = process.cwd()

const tokenClassNames = {
  tag: 'text-code-red',
  'attr-name': 'text-code-yellow',
  'attr-value': 'text-code-green',
  deleted: 'text-code-red',
  inserted: 'text-code-green',
  punctuation: 'text-code-white',
  keyword: 'text-code-purple',
  string: 'text-code-green',
  function: 'text-code-blue',
  boolean: 'text-code-red',
  comment: 'text-gray-400 italic',
}

export function getFiles(type: string): string[] {
  const prefixPaths = path.join(root, 'data', type)
  const files = getAllFilesRecursively(prefixPaths)
  // Only want to return blog/path and ignore root, replace is necessary to work on Windows
  return files.map((file: string) => file.slice(prefixPaths.length + 1).replace(/\\/g, '/'))
}

export function formatSlug(slug: string): string {
  return slug.replace(/\.(mdx|md)/, '')
}

export function dateSortDesc(a: Date, b: Date) {
  if (a > b) return -1
  if (a < b) return 1
  return 0
}

export async function getFileBySlug(type: string, slug: string | string[]) {
  const mdxPath = path.join(root, 'data', type, `${slug}.mdx`)
  const mdPath = path.join(root, 'data', type, `${slug}.md`)

  if (!fs.existsSync(mdxPath) && !fs.existsSync(mdPath)) {
    throw new Error(`No file found for slug: ${slug} in ${type}`)
  }

  const source = fs.existsSync(mdxPath)
    ? fs.readFileSync(mdxPath, 'utf8')
    : fs.readFileSync(mdPath, 'utf8')

  if (!source) {
    throw new Error(`Empty file for slug: ${slug} in ${type}`)
  }

  // https://github.com/kentcdodds/mdx-bundler#nextjs-esbuild-enoent
  if (process.platform === 'win32') {
    process.env.ESBUILD_BINARY_PATH = path.join(
      process.cwd(),
      'node_modules',
      'esbuild',
      'esbuild.exe'
    )
  } else {
    process.env.ESBUILD_BINARY_PATH = path.join(
      process.cwd(),
      'node_modules',
      'esbuild',
      'bin',
      'esbuild'
    )
  }

  let toc: any[] = []
  console.log('Source content:', source.slice(0, 100)) // Log the first 100 characters

  try {
    const { frontmatter, code } = await bundleMDX({
      source,
      // mdx imports can be automatically source from the components directory
      cwd: path.join(process.cwd(), 'components'),
      // @ts-ignore
      xdmOptions(options: any) {
        // this is the recommended way to add custom remark/rehype plugins:
        // The syntax might look weird, but it protects you in case we add/remove
        // plugins in the future.
        options.remarkPlugins = [
          ...(options.remarkPlugins ?? []),
          remarkSlug,
          remarkAutolinkHeadings,
          [remarkTocHeadings, { exportRef: toc }],
          remarkGfm,
          remarkCodeTitles,
          [remarkFootnotes, { inlineNotes: true }],
          remarkMath,
          remarkImgToJsx,
        ]
        options.rehypePlugins = [
          ...(options.rehypePlugins ?? []),
          rehypeKatex,
          [rehypePrismPlus, { ignoreMissing: true }],
          () => {
            return (tree: any) => {
              visit(tree, 'element', (node: any) => {
                let [token, type] = node.properties.className || []
                if (token === 'token' && type in tokenClassNames) {
                  node.properties.className = [
                    tokenClassNames[type as keyof typeof tokenClassNames],
                  ]
                }
              })
            }
          },
        ]
        return options
      },
      esbuildOptions: (options: any) => {
        options.loader = {
          ...options.loader,
          '.js': 'jsx',
        }
        return options
      },
    })
    return {
      mdxSource: code,
      toc,
      frontMatter: {
        readingTime: readingTime(code),
        slug: slug || null,
        fileName: fs.existsSync(mdxPath) ? `${slug}.mdx` : `${slug}.md`,
        ...frontmatter,
        date: frontmatter.date ? new Date(frontmatter.date).toISOString() : null,
      },
    }
  } catch (error) {
    console.error('Error bundling MDX:', error)
    console.error('MDX content:', source)

    throw error
  }
}

export async function getAllFilesFrontMatter(folder: string): Promise<FrontMatterProps[]> {
  const prefixPaths = path.join(root, 'data', folder)

  const files = getAllFilesRecursively(prefixPaths)

  const allFrontMatter: FrontMatterProps[] = []

  files.forEach((file: string) => {
    // Replace is necessary to work on Windows
    const fileName = file.slice(prefixPaths.length + 1).replace(/\\/g, '/')
    // Remove Unexpected File
    if (path.extname(fileName) !== '.md' && path.extname(fileName) !== '.mdx') {
      return
    }
    const source = fs.readFileSync(file, 'utf8')
    const { data: frontmatter } = matter(source)
    if (frontmatter.draft !== true) {
      allFrontMatter.push({
        ...frontmatter,
        slug: formatSlug(fileName),
        date: frontmatter.date ? new Date(frontmatter.date).toISOString() : null,
      } as FrontMatterProps)
    }
  })

  return allFrontMatter.sort((a, b) => {
    if (!a.date && !b.date) return 0
    if (!a.date) return 1
    if (!b.date) return -1
    return dateSortDesc(new Date(a.date), new Date(b.date))
  })
}
