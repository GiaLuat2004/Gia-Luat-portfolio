'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Mail, Github, Phone, MapPin, Send, Sparkles, User, MessageSquare, AtSign } from 'lucide-react'
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
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [isSending, setIsSending] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSending(true)

    // Use mailto fallback
    const mailtoLink = `mailto:${t.contact.email}?subject=${encodeURIComponent(formData.subject || 'Portfolio Contact')}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
    )}`
    window.open(mailtoLink, '_blank')

    setTimeout(() => {
      setIsSending(false)
      setShowSuccess(true)
      setFormData({ name: '', email: '', subject: '', message: '' })
      setTimeout(() => setShowSuccess(false), 4000)
    }, 1000)
  }

  return (
    <section id="contact" className="pt-20 relative">
      

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

        {/* Contact Content – 2 columns */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8"
        >
          {/* Left – Contact Form */}
          <motion.div variants={itemVariants} className="lg:col-span-3">
            <div
              className="glass-card rounded-2xl p-5 md:p-7 relative overflow-hidden backdrop-blur-xl group hover:shadow-2xl transition-all duration-500"
              style={{ 
                background: 'linear-gradient(135deg, rgba(99,102,241,0.06) 0%, rgba(6,182,212,0.03) 100%)',
                border: '1px solid var(--border-alt)'
              }}
            >
              {/* Decorative */}
              <div
                className="absolute top-0 right-0 w-40 h-40 rounded-bl-full opacity-10 pointer-events-none"
                style={{ background: 'var(--accent-indigo)' }}
              />

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: 'rgba(99,102,241,0.12)' }}
                  >
                    <MessageSquare className="w-5 h-5" style={{ color: 'var(--accent-indigo)' }} />
                  </div>
                  <h3 className="text-lg font-bold font-heading" style={{ color: 'var(--text)' }}>
                    {t.contact.form_title}
                  </h3>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-muted)' }}>
                        {t.contact.form_name}
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--text-subtle)' }} />
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="form-input pl-10"
                          placeholder={t.contact.form_name}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-muted)' }}>
                        {t.contact.form_email}
                      </label>
                      <div className="relative">
                        <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--text-subtle)' }} />
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="form-input pl-10"
                          placeholder={t.contact.form_email}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-muted)' }}>
                      {t.contact.form_subject}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="form-input"
                      placeholder={t.contact.form_subject}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-muted)' }}>
                      {t.contact.form_message}
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="form-textarea"
                      placeholder={t.contact.form_message}
                    />
                  </div>

                  {/* Success Message */}
                  {showSuccess && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium"
                      style={{
                        background: 'rgba(74,222,128,0.12)',
                        border: '1px solid rgba(74,222,128,0.3)',
                        color: '#4ade80',
                      }}
                    >
                      <Sparkles className="w-4 h-4" />
                      {t.contact.form_success}
                    </motion.div>
                  )}

                  <motion.button
                    type="submit"
                    disabled={isSending}
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    className="btn-primary w-full justify-center text-sm"
                  >
                    <Send className="w-4 h-4" />
                    {isSending ? t.contact.form_sending : t.contact.form_send}
                  </motion.button>
                </form>
              </div>
            </div>
          </motion.div>

          {/* Right – Info Cards + Open to Work */}
          <motion.div variants={containerVariants} className="lg:col-span-2 space-y-4">
            {/* Open to work card */}
            <motion.div
              variants={itemVariants}
              className="text-center py-6 px-5 rounded-2xl relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(99,102,241,0.12), rgba(6,182,212,0.08))',
                border: '1px solid rgba(99,102,241,0.2)',
              }}
            >
              <span
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-3"
                style={{
                  background: 'rgba(74,222,128,0.12)',
                  border: '1px solid rgba(74,222,128,0.3)',
                  color: '#4ade80',
                }}
              >
                <Sparkles className="w-3 h-3" />
                {t.contact.open_to}
              </span>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                {t.contact.message}
              </p>
            </motion.div>

            {/* Contact Info Cards */}
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
                  whileHover={{ y: -3, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="glass-card rounded-xl p-5 flex items-center gap-4 group cursor-pointer block"
                  style={{ transition: 'all 0.25s ease' }} 
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 20px ${item.color}22`
                    ;(e.currentTarget as HTMLElement).style.borderColor = `${item.color}44`
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = ''
                    ;(e.currentTarget as HTMLElement).style.borderColor = ''
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:scale-110"
                    style={{ background: `${item.color}18` }}
                  >
                    <IconComp className="w-4 h-4" style={{ color: item.color }} />
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
        {/* Lời cảm ơn chân thành ở cuối trang */}
        <motion.div
           initial={{ opacity: 0, scale: 0.95, y: 20 }}
           whileInView={{ opacity: 1, scale: 1, y: 0 }}
           viewport={{ once: true, margin: '-50px' }}
           transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
           className="mt-28 md:mt-32 flex flex-col items-center text-center px-4"
        >
           {/* Biểu tượng phân cách mềm mại */}
           <div className="mb-6 flex items-center justify-center gap-4 opacity-70">
             <div className="w-16 md:w-24 h-[1px] bg-gradient-to-r from-transparent to-indigo-500/50" />
             <Sparkles className="w-5 h-5 text-indigo-400 animate-pulse" />
             <div className="w-16 md:w-24 h-[1px] bg-gradient-to-l from-transparent to-indigo-500/50" />
           </div>
           
           {/* Nội dung cảm ơn */}
           <p 
             className="text-xl md:text-2xl lg:text-3xl italic max-w-3xl leading-relaxed" 
             style={{ 
               color: 'var(--text)',
               fontWeight: 500,
               letterSpacing: '0.02em',
               textShadow: '0 4px 20px rgba(99,102,241,0.1)'
             }}
           >
             &quot;{t.contact.thank_you}&quot;
           </p>
           
           {/* Chữ ký cách điệu */}
           <p className="mt-8 text-sm md:text-base font-semibold tracking-[0.2em] uppercase flex items-center gap-3 opacity-60" style={{ color: 'var(--text-muted)' }}>
             <span className="w-6 md:w-8 h-[1px] bg-current" />
             {t.hero.name}
             <span className="w-6 md:w-8 h-[1px] bg-current" />
           </p>
        </motion.div>
      </div>
    </section>
  )
}
