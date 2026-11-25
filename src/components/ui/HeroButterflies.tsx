import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface ButterflyProps {
  id: number
  colorScheme: 'monarch' | 'morpho' | 'emerald'
  size: number
  landingPos: { x: number; y: number; rotate: number }
  flightPath: {
    x: number[]
    y: number[]
    rotate: number[]
    scale: number[]
  }
  delay: number
}

const Butterfly: React.FC<ButterflyProps> = ({
  colorScheme,
  size,
  landingPos,
  flightPath,
  delay
}) => {
  const [hasLanded, setHasLanded] = useState(false)

  useEffect(() => {
    // Switch from flight mode to resting basking mode after flight completes (~8.5s + delay)
    const timer = setTimeout(() => {
      setHasLanded(true)
    }, (8.5 + delay) * 1000)

    return () => clearTimeout(timer)
  }, [delay])

  // Color Gradients & Styles for each butterfly
  const getColors = () => {
    switch (colorScheme) {
      case 'monarch':
        return {
          gradId: 'monarchGrad',
          stops: (
            <>
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="40%" stopColor="#f97316" />
              <stop offset="85%" stopColor="#dc2626" />
              <stop offset="100%" stopColor="#18181b" />
            </>
          ),
          accentDot: '#ffffff',
          edgeColor: '#18181b'
        }
      case 'morpho':
        return {
          gradId: 'morphoGrad',
          stops: (
            <>
              <stop offset="0%" stopColor="#e0f2fe" />
              <stop offset="35%" stopColor="#38bdf8" />
              <stop offset="80%" stopColor="#0284c7" />
              <stop offset="100%" stopColor="#0f172a" />
            </>
          ),
          accentDot: '#7dd3fc',
          edgeColor: '#0f172a'
        }
      case 'emerald':
        return {
          gradId: 'emeraldGrad',
          stops: (
            <>
              <stop offset="0%" stopColor="#d1fae5" />
              <stop offset="40%" stopColor="#34d399" />
              <stop offset="75%" stopColor="#059669" />
              <stop offset="100%" stopColor="#7e22ce" />
            </>
          ),
          accentDot: '#fbcfe8',
          edgeColor: '#3b0764'
        }
    }
  }

  const { gradId, stops, accentDot, edgeColor } = getColors()

  return (
    <motion.div
      initial={{
        x: flightPath.x[0],
        y: flightPath.y[0],
        rotate: flightPath.rotate[0],
        scale: flightPath.scale[0],
        opacity: 0
      }}
      animate={
        hasLanded
          ? {
              x: landingPos.x,
              y: landingPos.y,
              rotate: landingPos.rotate,
              scale: 1,
              opacity: 1
            }
          : {
              x: flightPath.x,
              y: flightPath.y,
              rotate: flightPath.rotate,
              scale: flightPath.scale,
              opacity: [0, 1, 1, 1, 1]
            }
      }
      transition={
        hasLanded
          ? { duration: 0.6, ease: 'easeOut' }
          : {
              duration: 8.5,
              delay: delay,
              ease: [0.25, 0.1, 0.25, 1]
            }
      }
      className="absolute top-0 left-0 pointer-events-none select-none z-30"
      style={{
        transformStyle: 'preserve-3d',
        perspective: 600
      }}
    >
      {/* Butterfly Root Container */}
      <div
        className="relative flex items-center justify-center"
        style={{
          width: size,
          height: size * 0.85,
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Left Wing (3D flapping with transformOrigin at right edge) */}
        <motion.div
          animate={
            hasLanded
              ? {
                  // Basking at rest: gentle breathing wing flexes
                  rotateY: [-15, -65, -20, -55, -15],
                  rotateZ: [-2, 2, -2]
                }
              : {
                  // Rapid, fluttering flight wings
                  rotateY: [-10, -75, -10],
                  rotateZ: [-5, 5, -5]
                }
          }
          transition={{
            repeat: Infinity,
            duration: hasLanded ? 2.8 : 0.14,
            ease: hasLanded ? 'easeInOut' : 'linear',
            repeatDelay: hasLanded ? 0.3 : 0
          }}
          style={{
            transformOrigin: 'right center',
            transformStyle: 'preserve-3d',
            width: size * 0.48,
            height: '100%'
          }}
          className="absolute right-1/2 top-0"
        >
          <svg viewBox="0 0 50 65" className="w-full h-full overflow-visible drop-shadow-sm">
            <defs>
              <linearGradient id={`${gradId}-left`} x1="0%" y1="0%" x2="100%" y2="100%">
                {stops}
              </linearGradient>
            </defs>

            {/* Forewing (Upper Wing) */}
            <path
              d="M48 35 C42 18 20 2 6 8 C-3 12 1 28 14 36 C24 42 42 38 48 35 Z"
              fill={`url(#${gradId}-left)`}
              stroke={edgeColor}
              strokeWidth="1.2"
            />
            {/* Wing Veins */}
            <path d="M48 35 Q28 24 12 16 M48 35 Q30 30 20 32" stroke={edgeColor} strokeWidth="0.8" opacity="0.6" fill="none" />

            {/* Hindwing (Lower Wing) */}
            <path
              d="M48 36 C38 42 16 45 18 56 C20 64 36 62 45 48 C47 44 48 38 48 36 Z"
              fill={`url(#${gradId}-left)`}
              stroke={edgeColor}
              strokeWidth="1.2"
            />
            <path d="M48 38 Q32 46 26 55" stroke={edgeColor} strokeWidth="0.8" opacity="0.6" fill="none" />

            {/* Delicate Wing Edge Sparkle Spots */}
            <circle cx="9" cy="11" r="1.4" fill={accentDot} />
            <circle cx="16" cy="18" r="1.1" fill={accentDot} />
            <circle cx="23" cy="58" r="1.2" fill={accentDot} />
          </svg>
        </motion.div>

        {/* Slender Butterfly Body & Antennae */}
        <div
          className="relative z-10 flex flex-col items-center justify-center"
          style={{ width: size * 0.12, height: '100%' }}
        >
          <svg viewBox="0 0 14 65" className="w-full h-full overflow-visible">
            {/* Tiny Antennae */}
            <path d="M7 16 Q3 8 0 4" stroke="#18181b" strokeWidth="1" strokeLinecap="round" fill="none" />
            <circle cx="0" cy="4" r="1" fill="#18181b" />
            <path d="M7 16 Q11 8 14 4" stroke="#18181b" strokeWidth="1" strokeLinecap="round" fill="none" />
            <circle cx="14" cy="4" r="1" fill="#18181b" />

            {/* Head */}
            <circle cx="7" cy="18" r="2.5" fill="#18181b" />

            {/* Thorax & Abdomen */}
            <ellipse cx="7" cy="27" rx="2.2" ry="6" fill="#27272a" />
            <ellipse cx="7" cy="42" rx="1.8" ry="8" fill="#18181b" />
          </svg>
        </div>

        {/* Right Wing (3D flapping with transformOrigin at left edge) */}
        <motion.div
          animate={
            hasLanded
              ? {
                  // Symmetrical resting wing flex
                  rotateY: [15, 65, 20, 55, 15],
                  rotateZ: [2, -2, 2]
                }
              : {
                  // Rapid, fluttering flight wings
                  rotateY: [10, 75, 10],
                  rotateZ: [5, -5, 5]
                }
          }
          transition={{
            repeat: Infinity,
            duration: hasLanded ? 2.8 : 0.14,
            ease: hasLanded ? 'easeInOut' : 'linear',
            repeatDelay: hasLanded ? 0.3 : 0
          }}
          style={{
            transformOrigin: 'left center',
            transformStyle: 'preserve-3d',
            width: size * 0.48,
            height: '100%'
          }}
          className="absolute left-1/2 top-0"
        >
          <svg viewBox="0 0 50 65" className="w-full h-full overflow-visible drop-shadow-sm">
            <defs>
              <linearGradient id={`${gradId}-right`} x1="100%" y1="0%" x2="0%" y2="100%">
                {stops}
              </linearGradient>
            </defs>

            {/* Forewing (Upper Wing) */}
            <path
              d="M2 35 C8 18 30 2 44 8 C53 12 49 28 36 36 C26 42 8 38 2 35 Z"
              fill={`url(#${gradId}-right)`}
              stroke={edgeColor}
              strokeWidth="1.2"
            />
            {/* Wing Veins */}
            <path d="M2 35 Q22 24 38 16 M2 35 Q20 30 30 32" stroke={edgeColor} strokeWidth="0.8" opacity="0.6" fill="none" />

            {/* Hindwing (Lower Wing) */}
            <path
              d="M2 36 C12 42 34 45 32 56 C30 64 14 62 5 48 C3 44 2 38 2 36 Z"
              fill={`url(#${gradId}-right)`}
              stroke={edgeColor}
              strokeWidth="1.2"
            />
            <path d="M2 38 Q18 46 24 55" stroke={edgeColor} strokeWidth="0.8" opacity="0.6" fill="none" />

            {/* Delicate Wing Edge Sparkle Spots */}
            <circle cx="41" cy="11" r="1.4" fill={accentDot} />
            <circle cx="34" cy="18" r="1.1" fill={accentDot} />
            <circle cx="27" cy="58" r="1.2" fill={accentDot} />
          </svg>
        </motion.div>
      </div>
    </motion.div>
  )
}

export const HeroButterflies: React.FC = () => {
  // Dynamically adapt flight radius based on viewport width
  const [viewportRatio, setViewportRatio] = useState(1)
  const [isSmallScreen, setIsSmallScreen] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== 'undefined') {
        // Desktop is ~1200px. On phones (360px-480px), scale flight paths so they stay within visible bounds
        const ratio = Math.min(1, Math.max(0.38, window.innerWidth / 1200))
        setViewportRatio(ratio)
        setIsSmallScreen(window.innerWidth < 650)
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Position Butterfly 3 safely inside the Hire Me button on all viewports (<650px button width is ~95px)
  const b3LandingX = isSmallScreen ? 58 : 68
  const b3LandingY = isSmallScreen ? -14 : -16

  // Flies into the screen once from outside, then completes two graceful inside-screen loops slowly before landing on the button
  const butterfliesData = [
    {
      id: 1,
      colorScheme: 'monarch' as const,
      size: 32,
      // Lands delicately near the top-left rim of the Hire Me button
      landingPos: { x: 12, y: -18, rotate: -15 },
      flightPath: {
        // Enters from outside top-right, then stays inside visible screen
        x: [
          Math.round(1250 * viewportRatio),
          Math.round(880 * viewportRatio),
          Math.round(120 * viewportRatio),
          Math.round(-80 * viewportRatio),
          Math.round(750 * viewportRatio),
          Math.round(850 * viewportRatio),
          Math.round(350 * viewportRatio),
          Math.round(-60 * viewportRatio),
          12
        ],
        y: [
          Math.round(-420 * viewportRatio),
          Math.round(-220 * viewportRatio),
          Math.round(220 * viewportRatio),
          Math.round(-180 * viewportRatio),
          Math.round(-260 * viewportRatio),
          Math.round(160 * viewportRatio),
          Math.round(240 * viewportRatio),
          Math.round(60 * viewportRatio),
          -18
        ],
        rotate: [35, -20, 38, -30, 25, -25, 30, -15, -15],
        scale: [0.55, 1.12, 0.96, 1.05, 1.02, 1.08, 0.98, 1, 1]
      },
      delay: 0.1
    },
    {
      id: 2,
      colorScheme: 'morpho' as const,
      size: 28,
      // Lands at bottom-left corner of the Hire Me button
      landingPos: { x: -2, y: isSmallScreen ? 26 : 30, rotate: -25 },
      flightPath: {
        // Enters from outside top-left, then stays inside visible screen
        x: [
          Math.round(-420 * viewportRatio),
          Math.round(-60 * viewportRatio),
          Math.round(650 * viewportRatio),
          Math.round(920 * viewportRatio),
          Math.round(280 * viewportRatio),
          Math.round(-80 * viewportRatio),
          Math.round(480 * viewportRatio),
          Math.round(820 * viewportRatio),
          Math.round(180 * viewportRatio),
          Math.round(-40 * viewportRatio),
          -2
        ],
        y: [
          Math.round(-380 * viewportRatio),
          Math.round(-200 * viewportRatio),
          Math.round(-280 * viewportRatio),
          Math.round(120 * viewportRatio),
          Math.round(260 * viewportRatio),
          Math.round(100 * viewportRatio),
          Math.round(-160 * viewportRatio),
          Math.round(-60 * viewportRatio),
          Math.round(180 * viewportRatio),
          Math.round(90 * viewportRatio),
          isSmallScreen ? 26 : 30
        ],
        rotate: [-30, 20, 35, -20, 28, -25, 30, -15, 20, -10, -25],
        scale: [0.55, 1.08, 1.15, 0.95, 1.05, 1, 1.08, 0.96, 1.02, 1, 1]
      },
      delay: 0.4
    },
    {
      id: 3,
      colorScheme: 'emerald' as const,
      size: 26,
      // Lands on the upper-right edge of the Hire Me button (strictly staying on Hire Me, never on Download CV)
      landingPos: { x: b3LandingX, y: b3LandingY, rotate: 20 },
      flightPath: {
        // Enters from outside bottom-right, then stays inside visible screen
        x: [
          Math.round(1280 * viewportRatio),
          Math.round(820 * viewportRatio),
          Math.round(880 * viewportRatio),
          Math.round(220 * viewportRatio),
          Math.round(-70 * viewportRatio),
          Math.round(420 * viewportRatio),
          Math.round(780 * viewportRatio),
          Math.round(320 * viewportRatio),
          Math.round(-50 * viewportRatio),
          b3LandingX
        ],
        y: [
          Math.round(360 * viewportRatio),
          Math.round(200 * viewportRatio),
          Math.round(-200 * viewportRatio),
          Math.round(-280 * viewportRatio),
          Math.round(-80 * viewportRatio),
          Math.round(220 * viewportRatio),
          Math.round(40 * viewportRatio),
          Math.round(-120 * viewportRatio),
          Math.round(140 * viewportRatio),
          b3LandingY
        ],
        rotate: [40, -25, 30, -35, 25, -20, 28, -15, 18, 20],
        scale: [0.5, 1.1, 0.94, 1.08, 1, 1.06, 0.95, 1.02, 0.98, 1]
      },
      delay: 0.8
    }
  ]

  return (
    <div className="absolute inset-0 pointer-events-none overflow-visible">
      {butterfliesData.map((b) => (
        <Butterfly
          key={b.id}
          id={b.id}
          colorScheme={b.colorScheme}
          size={b.size}
          landingPos={b.landingPos}
          flightPath={b.flightPath}
          delay={b.delay}
        />
      ))}
    </div>
  )
}
