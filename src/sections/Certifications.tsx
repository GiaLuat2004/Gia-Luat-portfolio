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
        <div className="flex flex-col md:flex-row gap-12 lg:gap-20 items-start">
          
          {/* LEFT COLUMN: Visual Preview */}
          <div className="w-full md:w-1/2 sticky top-24">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8 }}
              className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-surface-alt border border-border shadow-2xl"
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

            {/* Stats Row under image */}
            <div className="grid grid-cols-3 gap-4 mt-8">
               <div className="p-4 rounded-2xl bg-surface/50 border border-border text-center">
                  <p className="text-2xl font-bold">{certs.length}</p>
                  <p className="text-[10px] uppercase tracking-wider text-muted">Total</p>
               </div>
               <div className="p-4 rounded-2xl bg-surface/50 border border-border text-center">
                  <p className="text-2xl font-bold">3+</p>
                  <p className="text-[10px] uppercase tracking-wider text-muted">Platforms</p>
               </div>
               <div className="p-4 rounded-2xl bg-surface/50 border border-border text-center">
                  <p className="text-2xl font-bold">2025</p>
                  <p className="text-[10px] uppercase tracking-wider text-muted">Latest</p>
               </div>
            </div>
          </div>

          {/* RIGHT COLUMN: List */}
          <div className="w-full md:w-1/2">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="space-y-4"
            >
              <div className="mb-10">
                <h2 className="text-3xl font-bold mb-4 tracking-tight">
                  {t.education.certifications_title}
                </h2>
                <div className="h-1 w-20 bg-indigo-500 rounded-full" />
              </div>

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