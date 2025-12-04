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
// Under Turbopack, importing an .svg returns a URL string (not a React component).
// Map kinds to their imported URL so we can render with <img /> consistently.
const components = {
  mail: (Mail as unknown) as string,
  github: (Github as unknown) as string,
  facebook: (Facebook as unknown) as string,
  instagram: (Instagram as unknown) as string,
  youtube: (Youtube as unknown) as string,
  linkedin: (Linkedin as unknown) as string,
  twitter: (Twitter as unknown) as string,
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
