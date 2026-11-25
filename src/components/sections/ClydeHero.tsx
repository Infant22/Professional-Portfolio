import React from 'react'
import { Character3D } from '../ui/Character3D'
import { HeroButterflies } from '../ui/HeroButterflies'

export const ClydeHero: React.FC = () => {
  return (
    <section
      id="home"
      className="relative w-full min-h-[100svh] md:h-screen md:min-h-[620px] md:max-h-[860px] lg:max-h-[920px] bg-white flex items-center overflow-hidden select-none font-sans pt-14 pb-4 sm:pt-16 md:py-0 scroll-mt-16 sm:scroll-mt-20"
    >
      {/* ============================================================== */}
      {/* CLYDE CHEVRON ANGLED STUDIO BACKGROUND (MATCHING RED LINE)     */}
      {/* Left edge: Top 36% -> Middle 50% -> Bottom 36%                 */}
      {/* ============================================================== */}
      <div
        className="absolute top-0 right-0 w-full h-full bg-[#D4D7DC] pointer-events-none hidden md:block"
        style={{
          clipPath: 'polygon(36% 0, 100% 0, 100% 100%, 36% 100%, 50% 50%)'
        }}
        aria-hidden="true"
      >
        {/* Subtle studio lighting vignette */}
        <div className="absolute inset-0 bg-radial from-white/20 via-transparent to-black/10 pointer-events-none" />
      </div>

      {/* Subtle angled shadow line along the chevron seam */}
      <svg
        className="absolute top-0 left-0 w-full h-full pointer-events-none hidden md:block z-10"
        aria-hidden="true"
      >
        <polyline
          points="36vw,0 50vw,50vh 36vw,100vh"
          fill="none"
          stroke="rgba(0, 0, 0, 0.08)"
          strokeWidth="6"
        />
        <polyline
          points="36vw,0 50vw,50vh 36vw,100vh"
          fill="none"
          stroke="rgba(0, 0, 0, 0.04)"
          strokeWidth="12"
        />
      </svg>

      {/* Mobile Gray Backdrop - Reduced height so gray background is not too big */}
      <div
        className="absolute top-[56%] sm:top-[52%] bottom-0 left-0 right-0 bg-[#D4D7DC] md:hidden pointer-events-none"
        aria-hidden="true"
      />

      {/* ============================================================== */}
      {/* MAIN CONTAINER                                                 */}
      {/* ============================================================== */}
      <div className="max-w-7xl mx-auto px-5 sm:px-10 lg:px-12 w-full h-full relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-12 h-full items-center gap-6 md:gap-0">

          {/* ------------------------------------------------------------ */}
          {/* LEFT COLUMN: HERO HEADLINE & ACTIONS (MD: 6 COLS)            */}
          {/* Shifted slightly up by ~24px for natural line spacing        */}
          {/* ------------------------------------------------------------ */}
          <div className="md:col-span-6 lg:col-span-6 flex flex-col justify-center items-start text-left pt-1 pb-1 sm:pt-3 sm:pb-2 md:py-0 -translate-y-6 sm:-translate-y-4 md:translate-y-6 lg:translate-y-8 z-20">

            {/* Subheading: Deeper, richer color and aligned to the visual stem of the 'C' */}
            <span
              className="text-[13px] sm:text-[14px] font-bold tracking-[0.2em] text-[#787c53] uppercase block mb-3.5 pl-[2px] text-left"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              HELLO! THIS IS <span className="text-[#0ea5e9] font-extrabold">INFANT ROJAR</span>
            </span>

            {/* Headline: Clyde Poppins Typography, 2 clean lines on all screen sizes */}
            <h1
              className="text-[34px] sm:text-[42px] lg:text-[46px] xl:text-[48px] font-extrabold text-black tracking-tight leading-[1.2] sm:leading-[1.18] mb-6 sm:mb-8 text-left"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Creative <span className="text-[#a1a480]">Software</span>
              <br />
              Developer &amp; Engineer
            </h1>

            {/* Dual Clyde Buttons with Butterflies */}
            <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap pl-[1px]">
              <div className="relative inline-block">
                <a
                  href="#contact"
                  className="bg-[#a1a480] hover:bg-[#8f926e] text-white text-[12px] sm:text-[12.5px] font-bold tracking-[0.16em] uppercase px-6 sm:px-7 py-3.5 sm:py-3.5 rounded transition-colors shadow-xs inline-block relative z-10"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  Hire me
                </a>

                {/* 3 Multicolored Fluttering Butterflies flying in & perching */}
                <HeroButterflies />
              </div>

              <a
                href="#resume"
                download
                className="border border-[#a1a480] text-gray-800 hover:bg-[#a1a480] hover:text-white text-[12px] sm:text-[12.5px] font-bold tracking-[0.16em] uppercase px-6 sm:px-7 py-3.5 sm:py-3.5 rounded transition-colors bg-white/80"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Download CV
              </a>
            </div>

          </div>

          {/* ------------------------------------------------------------ */}
          {/* RIGHT COLUMN: 3D DEVELOPER CHARACTER (MD: 6 COLS)            */}
          {/* Positioned dead center in the grey background on mobile      */}
          {/* ------------------------------------------------------------ */}
          <div className="md:col-span-6 lg:col-span-6 flex justify-center items-center h-full relative z-20 translate-y-28 xs:translate-y-32 sm:translate-y-36 md:translate-y-0">
            <Character3D />
          </div>

        </div>
      </div>
    </section>
  )
}
