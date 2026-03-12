'use client'

import { useLanguage } from '@/lib/i18n/LanguageContext'
import { Github, Mail, Heart } from 'lucide-react'

export default function Footer() {
  const { t } = useLanguage()
  const year = new Date().getFullYear()

  return (
    <footer
      className="py-8 border-t"
      style={{
        background: 'var(--surface)',
        borderColor: 'var(--border)',
      }}
    >
      <div className="section-container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2 font-heading font-bold">
            <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-white text-xs font-bold">
              GL
            </span>
            <span className="gradient-text-2 text-sm">Cao Bao Gia Luat</span>
          </div>

          {/* Center Text */}
          <p className="text-sm flex items-center gap-1.5" style={{ color: 'var(--text-subtle)' }}>
            {t.footer.made_with}
            <Heart className="w-3.5 h-3.5 text-red-400 fill-red-400" />
            {t.footer.by} <span className="gradient-text-2 font-semibold">Gia Luat</span>
            &nbsp;· © {year}. {t.footer.rights}
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/GiaLuat2004"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
              style={{
                background: 'var(--surface-alt)',
                border: '1px solid var(--border)',
                color: 'var(--text-muted)',
              }}
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="mailto:gialuat2004vk@gmail.com"
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
              style={{
                background: 'var(--surface-alt)',
                border: '1px solid var(--border)',
                color: 'var(--text-muted)',
              }}
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
