import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Briefcase,
  GraduationCap,
  MapPin,
  Mail,
  Copy,
  Check,
  Zap,
  Music, 
  Film, 
  Cpu, 
  Trophy,
  ExternalLink,
  Sparkles
} from 'lucide-react'

// Staggered Entrance Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
}

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.45, ease: 'easeOut' as const }
  }
}

export const ClydeAbout: React.FC = () => {
  const [copied, setCopied] = useState(false)

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.stopPropagation()
    navigator.clipboard.writeText('infantrojar@gmail.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2200)
  }

  // Enhanced 4 personal interest cards with distinct micro-themes
  const interests = [
    { 
      label: 'Music', 
      sub: 'Melody & Rhythm',
      icon: Music,
      bgLight: 'bg-purple-50',
      bgHover: 'group-hover:bg-purple-600',
      textLight: 'text-purple-600',
      textHover: 'group-hover:text-white',
      borderHover: 'hover:border-purple-300/80',
      shadowHover: 'hover:shadow-purple-500/10'
    },
    { 
      label: 'Cinema', 
      sub: 'Stories & Frames',
      icon: Film,
      bgLight: 'bg-amber-50',
      bgHover: 'group-hover:bg-amber-600',
      textLight: 'text-amber-600',
      textHover: 'group-hover:text-white',
      borderHover: 'hover:border-amber-300/80',
      shadowHover: 'hover:shadow-amber-500/10'
    },
    { 
      label: 'Technology', 
      sub: 'Code & Systems',
      icon: Cpu,
      bgLight: 'bg-sky-50',
      bgHover: 'group-hover:bg-sky-600',
      textLight: 'text-sky-600',
      textHover: 'group-hover:text-white',
      borderHover: 'hover:border-sky-300/80',
      shadowHover: 'hover:shadow-sky-500/10'
    },
    { 
      label: 'Cricket', 
      sub: 'Strategy & Sport',
      icon: Trophy,
      bgLight: 'bg-emerald-50',
      bgHover: 'group-hover:bg-emerald-600',
      textLight: 'text-emerald-600',
      textHover: 'group-hover:text-white',
      borderHover: 'hover:border-emerald-300/80',
      shadowHover: 'hover:shadow-emerald-500/10'
    }
  ]

  return (
    <section 
      id="about" 
      className="relative w-full py-16 sm:py-24 lg:py-28 bg-white select-none font-sans scroll-mt-16 sm:scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-10 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* ============================================================ */}
          {/* LEFT COLUMN: FLUSH-TOP FRAMED PORTRAIT + 4 INTERESTS BELOW   */}
          {/* ============================================================ */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-start max-w-[420px] mx-auto lg:mx-0 w-full space-y-4">
            
            {/* Framed Portrait Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="relative w-full rounded-2xl bg-gradient-to-b from-[#e5e7eb] to-[#d4d7dc] border border-gray-200/90 shadow-xl overflow-hidden group"
            >
              {/* Studio Lighting Vignette */}
              <div className="absolute inset-0 bg-radial from-white/30 via-transparent to-black/10 pointer-events-none" />

              {/* Framed Professional Portrait with fluid responsive height */}
              <div className="relative w-full h-[330px] xs:h-[380px] sm:h-[460px] flex items-end justify-center pt-4 sm:pt-6 px-3 sm:px-4">
                <img
                  src="/profile-clean.png"
                  alt="Infant Rojar"
                  className="w-full h-auto object-contain max-h-[330px] xs:max-h-[380px] sm:max-h-[460px] select-none transition-transform duration-500 group-hover:scale-[1.02] drop-shadow-md"
                  style={{
                    WebkitMaskImage: 'linear-gradient(to bottom, black 95%, transparent 100%)',
                    maskImage: 'linear-gradient(to bottom, black 95%, transparent 100%)'
                  }}
                  loading="lazy"
                />
              </div>

              {/* Corner Frame Accent */}
              <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-lg border border-gray-200/80 shadow-xs flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[11px] font-bold text-gray-800 tracking-wider uppercase">Open to Work</span>
              </div>
            </motion.div>

            {/* 4 Enhanced Personal Interest Cards (2x2 Grid Under Photo) */}
            <div className="w-full pt-1">
              <div className="flex items-center gap-2 mb-2.5 px-1">
                <Sparkles className="w-3.5 h-3.5 text-[#a1a480]" />
                <span 
                  className="text-[11px] font-bold tracking-[0.16em] text-gray-400 uppercase"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  Interests & Passions
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2.5 w-full">
                {interests.map((item) => {
                  const IconComp = item.icon
                  return (
                    <motion.div 
                      key={item.label}
                      whileHover={{ y: -3, scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      className={`flex items-center space-x-2.5 p-2.5 sm:p-3 rounded-xl bg-[#fafaf9] hover:bg-white border border-gray-200/80 ${item.borderHover} shadow-2xs hover:shadow-md ${item.shadowHover} transition-all duration-300 group cursor-default`}
                    >
                      <div className={`w-9 h-9 rounded-lg ${item.bgLight} ${item.bgHover} ${item.textLight} ${item.textHover} flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 shrink-0`}>
                        <IconComp className="w-4 h-4" />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-[13px] font-extrabold text-gray-800 tracking-tight group-hover:text-black transition-colors truncate">
                          {item.label}
                        </span>
                        <span className="text-[10px] font-medium text-gray-400 group-hover:text-gray-600 transition-colors truncate">
                          {item.sub}
                        </span>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>

          </div>

          {/* ============================================================ */}
          {/* RIGHT COLUMN: ABOUT DETAILS & INTERACTIVE BENTO TILES        */}
          {/* ============================================================ */}
          <div className="lg:col-span-7 flex flex-col justify-start text-left">
            
            {/* Subtitle */}
            <span 
              className="text-[12px] sm:text-[13px] font-bold tracking-[0.2em] text-[#a1a480] uppercase block mb-2"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              MY INTRO
            </span>

            {/* Main Heading */}
            <h2 
              className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-black tracking-tight leading-tight mb-4"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              About Me
            </h2>

            {/* Accurate Professional Bio Paragraph */}
            <p className="text-[14px] sm:text-[15.5px] leading-relaxed text-gray-600 mb-6 max-w-2xl">
              I&apos;m a Computer Science and Engineering graduate with 1 year and 4 months of professional experience in Cloud Infrastructure Services at Capgemini. With a strong interest in frontend and full-stack development, I enjoy building modern, responsive, and user-friendly web applications. My approach combines technical problem-solving, thoughtful design, and continuous learning to turn ideas into practical digital solutions.
            </p>

            {/* ============================================================ */}
            {/* INTERACTIVE BENTO METRIC CARDS (APPLE / LINEAR STYLE)        */}
            {/* ============================================================ */}
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-5"
            >
              
              {/* CARD 1: IT EXPERIENCE */}
              <motion.div 
                variants={cardVariants}
                whileHover={{ 
                  y: -4, 
                  boxShadow: '0 12px 24px -6px rgba(0, 0, 0, 0.08), 0 4px 8px -4px rgba(0, 0, 0, 0.04)',
                  transition: { duration: 0.2 } 
                }}
                className="p-4 rounded-xl bg-[#fafaf9] hover:bg-white border border-gray-200/80 hover:border-[#a1a480]/60 shadow-2xs transition-all duration-300 group cursor-default"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-gray-500 group-hover:text-[#787c53] transition-colors">
                    <div className="group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                      <Briefcase className="w-4 h-4" />
                    </div>
                    <span className="text-[11px] font-bold tracking-wider uppercase">IT Experience</span>
                  </div>
                  <span className="text-[10px] font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">Capgemini</span>
                </div>
                <div className="text-[18px] sm:text-[20px] font-black text-gray-900 tracking-tight">
                  1 Year 4 Months
                </div>
                <p className="text-[12px] text-gray-500 font-medium mt-0.5">
                  Cloud Infrastructure Services
                </p>
              </motion.div>

              {/* CARD 2: AVAILABILITY & PULSING GREEN DOT */}
              <motion.div 
                variants={cardVariants}
                whileHover={{ 
                  y: -4, 
                  boxShadow: '0 12px 24px -6px rgba(16, 185, 129, 0.12), 0 4px 8px -4px rgba(16, 185, 129, 0.04)',
                  transition: { duration: 0.2 } 
                }}
                className="p-4 rounded-xl bg-[#f0fdf4] hover:bg-white border border-emerald-200/80 hover:border-emerald-400/80 shadow-2xs transition-all duration-300 relative overflow-hidden group cursor-default"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-emerald-700">
                    <div className="group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                      <Zap className="w-4 h-4 fill-emerald-500 text-emerald-500" />
                    </div>
                    <span className="text-[11px] font-bold tracking-wider uppercase">Availability</span>
                  </div>
                  {/* Clean Pulsing Green Dot (without LIVE text) */}
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </span>
                </div>
                <div className="text-[18px] sm:text-[20px] font-black text-emerald-950 tracking-tight">
                  Immediate Joiner
                </div>
                <p className="text-[12px] text-emerald-700/80 font-medium mt-0.5">
                  Ready to onboard & relocate
                </p>
              </motion.div>

              {/* CARD 3: EDUCATION */}
              <motion.div 
                variants={cardVariants}
                whileHover={{ 
                  y: -4, 
                  boxShadow: '0 12px 24px -6px rgba(0, 0, 0, 0.08), 0 4px 8px -4px rgba(0, 0, 0, 0.04)',
                  transition: { duration: 0.2 } 
                }}
                className="p-4 rounded-xl bg-[#fafaf9] hover:bg-white border border-gray-200/80 hover:border-[#a1a480]/60 shadow-2xs transition-all duration-300 group cursor-default"
              >
                <div className="flex items-center gap-2 text-gray-500 group-hover:text-[#787c53] transition-colors mb-2">
                  <div className="group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-bold tracking-wider uppercase">Education</span>
                </div>
                <div className="text-[15px] sm:text-[16px] font-extrabold text-gray-900 tracking-tight leading-snug">
                  B.E. Computer Science & Eng.
                </div>
                <p className="text-[12px] text-gray-500 font-medium mt-0.5">
                  Engineering Graduate
                </p>
              </motion.div>

              {/* CARD 4: LOCATION (CLEAN) */}
              <motion.div 
                variants={cardVariants}
                whileHover={{ 
                  y: -4, 
                  boxShadow: '0 12px 24px -6px rgba(0, 0, 0, 0.08), 0 4px 8px -4px rgba(0, 0, 0, 0.04)',
                  transition: { duration: 0.2 } 
                }}
                className="p-4 rounded-xl bg-[#fafaf9] hover:bg-white border border-gray-200/80 hover:border-[#a1a480]/60 shadow-2xs transition-all duration-300 group cursor-default"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-gray-500 group-hover:text-[#787c53] transition-colors">
                    <div className="group-hover:scale-110 group-hover:translate-y-[-1px] transition-transform duration-300">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <span className="text-[11px] font-bold tracking-wider uppercase">Location</span>
                  </div>
                  <span className="text-[10px] font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">India</span>
                </div>
                <div className="text-[15px] sm:text-[16px] font-extrabold text-gray-900 tracking-tight">
                  Coimbatore, Tamil Nadu
                </div>
                <p className="text-[12px] text-gray-500 font-medium mt-0.5">
                  Open to On-site, Hybrid & Remote
                </p>
              </motion.div>

              {/* CARD 5: INTERACTIVE EMAIL (SPAN FULL 2 COLS) */}
              <motion.div 
                variants={cardVariants}
                whileHover={{ 
                  y: -4, 
                  boxShadow: '0 12px 24px -6px rgba(0, 0, 0, 0.08), 0 4px 8px -4px rgba(0, 0, 0, 0.04)',
                  transition: { duration: 0.2 } 
                }}
                className="sm:col-span-2 p-4 rounded-xl bg-gradient-to-r from-[#fafaf9] via-white to-[#fafaf9] border border-gray-200/80 hover:border-[#a1a480]/60 shadow-2xs transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gray-100 group-hover:bg-[#a1a480]/20 text-gray-700 group-hover:text-[#787c53] flex items-center justify-center transition-colors shrink-0 group-hover:scale-105 duration-300">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-[11px] font-bold tracking-wider uppercase text-gray-400 block">
                      Direct Email
                    </span>
                    <a 
                      href="https://mail.google.com/mail/?view=cm&fs=1&to=infantrojar@gmail.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[13.5px] xs:text-[14.5px] sm:text-[15.5px] font-bold text-gray-900 hover:text-[#a1a480] transition-colors break-all sm:break-normal block"
                      title="Compose in Gmail (New Tab)"
                    >
                      infantrojar@gmail.com
                    </a>
                  </div>
                </div>

                {/* Interactive Copy Button & Gmail Redirect */}
                <div className="flex items-center gap-2 self-end sm:self-center">
                  <button
                    onClick={handleCopyEmail}
                    aria-label="Copy Email to Clipboard"
                    className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 text-[12px] font-bold tracking-wide transition-all shadow-2xs active:scale-95 cursor-pointer hover:border-gray-300"
                  >
                    <AnimatePresence mode="wait">
                      {copied ? (
                        <motion.span 
                          key="copied"
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.8, opacity: 0 }}
                          className="flex items-center gap-1 text-emerald-600 font-bold"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Copied!</span>
                        </motion.span>
                      ) : (
                        <motion.span 
                          key="copy"
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.8, opacity: 0 }}
                          className="flex items-center gap-1"
                        >
                          <Copy className="w-3.5 h-3.5 text-gray-400 group-hover:text-gray-600" />
                          <span>Copy</span>
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </button>

                  {/* Gmail Direct Compose Button */}
                  <a
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=infantrojar@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#a1a480] hover:bg-[#8d906a] text-white text-[12px] font-bold tracking-wide transition-all shadow-xs hover:shadow-md hover:scale-[1.02] active:scale-95 cursor-pointer"
                    title="Open Gmail in New Tab"
                  >
                    <span>Write</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </motion.div>

            </motion.div>

            {/* Social Connect Icons (Only GitHub & LinkedIn with premium dynamic hover) */}
            <div className="flex items-center gap-3 pt-2">
              <span className="text-[11px] font-bold tracking-wider uppercase text-gray-400 mr-1">
                Connect:
              </span>

              {/* GitHub Button */}
              <motion.a
                href="https://github.com/Infant22"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                whileHover={{ y: -3, scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className="group relative w-10 h-10 rounded-xl bg-gray-100 hover:bg-[#181717] text-gray-700 hover:text-white flex items-center justify-center transition-all duration-300 shadow-2xs hover:shadow-lg hover:shadow-black/20 border border-gray-200/60 hover:border-transparent cursor-pointer"
              >
                <svg className="w-4 h-4 fill-current transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </motion.a>

              {/* LinkedIn Button */}
              <motion.a
                href="https://linkedin.com/in/infant-rojar"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                whileHover={{ y: -3, scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className="group relative w-10 h-10 rounded-xl bg-gray-100 hover:bg-[#0077b5] text-gray-700 hover:text-white flex items-center justify-center transition-all duration-300 shadow-2xs hover:shadow-lg hover:shadow-blue-500/25 border border-gray-200/60 hover:border-transparent cursor-pointer"
              >
                <svg className="w-4 h-4 fill-current transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9h2.79v8.37H6.46v-8.37M7.86 6.34a1.59 1.59 0 1 0 0 3.18 1.59 1.59 0 0 0 0-3.18z" />
                </svg>
              </motion.a>
            </div>

          </div>

        </div>
      </div>
    </section>
  )
}
