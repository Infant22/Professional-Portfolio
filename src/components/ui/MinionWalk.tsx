import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export const MinionWalk: React.FC = () => {
  const [isWalking, setIsWalking] = useState(true)

  useEffect(() => {
    // Walks for 2.4s from off-screen left, then stops and points up at Hire Me
    const timer = setTimeout(() => {
      setIsWalking(false)
    }, 2400)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative mt-6 h-[95px] w-full max-w-[240px] select-none pointer-events-none">
      <motion.div
        initial={{ x: -280 }}
        animate={{ x: 0 }}
        transition={{ duration: 2.4, ease: 'linear' }}
        className="absolute left-6 bottom-0 flex flex-col items-center"
      >
        {/* Minion Waddling Walk Cycle */}
        <motion.div
          animate={
            isWalking
              ? { y: [0, -5, 0], rotate: [-3, 3, -3] }
              : { y: [0, -2, 0], rotate: -2 }
          }
          transition={{
            repeat: Infinity,
            duration: isWalking ? 0.32 : 2.0,
            ease: 'easeInOut'
          }}
          className="relative w-[68px] h-[86px]"
        >
          {/* ========================================================== */}
          {/* TWO-EYED MINION (DAVE / BOB) SVG                          */}
          {/* ========================================================== */}
          <svg viewBox="0 0 100 125" className="w-full h-full drop-shadow-md overflow-visible">
            
            {/* Sprouts of Black Hair on Top */}
            <path d="M48 8 Q47 2 44 1" stroke="#18181b" strokeWidth="2" strokeLinecap="round" fill="none" />
            <path d="M52 8 Q53 1 56 2" stroke="#18181b" strokeWidth="2" strokeLinecap="round" fill="none" />
            <path d="M45 8 Q42 4 39 4" stroke="#18181b" strokeWidth="1.8" strokeLinecap="round" fill="none" />
            <path d="M55 8 Q58 4 61 4" stroke="#18181b" strokeWidth="1.8" strokeLinecap="round" fill="none" />

            {/* Yellow Capsule Pill Body */}
            <rect x="22" y="8" width="56" height="88" rx="28" fill="#facc15" stroke="#ca8a04" strokeWidth="1.5" />

            {/* Goggle Strap (Black Band across head) */}
            <rect x="21" y="32" width="58" height="9" fill="#18181b" />

            {/* ======================================================== */}
            {/* TWO GOGGLES & TWO EYES (DAVE / BOB STYLE)                */}
            {/* ======================================================== */}
            {/* Left Silver Goggle Frame */}
            <circle cx="39" cy="36" r="14" fill="#94a3b8" stroke="#475569" strokeWidth="2" />
            <circle cx="39" cy="36" r="11" fill="#e2e8f0" />
            <circle cx="39" cy="36" r="9.5" fill="#ffffff" />

            {/* Right Silver Goggle Frame */}
            <circle cx="61" cy="36" r="14" fill="#94a3b8" stroke="#475569" strokeWidth="2" />
            <circle cx="61" cy="36" r="11" fill="#e2e8f0" />
            <circle cx="61" cy="36" r="9.5" fill="#ffffff" />

            {/* Middle Bridge Connecting Goggles */}
            <rect x="49" y="34" width="2" height="4" fill="#475569" />

            {/* Left Eye (Looks UP-LEFT towards the Hire Me button when stopped!) */}
            <motion.circle 
              cx={isWalking ? 39 : 37} 
              cy={isWalking ? 36 : 30.5} 
              r="4.8" 
              fill="#854d0e" 
            />
            <motion.circle 
              cx={isWalking ? 39 : 37} 
              cy={isWalking ? 36 : 30.5} 
              r="2.6" 
              fill="#09090b" 
            />
            <circle cx={isWalking ? 40 : 38} cy={isWalking ? 34.5 : 29} r="1.2" fill="#ffffff" />

            {/* Right Eye (Looks UP-LEFT towards the Hire Me button when stopped!) */}
            <motion.circle 
              cx={isWalking ? 61 : 59} 
              cy={isWalking ? 36 : 30.5} 
              r="4.8" 
              fill="#854d0e" 
            />
            <motion.circle 
              cx={isWalking ? 61 : 59} 
              cy={isWalking ? 36 : 30.5} 
              r="2.6" 
              fill="#09090b" 
            />
            <circle cx={isWalking ? 62 : 60} cy={isWalking ? 34.5 : 29} r="1.2" fill="#ffffff" />

            {/* Cute Minion Smile */}
            <path
              d="M40 54 Q50 62 60 54"
              fill="none"
              stroke="#854d0e"
              strokeWidth="2.5"
              strokeLinecap="round"
            />

            {/* ======================================================== */}
            {/* DENIM BLUE OVERALLS                                      */}
            {/* ======================================================== */}
            <path
              d="M22 72 L32 72 L32 66 L68 66 L68 72 L78 72 C78 86 68 96 50 96 C32 96 22 86 22 72 Z"
              fill="#2563eb"
              stroke="#1d4ed8"
              strokeWidth="1.5"
            />

            {/* Left Strap with Button */}
            <path d="M23 66 L34 72" stroke="#1d4ed8" strokeWidth="5.5" strokeLinecap="round" />
            <circle cx="34" cy="71" r="1.8" fill="#0f172a" />

            {/* Right Strap with Button */}
            <path d="M77 66 L66 72" stroke="#1d4ed8" strokeWidth="5.5" strokeLinecap="round" />
            <circle cx="66" cy="71" r="1.8" fill="#0f172a" />

            {/* Center Bib Pocket with Gru 'G' Emblem */}
            <rect x="42" y="74" width="16" height="13" rx="2" fill="#1d4ed8" />
            <circle cx="50" cy="80.5" r="4" fill="#0f172a" />
            <path d="M51.5 78.5 L48.5 78.5 L48.5 82.5 L51.5 82.5 L51.5 80.5 L50 80.5" stroke="#ffffff" strokeWidth="1" fill="none" />

            {/* ======================================================== */}
            {/* LEFT ARM (Relaxed on hip / side)                         */}
            {/* ======================================================== */}
            <path d="M23 65 Q16 76 21 85" stroke="#facc15" strokeWidth="6" strokeLinecap="round" fill="none" />
            <circle cx="21" cy="87" r="4.5" fill="#0f172a" />

            {/* ======================================================== */}
            {/* RIGHT ARM: CLEARLY ANGLED & POINTING DIRECTLY AT HIRE ME */}
            {/* ======================================================== */}
            {isWalking ? (
              /* Walking Arm Swing */
              <g>
                <path d="M77 65 Q85 76 80 86" stroke="#facc15" strokeWidth="6" strokeLinecap="round" fill="none" />
                <circle cx="80" cy="88" r="4.5" fill="#0f172a" />
              </g>
            ) : (
              /* Pointing Directly UP toward the Hire Me button */
              <g>
                {/* Yellow Arm raised up from shoulder (77, 65) to (76, 36) */}
                <path 
                  d="M77 65 Q86 52 76 36" 
                  stroke="#facc15" 
                  strokeWidth="6.5" 
                  strokeLinecap="round" 
                  fill="none" 
                />
                
                {/* Black Glove Cuff */}
                <rect 
                  x="71" 
                  y="34" 
                  width="10" 
                  height="4.5" 
                  rx="2" 
                  fill="#0f172a" 
                  transform="rotate(15 76 36)"
                />

                {/* Chubby Glove Palm */}
                <ellipse cx="76" cy="30" rx="5.5" ry="5" fill="#0f172a" />

                {/* Thumb */}
                <circle cx="81" cy="31" r="2.8" fill="#0f172a" />

                {/* Pointing Index Finger: Angled directly toward the Hire Me button! */}
                <path 
                  d="M74 29 L70 14" 
                  stroke="#0f172a" 
                  strokeWidth="4.5" 
                  strokeLinecap="round" 
                />

                {/* Animated Dotted Attention Pulse from finger to button */}
                <motion.g
                  animate={{ opacity: [0.3, 1, 0.3], y: [-2, -6, -2] }}
                  transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
                >
                  <circle cx="68" cy="7" r="2.2" fill="#a1a480" />
                  <circle cx="66" cy="-1" r="1.8" fill="#a1a480" />
                  <circle cx="64" cy="-8" r="1.4" fill="#a1a480" />
                </motion.g>
              </g>
            )}

            {/* ======================================================== */}
            {/* LEGS & BLACK BOOTS (WALKING CYCLE)                       */}
            {/* ======================================================== */}
            {/* Left Leg & Boot */}
            <motion.g
              animate={isWalking ? { y: [0, -5, 0], x: [0, 2, 0] } : { y: 0, x: 0 }}
              transition={{ repeat: Infinity, duration: 0.32, ease: 'easeInOut' }}
            >
              <rect x="37" y="94" width="7" height="9" fill="#2563eb" />
              <ellipse cx="38" cy="105" rx="7" ry="4" fill="#0f172a" />
            </motion.g>

            {/* Right Leg & Boot */}
            <motion.g
              animate={isWalking ? { y: [-5, 0, -5], x: [2, 0, 2] } : { y: 0, x: 0 }}
              transition={{ repeat: Infinity, duration: 0.32, ease: 'easeInOut' }}
            >
              <rect x="56" y="94" width="7" height="9" fill="#2563eb" />
              <ellipse cx="59" cy="105" rx="7" ry="4" fill="#0f172a" />
            </motion.g>

          </svg>
        </motion.div>
      </motion.div>
    </div>
  )
}
