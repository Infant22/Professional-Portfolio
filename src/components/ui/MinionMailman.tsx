import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check } from 'lucide-react'

interface MinionMailmanProps {
  isDelivering?: boolean
}

export const MinionMailman: React.FC<MinionMailmanProps> = ({ isDelivering = false }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isBlinking, setIsBlinking] = useState(false)

  // Track cursor and touch position relative to minion center
  useEffect(() => {
    const updatePosition = (clientX: number, clientY: number) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      // Normalized coordinates clamped between -1 and 1
      const deltaX = Math.max(-1, Math.min(1, (clientX - centerX) / (window.innerWidth / 2.5)))
      const deltaY = Math.max(-1, Math.min(1, (clientY - centerY) / (window.innerHeight / 2.5)))

      setMousePos({ x: deltaX, y: deltaY })
    }

    const handleMouseMove = (e: MouseEvent) => {
      updatePosition(e.clientX, e.clientY)
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches && e.touches.length > 0) {
        updatePosition(e.touches[0].clientX, e.touches[0].clientY)
      }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('touchmove', handleTouchMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchmove', handleTouchMove)
    }
  }, [])

  // Natural periodic blinking
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true)
      setTimeout(() => setIsBlinking(false), 140)
    }, 4000)

    return () => clearInterval(blinkInterval)
  }, [])

  // Eye pupil offset limits (in SVG units)
  const pupilOffsetX = mousePos.x * 4.2
  const pupilOffsetY = mousePos.y * 3.5

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[225px] sm:h-[240px] flex items-center justify-center select-none"
    >
      {/* Soft Ground Shadow */}
      <motion.div 
        animate={{
          scale: isDelivering ? [1, 1.04, 1] : [1, 1.05, 1],
          opacity: [0.28, 0.36, 0.28]
        }}
        transition={{
          repeat: Infinity,
          duration: 2.4,
          ease: 'easeInOut'
        }}
        className="absolute bottom-1 w-36 h-5 bg-gray-400/35 rounded-full blur-md -z-0"
      />

      {/* Refined Status Pill (Clean Clyde Style, No childish bubbles) */}
      <AnimatePresence>
        {isDelivering ? (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute top-0 z-20 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-900 font-bold text-[11px] shadow-xs flex items-center gap-1.5"
          >
            <div className="w-3.5 h-3.5 rounded-full bg-emerald-500 text-white flex items-center justify-center">
              <Check className="w-2.5 h-2.5 stroke-[3]" />
            </div>
            <span>Letter Sent • See You Soon! 👋</span>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute top-0.5 z-10 px-3 py-1 rounded-full bg-white/95 border border-gray-200/90 shadow-2xs text-[10.5px] font-semibold text-gray-600 flex items-center gap-1.5 backdrop-blur-xs"
          >
            <span className="w-2 h-2 rounded-full bg-[#a1a480] animate-pulse" />
            <span>Ready for your message</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Minion Character Group */}
      <motion.div
        animate={
          isDelivering
            ? {
                y: [0, -4, 0],
                rotate: [0, 1, 0]
              }
            : {
                y: [0, -5, 0],
                rotate: mousePos.x * 2.2
              }
        }
        transition={{
          repeat: Infinity,
          duration: 2.4,
          ease: 'easeInOut'
        }}
        className="relative w-[150px] sm:w-[165px] h-[195px] sm:h-[210px] z-10 mt-3"
      >
        <svg viewBox="0 10 140 152" className="w-full h-full drop-shadow-xl overflow-visible">
          <defs>
            {/* Goggle Rim Chrome Gradient */}
            <linearGradient id="goggleRim" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#cbd5e1" />
              <stop offset="50%" stopColor="#94a3b8" />
              <stop offset="100%" stopColor="#475569" />
            </linearGradient>

            {/* Minion Yellow Gradient */}
            <linearGradient id="minionYellow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="40%" stopColor="#facc15" />
              <stop offset="100%" stopColor="#eab308" />
            </linearGradient>

            {/* Postman Cap Blue Gradient */}
            <linearGradient id="capBlue" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e3a8a" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>

            {/* Leather Satchel Gradient */}
            <linearGradient id="satchelBrown" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#92400e" />
              <stop offset="50%" stopColor="#78350f" />
              <stop offset="100%" stopColor="#451a03" />
            </linearGradient>
          </defs>

          {/* ======================================================== */}
          {/* 1. SPROUTS OF HAIR                                        */}
          {/* ======================================================== */}
          <path d="M68 22 Q65 10 58 8" stroke="#18181b" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M72 22 Q75 9 82 10" stroke="#18181b" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M64 24 Q57 14 51 16" stroke="#18181b" strokeWidth="2.2" strokeLinecap="round" fill="none" />
          <path d="M76 24 Q83 14 89 16" stroke="#18181b" strokeWidth="2.2" strokeLinecap="round" fill="none" />

          {/* ======================================================== */}
          {/* 2. CAPSULE BODY                                          */}
          {/* ======================================================== */}
          <rect 
            x="32" 
            y="24" 
            width="76" 
            height="116" 
            rx="38" 
            fill="url(#minionYellow)" 
            stroke="#ca8a04" 
            strokeWidth="1.5" 
          />

          {/* ======================================================== */}
          {/* 3. POSTMAN CAP (NAVY CAP WITH GOLD EMBLEM)               */}
          {/* ======================================================== */}
          <g transform="rotate(-3 70 28)">
            {/* Cap Crown */}
            <path
              d="M40 28 C40 14 100 14 100 28 Z"
              fill="url(#capBlue)"
              stroke="#0f172a"
              strokeWidth="1.5"
            />
            {/* Cap Visor / Bill */}
            <path
              d="M34 29 C44 26 96 26 106 29 C100 35 40 35 34 29 Z"
              fill="#090d16"
            />
            {/* Gold Letter Badge on Cap */}
            <rect x="65" y="18" width="10" height="7" rx="1.5" fill="#f59e0b" stroke="#78350f" strokeWidth="0.8" />
            <path d="M65 18 L70 22 L75 18" stroke="#78350f" strokeWidth="0.8" fill="none" />
          </g>

          {/* ======================================================== */}
          {/* 4. GOGGLE STRAP                                          */}
          {/* ======================================================== */}
          <rect x="31" y="52" width="78" height="12" fill="#18181b" />

          {/* ======================================================== */}
          {/* 5. TWO SILVER GOGGLES & EYES                             */}
          {/* ======================================================== */}
          {/* Left Goggle Rim */}
          <circle cx="53" cy="58" r="18" fill="url(#goggleRim)" stroke="#334155" strokeWidth="2.5" />
          <circle cx="53" cy="58" r="14" fill="#e2e8f0" />
          <circle cx="53" cy="58" r="12" fill="#ffffff" />

          {/* Right Goggle Rim */}
          <circle cx="87" cy="58" r="18" fill="url(#goggleRim)" stroke="#334155" strokeWidth="2.5" />
          <circle cx="87" cy="58" r="14" fill="#e2e8f0" />
          <circle cx="87" cy="58" r="12" fill="#ffffff" />

          {/* Center Bridge */}
          <rect x="68" y="55" width="4" height="6" rx="1" fill="#475569" />

          {/* Left Eye & Dynamic Pupil */}
          <g>
            <circle 
              cx={53 + pupilOffsetX} 
              cy={58 + pupilOffsetY} 
              r="6" 
              fill="#854d0e" 
            />
            <circle 
              cx={53 + pupilOffsetX} 
              cy={58 + pupilOffsetY} 
              r="3.2" 
              fill="#09090b" 
            />
            <circle 
              cx={53 + pupilOffsetX + 1.5} 
              cy={58 + pupilOffsetY - 1.5} 
              r="1.6" 
              fill="#ffffff" 
            />
            {isBlinking && (
              <rect x="40" y="44" width="26" height="26" rx="4" fill="#facc15" />
            )}
          </g>

          {/* Right Eye & Dynamic Pupil */}
          <g>
            <circle 
              cx={87 + pupilOffsetX} 
              cy={58 + pupilOffsetY} 
              r="6" 
              fill="#854d0e" 
            />
            <circle 
              cx={87 + pupilOffsetX} 
              cy={58 + pupilOffsetY} 
              r="3.2" 
              fill="#09090b" 
            />
            <circle 
              cx={87 + pupilOffsetX + 1.5} 
              cy={58 + pupilOffsetY - 1.5} 
              r="1.6" 
              fill="#ffffff" 
            />
            {isBlinking && (
              <rect x="74" y="44" width="26" height="26" rx="4" fill="#facc15" />
            )}
          </g>

          {/* Subtle Rosy Blush on Cheeks */}
          <ellipse cx="40" cy="74" rx="4.5" ry="3" fill="#f43f5e" opacity="0.25" />
          <ellipse cx="100" cy="74" rx="4.5" ry="3" fill="#f43f5e" opacity="0.25" />

          {/* ======================================================== */}
          {/* 6. MOUTH (WARM, POLITE & CONFIDENT COURIER SMILE)        */}
          {/* ======================================================== */}
          <path
            d={isDelivering ? "M56 77 Q70 89 84 77" : "M58 78 Q70 88 82 78"}
            fill="none"
            stroke="#854d0e"
            strokeWidth="3.2"
            strokeLinecap="round"
          />

          {/* ======================================================== */}
          {/* 7. DENIM BLUE OVERALLS                                   */}
          {/* ======================================================== */}
          <path
            d="M32 104 L44 104 L44 96 L96 96 L96 104 L108 104 C108 126 96 140 70 140 C44 140 32 126 32 104 Z"
            fill="#2563eb"
            stroke="#1d4ed8"
            strokeWidth="1.5"
          />

          {/* Straps with Black Fastener Buttons */}
          <path d="M33 96 L47 104" stroke="#1d4ed8" strokeWidth="7" strokeLinecap="round" />
          <circle cx="47" cy="103" r="2.4" fill="#0f172a" />

          <path d="M107 96 L93 104" stroke="#1d4ed8" strokeWidth="7" strokeLinecap="round" />
          <circle cx="93" cy="103" r="2.4" fill="#0f172a" />

          {/* Bib Pocket with Gru 'G' Emblem */}
          <rect x="58" y="108" width="24" height="18" rx="3" fill="#1d4ed8" />
          <circle cx="70" cy="117" r="5.5" fill="#0f172a" />
          <path d="M72 114.5 L68 114.5 L68 119.5 L72 119.5 L72 117 L70 117" stroke="#ffffff" strokeWidth="1.4" fill="none" />

          {/* ======================================================== */}
          {/* 8. LEATHER SATCHEL (MAIL BAG) SLUNG DIAGONALLY           */}
          {/* ======================================================== */}
          {/* Satchel Shoulder Strap */}
          <path d="M36 90 L98 126" stroke="#5c2409" strokeWidth="5.5" strokeLinecap="round" />
          <path d="M36 90 L98 126" stroke="#92400e" strokeWidth="3" strokeLinecap="round" />

          {/* Satchel Bag Body on Right Hip */}
          <g transform="rotate(-6 95 125)">
            <rect x="86" y="116" width="28" height="24" rx="4" fill="url(#satchelBrown)" stroke="#270f03" strokeWidth="1.2" />

            {/* When delivering: Envelope is securely tucked into the satchel with olive wax seal visible! */}
            {isDelivering && (
              <g transform="translate(4, -8)">
                <rect x="86" y="114" width="20" height="14" rx="2" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
                <path d="M86 114 L96 122 L106 114" stroke="#94a3b8" strokeWidth="1" fill="none" />
                <circle cx="96" cy="121" r="2.2" fill="#a1a480" />
              </g>
            )}

            {/* Bag Flap */}
            <path d="M86 116 L100 127 L114 116 Z" fill="#78350f" stroke="#270f03" strokeWidth="0.8" />
            {/* Brass Buckle */}
            <rect x="97" y="124" width="6" height="5" rx="1" fill="#facc15" stroke="#78350f" strokeWidth="0.8" />
          </g>

          {/* ======================================================== */}
          {/* 9. HANDS: WAVING GOODBYE OR PRESENTING ENVELOPE          */}
          {/* ======================================================== */}
          {isDelivering ? (
            /* Friendly Waving Goodbye: Arm is 100% Fixed, ONLY Wrist Waves Gently */
            <g>
              {/* Left Arm: Resting comfortably on hip */}
              <path d="M33 98 Q20 108 30 118" stroke="#facc15" strokeWidth="7.5" strokeLinecap="round" fill="none" />
              <circle cx="30" cy="118" r="5.5" fill="#0f172a" />

              {/* Solid Yellow Arm (Completely Fixed & Anchored - 0 movement from arm/shoulder!) */}
              <circle cx="103" cy="95" r="7" fill="#facc15" />
              <path 
                d="M103 95 C116 88 120 72 116 52" 
                stroke="#facc15" 
                strokeWidth="8.5" 
                strokeLinecap="round" 
                fill="none" 
              />

              {/* Blue Overalls Strap overlaying shoulder joint */}
              <path d="M107 96 L93 104" stroke="#1d4ed8" strokeWidth="7" strokeLinecap="round" />
              <circle cx="93" cy="103" r="2.4" fill="#0f172a" />

              {/* ONLY Wrist & Glove Waves Slightly Side-to-Side */}
              <motion.g
                animate={{ rotate: [-10, 10, -10] }}
                transition={{ repeat: Infinity, duration: 0.85, ease: 'easeInOut' }}
                style={{ transformOrigin: '116px 50px' }}
              >
                {/* Black Glove Cuff */}
                <rect 
                  x="110" 
                  y="48" 
                  width="12" 
                  height="5" 
                  rx="2.5" 
                  fill="#0f172a" 
                  transform="rotate(-15 116 50)" 
                />

                {/* Solid Chubby Black Glove Palm */}
                <ellipse cx="116" cy="44" rx="6.5" ry="5.5" fill="#0f172a" />

                {/* Thumb */}
                <ellipse 
                  cx="110" 
                  cy="45" 
                  rx="3.2" 
                  ry="2.4" 
                  fill="#0f172a" 
                  transform="rotate(-30 110 45)" 
                />

                {/* Authentic Minion Chubby Waving Fingers */}
                {/* Index Finger */}
                <rect 
                  x="111" 
                  y="32" 
                  width="4.2" 
                  height="11" 
                  rx="2.1" 
                  fill="#0f172a" 
                  transform="rotate(-8 113 37)" 
                />
                {/* Middle Finger */}
                <rect 
                  x="116" 
                  y="30" 
                  width="4.2" 
                  height="12" 
                  rx="2.1" 
                  fill="#0f172a" 
                  transform="rotate(2 118 36)" 
                />
                {/* Ring Finger */}
                <rect 
                  x="121" 
                  y="32" 
                  width="4.2" 
                  height="10" 
                  rx="2.1" 
                  fill="#0f172a" 
                  transform="rotate(12 123 37)" 
                />
              </motion.g>
            </g>
          ) : (
            /* Idle: Holding letter presented forward */
            <g>
              {/* Left Arm holding the letter */}
              <path d="M33 98 Q22 110 38 116" stroke="#facc15" strokeWidth="7.5" strokeLinecap="round" fill="none" />
              <circle cx="40" cy="116" r="5.5" fill="#0f172a" />

              {/* White Sealed Envelope in Hand */}
              <g transform="rotate(8 48 115)">
                <rect x="36" y="104" width="30" height="20" rx="3" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.2" />
                <path d="M36 104 L51 116 L66 104" stroke="#94a3b8" strokeWidth="1.2" fill="none" />
                <circle cx="51" cy="115" r="3.2" fill="#a1a480" />
              </g>

              {/* Right Arm: Resting naturally on side */}
              <path d="M107 98 Q118 106 108 118" stroke="#facc15" strokeWidth="7.5" strokeLinecap="round" fill="none" />
              <circle cx="106" cy="119" r="5.5" fill="#0f172a" />
            </g>
          )}

          {/* ======================================================== */}
          {/* 10. LEGS & BLACK BOOTS                                   */}
          {/* ======================================================== */}
          <rect x="50" y="138" width="10" height="12" fill="#2563eb" />
          <ellipse cx="51" cy="152" rx="10" ry="5.5" fill="#0f172a" />

          <rect x="80" y="138" width="10" height="12" fill="#2563eb" />
          <ellipse cx="85" cy="152" rx="10" ry="5.5" fill="#0f172a" />
        </svg>
      </motion.div>
    </div>
  )
}
