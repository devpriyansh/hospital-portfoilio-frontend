import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Star, Clock, ArrowRight, ArrowLeft, CheckCircle, Loader2 } from 'lucide-react'
import { api } from '../../services/api'
import { useApi } from '../../hooks/useApi'

const stepVariants = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  exit:    { opacity: 0, x: -30, transition: { duration: 0.25 } },
}

export default function Step2_ChooseDoctor({ onNext, onPrev, booking, setBooking }) {
  const [deptFilter,  setDeptFilter]  = useState(booking.department || 'All')
  const [availFilter, setAvailFilter] = useState('all') // 'all' | 'today'

  const { data: doctorsData, loading: doctorsLoading } = useApi(api.getDoctors)
  const { data: servicesData, loading: servicesLoading } = useApi(api.getServices)

  const DEPARTMENTS = useMemo(() => {
    if (!servicesData) return ['All']
    return ['All', ...servicesData.map(s => s.name)]
  }, [servicesData])

  const filtered = useMemo(() => {
    let list = doctorsData || []
    if (deptFilter && deptFilter !== 'All') list = list.filter(d => d.specialty === deptFilter || (d.service && d.service.name === deptFilter))
    if (availFilter === 'today') list = list.filter(d => d.availableToday)
    return list
  }, [deptFilter, availFilter, doctorsData])

  const select = (doc) => setBooking(b => ({ ...b, doctor: doc }))

  return (
    <motion.div variants={stepVariants} initial="initial" animate="animate" exit="exit">
      <h2 className="text-2xl font-bold text-navy mb-2">Choose Your Doctor</h2>
      <p className="text-text-muted mb-6">
        {booking.condition
          ? <>Showing specialists for <strong className="text-teal-600">{booking.condition}</strong></>
          : 'Select a specialist to continue.'}
      </p>

      {/* Filter row */}
      <div className="flex flex-wrap gap-2 mb-8">
        {/* Department chips */}
        {DEPARTMENTS.map(dept => (
          <button
            key={dept}
            onClick={() => setDeptFilter(dept)}
            className={`tag transition-all duration-150 ${
              deptFilter === dept
                ? 'bg-teal-600 text-white border-teal-600'
                : 'bg-surface-gray text-text-muted border border-gray-100 hover:bg-teal-50 hover:text-teal-700'
            } border`}
          >
            {dept}
          </button>
        ))}
        <div className="ml-auto flex gap-2">
          <button
            onClick={() => setAvailFilter(availFilter === 'today' ? 'all' : 'today')}
            className={`tag border transition-all duration-150 ${
              availFilter === 'today'
                ? 'bg-success text-white border-success'
                : 'bg-surface-gray text-text-muted border-gray-100 hover:bg-green-50 hover:text-green-700'
            }`}
          >
            Available Today
          </button>
        </div>
      </div>

      {/* Doctor list */}
      {doctorsLoading || servicesLoading ? (
        <div className="flex justify-center items-center py-20 text-teal-600">
          <Loader2 className="animate-spin mr-2" size={32} />
          <span className="text-lg font-medium">Loading specialists...</span>
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 text-text-muted">
          <p className="font-semibold">No doctors found for these filters.</p>
          <button onClick={() => { setDeptFilter('All'); setAvailFilter('all') }} className="btn-ghost mt-3">Clear filters</button>
        </div>
      ) : (
        <div className="grid gap-4 max-h-[460px] overflow-y-auto pr-1">
          {filtered.map((doc) => {
            const isSelected = booking.doctor?.id === doc.id
            return (
              <motion.button
                key={doc.id}
                onClick={() => select(doc)}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.15 }}
                className={`flex items-center gap-4 p-4 rounded-2xl border-2 text-left w-full transition-all duration-200 ${
                  isSelected
                    ? 'border-teal-600 bg-teal-50 shadow-card-hover'
                    : 'border-gray-100 hover:border-teal-200 hover:bg-surface-gray'
                }`}
                aria-pressed={isSelected}
              >
                {/* Photo */}
                <div className="relative shrink-0">
                  <img
                    src={doc.photoUrl || doc.image}
                    alt={doc.name}
                    className="w-16 h-16 rounded-2xl object-cover object-top"
                  />
                  {isSelected && (
                    <div className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-teal-600 rounded-full flex items-center justify-center">
                      <CheckCircle size={12} strokeWidth={3} className="text-white" />
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-bold text-navy">{doc.name}</p>
                      <p className="text-teal-600 text-sm font-semibold">{doc.specialty}</p>
                    </div>
                    <span className={`shrink-0 text-xs font-bold px-2.5 py-1 rounded-full ${
                      doc.availableToday
                        ? 'bg-green-50 text-success'
                        : 'bg-surface-gray text-text-muted'
                    }`}>
                      {doc.availableToday ? 'Today' : 'Later'}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="flex items-center gap-1 text-xs text-text-muted">
                      <Star size={11} className="text-gold fill-gold" />
                      <strong className="text-navy">{doc.rating}</strong> ({doc.reviewsCount || doc.reviews})
                    </span>
                    <span className="text-xs text-text-muted">{doc.yearsOfExperience || doc.experience} yrs exp.</span>
                    <span className="flex items-center gap-1 text-xs text-text-muted">
                      <Clock size={11} className="text-teal-500" />
                      {doc.nextAvailable}
                    </span>
                  </div>
                </div>
              </motion.button>
            )
          })}
        </div>
      )}

      {/* Navigation */}
      <div className="mt-10 flex justify-between">
        <button onClick={onPrev} className="btn-secondary gap-2">
          <ArrowLeft size={16} /> Back
        </button>
        <button
          onClick={onNext}
          disabled={!booking.doctor}
          className="btn-primary disabled:opacity-40"
        >
          Continue <ArrowRight size={16} />
        </button>
      </div>
    </motion.div>
  )
}
