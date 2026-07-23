import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, Calendar, Clock, User, Stethoscope, Download, Home, Share2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const stepVariants = {
  initial: { opacity: 0, scale: 0.96 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.45, ease: 'easeOut' } },
  exit:    { opacity: 0, transition: { duration: 0.2 } },
}

export default function Step5_Confirmation({ booking }) {
  const navigate  = useNavigate()
  const bookingId = booking.serverResponse?.bookingId || `NCT-TEMP-${Math.floor(1000 + Math.random() * 8999)}`

  const rows = [
    { icon: User,        label: 'Patient',    value: booking.patient?.name },
    { icon: Stethoscope, label: 'Doctor',     value: booking.doctor?.name },
    { icon: Stethoscope, label: 'Specialty',  value: booking.doctor?.specialty },
    { icon: Calendar,    label: 'Date',       value: booking.date?.toDateString() },
    { icon: Clock,       label: 'Time',       value: booking.time },
  ]
  if (booking.condition) {
    rows.splice(2, 0, { icon: Stethoscope, label: 'Condition', value: booking.condition })
  }

  return (
    <motion.div
      variants={stepVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="text-center"
    >
      {/* Success Animation */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 16, delay: 0.1 }}
        className="w-24 h-24 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-6"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, delay: 0.3 }}
        >
          <CheckCircle size={48} className="text-teal-600" strokeWidth={1.5} />
        </motion.div>
      </motion.div>

      <h2 className="text-3xl font-extrabold text-navy mb-2">Appointment Confirmed!</h2>
      <p className="text-text-muted mb-2">
        Your appointment has been successfully booked. A confirmation email has been sent to{' '}
        <strong className="text-navy">{booking.patient?.email}</strong>.
      </p>

      {/* Booking ID badge */}
      <div className="inline-flex items-center gap-2 bg-teal-50 border border-teal-100 text-teal-700 text-sm font-bold px-5 py-2 rounded-full mb-8">
        Booking ID: <span className="font-extrabold tracking-wider">{bookingId}</span>
      </div>

      {/* Summary card */}
      <div className="bg-surface-gray rounded-2xl border border-gray-100 p-6 mb-8 text-left">
        <p className="text-xs font-bold uppercase tracking-wide text-text-muted mb-5">Appointment Details</p>
        <div className="space-y-4">
          {rows.map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center gap-4">
              <div className="w-9 h-9 bg-white rounded-xl border border-gray-100 flex items-center justify-center shrink-0 shadow-sm">
                <Icon size={15} className="text-teal-600" />
              </div>
              <div>
                <p className="text-xs text-text-muted font-medium">{label}</p>
                <p className="text-sm font-bold text-navy">{value || '—'}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Doctor photo strip */}
        {booking.doctor && (
          <div className="flex items-center gap-3 mt-6 pt-5 border-t border-gray-100">
            <img
              src={booking.doctor.image}
              alt={booking.doctor.name}
              className="w-12 h-12 rounded-xl object-cover object-top"
            />
            <div>
              <p className="font-bold text-navy text-sm">{booking.doctor.name}</p>
              <p className="text-xs text-text-muted">{booking.doctor.education}</p>
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap justify-center gap-3">
        <button
          onClick={() => {
            alert(`Calendar event for ${booking.time} on ${booking.date?.toDateString()} added (simulated).`)
          }}
          className="btn-secondary text-sm py-2.5 px-6"
        >
          <Calendar size={15} />
          Add to Calendar
        </button>
        <button
          onClick={() => {
            navigator.share?.({
              title: 'NovaCare Appointment',
              text: `My appointment with ${booking.doctor?.name} on ${booking.date?.toDateString()} at ${booking.time}`,
            }).catch(() => {})
          }}
          className="btn-secondary text-sm py-2.5 px-6"
        >
          <Share2 size={15} />
          Share Details
        </button>
        <button
          onClick={() => navigate('/')}
          className="btn-primary text-sm py-2.5 px-6"
        >
          <Home size={15} />
          Back to Home
        </button>
      </div>

      <p className="mt-8 text-xs text-text-muted">
        Need to cancel or reschedule? Call us at{' '}
        <a href="tel:+15552345678" className="text-teal-600 font-semibold hover:underline">
          +1 (555) 234-5678
        </a>{' '}
        at least 24 hours before your appointment.
      </p>
    </motion.div>
  )
}
