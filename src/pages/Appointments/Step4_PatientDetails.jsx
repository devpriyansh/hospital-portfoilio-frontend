import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, AlertCircle, Loader2 } from 'lucide-react'
import { api } from '../../services/api'
const stepVariants = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  exit:    { opacity: 0, x: -30, transition: { duration: 0.25 } },
}

function validate(form) {
  const errs = {}
  if (!form.name.trim())                   errs.name  = 'Full name is required.'
  if (!form.phone.trim())                  errs.phone = 'Phone number is required.'
  if (!form.email.trim())                  errs.email = 'Email address is required.'
  else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Please enter a valid email.'
  return errs
}

const Field = ({ id, label, type = 'text', field, placeholder, required = true, form, errors, onChange, onBlur }) => (
  <div>
    <label htmlFor={id} className="label">
      {label} {required && <span className="text-danger">*</span>}
    </label>
    <input
      id={id}
      type={type}
      value={form[field] || ''}
      onChange={(e) => onChange(field, e.target.value)}
      onBlur={() => onBlur(field)}
      placeholder={placeholder}
      className={`input-field ${errors[field] ? 'border-danger ring-1 ring-danger' : ''}`}
      aria-describedby={errors[field] ? `${id}-error` : undefined}
    />
    {errors[field] && (
      <p id={`${id}-error`} className="flex items-center gap-1.5 text-danger text-xs mt-1.5 font-medium">
        <AlertCircle size={12} /> {errors[field]}
      </p>
    )}
  </div>
)

export default function Step4_PatientDetails({ onNext, onPrev, booking, setBooking }) {
  const form   = booking.patient || { name: '', phone: '', email: '', dob: '', reason: '' }
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(null)

  const set = (field, value) => {
    setBooking(b => ({ ...b, patient: { ...b.patient, [field]: value } }))
    if (touched[field]) {
      const errs = validate({ ...form, [field]: value })
      setErrors(e => ({ ...e, [field]: errs[field] }))
    }
  }

  const blur = (field) => {
    setTouched(t => ({ ...t, [field]: true }))
    const errs = validate({ ...form, [field]: form[field] })
    setErrors(e => ({ ...e, [field]: errs[field] }))
  }

  const handleSubmit = async () => {
    setTouched({ name: true, phone: true, email: true })
    const errs = validate(form)
    setErrors(errs)
    if (Object.keys(errs).length === 0) {
      setSubmitting(true)
      setSubmitError(null)

      try {
        const year = booking.date.getFullYear()
        const month = String(booking.date.getMonth() + 1).padStart(2, '0')
        const day = String(booking.date.getDate()).padStart(2, '0')

        const payload = {
          doctorId: booking.doctor.id,
          date: `${year}-${month}-${day}`,
          time: booking.time,
          patientName: form.name,
          phone: form.phone,
          email: form.email,
          dob: form.dob || undefined,
          reason: form.reason || undefined
        }

        const res = await api.createAppointment(payload)
        
        // Save the backend response in the booking object for Step 5
        setBooking(b => ({ ...b, serverResponse: res.data }))
        onNext()
      } catch (err) {
        setSubmitError(err.message || 'Failed to book appointment. Please try again.')
      } finally {
        setSubmitting(false)
      }
    }
  }
  return (
    <motion.div variants={stepVariants} initial="initial" animate="animate" exit="exit">
      <h2 className="text-2xl font-bold text-navy mb-2">Your Details</h2>
      <p className="text-text-muted mb-8">We need a few details to confirm your appointment with <strong className="text-navy">{booking.doctor?.name}</strong>.</p>

      <div className="grid md:grid-cols-2 gap-5">
        <div className="md:col-span-2">
          <Field
            id="patient-name"
            label="Full Name"
            field="name"
            placeholder="e.g. John Stevenson"
            form={form}
            errors={errors}
            onChange={set}
            onBlur={blur}
          />
        </div>

        <Field
          id="patient-phone"
          label="Phone Number"
          type="tel"
          field="phone"
          placeholder="+1 (555) 000-0000"
          form={form}
          errors={errors}
          onChange={set}
          onBlur={blur}
        />

        <Field
          id="patient-email"
          label="Email Address"
          type="email"
          field="email"
          placeholder="john@example.com"
          form={form}
          errors={errors}
          onChange={set}
          onBlur={blur}
        />

        <div>
          <label htmlFor="patient-dob" className="label">
            Date of Birth <span className="text-text-muted font-normal text-xs">(optional)</span>
          </label>
          <input
            id="patient-dob"
            type="date"
            value={form.dob || ''}
            onChange={(e) => set('dob', e.target.value)}
            className="input-field"
          />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="patient-reason" className="label">
            Reason for Visit <span className="text-text-muted font-normal text-xs">(optional)</span>
          </label>
          <textarea
            id="patient-reason"
            rows={3}
            value={form.reason || ''}
            onChange={(e) => set('reason', e.target.value)}
            placeholder="Briefly describe your symptoms or reason for this appointment…"
            className="input-field resize-none"
          />
        </div>
      </div>

      {/* Booking summary preview */}
      <div className="mt-8 bg-surface-gray rounded-2xl p-5 border border-gray-100">
        <p className="text-xs font-bold uppercase tracking-wide text-text-muted mb-3">Appointment Summary</p>
        <div className="grid sm:grid-cols-3 gap-3">
          {[
            { label: 'Doctor',    value: booking.doctor?.name },
            { label: 'Date',      value: booking.date ? booking.date.toDateString() : '—' },
            { label: 'Time',      value: booking.time || '—' },
          ].map(({ label, value }) => (
            <div key={label}>
              <p className="text-xs text-text-muted font-medium">{label}</p>
              <p className="text-sm font-bold text-navy">{value}</p>
            </div>
          ))}
        </div>
      </div>

      {submitError && (
        <div className="mt-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium flex items-center gap-2">
          <AlertCircle size={16} />
          {submitError}
        </div>
      )}

      {/* Navigation */}
      <div className="mt-10 flex justify-between">
        <button onClick={onPrev} className="btn-secondary gap-2">
          <ArrowLeft size={16} /> Back
        </button>
        <button 
          onClick={handleSubmit} 
          disabled={submitting}
          className="btn-primary disabled:opacity-70 disabled:cursor-wait"
        >
          {submitting ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Processing...
            </>
          ) : (
            <>
              Confirm Booking <ArrowRight size={16} />
            </>
          )}
        </button>
      </div>
    </motion.div>
  )
}
