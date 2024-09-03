import { ReactNode, ReactElement } from 'react'

type SectionContainerProps = {
  children: ReactNode
}

/**
 * A component that provides a standardized container for sections of a web page.
 * It wraps its children with a div element with predefined CSS classes for maximum width,
 * horizontal padding, and automatic horizontal centering.
 *
 * @param props - The props for the SectionContainer component.
 * @param props.children - The React nodes to be rendered within the container.
 *
 * @returns A ReactElement representing the SectionContainer component.
 */
export default function SectionContainer({
  children,
}: SectionContainerProps): ReactElement<SectionContainerProps> {
  return <div className="max-w-3xl px-4 mx-auto sm:px-6 xl:max-w-5xl xl:px-0">{children}</div>
}
