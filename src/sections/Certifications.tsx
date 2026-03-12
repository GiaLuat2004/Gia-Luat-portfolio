'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence, LayoutGroup } from 'framer-motion'
import { Award, ChevronRight } from 'lucide-react'
import { useLanguage } from '@/lib/i18n/LanguageContext'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const certAccentHex = ['#06b6d4', '#6366f1', '#4ade80']
const certBg = [
  'linear-gradient(135deg, rgba(6,182,212,0.08), rgba(6,182,212,0.02))',
  'linear-gradient(135deg, rgba(99,102,241,0.08), rgba(99,102,241,0.02))',
  'linear-gradient(135deg, rgba(74,222,128,0.08), rgba(74,222,128,0.02))',
]

export default function Certifications() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  // featuredIdx: the cert currently in the "big square" position on the left
  const [featuredIdx, setFeaturedIdx] = useState(0)

  const certs = t.education.certifications
  const featuredCert = certs[featuredIdx]
  const featuredAccent = certAccentHex[featuredIdx % certAccentHex.length]
  const featuredBg = certBg[featuredIdx % certBg.length]

  // the rest on the right side
  const sideItems = certs
    .map((cert, idx) => ({ cert, idx }))
    .filter(({ idx }) => idx !== featuredIdx)

  return (
    <section id="certifications" className="section-padding relative pt-0">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/2 right-0 w-80 h-80 rounded-full opacity-[0.05]"
          style={{ background: 'radial-gradient(circle, var(--accent-indigo) 0%, transparent 70%)' }}
        />
      </div>

      <div className="section-container" ref={ref}>
        {/* Section Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-12"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 mb-4 text-sm font-medium px-4 py-2 rounded-full"
            style={{
              background: 'rgba(99,102,241,0.08)',
              border: '1px solid rgba(99,102,241,0.25)',
              color: 'var(--accent-indigo)',
            }}
          >
            <Award className="w-3.5 h-3.5" />
            {t.education.certifications_title}
          </motion.div>
          <motion.h2 variants={itemVariants} className="text-2xl md:text-3xl font-bold font-heading mb-2" style={{ color: 'var(--text)' }}>
            {t.education.certifications_title}
          </motion.h2>
          <motion.p variants={itemVariants} className="text-sm" style={{ color: 'var(--text-muted)' }}>
            Click a certificate on the right to feature it
          </motion.p>
        </motion.div>

        {/* Main Layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="max-w-4xl mx-auto"
        >
          <LayoutGroup>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-5 items-start">

              {/* LEFT – Featured cert */}
              <motion.div
                layoutId={`cert-card-${featuredIdx}`}
                className="md:col-span-3"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={featuredIdx}
                    initial={{ opacity: 0, scale: 0.95, x: -20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    className="glass-card rounded-2xl p-8 relative overflow-hidden h-full"
                    style={{
                      background: featuredBg,
                      border: `1.5px solid ${featuredAccent}33`,
                      minHeight: 280,
                    }}
                  >
                    {/* Glow orb */}
                    <div
                      className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-20 pointer-events-none"
                      style={{
                        background: `radial-gradient(circle, ${featuredAccent}, transparent 70%)`,
                        transform: 'translate(30%, -30%)',
                      }}
                    />

                    <div className="relative z-10 h-full flex flex-col">
                      {/* Icon area */}
                      <div
                        className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6 text-4xl"
                        style={{ background: `${featuredAccent}15` }}
                      >
                        {featuredCert.icon}
                      </div>

                      {/* Badge */}
                      <span
                        className="inline-flex items-center text-xs font-bold px-3 py-1 rounded-full mb-4 self-start"
                        style={{ background: `${featuredAccent}18`, color: featuredAccent }}
                      >
                        ★ Featured
                      </span>

                      <h3
                        className="text-lg md:text-xl font-bold font-heading leading-snug mb-3 flex-1"
                        style={{ color: 'var(--text)' }}
                      >
                        {featuredCert.name}
                      </h3>

                      <div className="flex flex-wrap gap-2 mt-auto">
                        {featuredCert.score && (
                          <span
                            className="text-sm font-bold px-3 py-1.5 rounded-xl"
                            style={{ background: `${featuredAccent}18`, color: featuredAccent }}
                          >
                            Score: {featuredCert.score}
                          </span>
                        )}
                        {(featuredCert as any).issuer && (
                          <span
                            className="text-sm font-medium px-3 py-1.5 rounded-xl"
                            style={{ background: 'var(--surface-alt)', color: 'var(--text-muted)', border: '1px solid var(--border)' }}
                          >
                            {(featuredCert as any).issuer}
                          </span>
                        )}
                        <span
                          className="text-sm font-medium px-3 py-1.5 rounded-xl ml-auto"
                          style={{ background: 'var(--surface-alt)', color: 'var(--text-subtle)', border: '1px solid var(--border)' }}
                        >
                          {featuredCert.date}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </motion.div>

              {/* RIGHT – Side list */}
              <div className="md:col-span-2 flex flex-col gap-4">
                <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--text-subtle)' }}>
                  Other Certifications
                </p>

                {sideItems.map(({ cert, idx }) => {
                  const accent = certAccentHex[idx % certAccentHex.length]
                  return (
                    <motion.button
                      key={idx}
                      layoutId={`cert-card-${idx}`}
                      onClick={() => setFeaturedIdx(idx)}
                      whileHover={{ x: 4, scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      className="glass-card rounded-xl p-4 text-left w-full group transition-all duration-200 relative overflow-hidden"
                      style={{
                        border: `1px solid var(--border)`,
                        cursor: 'pointer',
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor = `${accent}55`
                        ;(e.currentTarget as HTMLElement).style.boxShadow = `0 4px 20px ${accent}18`
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor = ''
                        ;(e.currentTarget as HTMLElement).style.boxShadow = ''
                      }}
                    >
                      {/* Left accent bar */}
                      <div
                        className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl"
                        style={{ background: accent }}
                      />

                      <div className="pl-3 flex items-center gap-3">
                        <span className="text-2xl flex-shrink-0">{cert.icon}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold leading-snug truncate" style={{ color: 'var(--text)' }}>
                            {cert.name}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            {cert.score && (
                              <span className="text-xs font-bold" style={{ color: accent }}>
                                {cert.score}
                              </span>
                            )}
                            <span className="text-xs" style={{ color: 'var(--text-subtle)' }}>
                              {cert.date}
                            </span>
                          </div>
                        </div>
                        <ChevronRight
                          className="w-4 h-4 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                          style={{ color: accent }}
                        />
                      </div>
                    </motion.button>
                  )
                })}

                <p className="text-xs mt-2 text-center" style={{ color: 'var(--text-subtle)' }}>
                  👆 Click to feature
                </p>
              </div>

            </div>
          </LayoutGroup>
        </motion.div>
      </div>
    </section>
  )
}
