import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'

export default function TestimonialCard({ testimonial, delay = 0 }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay }}
      className="card p-7 relative overflow-hidden"
    >
      {/* Decorative quotation mark */}
      <div className="absolute top-4 right-5 opacity-10">
        <Quote size={64} className="text-teal-600 fill-teal-600" />
      </div>

      {/* Stars */}
      <div className="flex gap-1 mb-4">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star key={i} size={14} className="text-gold fill-gold" />
        ))}
      </div>

      {/* Quote */}
      <blockquote className="text-text-primary leading-relaxed mb-6 text-[0.95rem] relative z-10">
        "{testimonial.quote}"
      </blockquote>

      {/* Author */}
      <div className="flex items-center gap-3">
        <img
          src={testimonial.avatarUrl || testimonial.avatar}
          alt={testimonial.patientName || testimonial.name}
          className="w-11 h-11 rounded-full object-cover ring-2 ring-teal-100"
          loading="lazy"
        />
        <div>
          <p className="font-bold text-navy text-sm">{testimonial.patientName || testimonial.name}</p>
          <p className="text-xs text-text-muted">{testimonial.city}</p>
        </div>
      </div>
    </motion.article>
  )
}
