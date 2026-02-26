import SocialIcon from '@/components/social-icons'
import siteMetadata from '@/data/siteMetadata'
import Link from './Link'
import headerNavLinks from '@/data/headerNavLinks'

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-zinc-50 dark:border-white/[0.06] dark:bg-[#0a0a0f]">
      <div className="mx-auto max-w-6xl px-4 py-14 xl:px-0">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="mb-3 inline-block font-display text-lg font-semibold text-zinc-900 dark:text-zinc-50"
            >
              {siteMetadata.headerTitle}
            </Link>
            <p className="mb-5 max-w-xs text-sm leading-relaxed text-zinc-500">
              Lead Software Engineer in Test, helping teams ship software they can trust.
            </p>
            <div className="flex items-center gap-3.5">
              <SocialIcon kind="mail" href={`mailto:${siteMetadata.email}`} size={5} />
              <SocialIcon kind="github" href={siteMetadata.github} size={5} />
              <SocialIcon kind="instagram" href={siteMetadata.instagram} size={5} />
              <SocialIcon kind="youtube" href={siteMetadata.youtube} size={5} />
              <SocialIcon kind="linkedin" href={siteMetadata.linkedin} size={5} />
              <SocialIcon kind="twitter" href={siteMetadata.twitter} size={5} />
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-zinc-400">
              Pages
            </h3>
            <nav className="flex flex-col gap-2.5" aria-label="Footer navigation">
              {headerNavLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-zinc-500 transition-colors hover:text-blue-600 dark:hover:text-blue-400"
                >
                  {link.title}
                </Link>
              ))}
            </nav>
          </div>

          {/* Connect */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-zinc-400">
              Connect
            </h3>
            <div className="flex flex-col gap-2.5 text-sm">
              <a
                href={`mailto:${siteMetadata.email}`}
                className="text-zinc-500 transition-colors hover:text-blue-600 dark:hover:text-blue-400"
              >
                {siteMetadata.email}
              </a>
              <a
                href={siteMetadata.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-500 transition-colors hover:text-blue-600 dark:hover:text-blue-400"
              >
                GitHub
              </a>
              <a
                href={siteMetadata.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-500 transition-colors hover:text-blue-600 dark:hover:text-blue-400"
              >
                LinkedIn
              </a>
              <a
                href={siteMetadata.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-500 transition-colors hover:text-blue-600 dark:hover:text-blue-400"
              >
                YouTube
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-zinc-200 pt-8 dark:border-white/[0.06] sm:flex-row">
          <p className="text-xs text-zinc-400">
            © {new Date().getFullYear()} {siteMetadata.author}. All rights reserved.
          </p>
          <p className="text-xs text-zinc-400">Built with Next.js &amp; Tailwind CSS</p>
        </div>
      </div>
    </footer>
  )
}
