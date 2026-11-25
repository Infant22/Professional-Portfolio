import React from 'react'
import { motion } from 'framer-motion'
import { 
  Layout, 
  Server, 
  Database, 
  Cloud, 
  Terminal, 
  ShieldCheck
} from 'lucide-react'
import { TechIcon } from '../ui/TechIcons'

// Staggered entrance variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.08
    }
  }
}

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.42, ease: 'easeOut' as const }
  }
}

interface SkillCategory {
  id: string
  title: string
  badge: string
  badgeType: 'project' | 'training' | 'professional'
  icon: React.ElementType
  description: string
  skills: string[]
}

export const ClydeSkills: React.FC = () => {
  // 13 Technologies for the Marquee showcase
  const marqueeTechs = [
    'HTML5',
    'CSS3',
    'JavaScript',
    'React',
    'TypeScript',
    'Tailwind CSS',
    'Node.js',
    'Express.js',
    'Python',
    'MongoDB',
    'PostgreSQL',
    'Git',
    'Linux'
  ]

  // 6 Categorized Bento Cards reordered:
  // Row 1: Frontend Development, Backend Development, Databases
  // Row 2: Tools & Deployment, Cloud & Infrastructure, IT Operations
  const categories: SkillCategory[] = [
    {
      id: 'frontend',
      title: 'Frontend Development',
      badge: 'Project Experience',
      badgeType: 'project',
      icon: Layout,
      description: 'Building responsive, accessible, and dynamic user interfaces.',
      skills: ['HTML5', 'CSS3', 'JavaScript', 'React', 'TypeScript', 'Tailwind CSS']
    },
    {
      id: 'backend',
      title: 'Backend Development',
      badge: 'Project Experience',
      badgeType: 'project',
      icon: Server,
      description: 'Developing server logic, RESTful services, and backend workflows.',
      skills: ['Node.js', 'Express.js', 'Python', 'REST APIs']
    },
    {
      id: 'databases',
      title: 'Databases',
      badge: 'Project Experience',
      badgeType: 'project',
      icon: Database,
      description: 'Relational schema design and document storage systems.',
      skills: ['MongoDB', 'PostgreSQL', 'MySQL', 'SQL']
    },
    {
      id: 'tools-deployment',
      title: 'Tools & Deployment',
      badge: 'Project Experience',
      badgeType: 'project',
      icon: Terminal,
      description: 'Version control, bundling engines, and modern cloud hosting.',
      skills: ['Git', 'GitHub', 'Vite', 'Netlify', 'Vercel', 'Render']
    },
    {
      id: 'cloud-infra',
      title: 'Cloud & Infrastructure',
      badge: 'IT Experience & Training',
      badgeType: 'training',
      icon: Cloud,
      description: 'Enterprise server administration, identity, and network operations.',
      skills: ['Linux', 'Windows Server', 'Active Directory', 'Networking']
    },
    {
      id: 'it-operations',
      title: 'IT Operations',
      badge: 'Capgemini IT Experience',
      badgeType: 'professional',
      icon: ShieldCheck,
      description: 'Enterprise IT service management, access governance, and troubleshooting.',
      skills: ['ServiceNow', 'Okta', 'Microsoft 365', 'Technical Troubleshooting']
    }
  ]

  // Mouse spotlight handler on card
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`)
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`)
  }

  return (
    <section 
      id="skills" 
      className="relative w-full py-14 sm:py-20 bg-[#fafaf9] select-none font-sans border-t border-gray-100 overflow-hidden scroll-mt-16 sm:scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-10 lg:px-12">
        
        {/* ============================================================ */}
        {/* 1. SECTION HEADING (COMPACT & BALANCED)                      */}
        {/* ============================================================ */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <span 
            className="text-[12px] sm:text-[13px] font-bold tracking-[0.2em] text-[#a1a480] uppercase block mb-2"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            MY TECH STACK
          </span>

          <h2 
            className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-black tracking-tight leading-tight mb-3"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Skills & Technologies
          </h2>

          <p className="text-[14px] sm:text-[15.5px] leading-relaxed text-gray-600 max-w-2xl mx-auto">
            The technologies and tools I use to build applications, solve problems, and work with modern IT systems.
          </p>
        </div>

        {/* ============================================================ */}
        {/* 2. ANIMATED TECHNOLOGY MARQUEE (OPTIMIZED VERTICAL SPACING)  */}
        {/* ============================================================ */}
        <div 
          className="relative w-full mb-8 sm:mb-10 py-1.5 overflow-hidden group"
          style={{ touchAction: 'pan-y' }}
        >
          
          {/* Soft Left and Right Edge Gradient Fades */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-[#fafaf9] via-[#fafaf9]/90 to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-[#fafaf9] via-[#fafaf9]/90 to-transparent z-10" />

          {/* Scrolling Strip with Pause on Hover */}
          <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused] focus-within:[animation-play-state:paused] motion-reduce:animate-none">
            {/* Tripled list for infinite looping */}
            {[...marqueeTechs, ...marqueeTechs, ...marqueeTechs].map((tech, index) => (
              <div 
                key={`${tech}-${index}`}
                className="flex items-center gap-2 px-3.5 py-2 mx-1.5 rounded-xl bg-white hover:bg-white border border-gray-200/80 hover:border-[#a1a480]/70 shadow-2xs hover:shadow-md transition-all duration-300 group/chip hover:scale-105 cursor-default shrink-0"
              >
                <div className="transition-transform duration-300 group-hover/chip:scale-110">
                  <TechIcon name={tech} className="w-4.5 h-4.5 shrink-0" />
                </div>
                <span className="text-[12.5px] font-bold text-gray-800 tracking-tight whitespace-nowrap group-hover/chip:text-black">
                  {tech}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ============================================================ */}
        {/* 3. INTERACTIVE BENTO GRID (COMPACT DIMENSIONS, 6 CARDS)      */}
        {/* ============================================================ */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.08 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
        >
          {categories.map((cat) => {
            const IconComponent = cat.icon

            return (
              <motion.div
                key={cat.id}
                variants={cardVariants}
                whileHover={{ 
                  y: -4,
                  boxShadow: '0 12px 26px -8px rgba(0, 0, 0, 0.08), 0 4px 8px -4px rgba(0, 0, 0, 0.03)',
                  transition: { duration: 0.2, ease: 'easeOut' }
                }}
                onMouseMove={handleMouseMove}
                className="relative p-4.5 sm:p-5 rounded-2xl bg-white border border-gray-200/85 hover:border-[#a1a480]/70 shadow-2xs transition-all duration-300 overflow-hidden flex flex-col justify-between h-full group"
              >
                {/* Mouse-Tracking Spotlight Overlay */}
                <div 
                  className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: 'radial-gradient(320px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(161, 164, 128, 0.09), transparent 80%)'
                  }}
                />

                {/* Card Header & Content */}
                <div>
                  <div className="flex items-center justify-between gap-2 flex-wrap mb-3">
                    {/* Category Icon */}
                    <div className="w-9 h-9 rounded-xl bg-gray-100 group-hover:bg-[#a1a480]/20 text-gray-700 group-hover:text-[#787c53] flex items-center justify-center transition-all duration-300 group-hover:scale-105 shrink-0">
                      <IconComponent className="w-4.5 h-4.5" />
                    </div>

                    {/* Accurate Group Badge */}
                    {cat.badgeType === 'professional' ? (
                      <span className="text-[10px] sm:text-[10.5px] font-bold text-emerald-800 bg-emerald-50/90 border border-emerald-200/80 px-2.5 py-0.5 rounded-full tracking-wide flex items-center gap-1.5 shrink-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        {cat.badge}
                      </span>
                    ) : cat.badgeType === 'training' ? (
                      <span className="text-[10px] sm:text-[10.5px] font-bold text-sky-800 bg-sky-50/90 border border-sky-200/80 px-2.5 py-0.5 rounded-full tracking-wide flex items-center gap-1.5 shrink-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                        {cat.badge}
                      </span>
                    ) : (
                      <span className="text-[10px] sm:text-[10.5px] font-semibold text-gray-500 bg-gray-100/90 border border-gray-200/70 px-2.5 py-0.5 rounded-full tracking-wide shrink-0">
                        {cat.badge}
                      </span>
                    )}
                  </div>

                  {/* Category Title */}
                  <h3 
                    className="text-[17px] sm:text-[18px] font-extrabold text-black tracking-tight mb-1 group-hover:text-gray-950 transition-colors"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    {cat.title}
                  </h3>

                  {/* Category Brief Description */}
                  <p className="text-[12px] sm:text-[12.5px] text-gray-500 leading-snug mb-3.5">
                    {cat.description}
                  </p>
                </div>

                {/* Individual Tech Chips */}
                <div className="flex flex-wrap gap-1.5 pt-2.5 border-t border-gray-100">
                  {cat.skills.map((skill) => (
                    <div
                      key={skill}
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gray-50/80 hover:bg-white border border-gray-200/60 hover:border-gray-300 hover:shadow-2xs transition-all duration-200 hover:scale-[1.03] cursor-default group/tech"
                    >
                      <div className="transition-transform duration-200 group-hover/tech:scale-110">
                        <TechIcon name={skill} className="w-3.5 h-3.5 shrink-0" />
                      </div>
                      <span className="text-[11.5px] font-bold text-gray-800 tracking-tight group-hover/tech:text-black">
                        {skill}
                      </span>
                    </div>
                  ))}
                </div>

              </motion.div>
            )
          })}
        </motion.div>

      </div>
    </section>
  )
}
