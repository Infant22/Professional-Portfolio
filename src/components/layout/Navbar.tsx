import React, { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  // Lock body scroll when mobile menu is open to prevent background scrolling
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [mobileMenuOpen])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)

      // Dynamic Section Scroll Spy (Viewport-relative offset)
      const sections = ['home', 'about', 'skills', 'projects', 'experience', 'contact']
      const scrollPos = window.scrollY + Math.min(window.innerHeight * 0.35, 240)

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId)
        if (el) {
          const top = el.offsetTop
          const height = el.offsetHeight
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: 'HOME', href: '#home', id: 'home' },
    { label: 'ABOUT', href: '#about', id: 'about' },
    { label: 'SKILLS', href: '#skills', id: 'skills' },
    { label: 'PROJECTS', href: '#projects', id: 'projects' },
    { label: 'EXPERIENCE', href: '#experience', id: 'experience' },
    { label: 'CONTACT', href: '#contact', id: 'contact' }
  ]

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 font-sans pt-[env(safe-area-inset-top)] ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-xs border-b border-gray-100 py-3 sm:py-3.5' 
          : 'bg-transparent py-3.5 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 flex items-center justify-between">
        
        {/* Modern Brand Logo */}
        <a 
          href="#home" 
          className="flex items-center text-[22px] sm:text-[25px] font-extrabold tracking-tight text-neutral-900 select-none hover:text-[#a1a480] transition-colors leading-none"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          Infant
        </a>

        {/* Clyde Desktop Nav Links with Bold Typography, Dynamic Scroll Active Indicator */}
        <nav className="hidden md:flex items-center space-x-6 lg:space-x-10 xl:space-x-11">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id
            return (
              <a
                key={link.label}
                href={link.href}
                className={`relative py-1 text-[12.5px] lg:text-[13px] font-bold tracking-[0.14em] transition-colors duration-200 group ${
                  isActive
                    ? 'text-[#a1a480]'
                    : 'text-gray-900 hover:text-[#a1a480]'
                }`}
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                <span>{link.label}</span>
                {/* Clyde animated underline effect */}
                <span 
                  className={`absolute -bottom-1 left-0 h-[2px] bg-[#a1a480] transition-all duration-300 ease-out ${
                    isActive 
                      ? 'w-full' 
                      : 'w-0 group-hover:w-full'
                  }`} 
                />
              </a>
            )
          })}
        </nav>

        {/* Mobile Hamburger Button with Accessible Minimum 44x44px Touch Target */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={mobileMenuOpen}
          className="md:hidden min-w-[44px] min-h-[44px] flex items-center justify-center p-2 rounded-xl text-black hover:bg-gray-100/80 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-[#a1a480]/40"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer & Backdrop Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-xs z-40 md:hidden"
              aria-hidden="true"
            />

            {/* Slide-down Mobile Menu */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="relative z-50 md:hidden bg-white/98 backdrop-blur-lg border-b border-gray-100 px-6 py-5 shadow-xl"
            >
              <nav className="flex flex-col space-y-2">
                {navLinks.map((link) => {
                  const isActive = activeSection === link.id
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`text-[13px] font-bold tracking-[0.14em] py-2.5 px-3 rounded-xl transition-all ${
                        isActive 
                          ? 'text-[#62663c] bg-[#a1a480]/15' 
                          : 'text-gray-700 hover:bg-gray-50 hover:text-black'
                      }`}
                    >
                      {link.label}
                    </a>
                  )
                })}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}
