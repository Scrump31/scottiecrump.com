import { ReactNode, ReactElement } from 'react'

type SectionContainerProps = {
  children: ReactNode
}

export default function SectionContainer({
  children,
}: Readonly<SectionContainerProps>): ReactElement<SectionContainerProps> {
  return <div className="mx-auto max-w-6xl px-4 xl:px-0">{children}</div>
}
