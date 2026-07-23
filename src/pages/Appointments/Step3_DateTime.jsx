import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, ArrowLeft, ArrowRight, Loader2 } from 'lucide-react'
import { api } from '../../services/api'
import { useApi } from '../../hooks/useApi'

const stepVariants = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  exit:    { opacity: 0, x: -30, transition: { duration: 0.25 } },
}

function buildDates() {
  const dates = []
  const today = new Date()
  for (let i = 0; i < 14; i++) {
    const d = new Date(today)
    d.setDate(today.getDate() + i)
    const day = d.getDay()
    // Skip Sundays (0) only
    if (day !== 0) dates.push(d)
  }
  return dates
}

const DATES = buildDates()

const MONTH_NAMES = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
const DAY_NAMES   = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']

export default function Step3_DateTime({ onNext, onPrev, booking, setBooking }) {
  const [weekOffset, setWeekOffset] = useState(0)

  const weekDates = DATES.slice(weekOffset * 5, weekOffset * 5 + 5)
  const maxOffset = Math.floor((DATES.length - 1) / 5)

  const selectDate = (d) => setBooking(b => ({ ...b, date: d, time: null }))
  const selectTime = (t) => setBooking(b => ({ ...b, time: t }))

  const formatDate = (d) =>
    `${DAY_NAMES[d.getDay()]}, ${MONTH_NAMES[d.getMonth()]} ${d.getDate()}`

  // Format date to YYYY-MM-DD for the API
  const getApiDateString = (d) => {
    if (!d) return ''
    const year = d.getFullYear()
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  const { data: availableSlots, loading: slotsLoading } = useApi(
    api.getAvailableSlots,
    booking.doctor?.id && booking.date ? [booking.doctor.id, getApiDateString(booking.date)] : [],
    !!(booking.doctor?.id && booking.date)
  )

  return (
    <motion.div variants={stepVariants} initial="initial" animate="animate" exit="exit">
      <h2 className="text-2xl font-bold text-navy mb-2">Pick a Date & Time</h2>
      <p className="text-text-muted mb-8">
        Showing availability for <strong className="text-navy">{booking.doctor?.name}</strong>.
      </p>

      {/* ── Date selector ── */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <p className="font-semibold text-navy text-sm">Select Date</p>
          <div className="flex gap-2">
            <button
              onClick={() => setWeekOffset(o => Math.max(0, o - 1))}
              disabled={weekOffset === 0}
              className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-text-muted hover:border-teal-400 hover:text-teal-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              aria-label="Previous dates"
            >
              <ChevronLeft size={14} />
            </button>
            <button
              onClick={() => setWeekOffset(o => Math.min(maxOffset, o + 1))}
              disabled={weekOffset >= maxOffset}
              className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-text-muted hover:border-teal-400 hover:text-teal-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              aria-label="Next dates"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-5 gap-2">
          {weekDates.map((d, i) => {
            const isSelected = booking.date?.toDateString() === d.toDateString()
            const isToday    = new Date().toDateString() === d.toDateString()
            return (
              <motion.button
                key={i}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => selectDate(d)}
                className={`flex flex-col items-center py-3 px-2 rounded-xl border-2 transition-all duration-200 ${
                  isSelected
                    ? 'border-teal-600 bg-teal-600 text-white shadow-md'
                    : 'border-gray-100 hover:border-teal-200 hover:bg-teal-50 text-navy'
                }`}
              >
                <span className={`text-[10px] font-bold uppercase tracking-wider ${isSelected ? 'text-white/80' : 'text-text-muted'}`}>
                  {DAY_NAMES[d.getDay()]}
                </span>
                <span className="text-xl font-extrabold mt-0.5">{d.getDate()}</span>
                {isToday && (
                  <span className={`text-[9px] font-bold mt-0.5 ${isSelected ? 'text-white/70' : 'text-teal-600'}`}>
                    TODAY
                  </span>
                )}
              </motion.button>
            )
          })}
        </div>
      </div>

      {/* ── Time slot picker ── */}
      {booking.date && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <p className="font-semibold text-navy text-sm mb-4">
            Available Slots for <span className="text-teal-600">{formatDate(booking.date)}</span>
          </p>
          
          {slotsLoading ? (
            <div className="flex items-center gap-2 text-teal-600 py-6">
              <Loader2 className="animate-spin" size={20} />
              <span className="text-sm font-medium">Checking availability...</span>
            </div>
          ) : !availableSlots || availableSlots.length === 0 ? (
            <div className="py-6 px-4 bg-gray-50 border border-gray-100 rounded-xl text-center">
              <p className="text-sm font-semibold text-text-muted mb-1">No slots available</p>
              <p className="text-xs text-text-muted">Dr. {booking.doctor?.name.split(' ').pop()} is fully booked or not working on this day.</p>
            </div>
          ) : (
            <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
              {availableSlots.map((slot) => {
                const selected = booking.time === slot
                return (
                  <motion.button
                    key={slot}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => selectTime(slot)}
                    className={`py-2.5 px-1 rounded-xl text-xs font-semibold border-2 transition-all duration-200 ${
                      selected
                        ? 'border-teal-600 bg-teal-600 text-white shadow-sm'
                        : 'border-gray-100 text-text-muted hover:border-teal-300 hover:bg-teal-50 hover:text-teal-700'
                    }`}
                  >
                    {slot}
                  </motion.button>
                )
              })}
            </div>
          )}
        </motion.div>
      )}

      {/* Navigation */}
      <div className="mt-10 flex justify-between">
        <button onClick={onPrev} className="btn-secondary gap-2">
          <ArrowLeft size={16} /> Back
        </button>
        <button
          onClick={onNext}
          disabled={!booking.date || !booking.time}
          className="btn-primary disabled:opacity-40"
        >
          Continue <ArrowRight size={16} />
        </button>
      </div>
    </motion.div>
  )
}
