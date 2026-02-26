import Image from './Image'
import Link from './Link'

type CardProps = {
  title: string
  description: string
  imgSrc: string
  href?: string
}

const Card = ({ title, description, imgSrc, href }: CardProps) => (
  <div className="group flex flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/10 dark:border-white/[0.08] dark:bg-[#12121a] dark:hover:border-blue-500/20">
    {/* Thumbnail */}
    <div className="overflow-hidden">
      {href ? (
        <Link href={href} aria-label={`Link to ${title}`} tabIndex={-1}>
          <Image
            alt={title}
            src={imgSrc}
            className="h-48 w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            width={544}
            height={306}
          />
        </Link>
      ) : (
        <Image
          alt={title}
          src={imgSrc}
          className="h-48 w-full object-cover object-center"
          width={544}
          height={306}
        />
      )}
    </div>

    {/* Body */}
    <div className="flex flex-1 flex-col p-6">
      <h2 className="mb-3 font-display text-xl font-bold leading-snug text-zinc-900 dark:text-zinc-50">
        {href ? (
          <Link
            href={href}
            aria-label={`Link to ${title}`}
            className="transition-colors hover:text-blue-600 dark:hover:text-blue-400"
          >
            {title}
          </Link>
        ) : (
          title
        )}
      </h2>
      <p className="mb-5 flex-1 text-sm leading-relaxed text-zinc-500 line-clamp-3 dark:text-zinc-400">
        {description}
      </p>
      {href && (
        <Link
          href={href}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 transition-colors hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
          aria-label={`Link to ${title}`}
        >
          Learn more
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      )}
    </div>
  </div>
)

export default Card
