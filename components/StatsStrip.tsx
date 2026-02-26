'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

interface Stat {
  value: number
  suffix: string
  label: string
}

const stats: Stat[] = [
  { value: 5, suffix: '+', label: 'Courses & Books' },
  { value: 10, suffix: 'K+', label: 'Students Taught' },
  { value: 10, suffix: '+', label: 'Years Experience' },
  { value: 7, suffix: '', label: 'ISTQB Certifications' },
]

function StatItem({ value, suffix, label, delay }: Stat & { delay: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return
    let animFrame: number
    const duration = 1500
    const startTime = performance.now()

    const tick = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * value))
      if (progress < 1) animFrame = requestAnimationFrame(tick)
    }

    const timer = setTimeout(() => {
      animFrame = requestAnimationFrame(tick)
    }, delay * 1000)

    return () => {
      clearTimeout(timer)
      cancelAnimationFrame(animFrame)
    }
  }, [isInView, value, delay])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="flex flex-col items-center gap-1.5 px-6 py-8 text-center"
    >
      <span className="font-display text-4xl font-bold tabular-nums text-zinc-900 dark:text-zinc-50 md:text-5xl">
        {count}
        {suffix}
      </span>
      <span className="text-sm text-zinc-500">{label}</span>
    </motion.div>
  )
}

export default function StatsStrip() {
  return (
    <div className="border-y border-zinc-200 dark:border-white/[0.07]">
      <div className="grid grid-cols-2 md:grid-cols-4">
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className={i > 0 ? 'border-l border-zinc-200 dark:border-white/[0.07]' : ''}
          >
            <StatItem {...stat} delay={i * 0.12} />
          </div>
        ))}
      </div>
    </div>
  )
}
