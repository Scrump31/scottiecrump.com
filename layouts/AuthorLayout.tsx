import SocialIcon from '@/components/social-icons'
import Image from '@/components/Image'
import { ReactElement } from 'react'
import { AuthorFrontMatter } from '@/types/author'

type AuthorLayoutProps = {
  children: ReactElement
  frontMatter: AuthorFrontMatter
}

const skills = [
  'Playwright',
  'WebdriverIO',
  'Cypress',
  'Vitest',
  'React Testing Library',
  'TypeScript',
  'Next.js',
  'Prompt Engineering',
  'ISTQB',
  'CI/CD',
  'Postman',
  'Python',
  'SQL',
  'Pandas',
  'Databricks',
  'Data Quality Engineering',
]

export default function AuthorLayout({ children, frontMatter }: Readonly<AuthorLayoutProps>) {
  const { name, avatar, occupation, company, email, twitter, linkedin, github } = frontMatter

  return (
    <div className="py-12">
      {/* Page title */}
      <div className="mb-12">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400">
          About
        </p>
        <h1 className="font-display text-4xl font-bold text-zinc-900 dark:text-zinc-50 md:text-5xl">
          {name}
        </h1>
      </div>

      <div className="grid gap-10 lg:grid-cols-[300px_1fr] lg:gap-16">
        {/* ── Sidebar ─────────────────────────────── */}
        <aside className="space-y-6">
          {/* Avatar with glow */}
          <div className="relative">
            <div className="absolute -inset-1.5 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-600/10 blur-md" />
            <Image
              src={avatar}
              alt={`${name} profile photo`}
              width={300}
              height={300}
              className="relative w-full rounded-2xl object-cover"
            />
          </div>

          {/* Info card */}
          <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-white/[0.08] dark:bg-[#12121a]">
            <h2 className="font-display text-xl font-bold text-zinc-900 dark:text-zinc-50">
              {name}
            </h2>
            <p className="mt-1 text-sm text-zinc-500">{occupation}</p>
            {company && (
              <p className="mt-0.5 text-sm font-medium text-blue-600 dark:text-blue-400">
                {company}
              </p>
            )}

            {/* Social icons */}
            <div className="mt-5 flex flex-wrap items-center gap-3.5">
              {email && <SocialIcon kind="mail" href={`mailto:${email}`} size={5} />}
              {github && <SocialIcon kind="github" href={github} size={5} />}
              {linkedin && <SocialIcon kind="linkedin" href={linkedin} size={5} />}
              {twitter && <SocialIcon kind="twitter" href={twitter} size={5} />}
            </div>
          </div>

          {/* Skills card */}
          <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-white/[0.08] dark:bg-[#12121a]">
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-zinc-400">
              Core Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600 dark:bg-white/[0.06] dark:text-zinc-400"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </aside>

        {/* ── Main content (MDX bio) ───────────────── */}
        <div className="prose prose-zinc max-w-none dark:prose-dark">{children}</div>
      </div>
    </div>
  )
}
