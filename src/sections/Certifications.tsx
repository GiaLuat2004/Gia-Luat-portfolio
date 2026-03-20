'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  Award,
  Calendar,
  ExternalLink,
  Star,
  CheckCircle2,
  ChevronRight,
} from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import Image from 'next/image';
import { assetPath } from '@/lib/utils';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};

export default function Certifications() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeIdx, setActiveIdx] = useState(0);

  const certs = t.education.certifications;

  return (
    <section id="certifications" className="pt-20 relative overflow-hidden">
      <div className="section-container relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
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
          <motion.p
            variants={itemVariants}
            className="section-subtitle max-w-2xl mx-auto"
          >
            {t.education.certifications_subtitle}
          </motion.p>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-6 lg:gap-10 items-start">
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
                    className="relative aspect-[4/3] w-full shrink-0 snap-center flex items-center justify-center py-4"
                  >
                    {cert.image ? (
                      <div className="relative w-full h-full overflow-hidden rounded-2xl bg-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-black/5 dark:border-white/10 group">
                        <Image
                          src={assetPath(cert.image)}
                          alt={cert.name}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-contain scale-[0.98] group-hover:scale-100 transition-transform duration-500 pointer-events-none"
                        />
                      </div>
                    ) : (
                      <div className="relative w-full h-full rounded-2xl bg-gradient-to-br from-indigo-500/10 to-cyan-500/10 flex flex-col items-center justify-center border border-indigo-500/20 shadow-lg overflow-hidden">
                        <div className="text-8xl mb-4">{cert.icon}</div>
                        <div className="text-center px-6 z-10">
                          <h4 className="text-xl font-bold mb-3">
                            {cert.name}
                          </h4>
                          <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-muted font-medium">
                            <span className="flex items-center gap-1.5 opacity-80">
                              <Calendar className="w-4 h-4" />
                              {cert.date}
                            </span>
                            <span className="w-1.5 h-1.5 rounded-full bg-border" />
                            <span className="opacity-90">{cert.issuer}</span>
                          </div>
                        </div>
                        {/* Verified Watermark Overlay */}
                        <div className="absolute bottom-6 right-6 rotate-12 opacity-20 pointer-events-none">
                          <CheckCircle2 className="w-24 h-24 text-indigo-500" />
                        </div>
                      </div>
                    )}
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
            <div className="hidden md:block relative aspect-[4/3] w-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIdx}
                  initial={{ opacity: 0, y: 15, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -15, filter: 'blur(8px)' }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 w-full h-full flex items-center justify-center"
                >
                  {certs[activeIdx].image ? (
                    <div className="relative w-full h-full overflow-hidden rounded-2xl bg-white shadow-[0_20px_50px_rgb(0,0,0,0.15)] border border-black/5 dark:border-white/10 group">
                      <Image
                        src={assetPath(certs[activeIdx].image)}
                        alt={certs[activeIdx].name}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-contain scale-[0.98] group-hover:scale-100 transition-transform duration-700 pointer-events-none"
                      />
                    </div>
                  ) : (
                    <div className="relative w-full h-full rounded-2xl bg-gradient-to-br from-indigo-500/10 to-cyan-500/10 flex flex-col items-center justify-center border border-indigo-500/20 shadow-2xl overflow-hidden">
                      <div className="text-8xl mb-4">
                        {certs[activeIdx].icon}
                      </div>
                      <div className="text-center px-8 z-10">
                        <h4 className="text-xl font-bold mb-2">
                          {certs[activeIdx].name}
                        </h4>
                        <p className="text-sm text-muted opacity-70">
                          {certs[activeIdx].issuer}
                        </p>
                      </div>

                      {/* Verified Watermark Overlay */}
                      <div className="absolute bottom-6 right-6 rotate-12 opacity-20 pointer-events-none">
                        <CheckCircle2 className="w-24 h-24 text-indigo-500" />
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* RIGHT COLUMN: List */}
          <div className="hidden md:block w-full md:w-1/2">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="space-y-4 flex flex-col justify-center py-2"
            >
              {certs.map((cert: any, idx: number) => {
                const isActive = activeIdx === idx;
                return (
                  <motion.div
                    key={idx}
                    variants={itemVariants}
                    onClick={() => setActiveIdx(idx)}
                    className={`group relative cursor-pointer p-5 rounded-2xl transition-all duration-300 border backdrop-blur-sm overflow-hidden ${
                      isActive
                        ? 'bg-indigo-50/50 border-indigo-500/40 shadow-md shadow-indigo-500/10 dark:bg-indigo-900/20 dark:border-indigo-500/50'
                        : 'bg-surface border-border hover:border-indigo-500/30 hover:bg-surface-alt hover:shadow-sm dark:bg-black/10 dark:border-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-5 relative z-10">
                      {/* Small Icon Indicator */}
                      <div
                        className={`w-20 h-20 shrink-0 rounded-xl flex items-center justify-center text-2xl transition-all duration-300 ${
                          isActive
                            ? 'bg-indigo-500/20 scale-110 shadow-inner'
                            : 'bg-surface-alt group-hover:bg-indigo-500/10 group-hover:scale-105 dark:bg-white/5'
                        }`}
                      >
                        {cert.icon}
                      </div>

                      {/* Text Block - Đã thêm h-20, justify-between và py-1 */}
                      <div className="flex-1 min-w-0 h-20 flex flex-col justify-between py-1.5">
                        {/* Bỏ margin-bottom (mb-1) ở đây vì flexbox đã lo việc giãn cách */}
                        <div className="relative">
                          <h3
                            className={`font-bold text-xl truncate transition-colors ${
                              isActive
                                ? 'text-indigo-600 dark:text-indigo-400'
                                : 'text-text group-hover:text-indigo-500 dark:group-hover:text-indigo-400'
                            }`}
                          >
                            {cert.name}
                          </h3>
                        </div>

                        <div className="flex items-center gap-3 text-lg text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-5 h-5" />
                            {cert.date}
                          </span>
                          <span className="w-1.5 h-1.5 rounded-full bg-border" />
                          <span className="font-medium text-muted">
                            {cert.issuer}
                          </span>
                        </div>
                      </div>

                      <ChevronRight
                        className={`w-5 h-5 transition-transform duration-300 ${
                          isActive
                            ? 'text-indigo-500'
                            : 'text-muted opacity-0 group-hover:opacity-100 group-hover:translate-x-1'
                        }`}
                      />
                    </div>

                    {/* Active Progress Line (Viền dọc bên trái khi được chọn) */}
                    {isActive && (
                      <motion.div
                        layoutId="active-pill"
                        className="absolute left-0 top-0 bottom-0 w-1.5 bg-indigo-500"
                        transition={{
                          type: 'spring',
                          stiffness: 300,
                          damping: 30,
                        }}
                      />
                    )}
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
