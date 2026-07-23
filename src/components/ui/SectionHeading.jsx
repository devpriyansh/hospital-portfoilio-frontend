import { motion } from 'framer-motion'

/**
 * SectionHeading — consistent section label + h2 + subtitle pattern.
 * Usage: <SectionHeading label="Our Team" title="Meet Our Specialists" subtitle="..." center />
 */
export default function SectionHeading({ label, title, subtitle, center = false, light = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={center ? 'text-center' : ''}
    >
      {label && (
        <span className={`inline-block text-xs font-bold tracking-widest uppercase mb-3 px-3 py-1 rounded-full ${
          light
            ? 'bg-white/20 text-white'
            : 'bg-teal-50 text-teal-600'
        }`}>
          {label}
        </span>
      )}
      <h2 className={`text-3xl md:text-4xl font-bold tracking-tight leading-snug mb-4 ${
        light ? 'text-white' : 'text-navy'
      }`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`text-lg leading-relaxed max-w-2xl ${center ? 'mx-auto' : ''} ${
          light ? 'text-white/75' : 'text-text-muted'
        }`}>
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}
