'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Monitor, Server, Database, Cloud, Cpu, Languages, Sparkles, ChevronRight } from 'lucide-react'
import { useLanguage } from '@/lib/i18n/LanguageContext'

import { 
  SiTypescript, SiJavascript, SiReact, SiNextdotjs, SiTailwindcss, SiFramer, SiRedux,
  SiNodedotjs, SiExpress, SiFastapi, SiPostgresql, SiMysql, SiDocker, SiGithub, SiGooglecloud, SiVercel,
  SiPython, SiOpencv
} from 'react-icons/si'
import { 
  TbApi, TbPlugConnected, TbLock, TbServerCog, TbTarget, TbScan, TbLayersLinked
} from 'react-icons/tb'

const skillLogos: Record<string, React.ElementType> = {
  SiTypescript, SiJavascript, SiReact, SiNextdotjs, SiTailwindcss, SiFramer, SiRedux,
  TbLayersLinked,
  SiNodedotjs, SiExpress, SiFastapi, TbApi, TbPlugConnected, TbLock, TbServerCog,
  SiPostgresql, SiMysql,
  SiDocker, SiGithub, SiGooglecloud, SiVercel,
  SiPython, SiOpencv, TbTarget, TbScan,
  TbEyeScan: TbScan,
  VN: () => <span className="text-xl leading-none">🇻🇳</span>,
  US: () => <span className="text-xl leading-none">🇺🇸</span>
}

const categoryIcons: Record<string, React.ElementType> = {
  Monitor,
  Server,
  Database,
  Cloud,
  Cpu,
  Languages
}

const tabAccents = [
  '#6366f1', // Frontend: Indigo
  '#06b6d4', // Backend: Cyan
  '#10b981', // Database: Emerald
  '#f59e0b', // DevOps: Amber
  '#a78bfa', // AI: Violet
  '#ec4899', // Language: Pink
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 15 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } }
}

// ─────────────────────────────────────────────────────────────────────────────
// Spotlight Card Component for interactive mouse glow
// ─────────────────────────────────────────────────────────────────────────────
function SpotlightCard({ skill, accent }: { skill: any, accent: string }) {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  const LogoComp = skillLogos[skill.icon]
  
  return (
    <motion.div
      variants={itemVariants}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative overflow-hidden rounded-2xl p-5 border cursor-default group"
      style={{
        background: 'var(--surface-light)',
        borderColor: isHovered ? 'transparent' : 'var(--border)',
        boxShadow: isHovered ? `0 10px 40px -10px ${accent}40` : 'none',
      }}
      whileHover={{ scale: 1.02, y: -2 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      {/* Background radial spotlight */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, ${accent}15, transparent 60%)`,
        }}
      />
      
      {/* Hover Spotlight Border */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none rounded-2xl transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          padding: '1.5px',
          background: `radial-gradient(300px circle at ${position.x}px ${position.y}px, ${accent}80, transparent 40%)`,
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
      />
      
      {/* Card Content */}
      <div className="relative z-10 flex gap-3.5">
        {/* Icon Container */}
        <div 
          className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300"
          style={{
            background: isHovered ? `${accent}20` : 'var(--bg)',
            border: `1px solid ${isHovered ? `${accent}40` : 'var(--border)'}`,
            color: isHovered ? accent : 'var(--text-muted)'
          }}
        >
          {LogoComp ? <LogoComp className="w-5 h-5" /> : <Sparkles className="w-4 h-4" />}
        </div>
        
        {/* Text Details */}
        <div className="flex-1 mt-0">
          <h4 className="font-bold text-[15px] transition-colors duration-300" style={{ color: isHovered ? accent : 'var(--text)' }}>
            {skill.name}
          </h4>
          <p className="text-[11.5px] mt-1 leading-[1.4]" style={{ color: 'var(--text-muted)' }}>
            {skill.desc}
          </p>
        </div>
      </div>
      
      {/* Decorative Accent Dot */}
      <span
        className="absolute bottom-2.5 right-2.5 w-1.5 h-1.5 rounded-full transition-all duration-300"
        style={{
          background: accent,
          opacity: isHovered ? 0.8 : 0,
          boxShadow: `0 0 10px ${accent}`,
          transform: isHovered ? 'scale(1)' : 'scale(0)'
        }}
      />
    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Skills Component
// ─────────────────────────────────────────────────────────────────────────────
export default function Skills() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [activeTab, setActiveTab] = useState(0)

  const activeAccent = tabAccents[activeTab]

  return (
    <section id="skills" className="section-padding relative overflow-hidden">
      {/* ── Background Elements ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-[0.05] transition-colors duration-700 blur-[80px]"
          style={{ background: `radial-gradient(circle, ${activeAccent} 0%, transparent 60%)` }}
        />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: 'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      <div className="section-container" ref={ref}>

        {/* ── Section Header ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-8 sm:mb-10"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 mb-4 text-sm font-semibold px-4 py-2 rounded-full"
            style={{
              background: 'rgba(99,102,241,0.08)',
              border: '1px solid rgba(99,102,241,0.2)',
              color: 'var(--accent-indigo)',
            }}
          >
            <Sparkles className="w-3.5 h-3.5" />
            {t.nav.skills}
          </motion.div>
          <motion.h2 variants={itemVariants} className="section-title mb-4">
            {t.skills.title}
          </motion.h2>
          <motion.p variants={itemVariants} className="section-subtitle max-w-xl mx-auto">
            {t.skills.subtitle}
          </motion.p>
        </motion.div>

        {/* ── Main Layout: Responsive Mobile Horizontal scroll to Desktop Equal Height Columns ── */}
        <div className="flex flex-col lg:grid lg:grid-cols-[260px_1fr] gap-5 lg:h-[500px] items-stretch">

          {/* ════ TOP/LEFT COLUMN: Navigation Sidebar/Bar ════ */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="flex lg:flex-col overflow-x-auto lg:overflow-visible gap-2 rounded-3xl p-2.5 border shadow-sm relative z-10 hide-scrollbar"
            style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
          >
            {t.skills.categories.map((category, idx) => {
              const IconComp = categoryIcons[category.icon] || Monitor
              const isActive = activeTab === idx
              const accent = tabAccents[idx]
              return (
                <motion.button
                  key={category.name}
                  onClick={() => setActiveTab(idx)}
                  whileHover={{ x: isActive ? 0 : 4 }}
                  whileTap={{ scale: 0.97 }}
                  className="relative flex items-center gap-3 px-3 py-3 lg:py-3.5 2xl:py-4 rounded-2xl text-sm font-semibold transition-colors duration-200 text-left w-full overflow-hidden group"
                  style={{
                    color: isActive ? accent : 'var(--text-muted)',
                  }}
                >
                  {/* Active Background Fill */}
                  {isActive && (
                    <motion.div
                      layoutId="activeTabSkill"
                      className="absolute inset-0 rounded-2xl"
                      style={{
                        background: `${accent}12`,
                        border: `1px solid ${accent}30`,
                      }}
                      transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                    />
                  )}
                  {/* Active Left Indicator Bar */}
                  {isActive && (
                    <motion.div 
                      layoutId="activeTabIndicator"
                      className="absolute left-0 top-[20%] bottom-[20%] w-1.5 rounded-r-md"
                      style={{ background: accent, boxShadow: `0 0 10px ${accent}` }}
                    />
                  )}

                  <span className="relative z-10 flex items-center justify-center gap-2 lg:gap-3 w-max lg:w-full lg:justified-start lg:pl-0.5">
                    <span
                      className="w-10 h-10 lg:w-9 lg:h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300"
                      style={{
                        background: isActive ? `${accent}25` : 'var(--bg)',
                        border: `1px solid ${isActive ? `${accent}50` : 'var(--border)'}`,
                        boxShadow: isActive ? `0 0 15px ${accent}20` : 'none'
                      }}
                    >
                      <IconComp className="w-5 h-5 lg:w-4.5 lg:h-4.5" style={{ color: isActive ? accent : 'var(--text-muted)' }} />
                    </span>
                    <span className="text-[13px] lg:text-[14.5px] whitespace-nowrap hidden lg:block">{category.name}</span>
                    <ChevronRight 
                      className="w-4 h-4 ml-auto transition-transform duration-300 hidden lg:block" 
                      style={{ 
                        color: isActive ? accent : 'var(--border)',
                        transform: isActive ? 'translateX(0)' : 'translateX(-4px)',
                        opacity: isActive ? 1 : 0
                      }} 
                    />
                  </span>
                </motion.button>
              )
            })}
          </motion.div>

          {/* ════ BOTTOM/RIGHT COLUMN: Skill Cards Display ════ */}
          <div 
            className="relative h-[450px] lg:h-full rounded-3xl border shadow-sm overflow-hidden flex flex-col"
            style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
          >
            {/* Dynamic Background Gradient corresponding to active category */}
            <div 
              className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10 blur-[100px] pointer-events-none transition-colors duration-700"
              style={{ background: activeAccent }}
            />

            {/* Scrollable Content Area */}
            <div className="h-full overflow-y-auto p-5 md:p-6 pr-3 md:pr-4 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[var(--border)] [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-[var(--text-muted)] z-10 relative">
              <AnimatePresence mode="wait">
                {t.skills.categories.map((category, catIdx) => {
                  if (catIdx !== activeTab) return null
                  const accent = tabAccents[catIdx]

                  return (
                    <motion.div
                      key={category.name}
                      initial={{ opacity: 0, scale: 0.98, x: 20 }}
                      animate={{ opacity: 1, scale: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.98, x: -20 }}
                      transition={{ duration: 0.35, ease: 'easeOut' }}
                      className="flex flex-col"
                    >
                      {/* Category Header */}
                      <div className="flex items-center gap-4 mb-6">
                        <div
                          className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 relative overflow-hidden"
                          style={{
                            background: `${accent}15`,
                            border: `1px solid ${accent}40`,
                          }}
                        >
                          <div 
                            className="absolute inset-0 opacity-50 blur-lg" 
                            style={{ background: accent }} 
                          />
                          {(() => {
                            const IconComp = categoryIcons[category.icon] || Monitor
                            return <IconComp className="w-7 h-7 relative z-10" style={{ color: accent }} />
                          })()}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold font-heading tracking-tight" style={{ color: 'var(--text)' }}>
                            {category.name}
                          </h3>
                          <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
                            {category.skills.length} core technologies
                          </p>
                        </div>
                        {/* Decorative glowing line */}
                        <div
                          className="hidden md:block ml-auto h-[1px] w-24 rounded-full"
                          style={{ background: `linear-gradient(90deg, ${accent}80, transparent)` }}
                        />
                      </div>

                      {/* Animated Skill Bento Grid */}
                      <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-3 pb-2"
                      >
                        {category.skills.map((skill, index) => (
                          <SpotlightCard 
                            key={skill.name} 
                            skill={skill} 
                            accent={accent} 
                          />
                        ))}
                      </motion.div>

                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

