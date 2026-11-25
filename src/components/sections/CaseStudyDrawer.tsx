import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  X, 
  ArrowUpRight, 
  CheckCircle2, 
  Sparkles, 
  Layers, 
  AlertCircle, 
  GraduationCap 
} from 'lucide-react'
import type { Project } from '../../data/portfolioData'
import { TechIcon } from '../ui/TechIcons'

interface CaseStudyDrawerProps {
  project: Project | null
  onClose: () => void
}

export const CaseStudyDrawer: React.FC<CaseStudyDrawerProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (project) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [project, onClose])

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs transition-opacity"
            aria-hidden="true"
          />

          {/* Drawer Panel */}
          <div className="fixed inset-0 z-50 overflow-hidden pointer-events-none flex justify-end font-sans">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 320 }}
              className="pointer-events-auto w-full max-w-2xl h-full bg-white border-l border-gray-200 shadow-2xl flex flex-col overflow-y-auto"
              role="dialog"
              aria-modal="true"
              aria-labelledby="drawer-title"
            >
              {/* Header */}
              <div className="sticky top-0 z-10 px-5 sm:px-8 py-4 sm:py-5 bg-white/95 backdrop-blur-md border-b border-gray-100 flex items-center justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <span 
                    className="text-[10.5px] sm:text-[11px] font-bold uppercase tracking-[0.18em] text-[#a1a480] block truncate"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    {project.category}
                  </span>
                  <h2 
                    id="drawer-title" 
                    className="text-xl sm:text-2xl lg:text-[26px] font-extrabold text-black tracking-tight mt-0.5 truncate"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    {project.title}
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  aria-label="Close case study"
                  className="min-w-[44px] min-h-[44px] p-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-500 hover:text-black hover:bg-gray-100 transition-colors cursor-pointer flex items-center justify-center shrink-0"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Content */}
              <div className="p-5 sm:p-8 space-y-6 sm:space-y-7 flex-1 pb-[max(2rem,env(safe-area-inset-bottom))]">
                
                {/* Status & Action Buttons Bar */}
                <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-[#fafaf9] border border-gray-200/80">
                  <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-[#a1a480]/15 text-[#6c6f47] border border-[#a1a480]/30 tracking-wide">
                    {project.statusBadge}
                  </span>
                  <div className="flex items-center gap-3">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#a1a480] hover:bg-[#8d906a] text-white text-[12px] font-bold tracking-wide transition-all shadow-xs cursor-pointer"
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
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white hover:bg-gray-50 border border-gray-200 text-gray-800 text-[12px] font-bold tracking-wide transition-all shadow-2xs cursor-pointer"
                      >
                        <TechIcon name="github" className="w-3.5 h-3.5" />
                        <span>Source Code</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Section 1: Overview */}
                {project.caseStudy?.overview && (
                  <div>
                    <h3 className="text-[13px] font-bold tracking-wider uppercase text-gray-400 mb-2 flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-[#a1a480]" />
                      Project Overview
                    </h3>
                    <p className="text-[14.5px] leading-relaxed text-gray-700 font-normal">
                      {project.caseStudy.overview}
                    </p>
                  </div>
                )}

                {/* Section 2: Architecture & Implementation */}
                {project.caseStudy?.architecture && (
                  <div>
                    <h3 className="text-[13px] font-bold tracking-wider uppercase text-gray-400 mb-2 flex items-center gap-2">
                      <Layers className="w-3.5 h-3.5 text-[#a1a480]" />
                      Architecture & Implementation
                    </h3>
                    <p className="text-[14.5px] leading-relaxed text-gray-700 font-normal">
                      {project.caseStudy.architecture}
                    </p>
                  </div>
                )}

                {/* Section 3: Key Features */}
                {project.features && project.features.length > 0 && (
                  <div>
                    <h3 className="text-[13px] font-bold tracking-wider uppercase text-gray-400 mb-3 flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#a1a480]" />
                      Key Capabilities & Deliverables
                    </h3>
                    <ul className="space-y-3">
                      {project.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-[14px] text-gray-700 leading-relaxed">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Section 4: Technology Stack */}
                <div>
                  <h3 className="text-[13px] font-bold tracking-wider uppercase text-gray-400 mb-3 flex items-center gap-2">
                    <span className="text-[#a1a480]">⚙</span>
                    Technologies Used
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <div
                        key={tech}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-200/80 text-[12.5px] font-bold text-gray-800"
                      >
                        <TechIcon name={tech} className="w-4 h-4" />
                        <span>{tech}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Section 5: Technical Challenges */}
                {project.caseStudy?.challenges && project.caseStudy.challenges.length > 0 && (
                  <div>
                    <h3 className="text-[13px] font-bold tracking-wider uppercase text-gray-400 mb-3 flex items-center gap-2">
                      <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
                      Technical Challenges Faced
                    </h3>
                    <ul className="space-y-2">
                      {project.caseStudy.challenges.map((challenge, idx) => (
                        <li key={idx} className="p-3 rounded-xl bg-amber-50/50 border border-amber-200/60 text-[13.5px] text-amber-950 leading-relaxed">
                          {challenge}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Section 6: Key Learnings */}
                {project.caseStudy?.learnings && project.caseStudy.learnings.length > 0 && (
                  <div>
                    <h3 className="text-[13px] font-bold tracking-wider uppercase text-gray-400 mb-3 flex items-center gap-2">
                      <GraduationCap className="w-3.5 h-3.5 text-blue-500" />
                      Key Learnings & Takeaways
                    </h3>
                    <ul className="space-y-2">
                      {project.caseStudy.learnings.map((learning, idx) => (
                        <li key={idx} className="p-3 rounded-xl bg-blue-50/50 border border-blue-200/60 text-[13.5px] text-blue-950 leading-relaxed">
                          {learning}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

              </div>

              {/* Drawer Footer */}
              <div className="sticky bottom-0 z-10 px-6 sm:px-8 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                <span className="text-[12px] font-medium text-gray-500">
                  Infant Rojar • Portfolio
                </span>
                <button
                  onClick={onClose}
                  className="px-4 py-1.5 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 text-[12.5px] font-bold transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>

            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
