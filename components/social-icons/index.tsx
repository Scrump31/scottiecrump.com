import Mail from './mail.svg'
import Github from './github.svg'
import Facebook from './facebook.svg'
import Instagram from './instagram.svg'
import Youtube from './youtube.svg'
import Linkedin from './linkedin.svg'
import Twitter from './twitter.svg'

type SocialIconProps = {
  kind: keyof typeof components
  href: string | null
  size?: number
}

// Free SVG Icons from: https://simpleicons.org/
// Next.js 16 may compile SVG imports into a structured object (e.g. `{ src, ... }`).
// This helper normalizes the import into a URL string for use in <img />.
const toUrl = (mod: unknown): string => {
  if (typeof mod === 'string') return mod
  // @ts-ignore – runtime safety for various module shapes
  if (mod && typeof mod === 'object' && 'src' in (mod as any)) return (mod as any).src
  // @ts-ignore – sometimes nested under default
  if (mod && typeof mod === 'object' && (mod as any).default?.src) return (mod as any).default.src
  return String(mod)
}

// Map kinds to their imported URL so we can render with <img /> consistently.
const components = {
  mail: toUrl(Mail as unknown),
  github: toUrl(Github as unknown),
  facebook: toUrl(Facebook as unknown),
  instagram: toUrl(Instagram as unknown),
  youtube: toUrl(Youtube as unknown),
  linkedin: toUrl(Linkedin as unknown),
  twitter: toUrl(Twitter as unknown),
}

const SocialIcon = ({ kind, href, size = 8 }: SocialIconProps) => {
  if (!href) return null

  const src = components[kind]

  return (
    <a
      className="text-sm text-gray-500 transition hover:text-gray-600"
      target="_blank"
      rel="noopener noreferrer"
      href={href}
      aria-label={`Visit ${kind} profile`}
    >
      <span className="sr-only">{kind}</span>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={`${kind} icon`}
        className={`select-none invert-0 dark:invert`}
        width={size * 4}
        height={size * 4}
        loading="lazy"
      />
    </a>
  )
}

export default SocialIcon
