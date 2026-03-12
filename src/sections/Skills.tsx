'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Monitor, Server, Database, Cpu } from 'lucide-react'
import { useLanguage } from '@/lib/i18n/LanguageContext'

const categoryIcons: Record<string, React.ElementType> = {
  Monitor,
  Server,
  Database,
  Cpu,
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

const chipVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.35 } },
}

export default function Skills() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const gradients = [
    'from-indigo-500/20 to-purple-500/10',
    'from-cyan-500/20 to-blue-500/10',
    'from-purple-500/20 to-pink-500/10',
    'from-amber-500/20 to-orange-500/10',
  ]

  const accentColors = [
    'var(--accent-indigo)',
    'var(--accent-cyan)',
    '#a78bfa',
    '#f59e0b',
  ]

  return (
    <section id="skills" className="section-padding relative">
      {/* BG Accent */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute bottom-0 right-0 w-96 h-96 rounded-full opacity-5"
          style={{ background: 'radial-gradient(circle, var(--accent-indigo) 0%, transparent 70%)' }}
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
              background: 'rgba(99,102,241,0.08)',
              border: '1px solid rgba(99,102,241,0.2)',
              color: 'var(--accent-indigo)',
            }}
          >
            <Monitor className="w-3.5 h-3.5" />
            {t.nav.skills}
          </motion.div>
          <motion.h2 variants={itemVariants} className="section-title mb-4">
            {t.skills.title}
          </motion.h2>
          <motion.p variants={itemVariants} className="section-subtitle max-w-2xl mx-auto">
            {t.skills.subtitle}
          </motion.p>
        </motion.div>

        {/* Categories Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {t.skills.categories.map((category, catIdx) => {
            const IconComp = categoryIcons[category.icon] || Monitor
            return (
              <motion.div
                key={category.name}
                variants={itemVariants}
                className={`glass-card rounded-2xl p-6 bg-gradient-to-br ${gradients[catIdx % gradients.length]}`}
              >
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: `${accentColors[catIdx % accentColors.length]}22` }}
                  >
                    <IconComp
                      className="w-5 h-5"
                      style={{ color: accentColors[catIdx % accentColors.length] }}
                    />
                  </div>
                  <h3 className="text-lg font-bold font-heading" style={{ color: 'var(--text)' }}>
                    {category.name}
                  </h3>
                </div>

                {/* Skill Chips */}
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate={inView ? 'visible' : 'hidden'}
                  className="flex flex-wrap gap-2"
                >
                  {category.skills.map((skill) => (
                    <motion.span
                      key={skill.name}
                      variants={chipVariants}
                      whileHover={{ scale: 1.08, y: -2 }}
                      className="tag-chip cursor-default"
                    >
                      <span className="text-base">{skill.icon}</span>
                      <span>{skill.name}</span>
                    </motion.span>
                  ))}
                </motion.div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
