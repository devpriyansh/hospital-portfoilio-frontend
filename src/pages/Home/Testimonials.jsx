import TestimonialCard from '../../components/ui/TestimonialCard'
import SectionHeading from '../../components/ui/SectionHeading'
import { motion } from 'framer-motion'
import { api } from '../../services/api'
import { useApi } from '../../hooks/useApi'
import { Loader2 } from 'lucide-react'

export default function Testimonials() {
  const { data: testimonials, loading, error } = useApi(api.getTestimonials)

  return (
    <section className="section-padding bg-white">
      <div className="container-main">
        <SectionHeading
          label="Patient Stories"
          title="Real Experiences, Real Trust"
          subtitle="Thousands of patients choose NovaCare each year. Here's what some of them have shared about their journey with us."
          center
        />

        {loading && (
          <div className="flex justify-center items-center py-20 text-teal-600">
            <Loader2 className="animate-spin mr-2" size={32} />
            <span className="text-lg font-medium">Loading testimonials...</span>
          </div>
        )}

        {error && (
          <div className="text-center py-20 text-red-500 font-medium">
            Failed to load testimonials: {error}
          </div>
        )}

        {!loading && !error && testimonials && (
          <div className="grid md:grid-cols-2 gap-6 mt-14">
            {testimonials.map((t, i) => (
              <TestimonialCard key={t.id} testimonial={t} delay={i * 0.1} />
            ))}
          </div>
        )}

        {/* Review summary bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-14 bg-gradient-teal rounded-3xl p-8 flex flex-col md:flex-row items-center gap-6 text-center md:text-left"
        >
          <div className="flex-1">
            <p className="text-white/70 text-sm font-semibold uppercase tracking-wider mb-1">Overall Rating</p>
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="text-white text-5xl font-extrabold">4.9</span>
              <div>
                <div className="flex gap-1 mb-1">
                  {[1,2,3,4,5].map(i => (
                    <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#C69B3B" stroke="none">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                </div>
                <p className="text-white/60 text-xs">Based on 1,400+ reviews</p>
              </div>
            </div>
          </div>
          <div className="w-px h-16 bg-white/20 hidden md:block" />
          <div className="flex-1 grid grid-cols-3 gap-4">
            {[
              { label: 'Google',    score: '4.9' },
              { label: 'Healthgrades', score: '4.8' },
              { label: 'Zocdoc',   score: '4.9' },
            ].map(({ label, score }) => (
              <div key={label}>
                <p className="text-white font-extrabold text-2xl">{score}</p>
                <p className="text-white/60 text-xs">{label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
