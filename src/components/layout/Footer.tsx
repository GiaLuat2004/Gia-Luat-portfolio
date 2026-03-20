'use client'

import { useLanguage } from '@/lib/i18n/LanguageContext'
import { Github, Mail, Heart } from 'lucide-react'

export default function Footer() {
  const { t } = useLanguage()
  const year = new Date().getFullYear()

  return (
    <footer
      className="w-full border-t"
      style={{
        background: 'var(--surface)',
        borderColor: 'var(--border)',
      }}
    >
      <div className="section-container px-4 md:px-6 py-6 md:py-8">
        
        <div className="
          flex flex-col 
          md:flex-row 
          items-center 
          justify-between 
          gap-6 md:gap-4
          text-center md:text-left
        ">

          {/* Logo */}
          <div className="flex items-center gap-2 font-heading font-bold shrink-0">
            <span className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-white text-xs font-bold">
              GL
            </span>
            <span className="gradient-text-2 text-sm md:text-base">
              Cao Bao Gia Luat
            </span>
          </div>

          {/* Center */}
          <div 
            className="
              flex flex-col sm:flex-row 
              items-center justify-center 
              gap-1 sm:gap-2 
              text-xs sm:text-sm
              leading-relaxed
              max-w-[90%] md:max-w-none
            "
            style={{ color: 'var(--text-subtle)' }}
          >
            <div className="flex items-center justify-center gap-1.5 flex-wrap">
              {t.footer.made_with}
              <Heart className="w-3.5 h-3.5 text-red-400 fill-red-400 animate-pulse" />
              {t.footer.by}
              <span className="gradient-text-2 font-semibold">
                Gia Luat
              </span>
            </div>

            <span className="hidden sm:inline">&nbsp;·&nbsp;</span>

            <div>
              © {year}. {t.footer.rights}
            </div>
          </div>

          {/* Social */}
          <div className="flex items-center gap-3 md:gap-4 shrink-0">
            
            <a
              href="https://github.com/GiaLuat2004"
              target="_blank"
              rel="noopener noreferrer"
              className="
                w-9 h-9 md:w-10 md:h-10
                rounded-lg 
                flex items-center justify-center
                transition-all duration-300
                hover:scale-110 hover:-translate-y-1 hover:shadow-md
                active:scale-95
              "
              style={{
                background: 'var(--surface-alt)',
                border: '1px solid var(--border)',
                color: 'var(--text-muted)',
              }}
            >
              <Github className="w-4.5 h-4.5" />
            </a>

            <a
              href="mailto:gialuat2004vk@gmail.com"
              className="
                w-9 h-9 md:w-10 md:h-10
                rounded-lg 
                flex items-center justify-center
                transition-all duration-300
                hover:scale-110 hover:-translate-y-1 hover:shadow-md
                active:scale-95
              "
              style={{
                background: 'var(--surface-alt)',
                border: '1px solid var(--border)',
                color: 'var(--text-muted)',
              }}
            >
              <Mail className="w-4.5 h-4.5" />
            </a>

          </div>
        </div>

      </div>
    </footer>
  )
}