'use client'

import { useRef, useState } from 'react'
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Github, Layers, Calendar, Users, ChevronDown, ChevronUp } from 'lucide-react'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import Image from 'next/image'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
}

const projectAccents = ['#6366f1', '#06b6d4', '#a78bfa']

const thumbnailFallbacks = [
  { label: 'AI', emoji: '🤖' },
  { label: 'JS', emoji: '💎' },
  { label: 'CAR', emoji: '🚗' },
]

export default function Projects() {
  const { t } = useLanguage()
  const sectionRef = useRef(null)
  const timelineRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-60px' })
  const [expandedId, setExpandedId] = useState<string | null>(null)

  // Scroll-driven glow progress
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 80%', 'end 20%'],
  })

  const glowHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id)
  }

  return (
    <section id="projects" className="section-padding relative">
      {/* Subtle BG */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full opacity-[0.04]"
          style={{ background: 'radial-gradient(ellipse, var(--accent-indigo) 0%, var(--accent-cyan) 100%)' }}
        />
      </div>

      <div className="section-container" ref={sectionRef}>
        {/* Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-16"
        >
          <motion.div
            variants={cardVariants}
            className="inline-flex items-center gap-2 mb-4 text-sm font-medium px-4 py-2 rounded-full"
            style={{
              background: 'rgba(99,102,241,0.08)',
              border: '1px solid rgba(99,102,241,0.2)',
              color: 'var(--accent-indigo)',
            }}
          >
            <Layers className="w-3.5 h-3.5" />
            {t.nav.projects}
          </motion.div>
          <motion.h2 variants={cardVariants} className="section-title mb-4">
            {t.projects.title}
          </motion.h2>
          <motion.p variants={cardVariants} className="section-subtitle max-w-2xl mx-auto">
            {t.projects.subtitle}
          </motion.p>
        </motion.div>

        {/* Timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="relative"
          ref={timelineRef}
        >
          {/* Base Timeline Line (dim) */}
          <div className="timeline-line" />

          {/* Glowing Overlay (scroll-driven) */}
          <motion.div
            className="timeline-line-glow"
            style={{ height: glowHeight }}
          />

          {/* Project Cards */}
          <div className="space-y-16 md:space-y-24">
            {t.projects.items.map((project, idx) => {
              const isExpanded = expandedId === project.id
              const isLeft = idx % 2 === 0
              const accent = projectAccents[idx % 3]

              return (
                <motion.div
                  key={project.id}
                  variants={cardVariants}
                  className="relative"
                >
                  {/* Timeline Dot */}
                  <div className="timeline-dot-wrapper">
                    <div
                      className="timeline-dot"
                      style={{ background: accent, boxShadow: `0 0 20px ${accent}66` }}
                    />
                    <div
                      className="timeline-dot-ring"
                      style={{ borderColor: `${accent}44` }}
                    />
                  </div>

                  {/* Date on OPPOSITE side */}
                  <div className={`timeline-date-opposite ${isLeft ? 'timeline-opposite-right' : 'timeline-opposite-left'}`}>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="flex flex-col items-center gap-1"
                    >
                      <div
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold"
                        style={{
                          background: `${accent}15`,
                          border: `1px solid ${accent}33`,
                          color: accent,
                        }}
                      >
                        <Calendar className="w-3.5 h-3.5" />
                        {project.period}
                      </div>
                      <span className="text-xs font-medium" style={{ color: 'var(--text-subtle)' }}>
                        {project.role}
                      </span>
                    </motion.div>
                  </div>

                  {/* Card */}
                  <div className={`timeline-card ${isLeft ? 'timeline-card-left' : 'timeline-card-right'}`}>
                    <motion.article
                      whileHover={{ y: -4, transition: { duration: 0.25 } }}
                      className="glass-card rounded-2xl overflow-hidden group flex flex-col"
                      style={{ transition: 'box-shadow 0.3s ease, border-color 0.3s ease' }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 48px ${accent}33`
                        ;(e.currentTarget as HTMLElement).style.borderColor = `${accent}66`
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.boxShadow = ''
                        ;(e.currentTarget as HTMLElement).style.borderColor = ''
                      }}
                    >
                      {/* Thumbnail */}
                      <div
                        className="relative h-40 overflow-hidden"
                        style={{ background: 'var(--surface-alt)' }}
                      >
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          unoptimized
                          onError={() => {}}
                        />
                        <div
                          className="absolute inset-0 flex flex-col items-center justify-center"
                          style={{ background: `linear-gradient(135deg, ${accent}22, ${accent}08)` }}
                        >
                          <span className="text-5xl mb-2">{thumbnailFallbacks[idx]?.emoji}</span>
                          <span className="text-xs font-bold tracking-widest uppercase" style={{ color: accent }}>
                            {thumbnailFallbacks[idx]?.label}
                          </span>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface)] via-transparent to-transparent" />
                      </div>

                      {/* Content */}
                      <div className="p-5 flex flex-col flex-1">
                        <div className="flex items-center gap-3 text-xs mb-3" style={{ color: 'var(--text-subtle)' }}>
                          <span className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            {project.team}
                          </span>
                          {/* Show period on mobile (hidden on md+) */}
                          <span className="flex items-center gap-1 md:hidden">
                            <Calendar className="w-3 h-3" />
                            {project.period}
                          </span>
                        </div>

                        <h3 className="text-lg font-bold font-heading mb-2" style={{ color: 'var(--text)' }}>
                          {project.title}
                        </h3>

                        <p className="text-sm mb-4 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                          {project.description}
                        </p>

                        {/* Expandable Highlights */}
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: 'easeInOut' }}
                              className="overflow-hidden"
                            >
                              <ul className="space-y-2 mb-4">
                                {project.highlights.map((highlight, hIdx) => (
                                  <li key={hIdx} className="flex items-start gap-2 text-xs" style={{ color: 'var(--text-muted)' }}>
                                    <span className="mt-0.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: accent }} />
                                    {highlight}
                                  </li>
                                ))}
                              </ul>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        <button
                          onClick={() => toggleExpand(project.id)}
                          className="flex items-center gap-1 text-xs font-semibold mb-4 transition-colors duration-200"
                          style={{ color: accent }}
                        >
                          {isExpanded ? (
                            <><ChevronUp className="w-3.5 h-3.5" />{t.projects.show_less}</>
                          ) : (
                            <><ChevronDown className="w-3.5 h-3.5" />{t.projects.show_more}</>
                          )}
                        </button>

                        {/* Tech */}
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {project.tech.map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-1 rounded-lg text-xs font-medium"
                              style={{
                                background: `${accent}11`,
                                border: `1px solid ${accent}33`,
                                color: accent,
                              }}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        {/* Links */}
                        <div className="flex items-center gap-3 mt-auto">
                          <motion.a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.96 }}
                            className="flex items-center gap-2 flex-1 justify-center py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
                            style={{
                              background: `${accent}15`,
                              border: `1px solid ${accent}33`,
                              color: accent,
                            }}
                          >
                            <Github className="w-4 h-4" />
                            {t.projects.view_github}
                          </motion.a>
                        </div>
                      </div>
                    </motion.article>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
