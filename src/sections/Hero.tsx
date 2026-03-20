'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, Github, Mail, Download, Facebook } from 'lucide-react'
import { useLanguage } from '@/lib/i18n/LanguageContext'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
}

function useTypewriter(words: string[], speed = 80, pause = 1800) {
  const [display, setDisplay] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (!words || words.length === 0) return;
    const current = words[wordIndex]
    const timeout = setTimeout(() => {
      if (!deleting) {
        setDisplay(current.slice(0, charIndex + 1))
        if (charIndex + 1 === current.length) {
          setTimeout(() => setDeleting(true), pause)
        } else {
          setCharIndex((c) => c + 1)
        }
      } else {
        setDisplay(current.slice(0, charIndex - 1))
        if (charIndex - 1 === 0) {
          setDeleting(false)
          setWordIndex((w) => (w + 1) % words.length)
          setCharIndex(0)
        } else {
          setCharIndex((c) => c - 1)
        }
      }
    }, deleting ? speed / 2 : speed)
    return () => clearTimeout(timeout)
  }, [charIndex, deleting, wordIndex, words, speed, pause])

  return display
}

export default function Hero() {
  const { t } = useLanguage()
  const typedText = useTypewriter(t.hero.roles || ['Web Developer', 'UI/UX Designer'], 75)

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-transparent transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 pt-24 lg:pt-16 pb-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center mt-20 lg:mt-0">
        
          {/* LEFT COLUMN: Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1"
          >
            {/* Main Heading */}
            <motion.div variants={itemVariants} className="mb-4 lg:mb-6">
              <h1 className="font-extrabold font-heading tracking-tight leading-[1.15] uppercase">
                <span className="block text-[var(--text)] mb-2 transition-colors duration-300 text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem]">
                  {t.hero.greeting}
                </span>
                <span className="block text-transparent bg-clip-text gradient-text text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] pb-2">
                  {t.hero.name}
                </span>
              </h1>
            </motion.div>

            {/* Typewriter Role */}
            <motion.div variants={itemVariants} className="flex items-center justify-center lg:justify-start gap-2 text-lg sm:text-xl md:text-2xl font-medium mb-6 h-8 text-[var(--text-muted)] transition-colors duration-300">
              <span className="text-[var(--accent-indigo)]">&lt;</span>
              <span className="font-mono tracking-tight">{typedText}</span>
              <span className="w-0.5 h-5 sm:h-6 animate-pulse bg-[var(--accent-indigo)] rounded-full" />
              <span className="text-[var(--accent-indigo)]">/&gt;</span>
            </motion.div>

            {/* Description / Tagline */}
            <motion.p
              variants={itemVariants}
              className="text-sm sm:text-base md:text-lg max-w-xl mb-10 leading-relaxed text-[var(--text-muted)] transition-colors duration-300"
            >
              {t.hero.tagline || "I've earned the trust of over 250 clients and 40 brands, all of whom are very satisfied with my service!"}
            </motion.p>

            {/* CTA & Socials Container */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full justify-center lg:justify-start">
              
            <motion.a
              href="CV-CAO-BAO-GIA-LUAT-WEB-INTERN.pdf"
              download
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="relative flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 rounded-2xl font-semibold transition-all w-fit text-sm sm:text-base group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 opacity-90 group-hover:opacity-100 bg-[length:200%_auto] animate-gradient transition-all duration-300" />
              <div className="absolute inset-0 rounded-2xl border border-white/20 group-hover:border-white/40 transition-colors duration-300 z-10" />
              <div className="relative z-20 flex items-center gap-2 text-white">
                <Download className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                <span>{t.hero.cta_secondary}</span>
              </div>
            </motion.a>

              <div className="flex items-center gap-3">
                <motion.a
                  href="https://github.com/GiaLuat2004"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="relative p-3.5 glass-card rounded-2xl hover:border-indigo-500/50 hover:shadow-[0_0_20px_rgba(79,70,229,0.3)] transition-all text-[var(--text-muted)] hover:text-indigo-500 group overflow-hidden"
                >
                  <div className="absolute inset-0 bg-indigo-500/0 group-hover:bg-indigo-500/10 transition-colors duration-300" />
                  <Github className="w-5 h-5 relative z-10" />
                </motion.a>
                <motion.a
                  href="mailto:gialuat2004vk@gmail.com"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="relative p-3.5 glass-card rounded-2xl hover:border-indigo-500/50 hover:shadow-[0_0_20px_rgba(79,70,229,0.3)] transition-all text-[var(--text-muted)] hover:text-indigo-500 group overflow-hidden"
                >
                  <div className="absolute inset-0 bg-indigo-500/0 group-hover:bg-indigo-500/10 transition-colors duration-300" />
                  <Mail className="w-5 h-5 relative z-10" />
                </motion.a>
                <motion.a
                  href="https://www.facebook.com/luat.gia.7758/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="relative p-3.5 glass-card rounded-2xl hover:border-indigo-500/50 hover:shadow-[0_0_20px_rgba(79,70,229,0.3)] transition-all text-[var(--text-muted)] hover:text-indigo-500 group overflow-hidden"
                >
                  <div className="absolute inset-0 bg-indigo-500/0 group-hover:bg-indigo-500/10 transition-colors duration-300" />
                  <Facebook className="w-5 h-5 relative z-10" />
                </motion.a>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT COLUMN: Horizontal Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            className="order-1 lg:order-2 flex justify-center items-center w-full relative"
          >
            {/* Dynamic Orbital Glows */}
            <div className="absolute w-[120%] h-[80%] bg-[var(--accent-indigo)] blur-[120px] rounded-full z-0 hidden dark:block animate-float opacity-20" />
            <div className="absolute w-[80%] h-[100%] bg-[var(--accent-cyan)] blur-[100px] rounded-full z-0 hidden dark:block animate-float opacity-10" style={{ animationDelay: '2s' }} />
            
            <motion.div 
               className="relative z-10 p-2 rounded-2xl bg-gradient-to-tr from-indigo-500/20 to-cyan-500/20 backdrop-blur-md border border-white/10 shadow-2xl"
               whileHover={{ y: -10, rotate: 1 }}
               transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <img
                src="/Gia-Luat-portfolio/images/me/portrait.png" 
                alt="Profile Portrait"
                className="w-auto h-auto max-w-full max-h-[500px] lg:max-h-[500px] rounded-xl drop-shadow-2xl mx-auto"
              />
            </motion.div>
          </motion.div>

        </div>
      </div>

      {/* Scroll Hint (Ẩn trên mobile vì mất không gian) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-gray-400 dark:text-gray-500 transition-colors duration-300"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        >
          <ArrowDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  )
}