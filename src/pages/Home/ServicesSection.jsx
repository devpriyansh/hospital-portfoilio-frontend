import { motion } from 'framer-motion'
import {
  Heart, Bone, Brain, Baby, Microscope, Stethoscope, Eye, Wind, ChevronRight, Loader2
} from 'lucide-react'
import SectionHeading from '../../components/ui/SectionHeading'
import { useNavigate } from 'react-router-dom'
import { api } from '../../services/api'
import { useApi } from '../../hooks/useApi'

const ICON_MAP = { Heart, Bone, Brain, Baby, Microscope, Stethoscope, Eye, Wind }

const COLORS = [
  'bg-red-50 text-red-500',
  'bg-blue-50 text-blue-500',
  'bg-purple-50 text-purple-500',
  'bg-yellow-50 text-yellow-600',
  'bg-pink-50 text-pink-500',
  'bg-teal-50 text-teal-600',
  'bg-indigo-50 text-indigo-500',
  'bg-orange-50 text-orange-500',
]

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}
const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
}

export default function ServicesSection() {
  const navigate = useNavigate()
  const { data: services, loading, error } = useApi(api.getServices)

  return (
    <section id="services" className="section-padding bg-surface-gray">
      <div className="container-main">
        <SectionHeading
          label="What We Treat"
          title="Comprehensive Care, Every Specialty"
          subtitle="From routine check-ups to complex interventional procedures, our specialists are equipped to handle every aspect of your health journey."
          center
        />

        {loading && (
          <div className="flex justify-center items-center py-20 text-teal-600">
            <Loader2 className="animate-spin mr-2" size={32} />
            <span className="text-lg font-medium">Loading services...</span>
          </div>
        )}

        {error && (
          <div className="text-center py-20 text-red-500 font-medium">
            Failed to load services: {error}
          </div>
        )}

        {!loading && !error && services && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-14"
          >
            {services.map((service, index) => {
              const Icon = ICON_MAP[service.iconName] || Stethoscope
              const colorClass = COLORS[index % COLORS.length]
              return (
                <motion.div
                  key={service.id}
                  variants={cardVariants}
                  whileHover={{ y: -6, transition: { duration: 0.25 } }}
                  className="card p-7 flex flex-col gap-4 group cursor-pointer"
                  onClick={() => navigate('/appointments')}
                >
                  {/* Icon */}
                  <div className={`w-13 h-13 rounded-2xl flex items-center justify-center w-14 h-14 ${colorClass} group-hover:scale-110 transition-transform duration-300`}>
                    <Icon size={24} strokeWidth={1.75} />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="font-bold text-navy text-lg mb-2 group-hover:text-teal-600 transition-colors">
                      {service.name}
                    </h3>
                    <p className="text-text-muted text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* Link */}
                  <div className="flex items-center gap-1 text-teal-600 text-sm font-semibold group-hover:gap-2 transition-all duration-200">
                    Learn more <ChevronRight size={14} />
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        )}
      </div>
    </section>
  )
}
