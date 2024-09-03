import { useMemo } from 'react'
import { getMDXComponent } from 'mdx-bundler/client'
import { MDXComponents as MDXComponentsType } from 'mdx/types'
import Image from './Image'
import CustomLink from './Link'
import Pre from './Pre'

type LayoutProps = {
  components: MDXComponentsType
  layout: string
  [key: string]: any
}

type MDXLayoutRendererProps = {
  layout: string
  mdxSource: string
  [key: string]: any
}

export const MDXComponents = {
  Image,
  a: CustomLink,
  pre: Pre,
  wrapper: ({ components, layout, ...rest }: LayoutProps) => {
    const Layout = require(`../layouts/${layout}`).default
    return <Layout {...rest} />
  },
}

export const MDXLayoutRenderer = ({ layout, mdxSource, ...rest }: MDXLayoutRendererProps) => {
  const MDXLayout = useMemo(() => getMDXComponent(mdxSource), [mdxSource])

  return <MDXLayout layout={layout} components={MDXComponents as MDXComponentsType} {...rest} />
}
