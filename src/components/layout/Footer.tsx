import React from 'react'
import { ArrowUp, Heart } from 'lucide-react'
import { motion } from 'framer-motion'

const CURRENT_YEAR = new Date().getFullYear()

export const Footer: React.FC = () => {
  const currentYear = CURRENT_YEAR

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const footerLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' }
  ]

  const socialLinks = [
    {
      name: 'GitHub',
      href: 'https://github.com/Infant22',
      hoverClass: 'hover:bg-[#181717] hover:text-white hover:border-[#181717]',
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
        </svg>
      )
    },
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com/in/infant-rojar',
      hoverClass: 'hover:bg-[#0077b5] hover:text-white hover:border-[#0077b5]',
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9h2.79v8.37H6.46v-8.37M7.86 6.34a1.59 1.59 0 1 0 0 3.18 1.59 1.59 0 0 0 0-3.18z" />
        </svg>
      )
    },
    {
      name: 'X (Twitter)',
      href: 'https://x.com/Infant021',
      hoverClass: 'hover:bg-black hover:text-white hover:border-black',
      icon: (
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      )
    },
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/infanttt._?dmpr=MXA0b2phbDBjdXlvbQ==',
      hoverClass: 'hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] hover:text-white hover:border-transparent',
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      )
    }
  ]

  return (
    <footer className="w-full relative py-4 sm:py-6 px-4 sm:px-6 lg:px-8 bg-transparent font-sans">
      {/* Subtle ambient lighting beneath the floating glass dock */}
      <div 
        aria-hidden="true" 
        className="absolute inset-0 bg-gradient-to-b from-transparent via-[#f8f9f5]/60 to-[#edf0e6]/50 pointer-events-none -z-10" 
      />

      {/* Option B: Elevated Floating Glass Card Dock with refined, compact padding */}
      <div className="relative max-w-7xl mx-auto rounded-2xl sm:rounded-3xl bg-white/85 backdrop-blur-xl border border-gray-200/80 shadow-[0_10px_30px_-6px_rgba(0,0,0,0.05),0_0_0_1px_rgba(255,255,255,0.9)_inset] px-5 sm:px-8 lg:px-10 py-5 sm:py-6 transition-all duration-300">
        
        {/* TIER 1: Tagline + Navigation Links + Social Media Dock */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 sm:gap-6 pb-4 sm:pb-5 border-b border-gray-200/60">
          
          {/* 1. Left: Tagline */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left shrink-0">
            <p className="text-[13px] text-gray-500 font-normal">
              Building thoughtful digital experiences.
            </p>
          </div>

          {/* 2. Middle: Menu Style 1 (Fluidly wraps on <500px so Home & Contact are always 100% visible) */}
          <nav className="flex flex-wrap sm:flex-nowrap items-center justify-center gap-1 sm:gap-1.5 bg-gray-50/90 p-1.5 rounded-2xl sm:rounded-full border border-gray-200/60 backdrop-blur-xs max-w-full">
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="whitespace-nowrap px-2.5 xs:px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-[11.5px] xs:text-[12px] sm:text-[13px] font-semibold text-gray-600 hover:text-[#585c34] hover:bg-[#a1a480]/15 hover:shadow-2xs active:scale-95 transition-all duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* 3. Right: Social Media Dock */}
          <div className="flex items-center gap-2 shrink-0">
            {socialLinks.map((social) => (
              <motion.a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                title={social.name}
                whileHover={{ y: -3, scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className={`w-9 h-9 rounded-xl bg-white border border-gray-200/90 text-gray-600 flex items-center justify-center transition-all duration-200 shadow-2xs cursor-pointer ${social.hoverClass}`}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>

        </div>

        {/* TIER 2: Bottom Copyright & Back to Top Button */}
        <div className="pt-4 sm:pt-4.5 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          
          {/* Copyright matching user specification */}
          <p className="text-[13px] text-gray-500 flex items-center gap-1.5 font-normal text-center sm:text-left">
            © {currentYear} Infant Rojar. Crafted with care
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline-block animate-pulse" />
          </p>

          {/* Back to Top (Compact & Sleek) */}
          <button
            onClick={scrollToTop}
            className="group inline-flex items-center gap-1.5 px-3.5 py-1.5 min-h-[36px] rounded-full bg-white border border-gray-200/90 text-gray-700 hover:text-gray-900 hover:border-[#a1a480] shadow-2xs hover:shadow-xs transition-all duration-200 text-[11.5px] font-medium cursor-pointer touch-manipulation"
            aria-label="Back to top"
          >
            <span>Back to top</span>
            <div className="w-4.5 h-4.5 rounded-full bg-gray-100 group-hover:bg-[#a1a480] group-hover:text-white flex items-center justify-center transition-colors">
              <ArrowUp className="w-2.5 h-2.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </button>

        </div>

      </div>
    </footer>
  )
}
