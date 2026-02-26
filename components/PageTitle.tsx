import { ReactNode, ReactElement } from 'react'

type PageTitleProps = {
  children: ReactNode
}

/**
 * A React component that renders a page title with custom styles.
 *
 * @remarks
 * This component is used to display a page title with consistent styling across the app.
 * It accepts a single child prop, which represents the title content.
 *
 * @param children - The title content to be displayed.
 * @returns A React element representing the page title with custom styles.
 *
 * @example
 * ```tsx
 * <PageTitle>My Page Title</PageTitle>
 * ```
 */
export default function PageTitle({
  children,
}: Readonly<PageTitleProps>): ReactElement<PageTitleProps> {
  return (
    <h1 className="font-display text-3xl font-bold leading-tight tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl md:text-5xl">
      {children}
    </h1>
  )
}
