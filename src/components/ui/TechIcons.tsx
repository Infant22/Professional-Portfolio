import React from 'react'

interface TechIconProps {
  name: string
  className?: string
}

export const TechIcon: React.FC<TechIconProps> = ({ name, className = "w-5 h-5" }) => {
  switch (name.toLowerCase()) {
    case 'html5':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path d="M4 2L5.8 19.8L12 21.5L18.2 19.8L20 2H4Z" fill="#E34F26" />
          <path d="M12 3.6V19.8L16.8 18.5L18.3 3.6H12Z" fill="#EF652A" />
          <path d="M12 7.7H8.5L8.7 9.8H12V12H8.9L9.3 16.3L12 17.1V15L10.7 14.6L10.5 12.8H12V7.7Z" fill="#EBEBEB" />
          <path d="M12 7.7V9.8H14.8L14.5 12.8H12V15L13.3 14.6L13.5 12.8H15.6L15.3 16.3L12 17.1V19.3L16.7 18L17.2 7.7H12Z" fill="#FFFFFF" />
        </svg>
      )
    case 'css3':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path d="M4 2L5.8 19.8L12 21.5L18.2 19.8L20 2H4Z" fill="#1572B6" />
          <path d="M12 3.6V19.8L16.8 18.5L18.3 3.6H12Z" fill="#33A9DC" />
          <path d="M12 7.7H8.5L8.7 9.8H12V12H8.9L9.3 16.3L12 17.1V15L10.7 14.6L10.5 12.8H12V7.7Z" fill="#EBEBEB" />
          <path d="M12 7.7V9.8H14.8L14.5 12.8H12V15L13.3 14.6L13.5 12.8H15.6L15.3 16.3L12 17.1V19.3L16.7 18L17.2 7.7H12Z" fill="#FFFFFF" />
        </svg>
      )
    case 'javascript':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="4" fill="#F7DF1E" />
          <path d="M12.5 17.2C12.9 17.9 13.5 18.4 14.4 18.4C15.3 18.4 15.8 17.9 15.8 17.3C15.8 16.5 15.3 16.2 14.2 15.7L13.6 15.4C12 14.8 11 13.9 11 12.1C11 10.4 12.3 9.1 14.3 9.1C15.7 9.1 16.7 9.6 17.4 10.8L15.9 11.8C15.6 11.2 15.1 10.9 14.3 10.9C13.6 10.9 13.1 11.3 13.1 11.9C13.1 12.6 13.6 12.9 14.6 13.3L15.2 13.6C17.1 14.4 18 15.3 18 17.1C18 19 16.5 20.2 14.3 20.2C12.5 20.2 11.4 19.2 10.8 17.9L12.5 17.2ZM6 17.2C6.4 17.8 6.8 18.3 7.6 18.3C8.4 18.3 8.9 17.9 8.9 16.7V9.4H11V16.7C11 18.9 9.8 20.1 7.7 20.1C6.2 20.1 5.2 19.3 4.6 18.1L6 17.2Z" fill="#000000" />
        </svg>
      )
    case 'react':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <ellipse cx="12" cy="12" rx="4" ry="10" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(30 12 12)" />
          <ellipse cx="12" cy="12" rx="4" ry="10" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(90 12 12)" />
          <ellipse cx="12" cy="12" rx="4" ry="10" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(150 12 12)" />
          <circle cx="12" cy="12" r="1.8" fill="#61DAFB" />
        </svg>
      )
    case 'typescript':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="4" fill="#3178C6" />
          <path d="M12.5 16.8C12.8 17.4 13.4 17.8 14.1 17.8C14.8 17.8 15.3 17.5 15.3 17C15.3 16.4 14.8 16.1 14 15.8L13.5 15.6C12.2 15.1 11.4 14.3 11.4 12.9C11.4 11.5 12.5 10.4 14.1 10.4C15.2 10.4 16 10.8 16.6 11.7L15.3 12.5C15 12 14.6 11.8 14.1 11.8C13.5 11.8 13.1 12.1 13.1 12.6C13.1 13.1 13.5 13.4 14.3 13.7L14.8 13.9C16.3 14.5 17 15.3 17 16.8C17 18.3 15.7 19.3 14 19.3C12.5 19.3 11.6 18.4 11.1 17.4L12.5 16.8ZM5.2 11.8H7.7V19H9.4V11.8H11.9V10.4H5.2V11.8Z" fill="#FFFFFF" />
        </svg>
      )
    case 'tailwind css':
    case 'tailwind':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C8.336 13.382 6.975 12 6.001 12z" fill="#06B6D4" />
        </svg>
      )
    case 'node.js':
    case 'nodejs':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path d="M12 2L3.5 7V17L12 22L20.5 17V7L12 2Z" fill="#339933" />
          <path d="M12 4.5L18.5 8.2V15.8L12 19.5L5.5 15.8V8.2L12 4.5Z" fill="#43853D" />
          <path d="M12 7.5L16 9.8V14.2L12 16.5L8 14.2V9.8L12 7.5Z" fill="#FFFFFF" />
        </svg>
      )
    case 'express.js':
    case 'express':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="4" fill="#18181B" />
          <path d="M6 8.5H10V10.2H7.8V11.8H9.6V13.5H7.8V15.3H10.1V17H6V8.5Z" fill="#FFFFFF" />
          <path d="M12.8 17L14.7 13.9L16.6 17H18.7L15.7 12.6L18.4 8.5H16.4L14.7 11.3L13 8.5H10.9L13.6 12.6L10.7 17H12.8Z" fill="#FFFFFF" />
        </svg>
      )
    case 'python':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path d="M11.9 2C6.8 2 7.1 4.2 7.1 4.2V6.5H12V7.2H5.1C5.1 7.2 2 6.8 2 11.9C2 17 4.7 16.7 4.7 16.7H6.3V14.4C6.3 14.4 6.2 11.6 9 11.6H13.8C13.8 11.6 16.5 11.7 16.5 9V4.3C16.5 4.3 16.9 2 11.9 2ZM9.5 3.5C10.2 3.5 10.7 4 10.7 4.7C10.7 5.4 10.2 5.9 9.5 5.9C8.8 5.9 8.3 5.4 8.3 4.7C8.3 4 8.8 3.5 9.5 3.5Z" fill="#3776AB" />
          <path d="M12.1 22C17.2 22 16.9 19.8 16.9 19.8V17.5H12V16.8H18.9C18.9 16.8 22 17.2 22 12.1C22 7 19.3 7.3 19.3 7.3H17.7V9.6C17.7 9.6 17.8 12.4 15 12.4H10.2C10.2 12.4 7.5 12.3 7.5 15V19.7C7.5 19.7 7.1 22 12.1 22ZM14.5 20.5C13.8 20.5 13.3 20 13.3 19.3C13.3 18.6 13.8 18.1 14.5 18.1C15.2 18.1 15.7 18.6 15.7 19.3C15.7 20 15.2 20.5 14.5 20.5Z" fill="#FFD438" />
        </svg>
      )
    case 'rest apis':
    case 'rest api':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="4" fill="#6366F1" />
          <path d="M7 8L4 12L7 16M17 8L20 12L17 16M13.5 6L10.5 18" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    case 'mongodb':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path d="M12.1 2C12.1 2 11.9 2.2 11.6 2.6C10.3 4.2 6 9.8 6 14.3C6 17.7 8.7 20.9 12 21.9C15.3 20.9 18 17.7 18 14.3C18 9.8 13.7 4.2 12.4 2.6C12.2 2.2 12.1 2 12.1 2Z" fill="#47A248" />
          <path d="M12 2.1V21.9C15.3 20.9 18 17.7 18 14.3C18 9.8 13.7 4.2 12.4 2.6C12.2 2.3 12 2.1 12 2.1Z" fill="#499D4A" />
          <path d="M12 21.8C11.9 21.8 11.9 21.8 11.9 17.5C11.9 14.4 12.1 11.9 12.1 11.9C12.1 11.9 12.2 14.4 12.2 17.5C12.2 21.8 12.1 21.8 12 21.8Z" fill="#FFFFFF" />
        </svg>
      )
    case 'postgresql':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="4" fill="#4169E1" />
          <path d="M12 5C8.5 5 6.5 7.5 6.5 10.5C6.5 13 8 15 9.5 16V19L11.5 17.5H13C16 17.5 17.5 15.5 17.5 12C17.5 8 15.5 5 12 5ZM11 10.5C10.2 10.5 9.5 9.8 9.5 9C9.5 8.2 10.2 7.5 11 7.5C11.8 7.5 12.5 8.2 12.5 9C12.5 9.8 11.8 10.5 11 10.5Z" fill="#FFFFFF" />
        </svg>
      )
    case 'mysql':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="4" fill="#00758F" />
          <path d="M6 16.5C6 16.5 7.5 12 11 11C12.5 10.5 13.5 9.5 14 8C14.5 9.5 15.5 10.5 17 11C20.5 12 22 16.5 22 16.5C20 15.5 18 15 16 15C14 15 13 16 12 17C11 16 10 15 8 15C6 15 6 16.5 6 16.5Z" fill="#F29111" />
          <circle cx="12" cy="7" r="1.5" fill="#FFFFFF" />
        </svg>
      )
    case 'sql':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="4" fill="#0284C7" />
          <path d="M6 8C6 6.9 8.7 6 12 6C15.3 6 18 6.9 18 8M6 8V12C6 13.1 8.7 14 12 14C15.3 14 18 13.1 18 12V8M6 8C6 9.1 8.7 10 12 10C15.3 10 18 9.1 18 8M6 12V16C6 17.1 8.7 18 12 18C15.3 18 18 17.1 18 16V12" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      )
    case 'git':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path d="M21.6 10.7L13.3 2.4C12.8 1.9 12 1.9 11.5 2.4L9.8 4.1L12 6.3C12.6 6.1 13.3 6.3 13.7 6.7C14.2 7.2 14.3 7.9 14.1 8.5L16.2 10.6C16.8 10.4 17.5 10.5 18 11C18.6 11.6 18.6 12.6 18 13.2C17.4 13.8 16.4 13.8 15.8 13.2C15.3 12.7 15.2 12 15.4 11.4L13.5 9.5V14.6C13.7 14.8 13.8 15.2 13.8 15.5C13.8 16.5 13 17.3 12 17.3C11 17.3 10.2 16.5 10.2 15.5C10.2 14.8 10.6 14.2 11.2 13.9V8.9C10.6 8.6 10.2 8 10.2 7.3C10.2 6.9 10.3 6.6 10.5 6.3L8.3 4.1L2.4 10C1.9 10.5 1.9 11.3 2.4 11.8L10.7 20.1C11.2 20.6 12 20.6 12.5 20.1L21.6 11.9C22.1 11.4 22.1 11.2 21.6 10.7Z" fill="#F05032" />
        </svg>
      )
    case 'github':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="4" fill="#181717" />
          <path fillRule="evenodd" clipRule="evenodd" d="M12 4C7.58 4 4 7.58 4 12C4 15.54 6.29 18.54 9.47 19.6C9.87 19.67 10.02 19.43 10.02 19.21C10.02 19.02 10.01 18.52 10.01 17.85C7.78 18.33 7.31 16.78 7.31 16.78C6.95 15.85 6.42 15.6 6.42 15.6C5.69 15.1 6.48 15.11 6.48 15.11C7.28 15.17 7.7 15.93 7.7 15.93C8.42 17.15 9.58 16.8 10.04 16.6C10.11 16.08 10.32 15.73 10.55 15.53C8.77 15.33 6.9 14.64 6.9 11.58C6.9 10.71 7.21 10 7.72 9.44C7.64 9.24 7.36 8.43 7.8 7.32C7.8 7.32 8.47 7.11 10 8.14C10.64 7.96 11.32 7.87 12 7.87C12.68 7.87 13.36 7.96 14 8.14C15.53 7.11 16.2 7.32 16.2 7.32C16.64 8.43 16.36 9.24 16.28 9.44C16.79 10 17.1 10.71 17.1 11.58C17.1 14.65 15.22 15.33 13.43 15.53C13.72 15.78 13.98 16.27 13.98 17.02C13.98 18.09 13.97 18.96 13.97 19.21C13.97 19.43 14.12 19.68 14.53 19.6C17.71 18.53 20 15.54 20 12C20 7.58 16.42 4 12 4Z" fill="#FFFFFF" />
        </svg>
      )
    case 'vite':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path d="M20.8 4.2L12.5 19.5C12.3 19.9 11.7 19.9 11.5 19.5L3.2 4.2C3 3.8 3.3 3.3 3.8 3.4L12 5.1L20.2 3.4C20.7 3.3 21 3.8 20.8 4.2Z" fill="#646CFF" />
          <path d="M14.5 3.5L10 12.5H13.2L10.5 19L17.5 9.5H13.5L15.8 3.5H14.5Z" fill="#FFD62E" />
        </svg>
      )
    case 'netlify':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="4" fill="#00C7B7" />
          <path d="M12 4L4 12L12 20L20 12L12 4ZM12 7.5L16.5 12L12 16.5L7.5 12L12 7.5Z" fill="#FFFFFF" />
        </svg>
      )
    case 'vercel':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="4" fill="#000000" />
          <path d="M12 5L19 18H5L12 5Z" fill="#FFFFFF" />
        </svg>
      )
    case 'render':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="4" fill="#18181B" />
          <path d="M7 6.5C7 5.7 7.7 5 8.5 5H13C15.8 5 18 7.2 18 10C18 12.8 15.8 15 13 15H10V19H7V6.5ZM10 8V12H13C14.1 12 15 11.1 15 10C15 8.9 14.1 8 13 8H10Z" fill="#46E3B7" />
        </svg>
      )
    case 'linux':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" fill="#FCC624" />
          <ellipse cx="12" cy="12.5" rx="5.5" ry="7" fill="#000000" />
          <ellipse cx="12" cy="13.5" rx="4.2" ry="5.5" fill="#FFFFFF" />
          <circle cx="10.5" cy="8.5" r="0.9" fill="#000000" />
          <circle cx="13.5" cy="8.5" r="0.9" fill="#000000" />
          <polygon points="12,9.8 10.2,11.2 13.8,11.2" fill="#FFA500" />
          <ellipse cx="9" cy="18.5" rx="2" ry="0.8" fill="#FFA500" />
          <ellipse cx="15" cy="18.5" rx="2" ry="0.8" fill="#FFA500" />
        </svg>
      )
    case 'windows server':
    case 'windows':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path d="M3 5.5L10.5 4.5V11.2H3V5.5ZM11.8 4.3L21 3V11.2H11.8V4.3ZM3 12.8H10.5V19.5L3 18.5V12.8ZM11.8 12.8H21V21L11.8 19.7V12.8Z" fill="#0078D7" />
        </svg>
      )
    case 'active directory':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="4" fill="#0078D4" />
          <circle cx="12" cy="7" r="2.5" fill="#FFFFFF" />
          <path d="M12 9.5V14M7 14H17M7 14V16.5M17 14V16.5" stroke="#FFFFFF" strokeWidth="1.5" />
          <rect x="5.5" y="16.5" width="3" height="3" rx="0.5" fill="#FFFFFF" />
          <rect x="15.5" y="16.5" width="3" height="3" rx="0.5" fill="#FFFFFF" />
        </svg>
      )
    case 'networking':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="4" fill="#2563EB" />
          <circle cx="6" cy="12" r="2.2" stroke="#FFFFFF" strokeWidth="1.5" />
          <circle cx="18" cy="7" r="2.2" stroke="#FFFFFF" strokeWidth="1.5" />
          <circle cx="18" cy="17" r="2.2" stroke="#FFFFFF" strokeWidth="1.5" />
          <path d="M8.2 12H12M12 12V7H15.8M12 12V17H15.8" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )
    case 'servicenow':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="4" fill="#293E40" />
          <path d="M12 5C8.1 5 5 8.1 5 12C5 15.9 8.1 19 12 19C15.9 19 19 15.9 19 12C19 8.1 15.9 5 12 5ZM12 7.5C14.5 7.5 16.5 9.5 16.5 12C16.5 14.5 14.5 16.5 12 16.5C9.5 16.5 7.5 14.5 7.5 12C7.5 9.5 9.5 7.5 12 7.5Z" fill="#81B5A1" />
          <circle cx="12" cy="12" r="2" fill="#81B5A1" />
        </svg>
      )
    case 'okta':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="9" stroke="#007DC1" strokeWidth="3.5" fill="none" />
        </svg>
      )
    case 'microsoft 365':
    case 'm365':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="4" fill="#EA3E23" />
          <path d="M6 7H11V12H6V7ZM13 7H18V12H13V7ZM6 14H11V19H6V14ZM13 14H18V19H13V14Z" fill="#FFFFFF" />
        </svg>
      )
    case 'technical troubleshooting':
    case 'troubleshooting':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="4" fill="#059669" />
          <path d="M14.7 6.3C13.2 4.8 10.8 4.8 9.3 6.3C8.6 7 8.2 7.9 8.2 8.8C8.2 9.5 8.4 10.1 8.8 10.6L5.5 13.9C4.8 14.6 4.8 15.7 5.5 16.4L7.6 18.5C8.3 19.2 9.4 19.2 10.1 18.5L13.4 15.2C13.9 15.6 14.5 15.8 15.2 15.8C16.1 15.8 17 15.4 17.7 14.7C19.2 13.2 19.2 10.8 17.7 9.3L15.6 11.4L12.6 8.4L14.7 6.3Z" fill="#FFFFFF" />
        </svg>
      )
    case 'chart.js':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="4" fill="#FF6384" />
          <path d="M7 16V14M11 16V10M15 16V12M19 16V7" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )
    case 'google gemini api':
    case 'gemini ai':
    case 'gemini':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="4" fill="#1A73E8" />
          <path d="M12 4C12 8.4 8.4 12 4 12C8.4 12 12 15.6 12 20C12 15.6 15.6 12 20 12C15.6 12 12 8.4 12 4Z" fill="#FFFFFF" />
        </svg>
      )
    case 'jwt':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="4" fill="#000000" />
          <path d="M7 9H17M7 12H15M7 15H12" stroke="#D63AFF" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )
    case 'cloudinary':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="4" fill="#3448C5" />
          <path d="M8 15C6.9 15 6 14.1 6 13C6 11.9 6.8 11.1 7.9 11C8.3 9.3 9.8 8 11.5 8C13.5 8 15.1 9.6 15.1 11.5C15.9 11.7 16.5 12.3 16.5 13.1C16.5 14.1 15.7 15 14.7 15H8Z" fill="#FFFFFF" />
        </svg>
      )
    case 'cheerio':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="4" fill="#E88C1F" />
          <circle cx="12" cy="12" r="5" stroke="#FFFFFF" strokeWidth="2.5" />
        </svg>
      )
    case 'zod':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="4" fill="#3068B7" />
          <path d="M7 8H17L8 16H17" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    case 'prisma':
    case 'prisma orm':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="4" fill="#2D3748" />
          <path d="M12 4L5 19H19L12 4Z" stroke="#FFFFFF" strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M12 4V19" stroke="#38B2AC" strokeWidth="1.6" />
        </svg>
      )
    case 'tensorflow':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="4" fill="#FF6F00" />
          <path d="M12 4L6 8V12L12 8.5V4ZM12 8.5L18 12V8L12 4V8.5ZM12 13.5L7 16.5V19.5L12 16.5V13.5ZM12 13.5L17 16.5V19.5L12 16.5V13.5Z" fill="#FFFFFF" />
        </svg>
      )
    case 'keras':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="4" fill="#D00000" />
          <path d="M8 6V18M8 12L15 6M10.5 10L16 18" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    case 'opencv':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="4" fill="#FFFFFF" stroke="#E2E8F0" />
          <circle cx="12" cy="8" r="3" fill="#EE2A24" />
          <circle cx="8" cy="15" r="3" fill="#009A44" />
          <circle cx="16" cy="15" r="3" fill="#0072BC" />
        </svg>
      )
    case 'pyqt5':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="4" fill="#41CD52" />
          <path d="M10 8C8.5 8 7 9.5 7 12C7 14.5 8.5 16 10 16C10.8 16 11.5 15.6 12 15L14 17C13 18 11.5 18.5 10 18.5C6.5 18.5 4.5 15.5 4.5 12C4.5 8.5 6.5 5.5 10 5.5C11.5 5.5 13 6 14 7L12 9C11.5 8.4 10.8 8 10 8Z" fill="#FFFFFF" />
          <path d="M16 9H18.5V15H16V9Z" fill="#FFFFFF" />
        </svg>
      )
    case 'capgemini':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="4" fill="#0070AD" />
          <path d="M12 4C8.5 7.5 7 11 7 13.5C7 15.8 8.8 17.5 11 17.5C11.5 17.5 11.8 17.2 11.5 18.5C11.3 19.3 11 20 10.5 20.5H13.5C13 20 12.7 19.3 12.5 18.5C12.2 17.2 12.5 17.5 13 17.5C15.2 17.5 17 15.8 17 13.5C17 11 15.5 7.5 12 4Z" fill="#FFFFFF" />
        </svg>
      )
    case 'vpn':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="4" fill="#0284C7" />
          <path d="M12 5C9 5 6.5 7 6.5 10V12H6C5.4 12 5 12.4 5 13V18C5 18.6 5.4 19 6 19H18C18.6 19 19 18.6 19 18V13C19 12.4 18.6 12 18 12H17.5V10C17.5 7 15 5 12 5ZM12 7C13.8 7 15.5 8.2 15.5 10V12H8.5V10C8.5 8.2 10.2 7 12 7ZM12 14.5C12.8 14.5 13.5 15.2 13.5 16C13.5 16.8 12.8 17.5 12 17.5C11.2 17.5 10.5 16.8 10.5 16C10.5 15.2 11.2 14.5 12 14.5Z" fill="#FFFFFF" />
        </svg>
      )
    case 'dns & dhcp':
    case 'dns':
    case 'dhcp':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="4" fill="#0D9488" />
          <rect x="5" y="6" width="14" height="4" rx="1" stroke="#FFFFFF" strokeWidth="1.5" />
          <rect x="5" y="14" width="14" height="4" rx="1" stroke="#FFFFFF" strokeWidth="1.5" />
          <circle cx="8" cy="8" r="1" fill="#FFFFFF" />
          <circle cx="8" cy="16" r="1" fill="#FFFFFF" />
        </svg>
      )
    case 'group policy':
    case 'gpo':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="4" fill="#4F46E5" />
          <path d="M9 12L11 14L15 10M12 4L4 7V12C4 16.5 7.5 20 12 21C16.5 20 20 16.5 20 12V7L12 4Z" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    case 'iis':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="4" fill="#0078D7" />
          <path d="M6 7V17M10 7V17M14 7V17M18 7C18 10 16 12 14 12C16 12 18 14 18 17" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      )
    default:
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="12" cy="12" r="9" strokeWidth="2" />
        </svg>
      )
  }
}
