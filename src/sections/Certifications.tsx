'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Award, Calendar, ExternalLink, Star, CheckCircle2, ChevronRight } from 'lucide-react'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import Image from 'next/image'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
}

export default function Certifications() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [activeIdx, setActiveIdx] = useState(0)

  const certs = t.education.certifications

  return (
    <section id="certifications" className="section-padding relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(129,140,248,0.03)_0%,transparent_70%)] pointer-events-none" />

      <div className="section-container relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-14"
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
            <Award className="w-3.5 h-3.5" />
            {t.nav.certifications}
          </motion.div>
          <motion.h2 variants={itemVariants} className="section-title mb-4">
            {t.education.certifications_title}
          </motion.h2>
          <motion.p variants={itemVariants} className="section-subtitle max-w-2xl mx-auto">
            {t.education.certifications_subtitle}
          </motion.p>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-12 lg:gap-20 items-start">
          
          {/* LEFT COLUMN: Visual Preview */}
          <div className="w-full md:w-1/2 md:sticky md:top-24">
            
            {/* Mobile View: Slide Window (Carousel) */}
            <div className="block md:hidden mb-8">
              <div 
                className="flex w-full overflow-x-auto snap-x snap-mandatory gap-4 pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                onScroll={(e) => {
                  const container = e.currentTarget;
                  const scrollLeft = container.scrollLeft;
                  const itemWidth = container.clientWidth;
                  const gap = 16; // gap-4 equivalent in px
                  const newIdx = Math.round(scrollLeft / (itemWidth + gap));
                  if (newIdx !== activeIdx) setActiveIdx(newIdx);
                }}
              >
                {certs.map((cert: any, idx: number) => (
                  <div 
                    key={idx} 
                    className="relative aspect-[4/3] w-full shrink-0 snap-center rounded-3xl overflow-hidden bg-surface-alt border border-border shadow-xl"
                  >
                    <div className="relative w-full h-full p-4 flex items-center justify-center">
                      <div className="w-full h-full rounded-xl bg-gradient-to-br from-indigo-500/10 to-cyan-500/10 flex flex-col items-center justify-center border border-white/5">
                        <div className="text-8xl mb-4">{cert.icon}</div>
                        <div className="text-center px-6 z-10">
                           <h4 className="text-xl font-bold mb-3">{cert.name}</h4>
                           <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-muted font-medium">
                             <span className="flex items-center gap-1.5 opacity-80">
                               <Calendar className="w-4 h-4" />
                               {cert.date}
                             </span>
                             <span className="w-1.5 h-1.5 rounded-full bg-border" />
                             <span className="opacity-90">{cert.issuer}</span>
                           </div>
                        </div>
                      </div>
                      
                      {/* Verified Watermark Overlay */}
                      <div className="absolute bottom-6 right-6 rotate-12 opacity-20 pointer-events-none">
                         <CheckCircle2 className="w-24 h-24 text-indigo-500" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Pagination Dots */}
              <div className="flex justify-center gap-2 mt-4">
                {certs.map((_: any, idx: number) => (
                  <div
                    key={idx}
                    className={`h-2 rounded-full transition-all duration-300 ${activeIdx === idx ? 'w-6 bg-indigo-500' : 'w-2 bg-border'}`}
                  />
                ))}
              </div>
            </div>

            {/* Desktop View: Single Interactive Preview */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8 }}
              className="hidden md:block relative aspect-[4/3] rounded-3xl overflow-hidden bg-surface-alt border border-border shadow-2xl"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIdx}
                  initial={{ opacity: 0, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, filter: 'blur(10px)' }}
                  transition={{ duration: 0.4 }}
                  className="relative w-full h-full p-4 flex items-center justify-center"
                >
                  {/* Nếu bạn có ảnh thật, hãy dùng <Image />. Ở đây mình dùng Placeholder nghệ thuật */}
                  <div className="w-full h-full rounded-xl bg-gradient-to-br from-indigo-500/10 to-cyan-500/10 flex flex-col items-center justify-center border border-white/5">
                    <div className="text-8xl mb-4">{certs[activeIdx].icon}</div>
                    <div className="text-center px-8">
                       <h4 className="text-xl font-bold mb-2">{certs[activeIdx].name}</h4>
                       <p className="text-sm text-muted opacity-70">{certs[activeIdx].issuer}</p>
                    </div>
                  </div>
                  
                  {/* Verified Watermark Overlay */}
                  <div className="absolute bottom-6 right-6 rotate-12 opacity-20">
                     <CheckCircle2 className="w-24 h-24 text-indigo-500" />
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>

          </div>

          {/* RIGHT COLUMN: List */}
          <div className="hidden md:block w-full md:w-1/2">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="space-y-4"
            >

              {certs.map((cert: any, idx: number) => {
                const isActive = activeIdx === idx
                return (
                  <motion.div
                    key={idx}
                    variants={itemVariants}
                    onClick={() => setActiveIdx(idx)}
                    className={`group relative cursor-pointer p-5 rounded-2xl transition-all duration-300 border ${
                      isActive 
                        ? 'bg-surface border-indigo-500/50 shadow-lg shadow-indigo-500/5' 
                        : 'bg-transparent border-border hover:border-muted'
                    }`}
                  >
                    <div className="flex items-center gap-5">
                      {/* Small Icon Indicator */}
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl transition-colors ${
                        isActive ? 'bg-indigo-500/20' : 'bg-surface-alt group-hover:bg-surface'
                      }`}>
                        {cert.icon}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className={`font-bold truncate transition-colors ${isActive ? 'text-indigo-400' : 'text-text'}`}>
                            {cert.name}
                          </h3>
                          {isActive && <ExternalLink className="w-3 h-3 text-indigo-400" />}
                        </div>
                        
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {cert.date}
                          </span>
                          <span className="w-1 h-1 rounded-full bg-border" />
                          <span className="font-medium text-muted">{cert.issuer}</span>
                        </div>
                      </div>

                      <ChevronRight className={`w-5 h-5 transition-transform duration-300 ${
                        isActive ? 'rotate-90 text-indigo-500' : 'text-muted opacity-0 group-hover:opacity-100'
                      }`} />
                    </div>

                    {/* Active Progress Line */}
                    {isActive && (
                      <motion.div 
                        layoutId="active-pill"
                        className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-indigo-500 rounded-r-full"
                      />
                    )}
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}