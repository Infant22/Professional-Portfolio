import React from 'react'

export const MarqueeRibbon: React.FC = () => {
  const items = [
    'Software Developer',
    'Frontend Architecture',
    'Full Stack Systems',
    'React 19 & TypeScript',
    'Clean Web Experiences',
    'Practical Backend APIs',
    'Next.js & Tailwind CSS',
    'High Performance UI'
  ]

  return (
    <div className="w-full overflow-hidden py-4 border-y border-[#E8ECEF] dark:border-[#1E2738] bg-[#0F172A] dark:bg-[#06080C] text-white shadow-md">
      <div className="animate-marquee whitespace-nowrap text-xs font-mono font-bold tracking-widest uppercase flex items-center gap-10">
        {[...items, ...items].map((item, index) => (
          <span key={index} className="flex items-center gap-10">
            <span className="text-[#FF4D24] text-base">✦</span>
            <span className="hover:text-[#FF4D24] transition-colors cursor-default">{item}</span>
          </span>
        ))}
      </div>
    </div>
  )
}
