import { motion } from 'framer-motion'
import { Star, Clock, ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function DoctorCard({ doctor, compact = false, onBook, selected = false }) {
  const navigate = useNavigate()

  const handleBook = () => {
    if (onBook) {
      onBook(doctor)
    } else {
      navigate('/appointments', { state: { doctor } })
    }
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -4 }}
      className={`card overflow-hidden cursor-pointer group ${
        selected ? 'ring-2 ring-teal-600 shadow-card-hover' : ''
      }`}
      onClick={onBook ? () => onBook(doctor) : undefined}
    >
      {/* Doctor Photo */}
      <div className="relative overflow-hidden">
        <img
          src={doctor.photoUrl || doctor.image}
          alt={`${doctor.name}, ${doctor.specialty}`}
          className={`w-full object-cover object-top group-hover:scale-105 transition-transform duration-500 ${
            compact ? 'h-52' : 'h-64'
          }`}
          loading="lazy"
        />
        {/* Availability badge */}
        <div className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-bold ${
          doctor.availableToday
            ? 'bg-success/90 text-white'
            : 'bg-navy/70 text-white'
        }`}>
          {doctor.availableToday ? 'Available Today' : 'Next Week'}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-1">
          <div>
            <h3 className="font-bold text-navy text-lg leading-tight">{doctor.name}</h3>
            <p className="text-teal-600 text-sm font-semibold mt-0.5">{doctor.specialty}</p>
          </div>
        </div>

        {/* Rating & Experience */}
        <div className="flex items-center gap-3 mt-3 mb-4">
          <div className="flex items-center gap-1">
            <Star size={14} className="text-gold fill-gold" />
            <span className="text-sm font-bold text-navy">{doctor.rating}</span>
            <span className="text-xs text-text-muted">({doctor.reviewsCount || doctor.reviews})</span>
          </div>
          <span className="text-text-muted text-xs">•</span>
          <span className="text-xs text-text-muted">{doctor.yearsOfExperience || doctor.experience} yrs experience</span>
        </div>

        {/* Next available */}
        <div className="flex items-center gap-2 text-xs text-text-muted mb-4 bg-surface-gray rounded-lg px-3 py-2">
          <Clock size={12} className="text-teal-600 shrink-0" />
          <span>Next available: <strong className="text-navy">{doctor.nextAvailable}</strong></span>
        </div>

        {/* Book button */}
        <button
          onClick={(e) => { e.stopPropagation(); handleBook() }}
          className="w-full btn-primary justify-center py-2.5 text-sm"
        >
          Book Appointment
          <ChevronRight size={14} />
        </button>
      </div>
    </motion.article>
  )
}
