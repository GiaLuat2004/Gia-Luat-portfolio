'use client'

import { motion, useMotionValue, useTransform, useMotionTemplate } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function AnimatedBackground() {
  const [mounted, setMounted] = useState(false)

  // Parallax
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Spotlight
  const spotlightX = useMotionValue(0)
  const spotlightY = useMotionValue(0)

  const spotlightBackground = useMotionTemplate`radial-gradient(600px circle at ${spotlightX}px ${spotlightY}px, rgba(255,255,255,0.06), transparent 80%)`

  const blob2X = useTransform(mouseX, (v) => v * -0.6)
  const blob2Y = useTransform(mouseY, (v) => v * -0.6)

  const blob3X = useTransform(mouseX, (v) => v * 0.3)
  const blob3Y = useTransform(mouseY, (v) => v * 0.3)

  useEffect(() => {
    setMounted(true)

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window

      // Parallax
      mouseX.set((e.clientX / innerWidth - 0.5) * 40)
      mouseY.set((e.clientY / innerHeight - 0.5) * 40)

      // Spotlight
      spotlightX.set(e.clientX)
      spotlightY.set(e.clientY)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY, spotlightX, spotlightY])

  if (!mounted) return null

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0">

      {/* 🌈 Gradient overlay (light/dark balance) */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-transparent to-white/30 dark:from-black/40 dark:to-black/60" />

      {/* 🔲 Grid */}
      <div className="absolute inset-0 
        bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),
             linear-gradient(to_bottom,#80808012_1px,transparent_1px)]
        bg-[size:24px_24px]
        [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" 
      />

      {/* 🎞 Noise */}
      <div 
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] mix-blend-overlay"
        style={{ backgroundImage: 'url("/noise.png")' }}
      />

      {/* 💡 Spotlight */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: spotlightBackground
        }}
      />

      {/* 🔵 Blob 1 - Cyan */}
      <motion.div
        animate={{
          x: [0, 60, -30, 0],
          y: [0, 40, -60, 0],
          scale: [1, 1.15, 0.9, 1],
          opacity: [0.3, 0.45, 0.25, 0.3],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          x: mouseX,
          y: mouseY
        }}
        className="absolute top-[-10%] left-[-10%] 
          w-[50vw] max-w-[600px] 
          h-[50vw] max-h-[600px] 
          rounded-full blur-[140px] 
          opacity-30 dark:opacity-20 
          will-change-transform"
      >
        <div className="w-full h-full bg-[radial-gradient(circle,var(--accent-cyan)_0%,transparent_60%)]" />
      </motion.div>

      {/* 🟣 Blob 2 - Indigo */}
      <motion.div
        animate={{
          x: [0, -70, 40, 0],
          y: [0, 50, -50, 0],
          scale: [1, 1.2, 0.85, 1],
          opacity: [0.2, 0.35, 0.15, 0.2],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          x: blob2X,
          y: blob2Y
        }}
        className="absolute bottom-[-10%] right-[-10%] 
          w-[55vw] max-w-[700px] 
          h-[55vw] max-h-[700px] 
          rounded-full blur-[160px] 
          opacity-20 dark:opacity-10 
          will-change-transform"
      >
        <div className="w-full h-full bg-[radial-gradient(circle,var(--accent-indigo)_0%,transparent_60%)]" />
      </motion.div>

      {/* 🟢 Blob 3 - Emerald */}
      <motion.div
        animate={{
          x: [0, 50, -50, 0],
          y: [0, -40, 60, 0],
          scale: [1, 0.9, 1.1, 1],
          opacity: [0.15, 0.3, 0.1, 0.15],
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          x: blob3X,
          y: blob3Y
        }}
        className="absolute top-[20%] left-[30%] 
          w-[40vw] max-w-[500px] 
          h-[40vw] max-h-[500px] 
          rounded-full blur-[120px] 
          opacity-20 dark:opacity-[0.12] 
          will-change-transform"
      >
        <div className="w-full h-full bg-[radial-gradient(circle,var(--accent-emerald,#10b981)_0%,transparent_60%)]" />
      </motion.div>
    </div>
  )
}