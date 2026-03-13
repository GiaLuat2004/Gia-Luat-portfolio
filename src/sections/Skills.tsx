'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
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
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

const chipVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.35 } },
}

const tabAccents = ['#6366f1', '#06b6d4', '#a78bfa', '#f59e0b']
const tabGradients = [
  'linear-gradient(135deg, rgba(99,102,241,0.12), rgba(139,92,246,0.06))',
  'linear-gradient(135deg, rgba(6,182,212,0.12), rgba(59,130,246,0.06))',
  'linear-gradient(135deg, rgba(139,92,246,0.12), rgba(236,72,153,0.06))',
  'linear-gradient(135deg, rgba(245,158,11,0.12), rgba(249,115,22,0.06))',
]

export default function Skills() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [activeTab, setActiveTab] = useState(0)

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
          className="text-center mb-12"
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

        {/* Tab Bar */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="flex justify-center mb-10"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex gap-2 p-1.5 rounded-2xl overflow-x-auto scrollbar-hide"
            style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
          >
            {t.skills.categories.map((category, idx) => {
              const IconComp = categoryIcons[category.icon] || Monitor
              const isActive = activeTab === idx
              return (
                <motion.button
                  key={category.name}
                  onClick={() => setActiveTab(idx)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative flex items-center gap-2 px-5 py-3 rounded-xl text-base font-semibold transition-all duration-300 whitespace-nowrap"
                  style={{
                    color: isActive ? tabAccents[idx] : 'var(--text-muted)',
                    background: isActive ? `${tabAccents[idx]}15` : 'transparent',
                  }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 rounded-xl"
                      style={{
                        background: `${tabAccents[idx]}12`,
                        border: `1px solid ${tabAccents[idx]}33`,
                      }}
                      transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    <IconComp className="w-5 h-5" />
                    <span className="hidden sm:inline">{category.name}</span>
                  </span>
                </motion.button>
              )
            })}
          </motion.div>
        </motion.div>

        {/* Active Category Content */}
        <AnimatePresence mode="wait">
          {t.skills.categories.map((category, catIdx) => {
            if (catIdx !== activeTab) return null
            const accent = tabAccents[catIdx]

            return (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
              >
                {/* Category Card */}
                <div
                  className="glass-card rounded-2xl p-8 md:p-10"
                  style={{ background: tabGradients[catIdx] }}
                >
                  {/* Category Header */}
                  <div className="flex items-center gap-4 mb-8">
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center"
                      style={{ background: `${accent}20` }}
                    >
                      {(() => {
                        const IconComp = categoryIcons[category.icon] || Monitor
                        return <IconComp className="w-8 h-8" style={{ color: accent }} />
                      })()}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold font-heading" style={{ color: 'var(--text)' }}>
                        {category.name}
                      </h3>
                      <p className="text-base" style={{ color: 'var(--text-muted)' }}>
                        {category.skills.length} technologies
                      </p>
                    </div>
                  </div>

                  {/* Skill Chips Grid */}
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3"
                  >
                    {category.skills.map((skill, skillIdx) => (
                      <motion.div
                        key={skill.name}
                        variants={chipVariants}
                        whileHover={{ scale: 1.05, y: -3 }}
                        className="flex items-center gap-3 p-4 rounded-xl cursor-default transition-all duration-200"
                        style={{
                          background: 'var(--surface)',
                          border: '1px solid var(--border)',
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLElement).style.borderColor = `${accent}55`
                          ;(e.currentTarget as HTMLElement).style.boxShadow = `0 4px 20px ${accent}22`
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLElement).style.borderColor = ''
                          ;(e.currentTarget as HTMLElement).style.boxShadow = ''
                        }}
                      >
                        <span className="text-2xl">{skill.icon}</span>
                        <span className="text-base font-medium" style={{ color: 'var(--text)' }}>
                          {skill.name}
                        </span>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </section>
  )
}
