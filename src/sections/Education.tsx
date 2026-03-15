'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { GraduationCap, BookOpen, MapPin, Calendar } from 'lucide-react'
import { useLanguage } from '@/lib/i18n/LanguageContext'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

export default function Education() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="education" className="section-padding relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute bottom-0 left-0 w-96 h-96 rounded-full opacity-[0.06]"
          style={{ background: 'radial-gradient(circle, var(--accent-cyan) 0%, transparent 70%)' }}
        />
      </div>

      <div className="section-container" ref={ref}>
        {/* Section Header */}
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
              background: 'rgba(6,182,212,0.08)',
              border: '1px solid rgba(6,182,212,0.25)',
              color: 'var(--accent-cyan)',
            }}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            {t.nav.education}
          </motion.div>
          <motion.h2 variants={itemVariants} className="section-title mb-4">
            {t.education.education_title}
          </motion.h2>
          <motion.p variants={itemVariants} className="section-subtitle max-w-xl mx-auto">
            {t.education.education_subtitle}
          </motion.p>
        </motion.div>

        {/* Education Card – full width, prominent */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="max-w-3xl mx-auto"
        >
          <motion.div
            variants={itemVariants}
            className="glass-card rounded-3xl overflow-hidden relative"
            style={{
              background: 'linear-gradient(135deg, rgba(6,182,212,0.07) 0%, rgba(99,102,241,0.05) 100%)',
              border: '1px solid rgba(6,182,212,0.2)',
            }}
          >
            {/* Decorative top-left accent */}
            <div
              className="absolute top-0 left-0 w-48 h-48 rounded-br-full opacity-[0.08] pointer-events-none"
              style={{ background: 'var(--accent-cyan)' }}
            />
            <div
              className="absolute bottom-0 right-0 w-32 h-32 rounded-tl-full opacity-[0.06] pointer-events-none"
              style={{ background: 'var(--accent-indigo)' }}
            />

            <div className="relative z-10 p-8 md:p-10">
              <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-8">
                {/* Icon */}
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(6,182,212,0.15)' }}
                >
                  <GraduationCap className="w-8 h-8" style={{ color: 'var(--accent-cyan)' }} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span
                      className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full"
                      style={{
                        background: 'rgba(6,182,212,0.12)',
                        color: 'var(--accent-cyan)',
                      }}
                    >
                      <Calendar className="w-3 h-3" />
                      {t.education.education.period}
                    </span>
                    <span
                      className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full"
                      style={{
                        background: 'var(--surface-alt)',
                        color: 'var(--text-muted)',
                        border: '1px solid var(--border)',
                      }}
                    >
                      <MapPin className="w-3 h-3" />
                      Ho Chi Minh City
                    </span>
                  </div>

                  <h3 className="text-xl md:text-2xl font-bold font-heading mb-1" style={{ color: 'var(--text)' }}>
                    {t.education.education.school}
                  </h3>
                  <p className="text-base font-semibold mb-1" style={{ color: 'var(--accent-indigo)' }}>
                    {t.education.education.degree}
                  </p>
                  <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
                    {t.education.degree_label}: <span className="font-medium" style={{ color: 'var(--text)' }}>{t.education.education.major}</span>
                  </p>

                  {/* GPA highlight */}
                  <div className="flex items-center gap-4 p-4 rounded-2xl" style={{ background: 'rgba(99,102,241,0.07)', border: '1px solid rgba(99,102,241,0.15)' }}>
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: 'rgba(99,102,241,0.12)' }}
                    >
                      <BookOpen className="w-5 h-5" style={{ color: 'var(--accent-indigo)' }} />
                    </div>
                    <div>
                      <p className="text-xs font-medium mb-0.5" style={{ color: 'var(--text-muted)' }}>
                        {t.education.gpa_label}
                      </p>
                      <div className="text-2xl font-bold font-heading gradient-text-2">
                        {t.education.education.gpa}
                      </div>
                    </div>
                    <div className="ml-auto hidden sm:block">
                      <div className="flex gap-1">
                        {[1, 2, 3, 4].map((star) => (
                          <div
                            key={star}
                            className="w-2.5 h-2.5 rounded-full"
                            style={{ background: star <= 3 ? 'var(--accent-indigo)' : 'var(--border-alt)' }}
                          />
                        ))}
                      </div>
                      <p className="text-xs mt-1" style={{ color: 'var(--text-subtle)' }}>Good standing</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
