'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Heart, ChevronLeft, ChevronRight } from 'lucide-react'
import { useLanguage } from '@/lib/i18n/LanguageContext'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const interestImages: Record<string, string> = {
  'Open Source': 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=400&h=300&fit=crop',
  'Continuous Learning': 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop',
  'Gaming & E-sports': 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop',
  'Fitness & Health': 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=300&fit=crop',
  'Music': 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=300&fit=crop',
  'Travel & Culture': 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=300&fit=crop',
  // Vietnamese
  'Học Hỏi Liên Tục': 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop',
  'Thể Dục & Sức Khỏe': 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=300&fit=crop',
  'Âm Nhạc': 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=300&fit=crop',
  'Du Lịch & Văn Hóa': 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=300&fit=crop',
}

export default function Interests() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [activeCard, setActiveCard] = useState<number | null>(null)
  const [page, setPage] = useState(0)
  const [itemsPerPage, setItemsPerPage] = useState(3)

  const items = t.goals.interests_items

  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const maxPage = Math.max(0, Math.ceil(items.length / itemsPerPage) - 1)

  const nextPage = useCallback(() => {
    setPage((p) => (p >= maxPage ? 0 : p + 1))
  }, [maxPage])

  const prevPage = useCallback(() => {
    setPage((p) => (p <= 0 ? maxPage : p - 1))
  }, [maxPage])

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(nextPage, 4500)
    return () => clearInterval(timer)
  }, [nextPage])

  const startIdx = page * itemsPerPage
  const visibleItems = items.slice(startIdx, startIdx + itemsPerPage)

  return (
    <section className="section-padding relative pb-12 md:pb-20">
      {/* BG */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-5"
          style={{ background: 'radial-gradient(circle, var(--accent-cyan) 0%, transparent 70%)' }}
        />
      </div>

      <div className="section-container" ref={ref}>
        {/* Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-12"
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
            <Heart className="w-3.5 h-3.5" />
            {t.goals.interests_title}
          </motion.div>
        </motion.div>

        {/* Square Image Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={page}
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {visibleItems.map((item, idx) => {
                const globalIdx = startIdx + idx
                const isActive = activeCard === globalIdx
                const imageUrl = interestImages[item.title]

                return (
                  <motion.div
                    key={`${item.title}-${page}`}
                    whileHover={{ y: -6, scale: 1.02 }}
                    onClick={() => setActiveCard(isActive ? null : globalIdx)}
                    className="relative cursor-pointer group overflow-hidden rounded-2xl"
                    style={{
                      aspectRatio: '1 / 1',
                      border: '1px solid var(--border)',
                      transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = 'rgba(6,182,212,0.5)'
                      ;(e.currentTarget as HTMLElement).style.boxShadow = '0 8px 32px rgba(6,182,212,0.2)'
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = ''
                      ;(e.currentTarget as HTMLElement).style.boxShadow = ''
                    }}
                  >
                    {/* Background Image */}
                    {imageUrl ? (
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                        style={{ backgroundImage: `url(${imageUrl})` }}
                      />
                    ) : (
                      <div
                        className="absolute inset-0"
                        style={{
                          background: `linear-gradient(135deg, rgba(6,182,212,0.15), rgba(99,102,241,0.1))`,
                        }}
                      />
                    )}

                    {/* Dark Overlay */}
                    <div
                      className="absolute inset-0 transition-opacity duration-300"
                      style={{
                        background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.15) 100%)',
                        opacity: isActive ? 0.95 : 0.7,
                      }}
                    />

                    {/* Content */}
                    <div className="relative z-10 h-full p-5 flex flex-col justify-end">
                      <span className="text-3xl mb-3">{item.icon}</span>
                      <h4 className="text-lg font-bold font-heading text-white mb-1.5">
                        {item.title}
                      </h4>

                      <AnimatePresence>
                        {isActive && (
                          <motion.p
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="text-sm leading-relaxed text-gray-300 overflow-hidden"
                          >
                            {item.description}
                          </motion.p>
                        )}
                      </AnimatePresence>

                      {!isActive && (
                        <p className="text-xs text-gray-400 mt-1">Click to read more</p>
                      )}
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          </AnimatePresence>

          {/* Pagination */}
          {maxPage > 0 && (
            <div className="flex items-center justify-center gap-4 mt-8">
              <motion.button
                onClick={prevPage}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-9 h-9 rounded-full flex items-center justify-center"
                style={{
                  background: 'rgba(6,182,212,0.12)',
                  border: '1px solid rgba(6,182,212,0.3)',
                  color: 'var(--accent-cyan)',
                }}
              >
                <ChevronLeft className="w-4 h-4" />
              </motion.button>
              <div className="flex gap-1.5">
                {Array.from({ length: maxPage + 1 }).map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    onClick={() => setPage(dotIdx)}
                    className="rounded-full transition-all duration-300"
                    style={{
                      width: page === dotIdx ? 24 : 8,
                      height: 8,
                      background: page === dotIdx ? 'var(--accent-cyan)' : 'rgba(6,182,212,0.3)',
                    }}
                  />
                ))}
              </div>
              <motion.button
                onClick={nextPage}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-9 h-9 rounded-full flex items-center justify-center"
                style={{
                  background: 'rgba(6,182,212,0.12)',
                  border: '1px solid rgba(6,182,212,0.3)',
                  color: 'var(--accent-cyan)',
                }}
              >
                <ChevronRight className="w-4 h-4" />
              </motion.button>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
