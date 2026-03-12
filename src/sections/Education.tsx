'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence, LayoutGroup } from 'framer-motion'
import { GraduationCap, Award, BookOpen } from 'lucide-react'
import { useLanguage } from '@/lib/i18n/LanguageContext'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const certAccents = ['var(--accent-cyan)', 'var(--accent-indigo)', '#4ade80']
const certAccentHex = ['#06b6d4', '#6366f1', '#4ade80']

export default function Education() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  // Track which layout each cert is in: 'wide' or 'square'
  const [certLayouts, setCertLayouts] = useState<Record<number, 'wide' | 'square'>>({})

  const toggleCertLayout = (idx: number) => {
    setCertLayouts((prev) => ({
      ...prev,
      [idx]: prev[idx] === 'square' ? 'wide' : 'square',
    }))
  }

  return (
    <section id="education" className="section-padding relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
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
              background: 'rgba(6,182,212,0.08)',
              border: '1px solid rgba(6,182,212,0.2)',
              color: 'var(--accent-cyan)',
            }}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            {t.nav.education}
          </motion.div>
          <motion.h2 variants={itemVariants} className="section-title mb-4">
            {t.education.title}
          </motion.h2>
          <motion.p variants={itemVariants} className="section-subtitle max-w-2xl mx-auto">
            {t.education.subtitle}
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 lg:grid-cols-5 gap-8"
        >
          {/* Education Card */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <div
              className="glass-card rounded-2xl p-6 h-full relative overflow-hidden"
              style={{ background: 'linear-gradient(135deg, rgba(6,182,212,0.08), rgba(99,102,241,0.05))' }}
            >
              <div
                className="absolute top-0 right-0 w-32 h-32 rounded-bl-full opacity-10"
                style={{ background: 'var(--accent-cyan)' }}
              />

              <div className="relative z-10">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                  style={{ background: 'rgba(6,182,212,0.15)' }}
                >
                  <GraduationCap className="w-6 h-6" style={{ color: 'var(--accent-cyan)' }} />
                </div>

                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="text-xs font-semibold px-2 py-0.5 rounded-full"
                    style={{
                      background: 'rgba(6,182,212,0.15)',
                      color: 'var(--accent-cyan)',
                    }}
                  >
                    {t.education.education.period}
                  </span>
                </div>

                <h3 className="text-xl font-bold font-heading mt-3 mb-1" style={{ color: 'var(--text)' }}>
                  {t.education.education.school}
                </h3>
                <p className="text-base font-semibold mb-1" style={{ color: 'var(--accent-indigo)' }}>
                  {t.education.education.degree}
                </p>
                <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>
                  {t.education.degree_label}: {t.education.education.major}
                </p>

                <div
                  className="flex items-center gap-3 p-3 rounded-xl"
                  style={{ background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.15)' }}
                >
                  <BookOpen className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--accent-indigo)' }} />
                  <div>
                    <span className="text-xs" style={{ color: 'var(--text-subtle)' }}>{t.education.gpa_label}</span>
                    <div className="text-xl font-bold gradient-text-2">{t.education.education.gpa}</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Certifications with Layout Swapping */}
          <motion.div variants={containerVariants} className="lg:col-span-3">
            <motion.h3 variants={itemVariants} className="text-xl font-bold font-heading mb-6 flex items-center gap-2">
              <Award className="w-5 h-5" style={{ color: 'var(--accent-indigo)' }} />
              {t.education.certifications_title}
            </motion.h3>

            <LayoutGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {t.education.certifications.map((cert, idx) => {
                  const layout = certLayouts[idx] || 'wide'
                  const isSquare = layout === 'square'
                  const accent = certAccents[idx % certAccents.length]
                  const accentHex = certAccentHex[idx % certAccentHex.length]

                  return (
                    <motion.div
                      key={idx}
                      layoutId={`cert-${idx}`}
                      onClick={() => toggleCertLayout(idx)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`glass-card cursor-pointer overflow-hidden transition-all duration-300 ${
                        isSquare ? 'rounded-2xl sm:col-span-1' : 'rounded-xl sm:col-span-2'
                      }`}
                      style={{
                        borderLeft: isSquare ? 'none' : '3px solid',
                        borderLeftColor: isSquare ? 'var(--border)' : accent,
                        borderColor: isSquare ? `${accentHex}44` : undefined,
                      }}
                    >
                      <AnimatePresence mode="wait">
                        {isSquare ? (
                          /* SQUARE LAYOUT – Compact card */
                          <motion.div
                            key="square"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="p-5 flex flex-col items-center text-center"
                            style={{ aspectRatio: '1 / 0.85' }}
                          >
                            <div
                              className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
                              style={{ background: `${accentHex}15` }}
                            >
                              <span className="text-3xl">{cert.icon}</span>
                            </div>
                            <h4 className="text-sm font-semibold leading-snug mb-2" style={{ color: 'var(--text)' }}>
                              {cert.name}
                            </h4>
                            {cert.score && (
                              <p className="text-xs font-bold mb-1" style={{ color: accent }}>
                                {cert.score}
                              </p>
                            )}
                            <span
                              className="text-xs font-medium px-2 py-0.5 rounded-full mt-auto"
                              style={{ background: `${accentHex}12`, color: accent }}
                            >
                              {cert.date}
                            </span>
                          </motion.div>
                        ) : (
                          /* WIDE LAYOUT – Horizontal bar */
                          <motion.div
                            key="wide"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="p-5 flex items-center gap-4"
                          >
                            <span className="text-3xl flex-shrink-0">{cert.icon}</span>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2">
                                <h4 className="text-sm font-semibold leading-snug" style={{ color: 'var(--text)' }}>
                                  {cert.name}
                                </h4>
                                <span
                                  className="text-xs font-medium px-2 py-0.5 rounded-full flex-shrink-0"
                                  style={{
                                    background: 'var(--surface-alt)',
                                    color: 'var(--text-subtle)',
                                  }}
                                >
                                  {cert.date}
                                </span>
                              </div>
                              {cert.score && (
                                <p className="text-xs mt-1 font-bold" style={{ color: accent }}>
                                  Score: {cert.score}
                                </p>
                              )}
                              {(cert as any).issuer && (
                                <p className="text-xs mt-1" style={{ color: 'var(--text-subtle)' }}>
                                  {(cert as any).issuer}
                                </p>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  )
                })}
              </div>
            </LayoutGroup>

            <p className="text-xs mt-4 text-center" style={{ color: 'var(--text-subtle)' }}>
              ✨ Click on a certification to change its display layout
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
