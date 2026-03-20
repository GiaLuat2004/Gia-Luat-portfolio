'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Calendar,
  MapPin,
  Mail,
  Github,
  Phone,
  Sparkles,
  User,
} from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import Image from 'next/image';
import { getImagePath } from '@/lib/utils';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const infoIcons = {
  dob: Calendar,
  location: MapPin,
  email: Mail,
  github: Github,
  phone: Phone,
  status: Sparkles,
};

export default function About() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const infoItems = Object.keys(
    t.about.labels,
  ) as (keyof typeof t.about.labels)[];

  return (
    <section id="about" className="pt-20 relative">
      {/* Subtle bg accent */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-0 left-0 w-96 h-96 rounded-full opacity-5"
          style={{
            background:
              'radial-gradient(circle, var(--accent-cyan) 0%, transparent 70%)',
          }}
        />
      </div>

      <div className="section-container" ref={ref}>
        {/* Section Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 mb-4 text-sm font-medium px-4 py-2 rounded-full"
            style={{
              background: 'rgba(6,182,212,0.08)',
              border: '1px solid rgba(6,182,212,0.2)',
              color: 'var(--accent-cyan)',
            }}
          >
            <User className="w-3.5 h-3.5" />
            {t.nav.about}
          </motion.div>
          <motion.h2 variants={itemVariants} className="section-title mb-4">
            {t.about.title}
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="section-subtitle max-w-2xl mx-auto"
          >
            {t.about.subtitle}
          </motion.p>
        </motion.div>

        {/* Content Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-stretch"
        >
          {/* Photo Column */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-2 hidden lg:flex justify-center lg:justify-start"
          >
            <div className="relative w-full max-w-md lg:max-w-none h-full min-h-[400px] lg:min-h-0 group flex items-center justify-center">
              <div
                className="absolute inset-x-10 bottom-10 top-20 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-500 blur-3xl pointer-events-none"
                style={{
                  background:
                    'linear-gradient(135deg, var(--accent-indigo), var(--accent-cyan))',
                }}
              />
              <div className="relative w-auto h-auto max-w-full max-h-full flex items-center justify-center transition-all duration-500 group-hover:scale-[1.02] p-2 border-[2px] border-dashed border-accent-cyan/20 rounded-full group-hover:border-accent-cyan/60 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                <Image
                  src={getImagePath('/images/me/portrait.png')}
                  alt="Cao Bao Gia Luat"
                  width={384}
                  height={384}
                  className="object-contain drop-shadow-2xl rounded-full"
                  onError={() => {}}
                  unoptimized
                  priority
                />
              </div>
            </div>
          </motion.div>

          {/* Bio + Info Column */}
          <motion.div
            variants={containerVariants}
            className="lg:col-span-3 space-y-8 flex flex-col justify-center"
          >
            {/* Bio */}
            <motion.div variants={itemVariants} className="space-y-4">
              <p
                className="text-lg md:text-xl leading-relaxed"
                style={{ color: 'var(--text-muted)' }}
              >
                {t.about.bio}
              </p>
            </motion.div>

            {/* Info Grid */}
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3"
            >
              {infoItems.map((key) => {
                const IconComp = infoIcons[key] || Sparkles;
                const value = t.about.info[key];
                const isLink = key === 'email' || key === 'github';
                const isStatus = key === 'status'; // Kiểm tra xem có phải thẻ status không
                const href =
                  key === 'email'
                    ? `mailto:${value}`
                    : key === 'github'
                      ? `https://${value}`
                      : undefined;

                return (
                  <motion.div
                    key={key}
                    variants={itemVariants}
                    whileHover={{ y: -4, scale: 1.02 }}
                    // Cập nhật className: Thẻ status sẽ có viền xanh mờ, các thẻ khác giữ nguyên glass-card
                    className={`rounded-xl p-4 flex items-start gap-3 group transition-all duration-300 hover:shadow-lg relative overflow-hidden ${
                      isStatus ? 'border border-emerald-500/30' : 'glass-card'
                    }`}
                    // Cập nhật style: Đổ màu nền xanh cho toàn bộ thẻ status
                    style={
                      isStatus
                        ? {
                            backgroundColor: 'rgba(16, 185, 129, 0.08)', // Nền xanh ngọc nhạt
                            boxShadow:
                              '0 4px 20px -2px rgba(16, 185, 129, 0.15)', // Đổ bóng xanh nhẹ
                          }
                        : {}
                    }
                  >
                    {/* Hiệu ứng Glow nền mờ bên trong góc phải của riêng thẻ Status */}
                    {isStatus && (
                      <div className="absolute -top-10 -right-10 w-24 h-24 bg-emerald-500/20 rounded-full blur-2xl pointer-events-none" />
                    )}

                    {/* Khung Icon */}
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 relative z-10"
                      // Màu icon cũng đổi sang tone xanh ngọc nếu là status
                      style={
                        isStatus
                          ? {
                              background: 'rgba(16, 185, 129, 0.2)',
                            }
                          : {
                              background: 'rgba(99,102,241,0.1)',
                            }
                      }
                    >
                      <IconComp
                        className="w-4.5 h-4.5"
                        style={{
                          color: isStatus
                            ? 'rgb(16, 185, 129)'
                            : 'var(--accent-indigo)',
                        }}
                      />
                    </div>

                    <div className="min-w-0 relative z-10">
                      <p
                        className="text-sm font-medium mb-0.5"
                        style={{
                          color: isStatus
                            ? 'rgba(16, 185, 129, 0.9)'
                            : 'var(--text-subtle)',
                        }}
                      >
                        {t.about.labels[key]}
                      </p>

                      {isLink && href ? (
                        <a
                          href={href}
                          target={key === 'github' ? '_blank' : undefined}
                          rel="noopener noreferrer"
                          className="text-base font-semibold truncate block hover:underline"
                          style={{ color: 'var(--accent-indigo)' }}
                        >
                          {value}
                        </a>
                      ) : isStatus ? (
                        <div className="flex items-center gap-3 mt-1.5 w-fit">
                          <div className="relative flex items-center justify-center w-3 h-3">
                            <span className="absolute w-full h-full rounded-full bg-emerald-500/40 animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]"></span>

                            <span className="absolute w-4 h-4 rounded-full bg-emerald-400/30 blur-[3px]"></span>

                            <span className="relative w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)] border border-emerald-300/50"></span>
                          </div>

                          <p className="text-[15px] font-semibold tracking-wide text-emerald-700 dark:text-emerald-400 truncate">
                            {value}
                          </p>
                        </div>
                      ) : (
                        <p
                          className="text-base font-semibold truncate"
                          style={{ color: 'var(--text)' }}
                        >
                          {value}
                        </p>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
