import React, { useState, useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion'
import { 
  ArrowUpRight, 
  FileText, 
  Mail, 
  Zap
} from 'lucide-react'
import { portfolioData } from '../../data/portfolioData'

export const HeroSection: React.FC = () => {
  const { personal } = portfolioData
  const heroRef = useRef<HTMLElement>(null)

  // ---------------------------------------------------------------------------
  // 1. SCROLL-DRIVEN PARALLAX
  // ---------------------------------------------------------------------------
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  })

  const contentY = useTransform(scrollYProgress, [0, 1], [0, 80])
  const avatarY = useTransform(scrollYProgress, [0, 1], [0, 120])
  const gridY = useTransform(scrollYProgress, [0, 1], [0, 50])

  // ---------------------------------------------------------------------------
  // 2. DESKTOP CURSOR ILLUMINATION
  // ---------------------------------------------------------------------------
  const [isDesktopPointer, setIsDesktopPointer] = useState(false)
  const cursorX = useMotionValue(-500)
  const cursorY = useMotionValue(-500)
  
  const springConfig = { damping: 25, stiffness: 160 }
  const smoothX = useSpring(cursorX, springConfig)
  const smoothY = useSpring(cursorY, springConfig)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)')
    setIsDesktopPointer(mediaQuery.matches)

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    if (mediaQuery.matches) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true })
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [cursorX, cursorY])

  // ---------------------------------------------------------------------------
  // 3. NOTICEABLE NATURAL 3D TILT FOR PROFILE AVATAR (+-10 degrees)
  // ---------------------------------------------------------------------------
  const cardX = useMotionValue(0)
  const cardY = useMotionValue(0)

  const tiltSpring = { damping: 15, stiffness: 180 }
  const rotateX = useSpring(useTransform(cardY, [-150, 150], [10, -10]), tiltSpring)
  const rotateY = useSpring(useTransform(cardX, [-150, 150], [-10, 10]), tiltSpring)

  const handleAvatarMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    cardX.set(e.clientX - centerX)
    cardY.set(e.clientY - centerY)
  }

  const handleAvatarMouseLeave = () => {
    cardX.set(0)
    cardY.set(0)
  }

  // ---------------------------------------------------------------------------
  // 4. WORD-BY-WORD HEADING REVEAL
  // ---------------------------------------------------------------------------
  const nameWords = personal.name.split(' ')
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  }

  const wordVariants = {
    hidden: { y: '105%', opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1] as const
      }
    }
  }

  return (
    <section 
      ref={heroRef}
      className="relative pt-6 pb-20 md:pt-14 md:pb-32 overflow-hidden"
    >
      
      {/* ============================================================== */}
      {/* UNMISTAKABLY VISIBLE ARCHITECTURAL GRID BACKGROUND              */}
      {/* ============================================================== */}
      <motion.div 
        style={{ y: gridY }}
        className="absolute inset-0 pointer-events-none -z-20 overflow-hidden"
      >
        {/* Bold Grid Pattern (Dark: Cyan/Tangerine tech grid | Light: Crisp slate graph) */}
        <div 
          className="absolute inset-0 opacity-40 dark:opacity-35"
          style={{
            backgroundImage: `
              linear-gradient(to right, currentColor 1px, transparent 1px),
              linear-gradient(to bottom, currentColor 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            color: 'inherit'
          }}
        />

        {/* Major Grid Accent Lines every 4th column (160px) */}
        <div 
          className="absolute inset-0 opacity-20 dark:opacity-25 text-[#FF4D24]"
          style={{
            backgroundImage: `
              linear-gradient(to right, currentColor 1.5px, transparent 1.5px),
              linear-gradient(to bottom, currentColor 1.5px, transparent 1.5px)
            `,
            backgroundSize: '160px 160px'
          }}
        />

        {/* Ambient Warm Glow Hub */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[450px] bg-[#FF4D24]/[0.12] dark:bg-[#FF4D24]/[0.18] rounded-full blur-[120px] pointer-events-none" />
      </motion.div>

      {/* Interactive Cursor Spotlight that illuminates the grid cells */}
      {isDesktopPointer && (
        <motion.div
          className="fixed pointer-events-none rounded-full -z-10 blur-[80px]"
          style={{
            x: smoothX,
            y: smoothY,
            translateX: '-50%',
            translateY: '-50%',
            width: 450,
            height: 450,
            background: 'radial-gradient(circle, rgba(255, 77, 36, 0.22) 0%, rgba(255, 77, 36, 0.05) 50%, transparent 70%)'
          }}
        />
      )}

      {/* Hero Content Container with Multi-Plane Parallax */}
      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* ============================================================== */}
          {/* LEFT COLUMN: IDENTITY & PITCH (Subtle Parallax Plane 1)        */}
          {/* ============================================================== */}
          <motion.div 
            style={{ y: contentY }}
            className="lg:col-span-7 flex flex-col items-start text-left z-10 will-change-transform"
          >
            
            {/* Status Pill Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold border mb-6 transition-all shadow-sm bg-white/90 dark:bg-[#121824]/90 backdrop-blur-md border-slate-200/90 dark:border-[#1E2738] text-slate-800 dark:text-slate-200"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>{personal.availability}</span>
            </motion.div>

            {/* Salutation & Name with Word-by-Word Reveal */}
            <div className="mb-3">
              <motion.span 
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.05 }}
                className="text-sm font-bold font-mono tracking-wider uppercase text-[#FF4D24] block"
              >
                HELLO THERE! I'M
              </motion.span>
              
              {/* Word-by-word Heading Mask */}
              <motion.h1 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.05] mt-1.5 text-[#0F172A] dark:text-[#F8FAFC] flex flex-wrap gap-x-3.5"
              >
                {nameWords.map((word, index) => (
                  <span key={index} className="inline-block overflow-hidden py-1">
                    <motion.span 
                      variants={wordVariants}
                      className="inline-block"
                    >
                      {word}
                    </motion.span>
                  </span>
                ))}
              </motion.h1>
            </div>

            {/* Role & Specialisations */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.28, ease: 'easeOut' }}
              className="mb-5 flex flex-wrap items-center gap-2.5"
            >
              <span className="text-xl sm:text-2xl font-bold text-[#1E293B] dark:text-[#E2E8F0]">
                {personal.title}
              </span>
              <span className="hidden sm:inline text-slate-400 dark:text-slate-600">—</span>
              <div className="flex flex-wrap items-center gap-2">
                {personal.specialisations.map((spec: string) => (
                  <span 
                    key={spec} 
                    className="text-xs font-semibold px-2.5 py-1 rounded-md bg-[#FFF0EB] dark:bg-[#FF4D24]/15 text-[#E03E16] dark:text-[#FF5A36] border border-[#FFD8CC] dark:border-[#FF4D24]/20"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Pitch / Description */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35, ease: 'easeOut' }}
              className="text-base sm:text-lg text-[#334155] dark:text-[#94A3B8] max-w-xl leading-relaxed mb-8 font-normal"
            >
              {personal.description}
            </motion.p>

            {/* Action Buttons & Socials Row */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.42, ease: 'easeOut' }}
              className="flex flex-wrap items-center gap-3.5 w-full sm:w-auto"
            >
              {/* Primary: Explore Projects */}
              <motion.a
                href="#projects"
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm bg-[#FF4D24] hover:bg-[#E03E16] text-white shadow-lg shadow-[#FF4D24]/25 flex items-center justify-center gap-2 cursor-pointer shrink-0 transition-colors"
              >
                <span>Explore Projects</span>
                <ArrowUpRight className="w-4 h-4" />
              </motion.a>

              {/* Secondary: Download Resume */}
              <motion.a
                href={personal.resumeUrl}
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-5 py-3.5 rounded-xl font-bold text-xs sm:text-sm border border-slate-300 dark:border-[#222E42] bg-white dark:bg-[#121824] hover:bg-slate-50 dark:hover:bg-[#182030] text-slate-800 dark:text-slate-200 shadow-sm flex items-center justify-center gap-2 cursor-pointer shrink-0 transition-colors"
              >
                <FileText className="w-4 h-4 text-[#FF4D24]" />
                <span>Resume</span>
              </motion.a>

              {/* Tertiary: Contact Me */}
              <motion.a
                href="#contact"
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-5 py-3.5 rounded-xl font-bold text-xs sm:text-sm border border-slate-300 dark:border-[#222E42] bg-white dark:bg-[#121824] hover:bg-slate-50 dark:hover:bg-[#182030] text-slate-800 dark:text-slate-200 shadow-sm flex items-center justify-center gap-2 cursor-pointer shrink-0 transition-colors"
              >
                <Mail className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                <span>Contact</span>
              </motion.a>

              {/* Social Icons */}
              <div className="flex items-center gap-2 pl-1 sm:pl-2 pt-2 sm:pt-0">
                <motion.a
                  href={personal.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub Profile"
                  whileHover={{ y: -3, scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  className="h-11 w-11 rounded-xl border border-slate-300 dark:border-[#222E42] bg-white dark:bg-[#121824] hover:border-[#FF4D24] dark:hover:border-[#FF4D24] text-slate-700 dark:text-slate-300 hover:text-[#FF4D24] dark:hover:text-[#FF4D24] flex items-center justify-center shadow-sm transition-colors"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                </motion.a>

                <motion.a
                  href={personal.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn Profile"
                  whileHover={{ y: -3, scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  className="h-11 w-11 rounded-xl border border-slate-300 dark:border-[#222E42] bg-white dark:bg-[#121824] hover:border-[#FF4D24] dark:hover:border-[#FF4D24] text-slate-700 dark:text-slate-300 hover:text-[#FF4D24] dark:hover:text-[#FF4D24] flex items-center justify-center shadow-sm transition-colors"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </motion.a>
              </div>
            </motion.div>

          </motion.div>

          {/* ============================================================== */}
          {/* RIGHT COLUMN: AVATAR WITH NOTICEABLE 3D TILT                   */}
          {/* ============================================================== */}
          <motion.div 
            style={{ y: avatarY }}
            className="lg:col-span-5 flex justify-center items-center relative will-change-transform"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              onMouseMove={handleAvatarMouseMove}
              onMouseLeave={handleAvatarMouseLeave}
              style={{
                perspective: 600,
                rotateX: rotateX,
                rotateY: rotateY
              }}
              className="relative flex items-center justify-center cursor-pointer will-change-transform"
            >
              
              {/* Outer Radiant Tangerine Ring */}
              <div className="relative w-[300px] h-[300px] sm:w-[340px] sm:h-[340px] rounded-full p-2.5 bg-gradient-to-tr from-[#FF5A36] via-[#FF3D10] to-[#FFA07A] shadow-[0_20px_50px_rgba(255,77,36,0.3)] transition-all duration-300 hover:shadow-[0_30px_70px_rgba(255,77,36,0.5)] hover:scale-[1.02]">
                
                {/* Inner Circle Frame */}
                <div className="w-full h-full rounded-full overflow-hidden relative bg-[#0D121D] flex items-end justify-center border-4 border-white dark:border-[#121824]">
                  
                  {/* Subtle Inner Background Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-b from-[#FF4D24]/20 via-[#FF4D24]/10 to-[#0D121D]" />

                  {/* Clean Defringed Portrait Image */}
                  <img 
                    src="/profile-clean.png" 
                    alt={personal.name} 
                    className="w-[108%] h-auto max-h-[105%] object-cover object-top select-none pointer-events-none z-10 translate-y-3"
                  />
                </div>
              </div>

              {/* Seamless Full-Perimeter Rotating Badge */}
              <div className="absolute -top-3 -right-2 sm:-right-4 z-20">
                <div className="relative w-28 h-28 flex items-center justify-center">
                  
                  {/* Backdrop disk */}
                  <div className="absolute inset-1 rounded-full border border-dashed border-slate-300 dark:border-slate-700 bg-white/95 dark:bg-[#121824]/95 backdrop-blur-md shadow-xl" />
                  
                  {/* Circular text filling 100% of perimeter without gaps */}
                  <div className="animate-spin-slow absolute inset-0 flex items-center justify-center pointer-events-none">
                    <svg className="w-full h-full p-1" viewBox="0 0 100 100">
                      <path
                        id="circleTextPath"
                        d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                        fill="none"
                      />
                      <text 
                        className="text-[9.2px] font-mono font-extrabold uppercase fill-slate-800 dark:fill-slate-200"
                        textLength="232"
                        lengthAdjust="spacingAndGlyphs"
                      >
                        <textPath href="#circleTextPath" startOffset="0%">
                          ✦ OPEN TO WORK ✦ HIRE ME ✦ FULL STACK DEV 
                        </textPath>
                      </text>
                    </svg>
                  </div>

                  {/* Center Accent Badge */}
                  <div className="h-9 w-9 rounded-full bg-[#FF4D24] text-white flex items-center justify-center shadow-lg z-10">
                    <Zap className="w-4 h-4 fill-white" />
                  </div>
                </div>
              </div>

            </motion.div>
          </motion.div>

        </div>
      </div>

    </section>
  )
}
