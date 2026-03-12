'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Github, ExternalLink, Layers, Calendar, Users } from 'lucide-react'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import Image from 'next/image'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const projectGradients = [
  'from-indigo-600/20 via-purple-600/10 to-transparent',
  'from-cyan-600/20 via-blue-600/10 to-transparent',
  'from-purple-600/20 via-pink-600/10 to-transparent',
]

const projectAccents = ['#6366f1', '#06b6d4', '#a78bfa']

const thumbnailFallbacks = [
  { label: 'AI', emoji: '🤖' },
  { label: 'JS', emoji: '💎' },
  { label: 'CAR', emoji: '🚗' },
]

export default function Projects() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="projects" className="section-padding relative">
      {/* Subtle BG */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full opacity-[0.04]"
          style={{ background: 'radial-gradient(ellipse, var(--accent-indigo) 0%, var(--accent-cyan) 100%)' }}
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

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {t.projects.items.map((project, idx) => (
            <motion.article
              key={project.id}
              variants={cardVariants}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="glass-card rounded-2xl overflow-hidden group flex flex-col"
              style={{ transition: 'box-shadow 0.3s ease, border-color 0.3s ease' }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 48px ${projectAccents[idx % 3]}33`
                ;(e.currentTarget as HTMLElement).style.borderColor = `${projectAccents[idx % 3]}66`
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = ''
                ;(e.currentTarget as HTMLElement).style.borderColor = ''
              }}
            >
              {/* Thumbnail */}
              <div
                className={`relative h-48 overflow-hidden bg-gradient-to-br ${projectGradients[idx % 3]}`}
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
                {/* Fallback overlay */}
                <div
                  className={`absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br ${projectGradients[idx % 3]}`}
                >
                  <span className="text-6xl mb-2">{thumbnailFallbacks[idx]?.emoji}</span>
                  <span className="text-xs font-bold tracking-widest uppercase"
                    style={{ color: projectAccents[idx % 3] }}
                  >
                    {thumbnailFallbacks[idx]?.label}
                  </span>
                </div>
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface)] via-transparent to-transparent" />

                {/* Role Badge */}
                <div
                  className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold"
                  style={{
                    background: `${projectAccents[idx % 3]}22`,
                    border: `1px solid ${projectAccents[idx % 3]}44`,
                    color: projectAccents[idx % 3],
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  {project.role}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                {/* Meta */}
                <div className="flex items-center gap-4 text-xs mb-3" style={{ color: 'var(--text-subtle)' }}>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {project.period}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {project.team}
                  </span>
                </div>

                <h3 className="text-lg font-bold font-heading mb-2" style={{ color: 'var(--text)' }}>
                  {project.title}
                </h3>

                <p className="text-sm mb-4 leading-relaxed flex-1" style={{ color: 'var(--text-muted)' }}>
                  {project.description}
                </p>

                {/* Highlights */}
                <ul className="space-y-1.5 mb-5">
                  {project.highlights.slice(0, 3).map((highlight, hIdx) => (
                    <li key={hIdx} className="flex items-start gap-2 text-xs" style={{ color: 'var(--text-muted)' }}>
                      <span className="mt-0.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ background: projectAccents[idx % 3] }}
                      />
                      {highlight}
                    </li>
                  ))}
                </ul>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 rounded-lg text-xs font-medium"
                      style={{
                        background: `${projectAccents[idx % 3]}11`,
                        border: `1px solid ${projectAccents[idx % 3]}33`,
                        color: projectAccents[idx % 3],
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
                      background: `${projectAccents[idx % 3]}15`,
                      border: `1px solid ${projectAccents[idx % 3]}33`,
                      color: projectAccents[idx % 3],
                    }}
                  >
                    <Github className="w-4 h-4" />
                    {t.projects.view_github}
                  </motion.a>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
