import React, { useState, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Code2, GitBranch, CheckCircle2, Terminal, Sparkles, Cpu } from 'lucide-react'

export const HolographicTerminal: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeTab, setActiveTab] = useState<'profile' | 'stack'>('profile')

  // Mouse tilt tracking
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Spring physics for buttery-smooth damping
  const springConfig = { damping: 25, stiffness: 180 }
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [14, -14]), springConfig)
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-16, 16]), springConfig)
  const glareX = useTransform(mouseX, [-0.5, 0.5], ['0%', '100%'])
  const glareY = useTransform(mouseY, [-0.5, 0.5], ['0%', '100%'])

  // Parallax offsets for floating chips
  const chip1X = useSpring(useTransform(mouseX, [-0.5, 0.5], [-20, 20]), springConfig)
  const chip1Y = useSpring(useTransform(mouseY, [-0.5, 0.5], [-15, 15]), springConfig)
  const chip2X = useSpring(useTransform(mouseX, [-0.5, 0.5], [25, -25]), springConfig)
  const chip2Y = useSpring(useTransform(mouseY, [-0.5, 0.5], [20, -20]), springConfig)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(x)
    mouseY.set(y)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-[540px] h-[460px] sm:h-[500px] flex items-center justify-center select-none"
      style={{ perspective: 1200 }}
    >
      {/* ============================================================== */}
      {/* 3D TILTED HOLOGRAPHIC GLASS TERMINAL                           */}
      {/* ============================================================== */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d'
        }}
        className="relative w-full rounded-2xl bg-[#0f141c]/90 backdrop-blur-xl border border-white/15 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] overflow-hidden transition-shadow duration-300 hover:shadow-[0_30px_70px_-10px_rgba(161,164,128,0.25)]"
      >
        {/* Dynamic Glass Glare Sweep */}
        <motion.div
          className="absolute inset-0 pointer-events-none opacity-20 bg-gradient-to-br from-white via-transparent to-transparent"
          style={{
            backgroundPosition: `${glareX} ${glareY}`
          }}
        />

        {/* Ambient Clyde Accent Glow Inside */}
        <div className="absolute -top-20 -right-20 w-44 h-44 bg-[#a1a480]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-44 h-44 bg-[#6366f1]/15 rounded-full blur-3xl pointer-events-none" />

        {/* ------------------------------------------------------------ */}
        {/* TERMINAL HEADER (macOS Style)                                */}
        {/* ------------------------------------------------------------ */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#161c26]/90 border-b border-white/10 relative z-10">
          {/* macOS Window Controls */}
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-[#ff5f56] inline-block shadow-xs" />
            <span className="w-3 h-3 rounded-full bg-[#ffbd2e] inline-block shadow-xs" />
            <span className="w-3 h-3 rounded-full bg-[#27c93f] inline-block shadow-xs" />
          </div>

          {/* Active File / Path */}
          <div className="flex items-center space-x-2 text-[11px] font-mono text-gray-400">
            <Terminal className="w-3.5 h-3.5 text-[#a1a480]" />
            <span className="text-gray-300 font-semibold">infant.config.ts</span>
            <span className="text-gray-500">•</span>
            <span className="flex items-center text-[10px] text-emerald-400">
              <GitBranch className="w-3 h-3 mr-1 inline" />
              main
            </span>
          </div>

          {/* Tab Selector */}
          <div className="flex items-center space-x-1 bg-[#0b0e14] p-0.5 rounded-md border border-white/5 text-[10px] font-mono">
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-2 py-0.5 rounded transition-colors ${
                activeTab === 'profile' ? 'bg-[#a1a480] text-black font-bold' : 'text-gray-400 hover:text-white'
              }`}
            >
              profile.ts
            </button>
            <button
              onClick={() => setActiveTab('stack')}
              className={`px-2 py-0.5 rounded transition-colors ${
                activeTab === 'stack' ? 'bg-[#a1a480] text-black font-bold' : 'text-gray-400 hover:text-white'
              }`}
            >
              stack.json
            </button>
          </div>
        </div>

        {/* ------------------------------------------------------------ */}
        {/* TERMINAL CODE BODY                                           */}
        {/* ------------------------------------------------------------ */}
        <div className="p-4 sm:p-5 font-mono text-[12px] sm:text-[12.5px] leading-relaxed overflow-x-auto text-left relative z-10">
          {activeTab === 'profile' ? (
            <div className="space-y-1">
              <p className="text-gray-500 select-none">// ⚡ Infant Rojar — Full Stack Engineer</p>
              <p>
                <span className="text-[#c678dd]">const</span>{' '}
                <span className="text-[#61afef]">engineer</span>:{' '}
                <span className="text-[#e5c07b]">SoftwareDeveloper</span> = {'{'}
              </p>
              <p className="pl-4">
                <span className="text-[#e06c75]">name</span>:{' '}
                <span className="text-[#98c379]">&quot;Infant Rojar&quot;</span>,
              </p>
              <p className="pl-4">
                <span className="text-[#e06c75]">title</span>:{' '}
                <span className="text-[#98c379]">&quot;Creative Software Developer&quot;</span>,
              </p>
              <p className="pl-4">
                <span className="text-[#e06c75]">degree</span>:{' '}
                <span className="text-[#98c379]">&quot;B.E. Computer Science&quot;</span>,
              </p>
              <p className="pl-4">
                <span className="text-[#e06c75]">passion</span>:{' '}
                <span className="text-[#98c379]">&quot;Building High-Performance Web Apps&quot;</span>,
              </p>
              <p className="pl-4">
                <span className="text-[#e06c75]">status</span>:{' '}
                <span className="text-[#a1a480] font-semibold">&quot;Available for Opportunities&quot;</span>,
              </p>
              <p className="pl-4">
                <span className="text-[#e06c75]">available</span>:{' '}
                <span className="text-[#d19a66]">true</span>
              </p>
              <p>{'}'};</p>
              <p className="pt-2 text-gray-400 flex items-center">
                <span className="text-emerald-400 font-bold mr-2">&gt;</span>
                <span className="text-[#a1a480] font-semibold">infant.build</span>(
                <span className="text-[#98c379]">&quot;future-ready-apps&quot;</span>)
                <span className="inline-block w-2 h-4 bg-[#a1a480] ml-1.5 animate-pulse" />
              </p>
            </div>
          ) : (
            <div className="space-y-1">
              <p className="text-gray-500 select-none">// 🛠️ Core Technologies &amp; Architecture</p>
              <p className="text-gray-300">{'{'}</p>
              <p className="pl-4">
                <span className="text-[#e06c75]">&quot;frontend&quot;</span>: [
                <span className="text-[#98c379]">&quot;React&quot;</span>,{' '}
                <span className="text-[#98c379]">&quot;TypeScript&quot;</span>,{' '}
                <span className="text-[#98c379]">&quot;Tailwind&quot;</span>],
              </p>
              <p className="pl-4">
                <span className="text-[#e06c75]">&quot;backend&quot;</span>: [
                <span className="text-[#98c379]">&quot;Node.js&quot;</span>,{' '}
                <span className="text-[#98c379]">&quot;Express&quot;</span>,{' '}
                <span className="text-[#98c379]">&quot;REST APIs&quot;</span>],
              </p>
              <p className="pl-4">
                <span className="text-[#e06c75]">&quot;database&quot;</span>: [
                <span className="text-[#98c379]">&quot;PostgreSQL&quot;</span>,{' '}
                <span className="text-[#98c379]">&quot;MongoDB&quot;</span>],
              </p>
              <p className="pl-4">
                <span className="text-[#e06c75]">&quot;architecture&quot;</span>:{' '}
                <span className="text-[#98c379]">&quot;Clean, Scalable, Component-Driven&quot;</span>
              </p>
              <p className="text-gray-300">{'}'}</p>
              <p className="pt-2 text-emerald-400 flex items-center text-[11px]">
                <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" />
                <span>All dependencies compiled successfully.</span>
              </p>
            </div>
          )}
        </div>

        {/* ------------------------------------------------------------ */}
        {/* TERMINAL STATUS BAR                                          */}
        {/* ------------------------------------------------------------ */}
        <div className="flex items-center justify-between px-4 py-2 bg-[#0b0e14]/95 border-t border-white/5 text-[10px] font-mono text-gray-400">
          <div className="flex items-center space-x-3">
            <span className="flex items-center text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5 animate-ping" />
              TypeScript Ready
            </span>
            <span>UTF-8</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-500">
            <Sparkles className="w-3 h-3 text-[#a1a480]" />
            <span>0 errors • 0 warnings</span>
          </div>
        </div>
      </motion.div>

      {/* ============================================================== */}
      {/* FLOATING 3D GLASS TECH CHIPS (Parallax Depth Layer)            */}
      {/* ============================================================== */}
      {/* Top Left Floating Pill: React & Full Stack */}
      <motion.div
        style={{
          x: chip1X,
          y: chip1Y,
          translateZ: 60
        }}
        className="absolute -top-4 -left-3 sm:-left-6 bg-white/95 backdrop-blur-md border border-gray-200/90 shadow-xl px-3.5 py-2 rounded-xl flex items-center gap-2.5 z-30"
      >
        <div className="w-7 h-7 rounded-lg bg-[#a1a480]/20 flex items-center justify-center text-[#787c53]">
          <Code2 className="w-4 h-4" />
        </div>
        <div className="text-left">
          <p className="text-[9px] tracking-wider uppercase text-gray-500 font-bold">Engineering</p>
          <p className="text-[11px] font-bold text-gray-900 leading-tight">Full Stack Developer</p>
        </div>
      </motion.div>

      {/* Bottom Right Floating Pill: Architecture */}
      <motion.div
        style={{
          x: chip2X,
          y: chip2Y,
          translateZ: 80
        }}
        className="absolute -bottom-4 -right-2 sm:-right-4 bg-white/95 backdrop-blur-md border border-gray-200/90 shadow-xl px-3.5 py-2 rounded-xl flex items-center gap-2.5 z-30"
      >
        <div className="w-7 h-7 rounded-lg bg-[#0f141c] flex items-center justify-center text-[#a1a480]">
          <Cpu className="w-4 h-4" />
        </div>
        <div className="text-left">
          <p className="text-[9px] tracking-wider uppercase text-gray-500 font-bold">Core Stack</p>
          <p className="text-[11px] font-bold text-gray-900 leading-tight">React • Node • TS</p>
        </div>
      </motion.div>
    </div>
  )
}
