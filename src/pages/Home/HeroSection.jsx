import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Calendar, Users, ArrowDown, Shield, Activity } from 'lucide-react'

export default function HeroSection() {
  const navigate = useNavigate()

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      aria-label="Hero section"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=1600&q=85"
          alt="NovaCare medical team"
          className="w-full h-full object-cover object-center"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy-dark/92 via-navy/80 to-teal-900/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-main pt-24 pb-16 w-full">
        <div className="max-w-3xl">

          {/* Label badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-teal-500/20 border border-teal-400/30 text-teal-300 text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full mb-8"
          >
            <Activity size={12} className="animate-pulse" />
            Trusted Healthcare Since 1999
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl md:text-6xl font-extrabold text-white leading-[1.08] tracking-tight mb-6"
          >
            Your Health,<br />
            <span className="text-teal-400">Our Priority.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-white/70 text-lg md:text-xl leading-relaxed mb-10 max-w-xl"
          >
            NovaCare brings together 50+ board-certified specialists under one roof — delivering compassionate, evidence-based care that puts you first at every step.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            <button
              onClick={() => navigate('/appointments')}
              className="btn-primary text-base px-9 py-4 shadow-lg shadow-teal-900/40"
            >
              <Calendar size={18} />
              Book Appointment
            </button>
            <button
              onClick={() => navigate('/doctors')}
              className="border-2 border-white/40 text-white px-9 py-4 rounded-full font-semibold hover:bg-white/10 hover:border-white transition-all duration-200 inline-flex items-center gap-2 text-base"
            >
              <Users size={18} />
              Meet Our Doctors
            </button>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-wrap gap-6 mt-14"
          >
            {[
              { icon: Shield, text: 'JCI Accredited' },
              { icon: Users,  text: '20,000+ Patients Served' },
              { icon: Activity, text: '24/7 Emergency Care' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-teal-500/20 flex items-center justify-center">
                  <Icon size={13} className="text-teal-400" />
                </div>
                <span className="text-white/65 text-sm font-medium">{text}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Floating heartbeat card */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="hidden lg:block absolute right-12 top-1/2 -translate-y-1/2"
        >
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 w-64">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-500/20 rounded-xl flex items-center justify-center">
                <svg className="animate-heartbeat" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </div>
              <div>
                <p className="text-white/50 text-xs">Heart Rate</p>
                <p className="text-white font-bold text-lg">72 bpm</p>
              </div>
            </div>
            {/* ECG line SVG */}
            <svg viewBox="0 0 200 50" className="w-full" fill="none">
              <polyline
                points="0,30 30,30 40,10 50,45 60,5 70,40 80,30 200,30"
                stroke="#2dd4bf"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="text-teal-300 text-xs mt-2 font-medium">Normal sinus rhythm ✓</p>
          </div>

          {/* Next appointment card */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="mt-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 flex items-center gap-3"
          >
            <div className="w-10 h-10 bg-teal-500/20 rounded-xl flex items-center justify-center shrink-0">
              <Calendar size={16} className="text-teal-300" />
            </div>
            <div>
              <p className="text-white/50 text-xs">Next Available</p>
              <p className="text-white font-semibold text-sm">Today, 2:00 PM</p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-white/40"
        >
          <span className="text-xs tracking-widest uppercase font-medium">Scroll</span>
          <ArrowDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  )
}
