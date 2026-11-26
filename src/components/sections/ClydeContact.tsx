import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Send, 
  Check, 
  Copy, 
  ExternalLink, 
  MapPin, 
  AlertCircle, 
  Loader2,
  Sparkles,
  RotateCcw
} from 'lucide-react'
import emailjs from '@emailjs/browser'
import { MinionMailman } from '../ui/MinionMailman'

interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  subject?: string
  message?: string
}

export const ClydeContact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [copiedEmail, setCopiedEmail] = useState(false)
  const [isDelivering, setIsDelivering] = useState(false)

  // Copy Email Handler
  const handleCopyEmail = () => {
    navigator.clipboard.writeText('infantrojar@gmail.com')
    setCopiedEmail(true)
    setTimeout(() => setCopiedEmail(false), 2200)
  }

  // Client-side Validation
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your name.'
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email address.'
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.'
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Please enter a subject.'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please enter your message.'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long.'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle Form Change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear specific error on change
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  // Handle Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setStatus('loading')
    setErrorMessage('')

    const emailjsServiceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
    const emailjsTemplateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
    const emailjsPublicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    const formspreeId = import.meta.env.VITE_FORMSPREE_ID

    try {
      if (emailjsServiceId && emailjsTemplateId && emailjsPublicKey) {
        // Send via EmailJS
        await emailjs.send(
          emailjsServiceId,
          emailjsTemplateId,
          {
            from_name: formData.name,
            from_email: formData.email,
            subject: formData.subject,
            message: formData.message,
            to_email: 'infantrojar@gmail.com'
          },
          emailjsPublicKey
        )
      } else if (formspreeId) {
        // Send via Formspree
        const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(formData)
        })
        if (!response.ok) throw new Error('Failed to submit message to Formspree')
      } else {
        // In local Vite dev mode, Netlify form handler is not running locally
        if (import.meta.env.DEV) {
          await new Promise(resolve => setTimeout(resolve, 800))
        } else {
          // Primary: Native Netlify Forms transmission (URL-encoded POST)
          const formElement = e.currentTarget as HTMLFormElement
          const payload = new FormData(formElement)

          // Ensure form-name and honeypot field are included in the payload
          if (!payload.get('form-name')) {
            payload.set('form-name', 'contact')
          }
          if (!payload.has('bot-field')) {
            payload.set('bot-field', '')
          }
          payload.set('name', formData.name)
          payload.set('email', formData.email)
          payload.set('subject', formData.subject)
          payload.set('message', formData.message)

          const encodedBody = new URLSearchParams(payload as any).toString()

          const response = await fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: encodedBody
          })

          if (!response.ok) {
            throw new Error(`Netlify form submission failed with HTTP ${response.status}`)
          }
        }
      }

      // Success state & trigger 3D robot delivery animation
      setStatus('success')
      setIsDelivering(true)
    } catch (err) {
      console.error('Contact form transmission error:', err)
      setStatus('error')
      setErrorMessage(
        'Unable to send message directly. Please try again or reach out to infantrojar@gmail.com.'
      )
    }
  }

  // Reset form
  const handleReset = () => {
    setFormData({ name: '', email: '', subject: '', message: '' })
    setErrors({})
    setStatus('idle')
    setIsDelivering(false)
  }

  return (
    <section id="contact" className="py-20 sm:py-28 bg-[#fafaf9]/60 relative overflow-hidden scroll-mt-16 sm:scroll-mt-20">
      
      {/* Background Decorative Grid */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.25]"
        style={{
          backgroundImage: 'radial-gradient(circle, #cbd5e1 1px, transparent 1px)',
          backgroundSize: '28px 28px'
        }}
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 relative z-10">
        
        {/* Section Header (Consistent Clyde Style) */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
          <span className="text-[12px] font-bold tracking-[0.2em] text-[#a1a480] uppercase block mb-3">
            GET IN TOUCH
          </span>
          <h2 className="text-[34px] sm:text-[42px] font-black text-gray-900 tracking-tight leading-tight">
            Let&apos;s Connect
          </h2>
          <p className="text-[14px] sm:text-[15px] text-gray-600 mt-3 font-normal leading-relaxed">
            Have a project in mind, an opportunity, or just want to say hi? My inbox is always open.
          </p>
        </div>

        {/* Main Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* ======================================================== */}
          {/* LEFT COLUMN: 3D MESSENGER BOT + QUICK INFO              */}
          {/* ======================================================== */}
          <div className="lg:col-span-5 flex flex-col justify-between rounded-3xl bg-white border border-gray-200/80 p-6 sm:p-7 shadow-xs hover:shadow-md transition-shadow">
            
            {/* Top Bar: Availability Badge */}
            <div className="flex items-center justify-between mb-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/70 shadow-2xs">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="text-[11.5px] font-bold text-emerald-900 tracking-wide">
                  Open to Work · Immediate Joiner
                </span>
              </div>
              
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-gray-500">
                <Sparkles className="w-3.5 h-3.5 text-[#a1a480]" />
                <span>Minion Mailman</span>
              </div>
            </div>

            {/* Minion Mailman Viewport */}
            <div className="w-full flex-1 flex flex-col items-center justify-center relative py-1">
              <MinionMailman isDelivering={isDelivering} />
            </div>

            {/* Bottom Contact Details */}
            <div className="pt-4 border-t border-gray-100 flex flex-col gap-2.5 mt-2">
              
              {/* Email Pill Card */}
              <div className="p-3 rounded-2xl bg-gray-50/80 border border-gray-200/60 flex items-center justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block">
                    Direct Email
                  </span>
                  <span className="text-[13px] font-semibold text-gray-900 truncate block">
                    infantrojar@gmail.com
                  </span>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  {/* Copy Button */}
                  <button
                    onClick={handleCopyEmail}
                    className="p-2 rounded-xl bg-white border border-gray-200 hover:border-[#a1a480] text-gray-600 hover:text-gray-900 shadow-2xs transition-all cursor-pointer"
                    title="Copy Email"
                    aria-label="Copy Email"
                  >
                    {copiedEmail ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>

                  {/* Gmail Direct Link */}
                  <a
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=infantrojar@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-[#a1a480] hover:bg-[#8f926e] text-white shadow-2xs transition-all cursor-pointer"
                    title="Open Gmail Composer"
                    aria-label="Open Gmail Composer"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Location & Social Row */}
              <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-3 pt-1">
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-4 h-4 text-[#a1a480] shrink-0" />
                  <span className="text-[12.5px] font-medium text-gray-700">
                    Coimbatore, Tamil Nadu, India
                  </span>
                </div>

                {/* Social Connect Icons */}
                <div className="flex items-center gap-2 shrink-0">
                  {/* GitHub */}
                  <motion.a
                    href="https://github.com/Infant22"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub Profile"
                    whileHover={{ y: -2, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-8 h-8 rounded-xl bg-gray-100 hover:bg-[#181717] text-gray-700 hover:text-white flex items-center justify-center transition-colors shadow-2xs"
                    title="GitHub"
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                    </svg>
                  </motion.a>

                  {/* LinkedIn */}
                  <motion.a
                    href="https://linkedin.com/in/infant-rojar"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn Profile"
                    whileHover={{ y: -2, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-8 h-8 rounded-xl bg-gray-100 hover:bg-[#0077b5] text-gray-700 hover:text-white flex items-center justify-center transition-colors shadow-2xs"
                    title="LinkedIn"
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9h2.79v8.37H6.46v-8.37M7.86 6.34a1.59 1.59 0 1 0 0 3.18 1.59 1.59 0 0 0 0-3.18z" />
                    </svg>
                  </motion.a>
                </div>
              </div>

            </div>

          </div>

          {/* ======================================================== */}
          {/* RIGHT COLUMN: REFINED INTERACTIVE CONTACT FORM           */}
          {/* ======================================================== */}
          <div className="lg:col-span-7 flex flex-col justify-between rounded-3xl bg-white border border-gray-200/80 p-6 sm:p-7 shadow-xs hover:shadow-md transition-shadow relative">
            
            <div className="flex flex-col h-full justify-between">
              <div>
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
                  <div>
                    <h3 className="text-[19px] sm:text-[21px] font-bold text-gray-900 tracking-tight">
                      Send a Message
                    </h3>
                    <p className="text-[12.5px] text-gray-500 mt-0.5">
                      Fill out the form below and the Minion Mailman will deliver it to my inbox.
                    </p>
                  </div>

                  <div className="w-9 h-9 rounded-xl bg-gray-50 border border-gray-200/80 flex items-center justify-center text-[#a1a480] shrink-0">
                    <Send className="w-3.5 h-3.5" />
                  </div>
                </div>

              {/* Form State Banners */}
              <AnimatePresence mode="wait">
                {status === 'success' && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 mb-6 flex flex-col gap-3"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                        <Check className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-[14px] font-bold text-emerald-950">
                          Message Dispatched Successfully!
                        </h4>
                        <p className="text-[12.5px] text-emerald-800 leading-relaxed mt-0.5">
                          Thank you for reaching out! The Minion Mailman has taken your letter and I will get back to you promptly.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 pt-2 border-t border-emerald-200/60">
                      <button
                        onClick={handleReset}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[12px] font-semibold transition-colors cursor-pointer"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>Send Another Message</span>
                      </button>
                    </div>
                  </motion.div>
                )}

                {status === 'error' && (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-950 mb-6 flex items-start gap-3"
                  >
                    <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                    <div className="min-w-0 flex-1">
                      <h4 className="text-[13.5px] font-bold text-rose-950">
                        Dispatch Notice
                      </h4>
                      <p className="text-[12px] text-rose-800 leading-snug mt-0.5">
                        {errorMessage}
                      </p>
                      <a
                        href={`https://mail.google.com/mail/?view=cm&fs=1&to=infantrojar@gmail.com&su=${encodeURIComponent(
                          formData.subject || 'Portfolio Inquiry'
                        )}&body=${encodeURIComponent(formData.message || '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11.5px] font-bold text-rose-900 underline mt-2 hover:text-rose-950"
                      >
                        <span>Open message in Gmail client directly</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Actual Form (Shown when not in success mode) */}
              {status !== 'success' && (
                <form 
                  name="contact" 
                  method="POST" 
                  data-netlify="true" 
                  data-netlify-honeypot="bot-field" 
                  onSubmit={handleSubmit} 
                  className="space-y-3"
                >
                  {/* Hidden field for Netlify Forms identification & spam protection */}
                  <input type="hidden" name="form-name" value="contact" />
                  <p className="hidden" aria-hidden="true">
                    <label>
                      Don&apos;t fill this out: <input name="bot-field" onChange={handleChange} />
                    </label>
                  </p>
                  
                  {/* Name and Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label 
                        htmlFor="name" 
                        className="block text-[11.5px] font-bold uppercase tracking-wider text-gray-700 mb-1"
                      >
                        Your Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Alex Morgan"
                        disabled={status === 'loading'}
                        className={`w-full px-3 py-2.5 sm:py-2 rounded-xl bg-gray-50/70 border text-[16px] sm:text-[13px] text-gray-900 placeholder:text-gray-400 focus:bg-white focus:outline-none transition-all ${
                          errors.name 
                            ? 'border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-100' 
                            : 'border-gray-200 focus:border-[#a1a480] focus:ring-2 focus:ring-[#a1a480]/20'
                        }`}
                      />
                      {errors.name && (
                        <p className="text-[10.5px] text-rose-600 font-medium mt-0.5">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label 
                        htmlFor="email" 
                        className="block text-[11.5px] font-bold uppercase tracking-wider text-gray-700 mb-1"
                      >
                        Your Email <span className="text-rose-500">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="e.g. alex@example.com"
                        disabled={status === 'loading'}
                        className={`w-full px-3 py-2.5 sm:py-2 rounded-xl bg-gray-50/70 border text-[16px] sm:text-[13px] text-gray-900 placeholder:text-gray-400 focus:bg-white focus:outline-none transition-all ${
                          errors.email 
                            ? 'border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-100' 
                            : 'border-gray-200 focus:border-[#a1a480] focus:ring-2 focus:ring-[#a1a480]/20'
                        }`}
                      />
                      {errors.email && (
                        <p className="text-[10.5px] text-rose-600 font-medium mt-0.5">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label 
                      htmlFor="subject" 
                      className="block text-[11.5px] font-bold uppercase tracking-wider text-gray-700 mb-1"
                    >
                      Subject <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="subject"
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="e.g. Opportunity / Project Discussion"
                      disabled={status === 'loading'}
                      className={`w-full px-3 py-2.5 sm:py-2 rounded-xl bg-gray-50/70 border text-[16px] sm:text-[13px] text-gray-900 placeholder:text-gray-400 focus:bg-white focus:outline-none transition-all ${
                        errors.subject 
                          ? 'border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-100' 
                          : 'border-gray-200 focus:border-[#a1a480] focus:ring-2 focus:ring-[#a1a480]/20'
                      }`}
                    />
                    {errors.subject && (
                      <p className="text-[10.5px] text-rose-600 font-medium mt-0.5">
                        {errors.subject}
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label 
                      htmlFor="message" 
                      className="block text-[11.5px] font-bold uppercase tracking-wider text-gray-700 mb-1"
                    >
                      Message <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={3}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Hi Infant, I came across your portfolio and wanted to discuss..."
                      disabled={status === 'loading'}
                      className={`w-full px-3 py-2.5 sm:py-2 rounded-xl bg-gray-50/70 border text-[16px] sm:text-[13px] text-gray-900 placeholder:text-gray-400 focus:bg-white focus:outline-none transition-all resize-none ${
                        errors.message 
                          ? 'border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-100' 
                          : 'border-gray-200 focus:border-[#a1a480] focus:ring-2 focus:ring-[#a1a480]/20'
                      }`}
                    />
                    {errors.message && (
                      <p className="text-[10.5px] text-rose-600 font-medium mt-0.5">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-1.5">
                    <motion.button
                      type="submit"
                      disabled={status === 'loading'}
                      whileHover={{ scale: status === 'loading' ? 1 : 1.01 }}
                      whileTap={{ scale: status === 'loading' ? 1 : 0.99 }}
                      className={`w-full py-2.5 px-5 rounded-xl font-bold text-[13px] tracking-wide text-white transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer ${
                        status === 'loading'
                          ? 'bg-[#a1a480]/70 cursor-not-allowed'
                          : 'bg-[#a1a480] hover:bg-[#8f926e] hover:shadow-md'
                      }`}
                    >
                      {status === 'loading' ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>Dispatching Letter...</span>
                        </>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <Send className="w-3 h-3" />
                        </>
                      )}
                    </motion.button>
                  </div>

                </form>
              )}
            </div>
          </div>

          </div>

        </div>

      </div>

    </section>
  )
}
