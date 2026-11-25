import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  ArrowUpRight, 
  Sparkles, 
  BookOpen, 
  Activity, 
  Bot, 
  HeartPulse, 
  Cpu, 
  Globe, 
  CloudSun, 
  Mic,
  CheckCircle2
} from 'lucide-react'
import { portfolioData, type Project } from '../../data/portfolioData'
import { CaseStudyDrawer } from './CaseStudyDrawer'

// GitHub SVG Icon
const GitHubIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg className={`fill-current ${className}`} viewBox="0 0 24 24" aria-hidden="true">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
    />
  </svg>
)

// Icon selector helper
const getProjectIcon = (id: string) => {
  switch (id) {
    case 'page-pulse':
      return <Activity className="w-8 h-8 text-[#FF4D24]" />
    case 'apply-ai':
      return <Bot className="w-8 h-8 text-[#FF4D24]" />
    case 'sweety-glucose-tracker':
      return <HeartPulse className="w-8 h-8 text-[#FF4D24]" />
    case 'deepfake-detection':
      return <Cpu className="w-8 h-8 text-[#FF4D24]" />
    case 'world-trends':
      return <Globe className="w-6 h-6 text-[#FF4D24]" />
    case 'atmos-weather':
      return <CloudSun className="w-6 h-6 text-[#FF4D24]" />
    case 'voice-based-email':
      return <Mic className="w-6 h-6 text-[#FF4D24]" />
    default:
      return <Sparkles className="w-6 h-6 text-[#FF4D24]" />
  }
}

// Minimal Browser Placeholder Frame
const ScreenshotFrame: React.FC<{
  project: Project
  onOpenCaseStudy?: () => void
}> = ({ project, onOpenCaseStudy }) => {
  const [hasError, setHasError] = useState(false)

  // Get display slug / domain
  const displayUrl = project.liveUrl 
    ? project.liveUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')
    : `${project.id}.app`

  return (
    <div className="relative group w-full rounded-2xl overflow-hidden border border-slate-200 dark:border-[#1E2738] bg-slate-100 dark:bg-[#0B0E14] shadow-md hover:shadow-xl transition-all duration-300">
      {/* Browser Bar */}
      <div className="px-4 py-3 bg-white/80 dark:bg-[#121824]/90 backdrop-blur border-b border-slate-200 dark:border-[#1E2738] flex items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 shrink-0">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700" />
          <div className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700" />
          <div className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700" />
        </div>
        
        {/* Address Pill */}
        <div className="flex-1 max-w-xs mx-auto px-3 py-1 rounded-md bg-slate-100 dark:bg-[#090D14] border border-slate-200/80 dark:border-[#1A2232] text-center">
          <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 truncate block">
            {displayUrl}
          </span>
        </div>

        <div className="w-8 shrink-0 flex justify-end">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" title="System Verified" />
        </div>
      </div>

      {/* Screen Area (16:10 Aspect Ratio) */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-50 dark:bg-[#0E131F] flex items-center justify-center">
        {!hasError ? (
          <img
            src={project.image}
            alt={`${project.title} Preview Screenshot`}
            onError={() => setHasError(true)}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            loading="lazy"
          />
        ) : null}

        {/* Fallback / Clean Placeholder Display */}
        {hasError && (
          <div className="relative w-full h-full flex flex-col items-center justify-center p-6 text-center select-none overflow-hidden">
            {/* Background Blueprint Grid Pattern */}
            <div 
              className="absolute inset-0 opacity-[0.04] dark:opacity-[0.07] pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
                backgroundSize: '16px 16px'
              }}
            />

            {/* Subtle Gradient Spot */}
            <div className="absolute w-48 h-48 rounded-full bg-[#FF4D24]/5 blur-3xl pointer-events-none" />

            {/* Central Badge */}
            <div className="relative z-10 flex flex-col items-center">
              <div className="p-4 rounded-2xl bg-white dark:bg-[#121824] border border-slate-200 dark:border-[#1E2738] shadow-sm mb-3">
                {getProjectIcon(project.id)}
              </div>
              
              <h4 className="text-base font-bold text-slate-800 dark:text-slate-200 mb-1">
                {project.title}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mb-4">
                [ Screenshot Preview Slot · 16:10 Ratio ]
              </p>

              {project.hasCaseStudy && onOpenCaseStudy && (
                <button
                  onClick={onOpenCaseStudy}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#FF4D24]/10 hover:bg-[#FF4D24]/20 text-[#FF4D24] border border-[#FF4D24]/30 transition-colors cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Inspect Case Study</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export const ProjectsSection: React.FC = () => {
  const { featuredProjects, moreProjects } = portfolioData
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  return (
    <section 
      id="projects" 
      className="relative py-24 sm:py-32 border-t border-slate-200 dark:border-[#1E2738]/60 overflow-hidden"
    >
      {/* Background Micro-Accents */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.025] dark:opacity-[0.035]"
        style={{
          backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px),
                            linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
          backgroundSize: '32px 32px'
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ================================================================ */}
        {/* SECTION HEADER                                                   */}
        {/* ================================================================ */}
        <div className="max-w-3xl mb-16 sm:mb-24">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider uppercase bg-[#FF4D24]/10 text-[#FF4D24] border border-[#FF4D24]/20 mb-4">
            <span>[ 01 // SELECTED PROJECTS ]</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.1]">
            Projects I've Built
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            A collection of full-stack web applications, tools, and academic projects built with modern frameworks and practical architectures.
          </p>
        </div>

        {/* ================================================================ */}
        {/* FEATURED PROJECTS (ALTERNATING SHOWCASE LAYOUT)                  */}
        {/* ================================================================ */}
        <div className="space-y-20 sm:space-y-32">
          {featuredProjects.map((project, index) => {
            const isDetailsLeft = index % 2 === 0
            const projectNumber = String(index + 1).padStart(2, '0')

            return (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
              >
                {/* Visual / Screenshot Column */}
                <div 
                  className={`lg:col-span-7 ${
                    isDetailsLeft ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <ScreenshotFrame 
                    project={project} 
                    onOpenCaseStudy={() => setSelectedProject(project)} 
                  />
                </div>

                {/* Information & Specifications Column */}
                <div 
                  className={`lg:col-span-5 flex flex-col justify-center ${
                    isDetailsLeft ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  {/* Category & Counter */}
                  <div className="flex items-center justify-between gap-4 mb-3">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#FF4D24]">
                      {project.category}
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-400 dark:text-slate-600">
                      // {projectNumber}
                    </span>
                  </div>

                  {/* Title & Status Badge */}
                  <div className="space-y-2 mb-3">
                    <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                      {project.title}
                    </h3>
                    <div>
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-200/70 dark:bg-[#1A2232] text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-[#222E42]">
                        {project.statusBadge}
                      </span>
                    </div>
                  </div>

                  {/* Tagline / Subtitle */}
                  <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                    {project.tagline}
                  </p>

                  {/* Description */}
                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed mb-5">
                    {project.description}
                  </p>

                  {/* Optional Features Preview (e.g. for Deepfake Detection) */}
                  {project.features && project.features.length > 0 && (
                    <div className="mb-5 space-y-1.5">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 block font-semibold">
                        Core Capabilities:
                      </span>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                        {project.features.map((feat, fIdx) => (
                          <li key={fIdx} className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Technology Stack Tags */}
                  <div className="mb-6">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2 font-semibold">
                      Technologies:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-md text-xs font-mono font-medium bg-white dark:bg-[#121824] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-[#1E2738]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions & Links */}
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    {/* View Case Study Button */}
                    {project.hasCaseStudy && (
                      <button
                        onClick={() => setSelectedProject(project)}
                        aria-label={`View case study for ${project.title}`}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider bg-[#FF4D24] text-white hover:bg-[#e03d15] shadow-sm hover:shadow-md transition-all cursor-pointer"
                      >
                        <BookOpen className="w-4 h-4" />
                        <span>Case Study</span>
                      </button>
                    )}

                    {/* Live Demo Link (Only if URL exists) */}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Visit live demo for ${project.title}`}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider border border-slate-300 dark:border-[#222E42] bg-white dark:bg-[#121824] text-slate-800 dark:text-slate-200 hover:border-[#FF4D24] hover:text-[#FF4D24] dark:hover:border-[#FF4D24] dark:hover:text-[#FF4D24] transition-colors"
                      >
                        <span>Live Demo</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </a>
                    )}

                    {/* GitHub Repository Link (Only if URL exists) */}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`View source code on GitHub for ${project.title}`}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider border border-slate-300 dark:border-[#222E42] bg-white dark:bg-[#121824] text-slate-800 dark:text-slate-200 hover:border-[#FF4D24] hover:text-[#FF4D24] dark:hover:border-[#FF4D24] dark:hover:text-[#FF4D24] transition-colors"
                      >
                        <GitHubIcon className="w-4 h-4" />
                        <span>Source</span>
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            )
          })}
        </div>

        {/* ================================================================ */}
        {/* MORE PROJECTS SECTION (3-COLUMN INTERACTIVE GRID)                */}
        {/* ================================================================ */}
        <div className="mt-32 pt-20 border-t border-slate-200 dark:border-[#1E2738]/60">
          <div className="max-w-2xl mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider uppercase bg-[#FF4D24]/10 text-[#FF4D24] border border-[#FF4D24]/20 mb-3">
              <span>[ 02 // MORE PROJECTS ]</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Other Completed & Academic Work
            </h3>
            <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400">
              Additional full-stack web applications, frontend dashboards, and speech systems.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {moreProjects.map((project) => (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="group relative flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-white dark:bg-[#121824] border border-slate-200 dark:border-[#1E2738] hover:border-[#FF4D24]/50 dark:hover:border-[#FF4D24]/50 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div>
                  {/* Top Bar: Icon + Category + Status */}
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="p-3 rounded-xl bg-slate-100 dark:bg-[#0B0E14] border border-slate-200/80 dark:border-[#1E2738]">
                      {getProjectIcon(project.id)}
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold tracking-wide uppercase bg-slate-100 dark:bg-[#1A2232] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-[#222E42]">
                      {project.statusBadge}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#FF4D24] font-semibold block mb-1">
                    {project.category}
                  </span>
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-[#FF4D24] transition-colors mb-1.5">
                    {project.title}
                  </h4>
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-3">
                    {project.tagline}
                  </p>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {/* Features preview */}
                  {project.features && project.features.length > 0 && (
                    <div className="mb-4">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1.5 font-semibold">
                        Key Capabilities:
                      </span>
                      <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                        {project.features.slice(0, 4).map((f, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D24] shrink-0" />
                            <span className="truncate">{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Technologies Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-100 dark:bg-[#090D14] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-[#1E2738]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Conditional Actions Footer */}
                <div className="pt-4 border-t border-slate-100 dark:border-[#1E2738] flex items-center justify-between">
                  <div className="flex flex-wrap items-center gap-3">
                    {project.hasCaseStudy && (
                      <button
                        onClick={() => setSelectedProject(project)}
                        aria-label={`View case study for ${project.title}`}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FF4D24] hover:underline cursor-pointer"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Case Study</span>
                      </button>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Live demo for ${project.title}`}
                        className="inline-flex items-center gap-1 text-xs font-bold text-[#FF4D24] hover:underline"
                      >
                        <span>Live Demo</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`GitHub repo for ${project.title}`}
                        className="inline-flex items-center gap-1 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-[#FF4D24] dark:hover:text-[#FF4D24] transition-colors"
                      >
                        <GitHubIcon className="w-3.5 h-3.5" />
                        <span>Source</span>
                      </a>
                    )}
                  </div>

                  {!project.liveUrl && !project.githubUrl && !project.hasCaseStudy && (
                    <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500 italic">
                      Internal / Offline Project
                    </span>
                  )}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>

      {/* Case Study Slide-out Drawer */}
      <CaseStudyDrawer
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  )
}
