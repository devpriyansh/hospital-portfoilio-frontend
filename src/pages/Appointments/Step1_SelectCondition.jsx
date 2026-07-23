import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Search, Stethoscope, ArrowRight, Loader2 } from 'lucide-react'
import { api } from '../../services/api'
import { useApi } from '../../hooks/useApi'

const stepVariants = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  exit:    { opacity: 0, x: -30, transition: { duration: 0.25 } },
}

export default function Step1_SelectCondition({ onNext, booking, setBooking }) {
  const [tab,          setTab]          = useState('condition') // 'condition' | 'doctor'
  const [condQuery,    setCondQuery]    = useState('')
  const [showDropdown, setShowDropdown] = useState(false)
  const [doctorQuery,  setDoctorQuery]  = useState('')

  const { data: conditionsData, loading: conditionsLoading } = useApi(api.getConditions)
  const { data: doctorsData, loading: doctorsLoading } = useApi(api.getDoctors)

  // Filter diseases by query
  const filteredDiseases = useMemo(() => {
    const list = conditionsData || []
    if (!condQuery.trim()) return list.slice(0, 12)
    return list.filter(d =>
      d.name.toLowerCase().includes(condQuery.toLowerCase())
    )
  }, [condQuery, conditionsData])

  // Filter doctors by name or specialty
  const filteredDoctors = useMemo(() => {
    const list = doctorsData || []
    if (!doctorQuery.trim()) return list
    return list.filter(d =>
      d.name.toLowerCase().includes(doctorQuery.toLowerCase()) ||
      d.specialty.toLowerCase().includes(doctorQuery.toLowerCase())
    )
  }, [doctorQuery, doctorsData])

  const selectCondition = (disease) => {
    setBooking(b => ({ ...b, condition: disease.name, department: disease.service?.name, doctor: null }))
    setCondQuery(disease.name)
    setShowDropdown(false)
  }

  const canContinue = tab === 'condition'
    ? !!booking.condition
    : !!booking.doctor

  return (
    <motion.div variants={stepVariants} initial="initial" animate="animate" exit="exit">
      <h2 className="text-2xl font-bold text-navy mb-2">How can we help you today?</h2>
      <p className="text-text-muted mb-8">Tell us what you're experiencing, or search directly for a specialist.</p>

      {/* Tab Switch */}
      <div className="flex gap-1 bg-surface-gray rounded-xl p-1 mb-8 w-fit">
        {[
          { key: 'condition', label: 'I know my condition' },
          { key: 'doctor',    label: 'I want a specific doctor' },
        ].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
              tab === key
                ? 'bg-white text-navy shadow-sm'
                : 'text-text-muted hover:text-navy'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* ── Condition Tab ── */}
      {tab === 'condition' && (
        <div>
          <label className="label">Search by condition or symptom</label>
          <div className="relative mb-4">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
            <input
              type="text"
              value={condQuery}
              onChange={(e) => { setCondQuery(e.target.value); setShowDropdown(true) }}
              onFocus={() => setShowDropdown(true)}
              placeholder="e.g. Knee Pain, Migraine, Acne…"
              className="input-field pl-10"
              autoComplete="off"
              aria-label="Search conditions"
            />
          </div>

          {/* Dropdown */}
          {showDropdown && filteredDiseases.length > 0 && (
            <div className="bg-white border border-gray-100 rounded-xl shadow-card-hover mb-6 max-h-56 overflow-y-auto">
              {filteredDiseases.map((d) => (
                <button
                  key={d.name}
                  onClick={() => selectCondition(d)}
                  className="w-full text-left px-4 py-3 hover:bg-teal-50 flex items-center justify-between group transition-colors first:rounded-t-xl last:rounded-b-xl"
                >
                  <span className="text-sm text-navy group-hover:text-teal-700 font-medium">{d.name}</span>
                  <span className="text-xs text-text-muted bg-surface-gray px-2 py-0.5 rounded-full">{d.service?.name}</span>
                </button>
              ))}
            </div>
          )}

          {/* Selected condition display */}
          {booking.condition && (
            <div className="flex items-center gap-3 bg-teal-50 border border-teal-100 rounded-xl px-4 py-3 mb-6">
              <Stethoscope size={16} className="text-teal-600" />
              <div>
                <p className="text-sm font-bold text-teal-700">{booking.condition}</p>
                <p className="text-xs text-teal-600">Department: {booking.department}</p>
              </div>
            </div>
          )}

          {/* Quick chips */}
          {!booking.condition && (
            <div>
              <p className="text-xs font-semibold text-text-muted uppercase tracking-wide mb-3">Common Conditions</p>
              {conditionsLoading ? (
                <div className="flex items-center gap-2 text-teal-600 text-sm">
                  <Loader2 className="animate-spin" size={16} /> Loading conditions...
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {['Heart Disease', 'Knee Pain', 'Migraine', 'Acne', 'Asthma', 'Back Pain', 'COPD', 'Epilepsy'].map(label => {
                    const d = (conditionsData || []).find(x => x.name === label)
                    return d ? (
                      <button
                        key={label}
                        onClick={() => selectCondition(d)}
                        className="tag bg-surface-gray text-text-muted hover:bg-teal-50 hover:text-teal-700 border border-gray-100 transition-colors"
                      >
                        {label}
                      </button>
                    ) : null
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ── Doctor Tab ── */}
      {tab === 'doctor' && (
        <div>
          <label className="label">Search by doctor name or specialty</label>
          <div className="relative mb-6">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
            <input
              type="text"
              value={doctorQuery}
              onChange={(e) => setDoctorQuery(e.target.value)}
              placeholder="e.g. Dr. Mitchell, Cardiology…"
              className="input-field pl-10"
              aria-label="Search doctors"
            />
          </div>
          {doctorsLoading ? (
            <div className="flex justify-center items-center py-10 text-teal-600">
              <Loader2 className="animate-spin mr-2" size={24} />
              <span className="text-sm font-medium">Loading doctors...</span>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-3 max-h-72 overflow-y-auto pr-1">
              {filteredDoctors.map((doc) => (
                <button
                  key={doc.id}
                  onClick={() => {
                    setBooking(b => ({ ...b, doctor: doc, department: doc.specialty, condition: null }))
                  }}
                  className={`flex items-center gap-3 p-3 rounded-xl border-2 text-left transition-all duration-200 ${
                    booking.doctor?.id === doc.id
                      ? 'border-teal-600 bg-teal-50'
                      : 'border-gray-100 hover:border-teal-200 hover:bg-teal-50/50'
                  }`}
                >
                  <img
                    src={doc.photoUrl || doc.image}
                    alt={doc.name}
                    className="w-11 h-11 rounded-full object-cover object-top shrink-0"
                  />
                  <div className="overflow-hidden">
                    <p className="font-bold text-navy text-sm truncate">{doc.name}</p>
                    <p className="text-teal-600 text-xs truncate">{doc.specialty}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Next button */}
      <div className="mt-10 flex justify-end">
        <button
          onClick={onNext}
          disabled={!canContinue}
          className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Continue
          <ArrowRight size={16} />
        </button>
      </div>
    </motion.div>
  )
}
