'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from 'next-themes'
import { Sun, Moon, Menu, X, Globe } from 'lucide-react'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { cn } from '@/lib/utils'

const navItems = ['about', 'skills', 'projects', 'education', 'certifications', 'goals', 'interests','contact'] as const

export default function Navbar() {
  const { theme, setTheme } = useTheme()
  const { t, toggleLanguage, language } = useLanguage()
  const [mounted, setMounted] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)

      const sections = ['home', 'about', 'skills', 'projects', 'education', 'certifications', 'goals', 'interests', 'contact']
      const scrollPos = window.scrollY + 100

      for (const id of sections.reverse()) {
        const el = document.getElementById(id)
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(id)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setMobileOpen(false)
    }
  }

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          scrolled
            ? 'py-3 backdrop-blur-xl border-b shadow-lg dark:bg-[#0a0a0f]/90 bg-white/90 dark:border-white/5 border-black/5'
            : 'py-5 bg-transparent'
        )}
      >
        <div className="section-container flex items-center justify-between">
          {/* Logo */}
          <motion.button
            onClick={() => scrollToSection('home')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 font-heading font-bold text-xl select-none"
          >
            <span className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-white text-sm font-bold">
              GL
            </span>
            <span className="gradient-text-2">Portfolio</span>
          </motion.button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className={cn('nav-link capitalize', activeSection === item && 'active')}
              >
                {t.nav[item as keyof typeof t.nav]}
              </button>
            ))}
          </div>

          {/* Right Controls */}
          <div className="hidden md:flex items-center gap-2">
            {/* Language Toggle */}
            <motion.button
              onClick={toggleLanguage}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200"
              style={{
                background: 'var(--surface-alt)',
                border: '1px solid var(--border)',
                color: 'var(--text-muted)',
              }}
            >
              <Globe className="w-3.5 h-3.5" />
              {language === 'en' ? 'VI' : 'EN'}
            </motion.button>

            {/* Theme Toggle */}
            {mounted && (
              <motion.button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200"
                style={{
                  background: 'var(--surface-alt)',
                  border: '1px solid var(--border)',
                  color: 'var(--text-muted)',
                }}
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </motion.button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <motion.button
              onClick={toggleLanguage}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-semibold"
              style={{
                background: 'var(--surface-alt)',
                border: '1px solid var(--border)',
                color: 'var(--text-muted)',
              }}
            >
              <Globe className="w-3 h-3" />
              {language === 'en' ? 'VI' : 'EN'}
            </motion.button>

            {mounted && (
              <motion.button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                whileTap={{ scale: 0.95 }}
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{
                  background: 'var(--surface-alt)',
                  border: '1px solid var(--border)',
                  color: 'var(--text-muted)',
                }}
              >
                {theme === 'dark' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
              </motion.button>
            )}

            <motion.button
              onClick={() => setMobileOpen(!mobileOpen)}
              whileTap={{ scale: 0.95 }}
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{
                background: 'var(--surface-alt)',
                border: '1px solid var(--border)',
                color: 'var(--text)',
              }}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -20, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed top-[64px] left-0 right-0 z-40 md:hidden overflow-hidden"
            style={{
              background: 'var(--surface)',
              borderBottom: '1px solid var(--border)',
              backdropFilter: 'blur(16px)',
            }}
          >
            <div className="section-container py-4 flex flex-col gap-1">
              {navItems.map((item, i) => (
                <motion.button
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  onClick={() => scrollToSection(item)}
                  className={cn(
                    'text-left py-3 px-4 rounded-xl text-sm font-medium capitalize transition-all duration-200',
                    activeSection === item
                      ? 'bg-indigo-500/10 text-indigo-500'
                      : 'hover:bg-[var(--surface-alt)]'
                  )}
                  style={{ color: activeSection === item ? undefined : 'var(--text-muted)' }}
                >
                  {t.nav[item as keyof typeof t.nav]}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
