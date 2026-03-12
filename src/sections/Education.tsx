'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
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

export default function Education() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

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
              {/* Decorative corner */}
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

                {/* GPA */}
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

          {/* Certifications */}
          <motion.div variants={containerVariants} className="lg:col-span-3 space-y-4">
            <motion.h3 variants={itemVariants} className="text-xl font-bold font-heading mb-6 flex items-center gap-2">
              <Award className="w-5 h-5" style={{ color: 'var(--accent-indigo)' }} />
              {t.education.certifications_title}
            </motion.h3>

            {t.education.certifications.map((cert, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ x: 6, transition: { duration: 0.2 } }}
                className="glass-card rounded-xl p-5 flex items-center gap-4 cursor-default"
                style={{
                  borderLeft: '3px solid',
                  borderLeftColor: idx === 0 ? 'var(--accent-cyan)' : idx === 1 ? 'var(--accent-indigo)' : '#4ade80',
                }}
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
                    <p className="text-xs mt-1 font-bold" style={{ color: 'var(--accent-cyan)' }}>
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
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
