'use client'

import { useLanguage } from '@/lib/i18n/LanguageContext'
import { Github, Mail, Heart } from 'lucide-react'

export default function Footer() {
  const { t } = useLanguage()
  const year = new Date().getFullYear()

  return (
    <footer
      className="py-8 border-t w-full"
      style={{
        background: 'var(--surface)',
        borderColor: 'var(--border)',
      }}
    >
      <div className="section-container px-4 md:px-6">
        {/* Tăng gap-6 trên mobile để các khối không bị dính vào nhau, md:gap-4 trên desktop */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4">
          
          {/* Logo */}
          <div className="flex items-center gap-2 font-heading font-bold shrink-0">
            <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-white text-xs font-bold">
              GL
            </span>
            <span className="gradient-text-2 text-sm">Cao Bao Gia Luat</span>
          </div>

          {/* Center Text: Tách thành 2 cụm để rớt dòng đẹp hơn trên mobile */}
          <div 
            className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 text-sm text-center" 
            style={{ color: 'var(--text-subtle)' }}
          >
            <div className="flex items-center justify-center gap-1.5 flex-wrap">
              {t.footer.made_with}
              <Heart className="w-3.5 h-3.5 text-red-400 fill-red-400" />
              {t.footer.by} <span className="gradient-text-2 font-semibold">Gia Luat</span>
            </div>
            <span className="hidden sm:inline">&nbsp;·&nbsp;</span>
            <div>
              © {year}. {t.footer.rights}
            </div>
          </div>

          {/* Social Links: Tăng nhẹ kích thước (w-9 h-9) để dễ bấm trên điện thoại */}
          <div className="flex items-center gap-4 shrink-0">
            <a
              href="https://github.com/GiaLuat2004"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:-translate-y-1 hover:shadow-md"
              style={{
                background: 'var(--surface-alt)',
                border: '1px solid var(--border)',
                color: 'var(--text-muted)',
              }}
              aria-label="GitHub Profile"
            >
              <Github className="w-4.5 h-4.5" />
            </a>
            <a
              href="mailto:gialuat2004vk@gmail.com"
              className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:-translate-y-1 hover:shadow-md"
              style={{
                background: 'var(--surface-alt)',
                border: '1px solid var(--border)',
                color: 'var(--text-muted)',
              }}
              aria-label="Send Email"
            >
              <Mail className="w-4.5 h-4.5" />
            </a>
          </div>
          
        </div>
      </div>
    </footer>
  )
}