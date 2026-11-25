import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useInView } from 'framer-motion'
import { 
  Headphones, 
  UserCheck, 
  Wifi, 
  FileText, 
  GraduationCap
} from 'lucide-react'
import { TechIcon } from '../ui/TechIcons'

type TabType = 'responsibilities' | 'tools' | 'training'

export const ClydeExperience: React.FC = () => {
  const tabs: TabType[] = ['responsibilities', 'tools', 'training']
  const [activeTab, setActiveTab] = useState<TabType>('responsibilities')
  const [direction, setDirection] = useState(0)

  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.25 })

  // Animated duration counter (16 months total = 1 Year 4 Months)
  const [monthsCount, setMonthsCount] = useState(0)
  useEffect(() => {
    if (!isInView) return
    let current = 0
    const target = 16
    const interval = setInterval(() => {
      current += 1
      setMonthsCount(current)
      if (current >= target) clearInterval(interval)
    }, 45)
    return () => clearInterval(interval)
  }, [isInView])

  const handleTabChange = (newTab: TabType) => {
    const currentIndex = tabs.indexOf(activeTab)
    const newIndex = tabs.indexOf(newTab)
    setDirection(newIndex > currentIndex ? 1 : -1)
    setActiveTab(newTab)
  }

  // 3D Perspective Tilt on Company Showcase Card
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 350, damping: 26 })
  const springY = useSpring(mouseY, { stiffness: 350, damping: 26 })
  const rotateX = useTransform(springY, [-0.5, 0.5], ['5deg', '-5deg'])
  const rotateY = useTransform(springX, [-0.5, 0.5], ['-5deg', '5deg'])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const xPct = (e.clientX - rect.left) / rect.width - 0.5
    const yPct = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(xPct)
    mouseY.set(yPct)
    e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
    e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  // Right Side Data
  const responsibilities = [
    {
      title: 'Enterprise IT Support',
      desc: 'Provided technical assistance and resolved enterprise IT incidents through ServiceNow.',
      icon: Headphones
    },
    {
      title: 'Identity & Access Management',
      desc: 'Assisted users with authentication, password resets, and access-related issues.',
      icon: UserCheck
    },
    {
      title: 'Application & Connectivity Support',
      desc: 'Troubleshot Microsoft 365, Windows, VPN, and enterprise applications.',
      icon: Wifi
    },
    {
      title: 'Incident Management',
      desc: 'Documented incidents, managed service requests, and coordinated escalations with internal teams.',
      icon: FileText
    }
  ]

  const toolsList = [
    { name: 'ServiceNow', role: 'ITSM & Incidents' },
    { name: 'Okta', role: 'Identity & Access' },
    { name: 'Active Directory', role: 'Directory Services' },
    { name: 'Microsoft 365', role: 'Productivity Suite' },
    { name: 'Windows', role: 'OS Diagnostics' },
    { name: 'VPN', role: 'Remote Tunnel' }
  ]

  const trainingTopics = [
    { name: 'Windows Server', desc: 'Server administration & roles' },
    { name: 'Active Directory', desc: 'Domain controller architecture' },
    { name: 'DNS & DHCP', desc: 'Enterprise naming & IP resolution' },
    { name: 'Linux', desc: 'CLI administration & navigation' },
    { name: 'Group Policy', desc: 'GPO creation & enforcement' },
    { name: 'IIS', desc: 'Web hosting & bindings' }
  ]

  const tabVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 16 : -16,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.25, ease: 'easeOut' as const }
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -16 : 16,
      opacity: 0,
      transition: { duration: 0.18, ease: 'easeIn' as const }
    })
  }

  return (
    <section 
      id="experience" 
      ref={sectionRef} 
      className="relative w-full py-12 sm:py-16 bg-[#fafaf9] select-none font-sans border-t border-gray-100 overflow-hidden scroll-mt-16 sm:scroll-mt-20"
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-10 lg:px-12">
        
        {/* ============================================================ */}
        {/* 1. SECTION HEADING (UPDATED DESCRIPTION)                     */}
        {/* ============================================================ */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <span 
            className="text-[12px] sm:text-[13px] font-bold tracking-[0.2em] text-[#a1a480] uppercase block mb-1.5"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            MY PROFESSIONAL JOURNEY
          </span>

          <h2 
            className="text-3xl sm:text-4xl lg:text-[38px] font-extrabold text-black tracking-tight leading-tight mb-2.5"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Work Experience
          </h2>

          <p className="text-[13.5px] sm:text-[15px] leading-relaxed text-gray-600 max-w-2xl mx-auto">
            My professional experience in enterprise IT infrastructure and technical support.
          </p>
        </div>

        {/* ============================================================ */}
        {/* 2. SPLIT-SCREEN CAREER SHOWCASE (~40% LEFT / ~60% RIGHT)     */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          
          {/* ========================================================== */}
          {/* LEFT: CORPORATE COMPANY PROFILE (EQUAL HEIGHT TO RIGHT)    */}
          {/* ========================================================== */}
          <div className="lg:col-span-5 flex">
            <motion.div
              style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="relative w-full h-full rounded-2xl bg-white border border-gray-200/90 shadow-2xs hover:shadow-lg transition-all duration-300 p-6 sm:p-7 flex flex-col justify-between overflow-hidden group"
            >
              {/* Subtle Capgemini Flowing Wave Pattern with Slow Movement */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
                <motion.svg
                  viewBox="0 0 800 500"
                  className="absolute -top-12 -left-12 w-[140%] h-[140%] opacity-[0.065]"
                  animate={{
                    x: [-20, 20, -20],
                    y: [-12, 12, -12]
                  }}
                  transition={{
                    duration: 14,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M-50,140 C120,70 280,210 440,120 C600,30 720,160 850,100"
                    stroke="#0070AD"
                    strokeWidth="2.5"
                  />
                  <path
                    d="M-50,190 C150,110 310,250 470,160 C630,70 750,200 850,140"
                    stroke="#0070AD"
                    strokeWidth="1.8"
                    strokeDasharray="8 8"
                  />
                  <path
                    d="M-50,240 C100,170 260,300 420,200 C580,100 700,240 850,180"
                    stroke="#0096E6"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M-50,290 C170,210 330,340 490,240 C650,140 770,280 850,220"
                    stroke="#0070AD"
                    strokeWidth="1"
                  />
                </motion.svg>
              </div>

              {/* Cursor-Following Spotlight Overlay */}
              <div 
                className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: 'radial-gradient(350px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(0, 112, 173, 0.07), transparent 80%)'
                }}
              />

              {/* Refined Brand Accent: Thin 2.5px Capgemini Blue Line */}
              <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-[#0070AD]" />

              {/* Top Block: Official Branding & Designation */}
              <div className="relative z-10">
                
                {/* Official Capgemini Logo & Wordmark Asset + Full-time Badge */}
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="flex items-center">
                    <svg viewBox="0 0 170 34" className="h-7 sm:h-8 w-auto select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
                      {/* Authentic Capgemini Blue Spade Emblem */}
                      <g transform="translate(0, 1)">
                        <path
                          d="M16 2C11.5 7.5 7.5 12.5 7.5 16.5C7.5 20.2 10.5 22.8 14.5 22.8C15.2 22.8 15.6 22.5 15.2 24.2C14.8 25.6 14.2 27.2 13.5 28.5H18.5C17.8 27.2 17.2 25.6 16.8 24.2C16.4 22.5 16.8 22.8 17.5 22.8C21.5 22.8 24.5 20.2 24.5 16.5C24.5 12.5 20.5 7.5 16 2Z"
                          fill="#0070AD"
                        />
                      </g>
                      {/* Official Capgemini Wordmark */}
                      <text
                        x="34"
                        y="23"
                        fontFamily="'Poppins', sans-serif"
                        fontSize="20"
                        fontWeight="800"
                        letterSpacing="-0.5px"
                        fill="#0B132B"
                      >
                        Capgemini
                      </text>
                    </svg>
                  </div>

                  <span className="px-2.5 py-0.5 rounded-full text-[10.5px] font-bold bg-[#0070AD]/10 text-[#0070AD] border border-[#0070AD]/20 tracking-wide flex items-center gap-1.5 shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0070AD]" />
                    Full-time
                  </span>
                </div>

                {/* Designation & Domain */}
                <h3 className="text-[15.5px] sm:text-[16.5px] font-extrabold text-black tracking-tight leading-snug">
                  Analyst – Cloud Infrastructure Services
                </h3>
                
                <div className="flex items-center gap-2 mt-2 flex-wrap">
                  <span className="text-[11px] font-semibold text-gray-600 bg-gray-100 px-2.5 py-0.5 rounded-md">
                    IT Infrastructure & Support
                  </span>
                  <span className="text-[11px] font-medium text-gray-400">
                    Enterprise Services
                  </span>
                </div>
              </div>

              {/* Middle Block: Brief Enterprise Scope Summary */}
              <div className="relative z-10 my-3 p-3 rounded-xl bg-gray-50/80 border border-gray-100/90 text-[12.5px] text-gray-600 leading-relaxed">
                Provided enterprise technical support, resolving IT incidents, access requests, and infrastructure connectivity for global users.
              </div>

              {/* Bottom Block: Experience Duration & Timeline */}
              <div className="relative z-10 pt-1">
                <div className="flex items-baseline justify-between mb-1.5">
                  <span className="text-[10px] font-bold tracking-[0.16em] uppercase text-gray-400">
                    Total Experience
                  </span>
                  <span 
                    className="text-xl sm:text-[22px] font-extrabold text-black tracking-tight"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    {monthsCount >= 12 ? '1' : '0'} Year {monthsCount >= 12 ? monthsCount - 12 : monthsCount} Months
                  </span>
                </div>

                {/* Naturally Integrated Horizontal Employment Timeline */}
                <div className="flex items-center justify-between text-[10.5px] font-bold text-gray-500 mb-1.5">
                  <div className="flex items-center gap-1.5 text-sky-800">
                    <span className="w-2 h-2 rounded-full bg-[#0070AD]" />
                    <span>Dec 2024 — Joined</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-emerald-700">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>Apr 2026 — Completed</span>
                  </div>
                </div>

                {/* Animated Horizontal Track */}
                <div className="relative h-1.5 w-full bg-gray-100 rounded-full overflow-hidden border border-gray-200/80">
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                    transition={{ duration: 1.1, ease: 'easeOut', delay: 0.2 }}
                    className="absolute inset-0 origin-left bg-gradient-to-r from-[#0070AD] via-sky-500 to-emerald-500 rounded-full"
                  />
                </div>
              </div>

            </motion.div>
          </div>

          {/* ========================================================== */}
          {/* RIGHT: PROFESSIONAL EXPLORER (PRESERVED CONTENT & TABS)    */}
          {/* ========================================================== */}
          <div className="lg:col-span-7 flex">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
              className="w-full h-full rounded-2xl bg-white border border-gray-200/90 shadow-2xs p-6 sm:p-7 flex flex-col justify-between"
            >
              <div>
                
                {/* Modern Segmented Navigation Bar */}
                <div className="flex items-center p-1 rounded-xl bg-gray-100 border border-gray-200/70 mb-5">
                  {tabs.map((tab) => {
                    const isActive = activeTab === tab

                    return (
                      <button
                        key={tab}
                        onClick={() => handleTabChange(tab)}
                        className={`relative flex-1 py-1.5 px-1 sm:px-2 text-[11px] xs:text-[11.5px] sm:text-[12.5px] font-bold tracking-wide transition-colors duration-200 cursor-pointer z-10 text-center ${
                          isActive ? 'text-black' : 'text-gray-500 hover:text-gray-900'
                        }`}
                      >
                        {isActive && (
                          <motion.div
                            layoutId="activeTabIndicator"
                            transition={{ type: 'spring', duration: 0.35, bounce: 0.12 }}
                            className="absolute inset-0 bg-white rounded-lg shadow-2xs border border-gray-200/80"
                          />
                        )}
                        <span className="relative z-10">
                          {tab === 'responsibilities' ? 'Responsibilities' :
                           tab === 'tools' ? (
                             <>
                               <span className="hidden sm:inline">Tools &amp; Technologies</span>
                               <span className="sm:hidden">Tools &amp; Tech</span>
                             </>
                           ) : 'Training'}
                        </span>
                      </button>
                    )
                  })}
                </div>

                {/* Animated Directional Content Container */}
                <AnimatePresence mode="wait" custom={direction}>
                  
                  {/* TAB 01: RESPONSIBILITIES (CLEAN EDITORIAL LIST WITH DIVIDERS) */}
                  {activeTab === 'responsibilities' && (
                    <motion.div
                      key="responsibilities"
                      custom={direction}
                      variants={tabVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      className="divide-y divide-gray-100/90"
                    >
                      {responsibilities.map((item, idx) => {
                        const IconComp = item.icon
                        return (
                          <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2, delay: idx * 0.04 }}
                            className="py-2.5 first:pt-0 last:pb-0 flex items-start gap-3 group"
                          >
                            <div className="w-7 h-7 rounded-lg bg-[#0070AD]/10 text-[#0070AD] flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#0070AD] group-hover:text-white transition-colors duration-200">
                              <IconComp className="w-3.5 h-3.5" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <h4 className="text-[13px] font-bold text-gray-900 tracking-tight group-hover:text-black">
                                {item.title}
                              </h4>
                              <p className="text-[12px] text-gray-600 leading-snug mt-0.5">
                                {item.desc}
                              </p>
                            </div>
                          </motion.div>
                        )
                      })}
                    </motion.div>
                  )}

                  {/* TAB 02: TOOLS & TECHNOLOGIES (COMPACT BRAND CARDS) */}
                  {activeTab === 'tools' && (
                    <motion.div
                      key="tools"
                      custom={direction}
                      variants={tabVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      className="grid grid-cols-2 sm:grid-cols-3 gap-2.5"
                    >
                      {toolsList.map((tool, idx) => (
                        <motion.div
                          key={tool.name}
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.2, delay: idx * 0.03 }}
                          className="flex items-center gap-2.5 p-2.5 rounded-xl bg-gray-50/80 hover:bg-white border border-gray-200/70 hover:border-[#0070AD]/40 shadow-2xs hover:shadow-xs transition-all duration-200 group cursor-default"
                        >
                          <div className="w-8 h-8 rounded-lg bg-white border border-gray-200/80 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform duration-200">
                            <TechIcon name={tool.name} className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <span className="text-[12px] font-bold text-gray-900 block truncate">
                              {tool.name}
                            </span>
                            <span className="text-[10px] text-gray-500 font-medium block truncate">
                              {tool.role}
                            </span>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}

                  {/* TAB 03: PROFESSIONAL TRAINING (COMPACT CHIPS) */}
                  {activeTab === 'training' && (
                    <motion.div
                      key="training"
                      custom={direction}
                      variants={tabVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                    >
                      {/* Distinguishing Caption */}
                      <div className="p-2.5 rounded-xl bg-sky-50/70 border border-sky-200/70 mb-3 flex items-center gap-2">
                        <GraduationCap className="w-3.5 h-3.5 text-[#0070AD] shrink-0" />
                        <span className="text-[11.5px] text-sky-950 font-medium">
                          Technical onboarding and hands-on infrastructure training.
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {trainingTopics.map((topic, idx) => (
                          <motion.div
                            key={topic.name}
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2, delay: idx * 0.03 }}
                            className="flex items-center gap-2 p-2 rounded-lg bg-gray-50/80 hover:bg-white border border-gray-200/70 hover:border-[#a1a480]/50 transition-all shadow-2xs group cursor-default"
                          >
                            <div className="shrink-0 group-hover:scale-105 transition-transform duration-200">
                              <TechIcon name={topic.name} className="w-3.5 h-3.5" />
                            </div>
                            <div className="min-w-0">
                              <span className="text-[11.5px] font-bold text-gray-900 block truncate">
                                {topic.name}
                              </span>
                              <span className="text-[10px] text-gray-500 font-medium block truncate">
                                {topic.desc}
                              </span>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                </AnimatePresence>

              </div>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  )
}
