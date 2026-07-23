import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Calendar, Phone, ArrowRight } from 'lucide-react'

export default function AppointmentCTA() {
  const navigate = useNavigate()
  return (
    <section className="section-padding bg-white">
      <div className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.65 }}
          className="relative bg-gradient-teal rounded-3xl overflow-hidden px-8 py-16 md:px-16 text-center"
        >
          {/* Subtle background texture */}
          <div className="absolute inset-0 opacity-10">
            <svg width="100%" height="100%" viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice">
              <defs>
                <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1.5" fill="white" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#dots)" />
            </svg>
          </div>

          <div className="relative z-10">
            <span className="inline-block bg-white/20 text-white text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full mb-6">
              Schedule a Visit
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-5">
              Ready to Take the<br className="hidden md:block" /> First Step Towards Better Health?
            </h2>
            <p className="text-white/75 text-lg leading-relaxed max-w-xl mx-auto mb-10">
              Booking an appointment takes less than 2 minutes. Our care coordinators are available Monday–Saturday, 8 AM–7 PM.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => navigate('/appointments')}
                className="bg-white text-teal-700 px-9 py-4 rounded-full font-bold text-base shadow-lg hover:shadow-xl hover:bg-teal-50 transition-all duration-200 inline-flex items-center gap-2"
              >
                <Calendar size={18} />
                Book Online — It's Free
                <ArrowRight size={16} />
              </button>
              <a
                href="tel:+15552345678"
                className="border-2 border-white text-white px-9 py-4 rounded-full font-bold text-base hover:bg-white/10 transition-all duration-200 inline-flex items-center gap-2"
              >
                <Phone size={18} />
                Call +1 (555) 234-5678
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
