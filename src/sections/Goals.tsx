'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Target } from 'lucide-react'
import { useLanguage } from '@/lib/i18n/LanguageContext'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

// Màu nhấn cho 3 thẻ mục tiêu: Indigo, Emerald, Violet
const goalAccents = ['#6366f1', '#10b981', '#8b5cf6'] 

export default function Goals() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const items = t.goals.goals_items

  return (
    <section id="goals" className="section-padding relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.06)_0%,transparent_70%)] rotate-12" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.04)_0%,transparent_60%)]" />
      </div>

      <div className="section-container relative z-10" ref={ref}>
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

        {/* 3 Columns Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto"
        >
          {items.map((item: any, idx: number) => {
             const accent = goalAccents[idx % goalAccents.length]
             return (
               <motion.div
                 key={idx}
                 variants={itemVariants}
                 whileHover={{ y: -8, transition: { duration: 0.3 } }}
                 className="group relative h-full flex"
               >
                 {/* Decorative background blur on hover */}
                 <div 
                   className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl z-0"
                   style={{ background: `linear-gradient(135deg, ${accent}30, transparent)` }}
                 />
                 
                 <div 
                   className="relative flex flex-col h-full w-full bg-surface-alt/60 backdrop-blur-xl rounded-3xl p-8 border shadow-xl overflow-hidden z-10 transition-all duration-500"
                   style={{ 
                     borderColor: 'var(--border)', 
                     '--hover-border': `${accent}60`,
                     boxShadow: '0 10px 40px -10px rgba(0,0,0,0.1)'
                   } as React.CSSProperties}
                   onMouseEnter={(e) => {
                     e.currentTarget.style.borderColor = `var(--hover-border)`
                   }}
                   onMouseLeave={(e) => {
                     e.currentTarget.style.borderColor = 'var(--border)'
                   }}
                 >
                    {/* Top Right Glow inside card */}
                    <div 
                      className="absolute -top-16 -right-16 w-48 h-48 rounded-full blur-[50px] opacity-[0.15] transition-opacity duration-500 group-hover:opacity-[0.3]"
                      style={{ background: accent }}
                    />

                    {/* Icon Container */}
                    <div 
                      className="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl mb-8 border transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3"
                      style={{ 
                        background: `linear-gradient(135deg, ${accent}15, ${accent}05)`,
                        borderColor: `${accent}30`,
                        boxShadow: `0 8px 32px -8px ${accent}30`
                      }}
                    >
                      {item.icon}
                    </div>

                    {/* Content */}
                    <h3 
                      className="text-2xl font-bold font-heading mb-4 transition-colors duration-300"
                      style={{ color: 'var(--text)' }}
                    >
                      {item.title}
                    </h3>
                    
                    <p className="text-muted-foreground leading-relaxed flex-1 text-[15px]">
                      {item.description}
                    </p>

                    {/* Elegant Index Number Background */}
                    <div 
                       className="absolute -bottom-8 -right-6 text-[140px] font-black leading-none opacity-[0.02] pointer-events-none group-hover:opacity-[0.05] transition-all duration-700 group-hover:scale-105 group-hover:-translate-y-2" 
                       style={{ color: accent }}
                    >
                      {idx + 1}
                    </div>
                 </div>
               </motion.div>
             )
          })}
        </motion.div>
      </div>
    </section>
  )
}
