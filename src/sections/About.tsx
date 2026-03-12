'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Calendar, MapPin, Mail, Github, Phone, Sparkles, User } from 'lucide-react'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import Image from 'next/image'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const infoIcons = {
  dob: Calendar,
  location: MapPin,
  email: Mail,
  github: Github,
  phone: Phone,
  status: Sparkles,
}

export default function About() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const infoItems = Object.keys(t.about.labels) as (keyof typeof t.about.labels)[]

  return (
    <section id="about" className="section-padding relative">
      {/* Subtle bg accent */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-0 left-0 w-96 h-96 rounded-full opacity-5"
          style={{ background: 'radial-gradient(circle, var(--accent-cyan) 0%, transparent 70%)' }}
        />
      </div>

      <div className="section-container" ref={ref}>
        {/* Section Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-16"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 mb-4 text-sm font-medium px-4 py-2 rounded-full"
            style={{
              background: 'rgba(6,182,212,0.08)',
              border: '1px solid rgba(6,182,212,0.2)',
              color: 'var(--accent-cyan)',
            }}
          >
            <User className="w-3.5 h-3.5" />
            {t.nav.about}
          </motion.div>
          <motion.h2 variants={itemVariants} className="section-title mb-4">
            {t.about.title}
          </motion.h2>
          <motion.p variants={itemVariants} className="section-subtitle max-w-2xl mx-auto">
            {t.about.subtitle}
          </motion.p>
        </motion.div>

        {/* Content Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-start"
        >
          {/* Photo Column */}
          <motion.div variants={itemVariants} className="lg:col-span-2 flex flex-col items-center lg:items-start gap-6">
            {/* Avatar */}
            <div className="relative group">
              <div
                className="absolute -inset-1 rounded-2xl opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: 'linear-gradient(135deg, var(--accent-indigo), var(--accent-cyan))' }}
              />
              <div className="relative w-64 h-64 lg:w-72 lg:h-72 rounded-2xl overflow-hidden"
                style={{ background: 'var(--surface-alt)' }}
              >
                <Image
                  src="/images/avatar.jpg"
                  alt="Cao Bao Gia Luat"
                  fill
                  className="object-cover"
                  onError={() => {}}
                  unoptimized
                />
                {/* Fallback placeholder */}
                <div className="absolute inset-0 flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.2), rgba(6,182,212,0.2))' }}
                >
                  <span className="text-8xl font-bold font-heading gradient-text-2 opacity-40">GL</span>
                </div>
              </div>
            </div>

            {/* Available Badge */}
            <div
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium"
              style={{
                background: 'rgba(74,222,128,0.1)',
                border: '1px solid rgba(74,222,128,0.3)',
                color: '#4ade80',
              }}
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              {t.about.available_badge}
            </div>
          </motion.div>

          {/* Bio + Info Column */}
          <motion.div variants={containerVariants} className="lg:col-span-3 space-y-8">
            {/* Bio */}
            <motion.div variants={itemVariants} className="space-y-4">
              <p className="text-base md:text-lg leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                {t.about.bio}
              </p>
              <p className="text-base md:text-lg leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                {t.about.bio2}
              </p>
            </motion.div>

            {/* Info Grid */}
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3"
            >
              {infoItems.map((key) => {
                const IconComp = infoIcons[key] || Sparkles
                const value = t.about.info[key]
                const isLink = key === 'email' || key === 'github'
                const href =
                  key === 'email'
                    ? `mailto:${value}`
                    : key === 'github'
                    ? `https://${value}`
                    : undefined

                return (
                  <motion.div
                    key={key}
                    variants={itemVariants}
                    className="glass-card rounded-xl p-4 flex items-start gap-3 group transition-all duration-200"
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: 'rgba(99,102,241,0.1)' }}
                    >
                      <IconComp className="w-4 h-4" style={{ color: 'var(--accent-indigo)' }} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-medium mb-0.5" style={{ color: 'var(--text-subtle)' }}>
                        {t.about.labels[key]}
                      </p>
                      {isLink && href ? (
                        <a
                          href={href}
                          target={key === 'github' ? '_blank' : undefined}
                          rel="noopener noreferrer"
                          className="text-sm font-medium truncate block hover:underline"
                          style={{ color: 'var(--accent-indigo)' }}
                        >
                          {value}
                        </a>
                      ) : (
                        <p className="text-sm font-medium truncate" style={{ color: 'var(--text)' }}>
                          {value}
                        </p>
                      )}
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
