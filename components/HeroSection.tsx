'use client'

import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import Link from '@/components/Link'

const headlineWords = ['I', 'help', 'teams', 'ship', 'software', 'they', 'can', 'trust.']

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: 0.15 + i * 0.07,
      ease: 'easeOut',
    },
  }),
}

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: 'easeOut' as const },
})

export default function HeroSection() {
  return (
    <div className="relative flex min-h-[88vh] flex-col items-center justify-center py-24 text-center">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Dot grid – only visible in dark mode */}
        <div className="absolute inset-0 hidden dark:block bg-dot-grid" />
        {/* Primary glow blob */}
        <div className="absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/15 blur-[120px] dark:bg-blue-500/15" />
        {/* Secondary glow */}
        <div className="absolute right-1/4 bottom-1/4 h-72 w-72 rounded-full bg-blue-500/8 blur-[80px]" />
      </div>

      {/* Role badge */}
      <motion.div {...fadeUp(0)} className="mb-7">
        <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-sm font-medium text-blue-500 dark:text-blue-400">
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-500 dark:bg-blue-400"
          />
          <span>Lead Software Engineer in Test</span>
        </span>
      </motion.div>

      {/* Animated headline */}
      <h1 className="mb-7 font-display text-5xl font-bold leading-tight tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-6xl md:text-7xl">
        {headlineWords.map((word, i) => (
          <motion.span
            key={word}
            custom={i}
            variants={wordVariants}
            initial="hidden"
            animate="visible"
            className={`inline-block mr-[0.22em] last:mr-0 ${
              word === 'trust.'
                ? 'bg-gradient-to-r from-blue-500 to-blue-400 bg-clip-text text-transparent'
                : ''
            }`}
          >
            {word}
          </motion.span>
        ))}
      </h1>

      {/* Subtitle */}
      <motion.p
        {...fadeUp(0.7)}
        className="mb-10 max-w-xl text-lg leading-relaxed text-zinc-500 dark:text-zinc-400"
      >
        Specializing in test automation, quality engineering, and helping QA professionals level up
        their testing careers.
      </motion.p>

      {/* CTA buttons */}
      <motion.div {...fadeUp(0.9)} className="flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition-all hover:bg-blue-500 hover:shadow-blue-500/35 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        >
          Explore the Blog
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            />
          </svg>
        </Link>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 rounded-xl border border-zinc-300 bg-white px-7 py-3.5 text-sm font-semibold text-zinc-700 transition-all hover:border-blue-400 hover:text-blue-600 dark:border-white/[0.12] dark:bg-white/[0.04] dark:text-zinc-300 dark:hover:border-blue-500/50 dark:hover:text-blue-400"
        >
          View Courses
        </Link>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        {...fadeUp(1.2)}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        aria-hidden="true"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="flex h-8 w-5 items-start justify-center rounded-full border-2 border-zinc-300 dark:border-zinc-600 p-1"
        >
          <div className="h-1.5 w-1 rounded-full bg-zinc-400 dark:bg-zinc-500" />
        </motion.div>
      </motion.div>
    </div>
  )
}
