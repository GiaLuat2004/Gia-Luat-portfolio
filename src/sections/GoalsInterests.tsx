'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Target, Heart, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react'
import { useLanguage } from '@/lib/i18n/LanguageContext'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

interface CarouselProps {
  items: { icon: string; title: string; description: string }[]
  accent: string
  autoPlayDelay?: number
}

function Carousel({ items, accent, autoPlayDelay = 4000 }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const [isPaused, setIsPaused] = useState(false)

  const [itemsPerPage, setItemsPerPage] = useState(1)

  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const maxIndex = Math.max(0, items.length - itemsPerPage)

  const next = useCallback(() => {
    setDirection(1)
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
  }, [maxIndex])

  const prev = useCallback(() => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1))
  }, [maxIndex])

  useEffect(() => {
    if (isPaused || maxIndex === 0) return
    const timer = setInterval(next, autoPlayDelay)
    return () => clearInterval(timer)
  }, [isPaused, next, autoPlayDelay, maxIndex])

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 100 : -100, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -100 : 100, opacity: 0 }),
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Cards Container */}
      <div className="overflow-hidden rounded-2xl">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {items.slice(currentIndex, currentIndex + itemsPerPage).map((item, idx) => (
              <motion.div
                key={`${item.title}-${currentIndex}-${idx}`}
                whileHover={{ y: -4, scale: 1.02 }}
                className="glass-card rounded-xl p-6 group transition-all duration-300"
                style={{
                  background: `linear-gradient(135deg, ${accent}08, ${accent}03)`,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = `${accent}55`
                  ;(e.currentTarget as HTMLElement).style.boxShadow = `0 4px 24px ${accent}22`
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = ''
                  ;(e.currentTarget as HTMLElement).style.boxShadow = ''
                }}
              >
                <span className="text-4xl mb-4 block">{item.icon}</span>
                <h4 className="text-base font-bold font-heading mb-2" style={{ color: 'var(--text)' }}>
                  {item.title}
                </h4>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      {maxIndex > 0 && (
        <div className="flex items-center justify-center gap-4 mt-6">
          <motion.button
            onClick={prev}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200"
            style={{
              background: `${accent}15`,
              border: `1px solid ${accent}33`,
              color: accent,
            }}
          >
            <ChevronLeft className="w-4 h-4" />
          </motion.button>

          {/* Dots */}
          <div className="flex gap-1.5">
            {Array.from({ length: maxIndex + 1 }).map((_, dotIdx) => (
              <button
                key={dotIdx}
                onClick={() => {
                  setDirection(dotIdx > currentIndex ? 1 : -1)
                  setCurrentIndex(dotIdx)
                }}
                className="rounded-full transition-all duration-300"
                style={{
                  width: currentIndex === dotIdx ? 24 : 8,
                  height: 8,
                  background: currentIndex === dotIdx ? accent : `${accent}33`,
                }}
              />
            ))}
          </div>

          <motion.button
            onClick={next}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200"
            style={{
              background: `${accent}15`,
              border: `1px solid ${accent}33`,
              color: accent,
            }}
          >
            <ChevronRight className="w-4 h-4" />
          </motion.button>
        </div>
      )}
    </div>
  )
}

export default function GoalsInterests() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="goals" className="section-padding relative">
      {/* BG Accent */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-5"
          style={{ background: 'radial-gradient(circle, #a78bfa 0%, transparent 70%)' }}
        />
        <div
          className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-5"
          style={{ background: 'radial-gradient(circle, var(--accent-cyan) 0%, transparent 70%)' }}
        />
      </div>

      <div className="section-container" ref={ref}>
        {/* Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-16"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 mb-4 text-sm font-medium px-4 py-2 rounded-full"
            style={{
              background: 'rgba(167,139,250,0.08)',
              border: '1px solid rgba(167,139,250,0.2)',
              color: '#a78bfa',
            }}
          >
            <Sparkles className="w-3.5 h-3.5" />
            {t.nav.goals}
          </motion.div>
          <motion.h2 variants={itemVariants} className="section-title mb-4">
            {t.goals.title}
          </motion.h2>
          <motion.p variants={itemVariants} className="section-subtitle max-w-2xl mx-auto">
            {t.goals.subtitle}
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="space-y-14"
        >
          {/* Career Goals */}
          <motion.div variants={itemVariants}>
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: 'rgba(99,102,241,0.12)' }}
              >
                <Target className="w-5 h-5" style={{ color: 'var(--accent-indigo)' }} />
              </div>
              <h3 className="text-xl font-bold font-heading" style={{ color: 'var(--text)' }}>
                {t.goals.goals_title}
              </h3>
            </div>
            <Carousel items={t.goals.goals_items} accent="#6366f1" autoPlayDelay={5000} />
          </motion.div>

          {/* Interests & Hobbies */}
          <motion.div variants={itemVariants}>
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: 'rgba(6,182,212,0.12)' }}
              >
                <Heart className="w-5 h-5" style={{ color: 'var(--accent-cyan)' }} />
              </div>
              <h3 className="text-xl font-bold font-heading" style={{ color: 'var(--text)' }}>
                {t.goals.interests_title}
              </h3>
            </div>
            <Carousel items={t.goals.interests_items} accent="#06b6d4" autoPlayDelay={4000} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
