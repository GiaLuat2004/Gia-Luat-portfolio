'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Target, ChevronLeft, ChevronRight } from 'lucide-react'
import { useLanguage } from '@/lib/i18n/LanguageContext'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const goalAccents = ['#6366f1', '#06b6d4', '#a78bfa', '#f59e0b']

export default function Goals() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const [isPaused, setIsPaused] = useState(false)

  const items = t.goals.goals_items
  const maxIndex = items.length - 1

  const next = useCallback(() => {
    setDirection(1)
    setActiveIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
  }, [maxIndex])

  const prev = useCallback(() => {
    setDirection(-1)
    setActiveIndex((prev) => (prev <= 0 ? maxIndex : prev - 1))
  }, [maxIndex])

  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [isPaused, next])

  const activeItem = items[activeIndex]
  const accent = goalAccents[activeIndex % goalAccents.length]

  return (
    <section id="goals" className="section-padding relative">
      {/* BG */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-5"
          style={{ background: 'radial-gradient(circle, #a78bfa 0%, transparent 70%)' }}
        />
      </div>

      <div className="section-container" ref={ref}>
        {/* Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-14"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 mb-4 text-sm font-medium px-4 py-2 rounded-full"
            style={{
              background: 'rgba(99,102,241,0.08)',
              border: '1px solid rgba(99,102,241,0.2)',
              color: 'var(--accent-indigo)',
            }}
          >
            <Target className="w-3.5 h-3.5" />
            {t.nav.goals}
          </motion.div>
          <motion.h2 variants={itemVariants} className="section-title mb-4">
            {t.goals.goals_title}
          </motion.h2>
          <motion.p variants={itemVariants} className="section-subtitle max-w-2xl mx-auto">
            {t.goals.goals_subtitle}
          </motion.p>
        </motion.div>

        {/* Main Block Slider */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            className="glass-card rounded-3xl overflow-hidden relative"
            style={{
              background: `linear-gradient(135deg, ${accent}10, ${accent}05)`,
              borderColor: `${accent}33`,
              minHeight: 320,
              transition: 'background 0.5s ease, border-color 0.5s ease',
            }}
          >
            {/* Decorative glow */}
            <div
              className="absolute top-0 right-0 w-80 h-80 rounded-full pointer-events-none"
              style={{
                background: `radial-gradient(circle, ${accent}15, transparent 70%)`,
                transform: 'translate(30%, -30%)',
                transition: 'background 0.5s ease',
              }}
            />

            <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
              {/* Left: Big Icon + Index */}
              <div className="flex flex-col items-center gap-4">
                <motion.div
                  key={activeIndex}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className="w-36 h-36 rounded-3xl flex items-center justify-center"
                  style={{ background: `${accent}18` }}
                >
                  <span className="text-7xl">{activeItem.icon}</span>
                </motion.div>
                <div className="flex gap-1">
                  {items.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setDirection(idx > activeIndex ? 1 : -1)
                        setActiveIndex(idx)
                      }}
                      className="rounded-full transition-all duration-300"
                      style={{
                        width: activeIndex === idx ? 28 : 10,
                        height: 10,
                        background: activeIndex === idx ? accent : `${accent}33`,
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Right: Content */}
              <div className="flex-1 text-center md:text-left">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, x: direction > 0 ? 40 : -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: direction > 0 ? -40 : 40 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                  >
                    <span
                      className="inline-block text-xs font-bold tracking-widest uppercase mb-3 px-3 py-1 rounded-full"
                      style={{ background: `${accent}18`, color: accent }}
                    >
                      {String(activeIndex + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
                    </span>
                    <h3
                      className="text-3xl md:text-4xl font-bold font-heading mb-4"
                      style={{ color: 'var(--text)' }}
                    >
                      {activeItem.title}
                    </h3>
                    <p
                      className="text-lg md:text-xl leading-relaxed max-w-lg"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      {activeItem.description}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Nav Arrows */}
              <div className="flex md:flex-col gap-3">
                <motion.button
                  onClick={prev}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{
                    background: `${accent}15`,
                    border: `1px solid ${accent}33`,
                    color: accent,
                  }}
                >
                  <ChevronLeft className="w-6 h-6" />
                </motion.button>
                <motion.button
                  onClick={next}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{
                    background: `${accent}15`,
                    border: `1px solid ${accent}33`,
                    color: accent,
                  }}
                >
                  <ChevronRight className="w-6 h-6" />
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
