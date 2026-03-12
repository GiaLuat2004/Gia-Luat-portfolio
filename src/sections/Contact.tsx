'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Mail, Github, Phone, MapPin, Send, Sparkles } from 'lucide-react'
import { useLanguage } from '@/lib/i18n/LanguageContext'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

interface ContactItem {
  key: string
  icon: React.ElementType
  label: string
  value: string
  href: string
  color: string
}

export default function Contact() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const contactItems: ContactItem[] = [
    {
      key: 'email',
      icon: Mail,
      label: t.contact.email_label,
      value: t.contact.email,
      href: `mailto:${t.contact.email}`,
      color: '#6366f1',
    },
    {
      key: 'github',
      icon: Github,
      label: t.contact.github_label,
      value: 'GiaLuat2004',
      href: t.contact.github,
      color: '#06b6d4',
    },
    {
      key: 'phone',
      icon: Phone,
      label: t.contact.phone_label,
      value: t.contact.phone,
      href: `tel:${t.contact.phone.replace(/\s/g, '')}`,
      color: '#a78bfa',
    },
    {
      key: 'location',
      icon: MapPin,
      label: t.contact.location_label,
      value: t.contact.location,
      href: '#',
      color: '#f59e0b',
    },
  ]

  return (
    <section id="contact" className="section-padding relative">
      {/* Hero-like gradient bg */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="mesh-orb mesh-orb-1" style={{ opacity: 0.08 }} />
        <div className="mesh-orb mesh-orb-2" style={{ opacity: 0.08 }} />
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
            <Send className="w-3.5 h-3.5" />
            {t.nav.contact}
          </motion.div>
          <motion.h2 variants={itemVariants} className="section-title mb-4">
            {t.contact.title}
          </motion.h2>
          <motion.p variants={itemVariants} className="section-subtitle max-w-2xl mx-auto">
            {t.contact.subtitle}
          </motion.p>
        </motion.div>

        {/* Contact Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="max-w-3xl mx-auto"
        >
          {/* Open to work card */}
          <motion.div
            variants={itemVariants}
            className="text-center mb-10 py-8 px-6 rounded-2xl relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(99,102,241,0.12), rgba(6,182,212,0.08))',
              border: '1px solid rgba(99,102,241,0.2)',
            }}
          >
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-0 opacity-5"
                style={{
                  backgroundImage: `radial-gradient(circle at 20% 50%, #6366f1 0%, transparent 50%), radial-gradient(circle at 80% 50%, #06b6d4 0%, transparent 50%)`,
                }}
              />
            </div>
            <div className="relative z-10">
              <span
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-4"
                style={{
                  background: 'rgba(74,222,128,0.12)',
                  border: '1px solid rgba(74,222,128,0.3)',
                  color: '#4ade80',
                }}
              >
                <Sparkles className="w-3.5 h-3.5" />
                {t.contact.open_to}
              </span>
              <p className="text-base md:text-lg max-w-xl mx-auto" style={{ color: 'var(--text-muted)' }}>
                {t.contact.message}
              </p>
            </div>
          </motion.div>

          {/* Contact Info Grid */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {contactItems.map((item) => {
              const IconComp = item.icon
              const isExternal = item.key === 'github'
              return (
                <motion.a
                  key={item.key}
                  href={item.key !== 'location' ? item.href : undefined}
                  target={isExternal ? '_blank' : undefined}
                  rel={isExternal ? 'noopener noreferrer' : undefined}
                  variants={itemVariants}
                  whileHover={{ y: -4, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="glass-card rounded-2xl p-5 flex items-center gap-4 group cursor-pointer"
                  style={{ transition: 'all 0.25s ease' }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 32px ${item.color}22`
                    ;(e.currentTarget as HTMLElement).style.borderColor = `${item.color}44`
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = ''
                    ;(e.currentTarget as HTMLElement).style.borderColor = ''
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:scale-110"
                    style={{ background: `${item.color}18` }}
                  >
                    <IconComp className="w-5 h-5" style={{ color: item.color }} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-medium mb-0.5" style={{ color: 'var(--text-subtle)' }}>
                      {item.label}
                    </p>
                    <p
                      className="text-sm font-semibold truncate group-hover:underline"
                      style={{ color: 'var(--text)' }}
                    >
                      {item.value}
                    </p>
                  </div>
                </motion.a>
              )
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
