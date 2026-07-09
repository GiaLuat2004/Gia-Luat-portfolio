'use client';

import { useRef, Fragment } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import {
  Briefcase,
  Calendar,
  Users,
  MapPin,
  Building2,
  Sparkles,
} from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { getImagePath } from '@/lib/utils';

// Parse text with **bold** syntax into React fragments.
// Returns array of { text, bold } segments.
function parseHighlighted(text: string): { text: string; bold: boolean }[] {
  const parts: { text: string; bold: boolean }[] = [];
  const regex = /\*\*([^*]+)\*\*/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ text: text.slice(lastIndex, match.index), bold: false });
    }
    parts.push({ text: match[1], bold: true });
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < text.length) {
    parts.push({ text: text.slice(lastIndex), bold: false });
  }
  return parts;
}

function HighlightedText({
  text,
  brandColor,
}: {
  text: string;
  brandColor: string;
}) {
  const segments = parseHighlighted(text);
  return (
    <>
      {segments.map((seg, i) =>
        seg.bold ? (
          <span key={i} className="font-bold" style={{ color: 'var(--text)' }}>
            {seg.text}
          </span>
        ) : (
          <Fragment key={i}>{seg.text}</Fragment>
        ),
      )}
    </>
  );
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } }, // Tăng tốc độ xuất hiện một chút cho mượt với khoảng cách ngắn
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 }, // Giảm bớt khoảng cách giật từ y: 32 xuống 24
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const responsibilityItemVariants = {
  hidden: { opacity: 0, x: -12 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
};

const techChipVariants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
};

export default function WorkExperience() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement | null>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });

  const items = t.experience?.items ?? [];

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="pt-16 relative overflow-hidden" // Giảm pt-20 xuống pt-16
    >
      {/* Background accents */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full opacity-[0.05]"
          style={{
            background:
              'radial-gradient(circle, var(--accent-cyan) 0%, transparent 65%)',
          }}
        />
        <div
          className="absolute top-1/3 -left-32 w-[500px] h-[500px] rounded-full opacity-[0.04]"
          style={{
            background:
              'radial-gradient(circle, var(--accent-indigo) 0%, transparent 65%)',
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage:
              'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="section-container relative z-10">
        {/* Section Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-8 md:mb-12" // GIẢM: từ mb-14 md:mb-20 xuống mb-8 md:mb-12
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 mb-3 text-sm font-medium px-4 py-1.5 rounded-full" // GIẢM: mb-4 -> mb-3, py-2 -> py-1.5
            style={{
              background: 'rgba(8, 145, 178, 0.08)',
              border: '1px solid rgba(8, 145, 178, 0.25)',
              color: 'var(--accent-cyan)',
            }}
          >
            <Briefcase className="w-3.5 h-3.5" />
            {t.nav.experience}
          </motion.div>
          <motion.h2
            variants={itemVariants}
            className="section-title mb-3" // GIẢM: mb-4 -> mb-3
          >
            {t.experience.title}
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="section-subtitle max-w-2xl mx-auto text-sm"
          >
            {t.experience.subtitle}
          </motion.p>
        </motion.div>

        {/* Experience Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="max-w-5xl mx-auto space-y-4 md:space-y-5" // GIẢM: Từ space-y-8 md:space-y-10 xuống space-y-4 md:space-y-5
        >
          {items.map((exp, expIdx) => {
            const isPresent = exp.date_end === 'present';
            const brandColor = exp.brand_color || '#0891b2';
            const brandColorLight = `${brandColor}12`;
            const brandColorBorder = `${brandColor}30`;
            const companyShort =
              (exp as { company_short?: string }).company_short || exp.company;
            const logo = (exp as { logo?: string }).logo;
            const location = (exp as { location?: string }).location;

            return (
              <motion.article
                key={exp.id}
                variants={itemVariants}
                className="group relative"
              >
                {/* Animated gradient border glow */}
                <div
                  className="absolute -inset-[1px] rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                  style={{
                    background: `linear-gradient(135deg, ${brandColor}60, transparent 50%, ${brandColor}40)`,
                    filter: 'blur(8px)',
                  }}
                />

                {/* Main Card */}
                <motion.div
                  className="relative glass-card rounded-3xl overflow-hidden backdrop-blur-xl transition-all duration-500"
                  style={{
                    border: '1px solid var(--border)',
                    boxShadow: '0 4px 24px rgba(0,0,0,0.04)',
                  }}
                  whileHover={{
                    y: -2, // Giảm độ nẩy khi hover một chút để hợp với UI compact hơn
                    transition: { duration: 0.3, ease: 'easeOut' },
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow =
                      `0 12px 40px ${brandColor}15, 0 4px 12px rgba(0,0,0,0.05)`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow =
                      '0 4px 24px rgba(0,0,0,0.04)';
                  }}
                >
                  {/* Decorative gradient overlay */}
                  <div
                    className="absolute top-0 right-0 w-72 h-72 rounded-full opacity-[0.06] blur-3xl pointer-events-none"
                    style={{
                      background: `radial-gradient(circle, ${brandColor} 0%, transparent 70%)`,
                    }}
                  />

                  <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-0">
                    {/* ── LEFT COLUMN: Company Summary ── */}
                    <div
                      className="lg:col-span-4 relative p-5 md:p-6 lg:p-6 lg:border-r" // GIẢM: p-6 md:p-8 xuống p-5 md:p-6
                      style={{
                        borderColor: 'var(--border)',
                        background: `linear-gradient(135deg, ${brandColorLight} 0%, transparent 100%)`,
                      }}
                    >
                      {/* Company Logo & Name */}
                      <div className="flex flex-col items-center text-center gap-4 mb-5">
                        <motion.div
                          transition={{ duration: 0.3 }}
                          whileHover={{ scale: 1.03 }}
                          className="relative w-full max-w-[280px] md:max-w-[340px] aspect-[2/1] rounded-3xl overflow-hidden flex items-center justify-center flex-shrink-0"
                          style={{ border: '1px solid var(--border)' }}
                        >
                          {logo ? (
                            <Image
                              src={getImagePath(logo)}
                              alt={exp.company}
                              width={640} // Tăng size gốc để ảnh sắc nét hơn khi bung to
                              height={320}
                              className="object-cover w-full h-full"
                              unoptimized
                              onError={() => {}}
                            />
                          ) : (
                            <Building2
                              className="w-16 h-16 md:w-20 md:h-20"
                              style={{ color: 'var(--text-muted)' }}
                            />
                          )}
                        </motion.div>

                        <div className="min-w-0 w-full">
                          <div
                            className="text-[10px] font-bold uppercase tracking-[0.18em] mb-1.5"
                            style={{ color: brandColor }}
                          >
                            {t.experience.company_label || 'Company'}
                          </div>
                          <h3
                            className="text-lg md:text-xl font-bold font-heading leading-tight"
                            style={{ color: 'var(--text)' }}
                          >
                            {companyShort}
                          </h3>
                          <p
                            className="text-xs mt-1.5 leading-relaxed"
                            style={{ color: 'var(--text-subtle)' }}
                          >
                            {exp.company}
                          </p>
                        </div>
                      </div>

                      {/* Role - Highlighted */}
                      <div
                        className="relative rounded-xl p-3 mb-4 overflow-hidden" // GIẢM: p-4 mb-5 -> p-3 mb-4
                        style={{
                          background: `${brandColor}10`,
                          border: `1px solid ${brandColorBorder}`,
                        }}
                      >
                        <div
                          className="absolute -top-6 -right-6 w-20 h-20 rounded-full opacity-20 blur-2xl"
                          style={{ background: brandColor }}
                        />
                        <div className="relative flex items-start gap-2">
                          <Sparkles
                            className="w-3.5 h-3.5 mt-0.5 flex-shrink-0"
                            style={{ color: brandColor }}
                          />
                          <div className="min-w-0">
                            <div
                              className="text-[10px] font-bold uppercase tracking-widest mb-0.5"
                              style={{ color: brandColor }}
                            >
                              {t.experience.role_label || 'Position'}
                            </div>
                            <p
                              className="text-xs md:text-sm font-bold leading-snug"
                              style={{ color: 'var(--text)' }}
                            >
                              {exp.role}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Meta Info */}
                      <div className="space-y-2">
                        {' '}
                        {/* GIẢM: space-y-2.5 -> space-y-2 */}
                        {/* Period */}
                        <div className="flex items-center gap-2">
                          <div
                            className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" // GIẢM: w-8 h-8 -> w-7 h-7
                            style={{
                              background: `${brandColor}15`,
                              border: `1px solid ${brandColorBorder}`,
                            }}
                          >
                            <Calendar
                              className="w-3.5 h-3.5"
                              style={{ color: brandColor }}
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div
                              className="text-[10px] font-semibold uppercase tracking-wider"
                              style={{ color: 'var(--text-subtle)' }}
                            >
                              {t.experience.period_label || 'Period'}
                            </div>
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span
                                className="text-xs font-semibold"
                                style={{ color: 'var(--text)' }}
                              >
                                {exp.period}
                              </span>
                              {isPresent && (
                                <span
                                  className="inline-flex items-center gap-1 text-[9px] font-bold px-1.5 py-0.5 rounded-full"
                                  style={{
                                    background: 'rgba(16,185,129,0.12)',
                                    border: '1px solid rgba(16,185,129,0.3)',
                                    color: '#10b981',
                                  }}
                                >
                                  <span className="relative flex w-1 h-1">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-70" />
                                    <span className="relative inline-flex rounded-full w-1 h-1 bg-emerald-500" />
                                  </span>
                                  {t.experience.present}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        {/* Team */}
                        <div className="flex items-center gap-2">
                          <div
                            className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                            style={{
                              background: `${brandColor}15`,
                              border: `1px solid ${brandColorBorder}`,
                            }}
                          >
                            <Users
                              className="w-3.5 h-3.5"
                              style={{ color: brandColor }}
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div
                              className="text-[10px] font-semibold uppercase tracking-wider"
                              style={{ color: 'var(--text-subtle)' }}
                            >
                              {t.experience.team_label || 'Team'}
                            </div>
                            <span
                              className="text-xs font-semibold"
                              style={{ color: 'var(--text)' }}
                            >
                              {exp.team}
                            </span>
                          </div>
                        </div>
                        {/* Location */}
                        {location && (
                          <div className="flex items-center gap-2">
                            <div
                              className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                              style={{
                                background: `${brandColor}15`,
                                border: `1px solid ${brandColorBorder}`,
                              }}
                            >
                              <MapPin
                                className="w-3.5 h-3.5"
                                style={{ color: brandColor }}
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div
                                className="text-[10px] font-semibold uppercase tracking-wider"
                                style={{ color: 'var(--text-subtle)' }}
                              >
                                {t.experience.location_label || 'Location'}
                              </div>
                              <span
                                className="text-xs font-semibold"
                                style={{ color: 'var(--text)' }}
                              >
                                {location}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* ── RIGHT COLUMN: Details ── */}
                    <div className="lg:col-span-8 p-5 md:p-6 lg:p-6">
                      {' '}
                      {/* GIẢM: p-6 md:p-8 xuống p-5 md:p-6 */}
                      {/* Tech Stack */}
                      <div className="mb-4">
                        {' '}
                        {/* GIẢM: mb-6 -> mb-4 */}
                        <div className="flex items-center gap-3 mb-2.5">
                          {' '}
                          {/* GIẢM: mb-4 -> mb-2.5 */}
                          <div
                            className="text-[11px] font-bold uppercase tracking-[0.15em]"
                            style={{ color: brandColor }}
                          >
                            {t.experience.tech_stack}
                          </div>
                          <div
                            className="flex-1 h-px"
                            style={{
                              background: `linear-gradient(90deg, ${brandColor}40, transparent)`,
                            }}
                          />
                        </div>
                        <motion.div
                          variants={containerVariants}
                          className="flex flex-wrap gap-1.5" // GIẢM: gap-2 -> gap-1.5
                        >
                          {exp.tech.map((tech) => (
                            <motion.span
                              key={tech}
                              variants={techChipVariants}
                              whileHover={{
                                y: -1,
                                scale: 1.02,
                                transition: { duration: 0.2 },
                              }}
                              className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg cursor-default" // GIẢM: px-3 py-1.5 -> px-2.5 py-1
                              style={{
                                background: `${brandColor}10`,
                                border: `1px solid ${brandColorBorder}`,
                                color: brandColor,
                              }}
                            >
                              <span
                                className="w-1.5 h-1.5 rounded-full"
                                style={{ background: brandColor }}
                              />
                              {tech}
                            </motion.span>
                          ))}
                        </motion.div>
                      </div>
                      {/* Divider */}
                      <div
                        className="h-px rounded-full mb-4" // GIẢM: mb-6 -> mb-4
                        style={{
                          background: `linear-gradient(90deg, transparent, ${brandColor}30, transparent)`,
                        }}
                      />
                      {/* Responsibilities */}
                      <div className="mb-1">
                        <div className="flex items-center gap-3 mb-2.5">
                          {' '}
                          {/* GIẢM: mb-4 -> mb-2.5 */}
                          <div
                            className="text-[11px] font-bold uppercase tracking-[0.15em]"
                            style={{ color: brandColor }}
                          >
                            {t.experience.responsibilities}
                          </div>
                          <div
                            className="flex-1 h-px"
                            style={{
                              background: `linear-gradient(90deg, ${brandColor}40, transparent)`,
                            }}
                          />
                          {/* <div
                            className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                            style={{
                              background: `${brandColor}10`,
                              color: brandColor,
                            }}
                          >
                            {exp.responsibilities.length}
                          </div> */}
                        </div>

                        <motion.ul
                          variants={containerVariants}
                          className="space-y-1.5" // GIẢM: space-y-2 -> space-y-1.5
                        >
                          {exp.responsibilities.map((item, idx) => (
                            <motion.li
                              key={idx}
                              variants={responsibilityItemVariants}
                              className="group/item flex items-start gap-2 py-1" // GIẢM: gap-2.5 py-1.5 -> gap-2 py-1
                            >
                              {/* Bullet accent */}
                              <span
                                className="mt-2 flex-shrink-0 w-1.5 h-1.5 rounded-full transition-all duration-300 group-hover/item:scale-125"
                                style={{ background: brandColor }}
                              />

                              {/* Text */}
                              <p
                                className="flex-1 min-w-0 text-[13px] leading-relaxed"
                                style={{ color: 'var(--text-muted)' }}
                              >
                                <HighlightedText
                                  text={item}
                                  brandColor={brandColor}
                                />
                              </p>
                            </motion.li>
                          ))}
                        </motion.ul>
                      </div>
                    </div>
                  </div>

                  {/* Bottom corner accent */}
                  <div
                    className="absolute bottom-0 left-0 w-32 h-1 rounded-r-full"
                    style={{
                      background: `linear-gradient(90deg, ${brandColor}, transparent)`,
                    }}
                  />
                </motion.div>

                {/* Exp index indicator below card */}
                {expIdx < items.length - 1 && (
                  <div className="flex justify-center mt-3 mb-1">
                    {' '}
                    {/* GIẢM: mt-6 mb-2 -> mt-3 mb-1 */}
                    <div
                      className="w-px h-4" // GIẢM: h-6 -> h-4
                      style={{
                        background: `linear-gradient(180deg, ${brandColor}40, transparent)`,
                      }}
                    />
                  </div>
                )}
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
