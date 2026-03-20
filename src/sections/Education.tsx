'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { GraduationCap, BookOpen, MapPin, Calendar } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { assetPath } from '@/lib/utils';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function Education() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="education" className="pt-20 relative">
      <div className="section-container" ref={ref}>
        {/* Section Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-12 md:mb-16"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 mb-4 text-sm font-medium px-4 py-2 rounded-full"
            style={{
              background: 'rgba(6,182,212,0.08)',
              border: '1px solid rgba(6,182,212,0.25)',
              color: 'var(--accent-cyan)',
            }}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            {t.nav.education}
          </motion.div>
          <motion.h2 variants={itemVariants} className="section-title mb-4">
            {t.education.education_title}
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="section-subtitle max-w-2xl mx-auto"
          >
            {t.education.education_subtitle}
          </motion.p>
        </motion.div>

        {/* Education Card */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="max-w-full lg:max-w-full mx-auto px-4 sm:px-0"
        >
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -4 }}
            className="glass-card rounded-3xl overflow-hidden relative group backdrop-blur-xl transition-all duration-500 shadow-sm hover:shadow-md"
            style={{
              background:
                'linear-gradient(135deg, rgba(6,182,212,0.05) 0%, rgba(99,102,241,0.05) 100%)',
              border: '1px solid rgba(6,182,212,0.2)',
            }}
          >
            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 dark:group-hover:bg-white/5 transition-colors duration-500 pointer-events-none" />

            {/* Decorative accents */}
            <div
              className="absolute top-0 left-0 w-48 h-48 rounded-br-full opacity-[0.08] pointer-events-none"
              style={{ background: 'var(--accent-cyan)' }}
            />
            <div
              className="absolute bottom-0 right-0 w-32 h-32 rounded-tl-full opacity-[0.06] pointer-events-none"
              style={{ background: 'var(--accent-indigo)' }}
            />

            <div className="relative z-10 p-6 sm:p-8 md:p-10 lg:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-10 gap-8 lg:gap-12 items-stretch">
                <div className="w-full lg:col-span-6 flex flex-col sm:flex-row gap-6 justify-center">
                  <div className="flex-1 min-w-0 flex flex-col justify-center">
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                      <span
                        className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full"
                        style={{
                          background: 'rgba(6,182,212,0.12)',
                          color: 'var(--accent-cyan)',
                        }}
                      >
                        <Calendar className="w-3.5 h-3.5" />
                        {t.education.education.period}
                      </span>
                      <span
                        className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full"
                        style={{
                          background: 'var(--surface-alt)',
                          color: 'var(--text-muted)',
                          border: '1px solid var(--border)',
                        }}
                      >
                        <MapPin className="w-3.5 h-3.5" />
                        Ho Chi Minh City
                      </span>
                    </div>

                    <h3
                      className="text-xl sm:text-2xl lg:text-3xl font-bold font-heading mb-2 leading-tight"
                      style={{ color: 'var(--text)' }}
                    >
                      {t.education.education.school}
                    </h3>
                    <p
                      className="text-base sm:text-lg font-semibold mb-2"
                      style={{ color: 'var(--accent-indigo)' }}
                    >
                      {t.education.education.degree}
                    </p>
                    <p
                      className="text-sm sm:text-base mb-6"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      {t.education.degree_label}:{' '}
                      <span
                        className="font-medium"
                        style={{ color: 'var(--text)' }}
                      >
                        {t.education.education.major}
                      </span>
                    </p>

                    {/* GPA Highlight */}
                    <div
                      className="flex items-center gap-4 p-4 rounded-2xl max-w-64 sm:w-auto"
                      style={{
                        background: 'rgba(99,102,241,0.07)',
                        border: '1px solid rgba(99,102,241,0.15)',
                      }}
                    >
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-500"
                        style={{ background: 'rgba(99,102,241,0.12)' }}
                      >
                        <BookOpen
                          className="w-5 h-5"
                          style={{ color: 'var(--accent-indigo)' }}
                        />
                      </div>
                      <div>
                        <p
                          className="text-xs font-medium mb-0.5 uppercase tracking-wider"
                          style={{ color: 'var(--text-muted)' }}
                        >
                          {t.education.gpa_label}
                        </p>
                        <div className="text-2xl sm:text-3xl font-bold font-heading gradient-text-2">
                          {t.education.education.gpa}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <img
                  src={assetPath("/images/edu/uth.jpg")}
                  alt="Ho Chi Minh City University of Transport"
                  className="relative lg:col-span-4 flex-shrink-0 mt-1 lg:mt-0 w-full h-80% min-h-[80%] sm:min-h-[80%] lg:min-h-[80%] rounded-[1.25rem] overflow-hidden shadow-md group-hover:shadow-[0_8px_30px_rgba(6,182,212,0.15)] transition-all duration-500"
                  loading="lazy"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
