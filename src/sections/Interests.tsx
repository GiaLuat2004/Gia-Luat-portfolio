'use client'

import { useRef, useState, useEffect, useCallback, useMemo } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Heart, Sparkles } from 'lucide-react'
import { useLanguage } from '@/lib/i18n/LanguageContext'

/* ── colour themes per interest ── */
const interestThemes = [
  {
    accent: '#818cf8',
    accentRgb: '129,140,248',
    gradient: 'linear-gradient(135deg, #818cf8 0%, #6366f1 50%, #4f46e5 100%)',
    orb1: '#818cf8',
    orb2: '#6366f1',
    bgImage:
      'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=900&h=600&fit=crop',
  },
  {
    accent: '#f472b6',
    accentRgb: '244,114,182',
    gradient: 'linear-gradient(135deg, #f472b6 0%, #ec4899 50%, #db2777 100%)',
    orb1: '#f472b6',
    orb2: '#ec4899',
    bgImage:
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=900&h=600&fit=crop',
  },
  {
    accent: '#34d399',
    accentRgb: '52,211,153',
    gradient: 'linear-gradient(135deg, #34d399 0%, #10b981 50%, #059669 100%)',
    orb1: '#34d399',
    orb2: '#10b981',
    bgImage:
      'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=900&h=600&fit=crop',
  },
  {
    accent: '#fbbf24',
    accentRgb: '251,191,36',
    gradient: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%)',
    orb1: '#fbbf24',
    orb2: '#f59e0b',
    bgImage:
      'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=900&h=600&fit=crop',
  },
]


const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

function FloatingParticles({ color }: { color: string }) {
  const particles = useMemo(
    () =>
      Array.from({ length: 18 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 2 + Math.random() * 4,
        duration: 4 + Math.random() * 6,
        delay: Math.random() * 4,
      })),
    [],
  )

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: color,
            opacity: 0,
          }}
          animate={{
            opacity: [0, 0.6, 0],
            y: [0, -40, -80],
            scale: [0.5, 1.2, 0.5],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

/* ── Progress ring around the active icon ── */
function ProgressRing({
  progress,
  color,
  size = 120,
  stroke = 3,
}: {
  progress: number
  color: string
  size?: number
  stroke?: number
}) {
  const r = (size - stroke) / 2
  const circ = 2 * Math.PI * r
  return (
    <svg
      width={size}
      height={size}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-90 pointer-events-none"
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={color}
        strokeOpacity={0.15}
        strokeWidth={stroke}
      />
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth={stroke}
        strokeDasharray={circ}
        strokeDashoffset={circ * (1 - progress)}
        strokeLinecap="round"
        transition={{ duration: 0.1 }}
      />
    </svg>
  )
}

export default function Interests() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const items = t.goals.interests_items
  const total = items.length

  const [active, setActive] = useState(0)
  const [progress, setProgress] = useState(0)
  const INTERVAL_MS = 5000

  /* auto-advance with progress */
  useEffect(() => {
    const tick = 50
    let elapsed = 0
    const id = setInterval(() => {
      elapsed += tick
      setProgress(elapsed / INTERVAL_MS)
      if (elapsed >= INTERVAL_MS) {
        setActive((prev) => (prev + 1) % total)
        elapsed = 0
        setProgress(0)
      }
    }, tick)
    return () => clearInterval(id)
  }, [total, active])

  const goTo = useCallback(
    (i: number) => {
      setActive(i)
      setProgress(0)
    },
    [],
  )

  const theme = interestThemes[active % interestThemes.length]
  const item = items[active]

  return (
    <section id="interests" className="pt-20 relative overflow-hidden pb-12 md:pb-20">
      <div className="section-container" ref={ref}>
        {/* ── Header ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-10 md:mb-12"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 mb-4 text-sm font-medium px-4 py-2 rounded-full"
            style={{
              background: `rgba(${theme.accentRgb},0.08)`,
              border: `1px solid rgba(${theme.accentRgb},0.25)`,
              color: theme.accent,
              transition: 'all 0.6s ease',
            }}
          >
            <Heart className="w-3.5 h-3.5" />
            {t.goals.interests_title}
          </motion.div>
          <motion.h2 variants={itemVariants} className="section-title mb-3">
            {t.goals.interests_title}
          </motion.h2>
          <motion.p variants={itemVariants} className="section-subtitle max-w-2xl mx-auto">
            {t.goals.interests_subtitle}
          </motion.p>
        </motion.div>

        {/* ── Showcase ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.div
            variants={itemVariants}
            className="relative mx-auto"
            style={{ maxWidth: 960 }}
          >
            {/* ─ Main card ─ */}
            <div
              className="relative rounded-3xl overflow-hidden"
              style={{
                border: '1.5px solid var(--border)',
                transition: 'border-color 0.6s ease',
              }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={`bg-${active}`}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.7, ease: 'easeInOut' }}
                  className="absolute inset-0"
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${theme.bgImage})` }}
                  />
                  {/* overlay for readability */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(135deg, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.55) 50%, rgba(255,255,255,0.05) 100%)`,
                    }}
                  />
                </motion.div>
              </AnimatePresence>

              {/* Content layer */}
              <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-14 px-8 py-12 md:px-14 md:py-16 lg:px-20 lg:py-20">
                {/* ─ Icon circle with progress ring ─ */}
                <div className="relative flex-shrink-0">
                  <ProgressRing
                    progress={progress}
                    color={theme.accent}
                    size={140}
                    stroke={3}
                  />
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`icon-${active}`}
                      initial={{ opacity: 0, scale: 0.3, rotate: -30 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      exit={{ opacity: 0, scale: 0.3, rotate: 30 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="w-[120px] h-[120px] md:w-[140px] md:h-[140px] rounded-full flex items-center justify-center"
                      style={{
                        background: `rgba(${theme.accentRgb},0.12)`,
                        backdropFilter: 'blur(12px)',
                        boxShadow: `0 0 60px rgba(${theme.accentRgb},0.25)`,
                      }}
                    >
                      <span className="text-5xl md:text-6xl select-none">{item.icon}</span>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* ─ Text ─ */}
                <div className="flex-1 text-center md:text-left">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`text-${active}`}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                    >
                      <h3
                        className="text-3xl md:text-4xl lg:text-5xl font-extrabold font-heading text-white mb-4 leading-tight"
                        style={{ textShadow: '0 2px 20px rgba(0,0,0,0.3)' }}
                      >
                        {item.title}
                      </h3>
                      <p className="text-base md:text-lg text-gray-200 leading-relaxed max-w-lg">
                        {item.description}
                      </p>

                      {/* Decorative line */}
                      <motion.div
                        className="mt-6 h-1 rounded-full origin-left"
                        style={{ background: theme.gradient, maxWidth: 120 }}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* ── Navigation pills ── */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              {items.map((it: { icon: string; title: string }, idx: number) => {
                const isActive = idx === active
                const pillTheme = interestThemes[idx % interestThemes.length]
                return (
                  <motion.button
                    key={idx}
                    onClick={() => goTo(idx)}
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative flex items-center gap-2.5 px-5 py-3 rounded-2xl font-semibold text-sm transition-all duration-400 cursor-pointer"
                    style={{
                      background: isActive ? 'var(--surface-alt)' : 'var(--surface)',
                      border: `1.5px solid var(--border)`,
                      color: isActive ? pillTheme.accent : 'var(--text-muted)',
                      boxShadow: isActive
                        ? '0 4px 24px rgba(0,0,0,0.1)'
                        : '0 2px 8px rgba(0,0,0,0.04)',
                    }}
                  >
                    <span className="text-xl select-none">{it.icon}</span>
                    <span className="hidden sm:inline">{it.title}</span>

                    {/* Active glow dot */}
                    {isActive && (
                      <motion.span
                        layoutId="active-dot"
                        className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full"
                        style={{
                          background: pillTheme.accent,
                          boxShadow: `0 0 8px ${pillTheme.accent}`,
                        }}
                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                      />
                    )}
                  </motion.button>
                )
              })}
            </div>

            {/* ── Bottom progress bar ── */}
            <div
              className="mt-6 mx-auto rounded-full overflow-hidden"
              style={{
                maxWidth: 280,
                height: 3,
                background: 'var(--border)',
              }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: theme.gradient,
                  width: `${progress * 100}%`,
                  transition: 'width 0.05s linear',
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
