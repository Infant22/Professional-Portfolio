import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  ArrowUpRight, 
  CheckCircle2, 
  Sparkles,
  BookOpen,
  Cpu,
  CloudSun,
  Mic,
  Activity,
  Bot,
  HeartPulse,
  Globe
} from 'lucide-react'
import { portfolioData, type Project } from '../../data/portfolioData'
import { TechIcon } from '../ui/TechIcons'
import { CaseStudyDrawer } from './CaseStudyDrawer'

// Helper for project category icons in "More Projects"
const getMoreProjectIcon = (id: string) => {
  switch (id) {
    case 'deepfake-detection':
      return <Cpu className="w-4.5 h-4.5 text-purple-600" />
    case 'atmos-weather':
      return <CloudSun className="w-4.5 h-4.5 text-amber-500" />
    case 'voice-based-email':
      return <Mic className="w-4.5 h-4.5 text-sky-600" />
    default:
      return <Sparkles className="w-4.5 h-4.5 text-[#a1a480]" />
  }
}

// Browser Mockup Component with Proportionate Sizing & Fallback
const BrowserMockup: React.FC<{
  project: Project
  onOpenCaseStudy: () => void
}> = ({ project, onOpenCaseStudy }) => {
  const [imageError, setImageError] = useState(false)

  const displayUrl = project.liveUrl 
    ? project.liveUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')
    : `${project.id}.local`

  return (
    <div 
      onClick={onOpenCaseStudy}
      className="relative group w-full h-full min-h-[240px] xs:min-h-[280px] sm:min-h-[340px] lg:min-h-[380px] flex flex-col rounded-2xl overflow-hidden border border-gray-200/90 bg-[#f4f4f5] shadow-2xs hover:shadow-lg transition-all duration-300 cursor-pointer"
    >
      {/* Browser Top Bar */}
      <div className="px-3 sm:px-3.5 py-2 sm:py-2.5 bg-white/95 backdrop-blur-md border-b border-gray-200/80 flex items-center justify-between gap-2 sm:gap-3 shrink-0 select-none">
        {/* Window Traffic Lights */}
        <div className="flex items-center gap-1.5 shrink-0">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
        </div>

        {/* URL Address Bar */}
        <div className="flex-1 max-w-[160px] xs:max-w-[220px] sm:max-w-xs mx-auto px-2 sm:px-2.5 py-0.5 rounded-md bg-gray-100 border border-gray-200/60 text-center">
          <span className="text-[10px] sm:text-[10.5px] font-mono text-gray-500 truncate block">
            {displayUrl}
          </span>
        </div>

        {/* Live Status Indicator */}
        <div className="w-6 shrink-0 flex justify-end">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" title="System Active" />
        </div>
      </div>

      {/* Screen Area (Full frame height, crisp top-aligned app view) */}
      <div className="relative w-full flex-1 min-h-0 overflow-hidden bg-gradient-to-br from-[#f8f9fa] to-[#eceff1] flex items-center justify-center">
        {!imageError ? (
          <img
            src={project.image}
            alt={`${project.title} Preview Screenshot`}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover object-top block select-none transition-transform duration-500 group-hover:scale-[1.02]"
            loading="lazy"
          />
        ) : null}

        {/* High-Fidelity Placeholder (Fallback) */}
        {imageError && (
          <div className="relative aspect-[16/10] w-full flex flex-col items-center justify-center p-5 text-center select-none bg-gradient-to-b from-[#fbfbfb] to-[#f0f2f5]">
            <div className="w-12 h-12 rounded-xl bg-white border border-gray-200/90 shadow-2xs flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform duration-300">
              {project.id === 'apply-ai' && <Bot className="w-6 h-6 text-[#1A73E8]" />}
              {project.id === 'page-pulse' && <Activity className="w-6 h-6 text-emerald-600" />}
              {project.id === 'world-trends' && <Globe className="w-6 h-6 text-sky-600" />}
              {project.id === 'sweety-glucose-tracker' && <HeartPulse className="w-6 h-6 text-rose-500" />}
            </div>

            <h4 
              className="text-[16px] font-extrabold text-black tracking-tight"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              {project.title}
            </h4>
            <p className="text-[11.5px] text-gray-500 font-medium max-w-xs mt-0.5 mb-2.5 line-clamp-1">
              {project.tagline}
            </p>

            {/* Quick Tech Pill Row on Placeholder */}
            <div className="flex items-center gap-1.5 flex-wrap justify-center">
              {project.technologies.slice(0, 3).map((t) => (
                <span key={t} className="text-[9.5px] font-bold text-gray-600 bg-white/90 border border-gray-200/80 px-2 py-0.5 rounded-md shadow-2xs">
                  {t}
                </span>
              ))}
            </div>

            {/* Hover Prompt */}
            <span className="absolute bottom-2.5 text-[10.5px] font-semibold text-[#a1a480] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1">
              Click to view Case Study
              <ArrowUpRight className="w-3 h-3" />
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

export const ClydeProjects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const featured = portfolioData.featuredProjects
  const more = portfolioData.moreProjects

  return (
    <section 
      id="projects" 
      className="relative w-full py-14 sm:py-20 bg-white select-none font-sans border-t border-gray-100 overflow-hidden scroll-mt-16 sm:scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-10 lg:px-12">
        
        {/* ============================================================ */}
        {/* 1. SECTION HEADING (COMPACT & BALANCED)                      */}
        {/* ============================================================ */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <span 
            className="text-[12px] sm:text-[13px] font-bold tracking-[0.2em] text-[#a1a480] uppercase block mb-2"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            SELECTED WORKS
          </span>

          <h2 
            className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-black tracking-tight leading-tight mb-3"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Featured Projects
          </h2>

          <p className="text-[14px] sm:text-[15.5px] leading-relaxed text-gray-600 max-w-2xl mx-auto">
            A curated selection of full-stack web applications, technical auditing tools, and digital solutions I&apos;ve engineered.
          </p>
        </div>

        {/* ============================================================ */}
        {/* 2. FEATURED PROJECTS: ALTERNATING EDITORIAL LAYOUT (4 APPS)  */}
        {/* ============================================================ */}
        <div className="space-y-12 sm:space-y-16 mb-14 sm:mb-18">
          {featured.map((project, index) => {
            const isEven = index % 2 === 0
            const projectNumber = `0${index + 1}`
            const isDeployed = project.statusBadge === 'Deployed'

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.12 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch"
              >
                {/* Visual Mockup Column (Left on 01/03, Right on 02/04) */}
                <div 
                  className={`lg:col-span-6 flex flex-col h-full ${
                    isEven ? 'order-1' : 'order-1 lg:order-2'
                  }`}
                >
                  <BrowserMockup 
                    project={project} 
                    onOpenCaseStudy={() => setSelectedProject(project)} 
                  />
                </div>

                {/* Content Column (Right on 01/03, Left on 02/04) - Perfectly equal in height */}
                <div 
                  className={`lg:col-span-6 flex flex-col justify-between h-full text-left py-1 ${
                    isEven ? 'order-2' : 'order-2 lg:order-1'
                  }`}
                >
                  <div>
                    {/* Eyebrow & Status Row */}
                    <div className="flex items-center gap-2.5 mb-2.5">
                      <span 
                        className="text-[11.5px] font-extrabold text-[#a1a480] tracking-wider"
                        style={{ fontFamily: "'Poppins', sans-serif" }}
                      >
                        {projectNumber} /
                      </span>
                      <span className="text-[10.5px] font-bold tracking-[0.15em] uppercase text-gray-400">
                        {project.category}
                      </span>

                      {/* Simplified Status Badge */}
                      <span className="ml-auto inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#fafaf9] text-gray-700 border border-gray-200">
                        <span className={`w-1.5 h-1.5 rounded-full ${isDeployed ? 'bg-emerald-500 animate-pulse' : 'bg-gray-400'}`} />
                        {project.statusBadge}
                      </span>
                    </div>

                    {/* Project Title (with optional Subtitle for Sweety) */}
                    <div className="mb-2.5 sm:mb-3">
                      <h3 
                        className="text-2xl sm:text-[28px] font-extrabold text-black tracking-tight"
                        style={{ fontFamily: "'Poppins', sans-serif" }}
                      >
                        {project.title}
                      </h3>
                      {project.subtitle && (
                        <span className="text-[13px] font-semibold text-gray-500 block mt-0.5">
                          {project.subtitle}
                        </span>
                      )}
                    </div>

                    {/* Balanced Editorial Description with proper line height */}
                    <p className="text-[13.5px] sm:text-[14px] text-gray-600 leading-[1.7] mb-3.5 tracking-[0.005em]">
                      {project.description}
                    </p>

                    {/* Top 3 Key Features with breathable vertical spacing */}
                    {project.features && project.features.length > 0 && (
                      <div className="space-y-2 mb-3.5">
                        {project.features.slice(0, 3).map((feat, fIdx) => (
                          <div key={fIdx} className="flex items-start gap-2.5 text-[12.5px] sm:text-[13px] text-gray-700 leading-[1.5]">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Tech Stack Chips */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.technologies.slice(0, 6).map((tech) => (
                        <div
                          key={tech}
                          className="flex items-center gap-1.5 px-2 py-0.8 rounded-lg bg-gray-50 border border-gray-200/70 text-[11px] font-bold text-gray-800"
                        >
                          <TechIcon name={tech} className="w-3.5 h-3.5 shrink-0" />
                          <span>{tech}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Refined Action Buttons (Live Demo -> Case Study -> GitHub) pinned cleanly at the bottom */}
                  <div className="flex items-center flex-wrap gap-2 pt-1">
                    {/* 1. Live Demo (Primary with olive-green accent, omitted if not deployed) */}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#a1a480] hover:bg-[#8e916c] text-white text-[12px] font-bold tracking-wide transition-all shadow-2xs hover:shadow-xs active:scale-95 cursor-pointer"
                      >
                        <span>Live Demo</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    )}

                    {/* 2. Case Study (Secondary outlined button) */}
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white hover:bg-gray-50 border border-gray-300 text-gray-800 text-[12px] font-bold tracking-wide transition-all shadow-2xs active:scale-95 cursor-pointer"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-gray-600" />
                      <span>Case Study</span>
                    </button>

                    {/* 3. GitHub (Subtle neutral button) */}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 text-[12px] font-bold tracking-wide transition-all shadow-2xs active:scale-95 cursor-pointer"
                      >
                        <TechIcon name="github" className="w-3.5 h-3.5" />
                        <span>GitHub</span>
                      </a>
                    )}
                  </div>

                </div>
              </motion.div>
            )
          })}
        </div>

        {/* ============================================================ */}
        {/* 3. MORE PROJECTS (COMPACT 3-COLUMN CARD GRID)                */}
        {/* ============================================================ */}
        <div className="pt-10 border-t border-gray-100">
          
          {/* Subheading */}
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span 
              className="text-[11px] font-bold tracking-[0.18em] text-[#a1a480] uppercase block mb-1.5"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              ACADEMIC & EXPERIMENTAL
            </span>
            <h3 
              className="text-2xl sm:text-[28px] font-extrabold text-black tracking-tight"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              More Projects
            </h3>
            <p className="text-[13.5px] text-gray-500 mt-2 leading-relaxed">
              Specialized systems in computer vision, client-side engineering, and assistive speech tech.
            </p>
          </div>

          {/* 3 Compact Cards with breathable line spacing */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {more.map((project) => (
              <motion.div
                key={project.id}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className="p-5 sm:p-5.5 rounded-2xl bg-[#fafaf9] hover:bg-white border border-gray-200/80 hover:border-[#a1a480]/60 shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between h-full group"
              >
                <div>
                  {/* Top Bar: Icon + Category Badge */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="w-8.5 h-8.5 rounded-lg bg-white border border-gray-200/80 flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform duration-300">
                      {getMoreProjectIcon(project.id)}
                    </div>
                    <span className="text-[9.5px] font-bold text-gray-500 bg-gray-100/90 px-2 py-0.5 rounded-full tracking-wide">
                      {project.statusBadge}
                    </span>
                  </div>

                  {/* Title */}
                  <h4 
                    className="text-[16px] sm:text-[17px] font-extrabold text-black tracking-tight mb-2 group-hover:text-black transition-colors"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    {project.title}
                  </h4>

                  {/* Description with proper line spacing */}
                  <p className="text-[12.5px] sm:text-[13px] text-gray-600 leading-[1.68] mb-4 tracking-[0.005em]">
                    {project.description}
                  </p>
                </div>

                {/* Footer: Tech Chips + Action Links */}
                <div className="pt-2.5 border-t border-gray-200/60 flex items-center justify-between gap-2">
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.slice(0, 3).map((t) => (
                      <span key={t} className="text-[10px] font-semibold text-gray-600 bg-white border border-gray-200/70 px-1.5 py-0.5 rounded-md">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1 rounded-lg bg-white hover:bg-gray-100 border border-gray-200/80 text-gray-700 hover:text-black transition-colors"
                        title="View GitHub Repository"
                      >
                        <TechIcon name="github" className="w-3.5 h-3.5" />
                      </a>
                    )}
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="p-1 rounded-lg bg-white hover:bg-[#a1a480] hover:text-white border border-gray-200/80 text-gray-700 transition-colors cursor-pointer"
                      title="View Case Study"
                    >
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </motion.div>
            ))}
          </div>

        </div>

      </div>

      {/* Case Study Drawer */}
      <CaseStudyDrawer 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </section>
  )
}
