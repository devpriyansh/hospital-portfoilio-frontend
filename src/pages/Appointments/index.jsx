import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import StepIndicator         from './StepIndicator'
import Step1_SelectCondition from './Step1_SelectCondition'
import Step2_ChooseDoctor    from './Step2_ChooseDoctor'
import Step3_DateTime        from './Step3_DateTime'
import Step4_PatientDetails  from './Step4_PatientDetails'
import Step5_Confirmation    from './Step5_Confirmation'

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.4 } },
  exit:    { opacity: 0, transition: { duration: 0.25 } },
}

const INITIAL_BOOKING = {
  condition:  null,
  department: null,
  doctor:     null,
  date:       null,
  time:       null,
  patient: {
    name: '', phone: '', email: '', dob: '', reason: '',
  },
}

export default function Appointments() {
  const location       = useLocation()
  const [step, setStep]         = useState(1)
  const [booking, setBooking]   = useState(INITIAL_BOOKING)

  // Pre-populate doctor if navigating from DoctorCard "Book Now"
  useEffect(() => {
    if (location.state?.doctor) {
      setBooking(b => ({ ...b, doctor: location.state.doctor, department: location.state.doctor.department }))
      setStep(3) // skip to date selection if doctor is already known
    }
  }, [])

  const next = () => setStep(s => Math.min(s + 1, 5))
  const prev = () => setStep(s => Math.max(s - 1, 1))

  const stepProps = { onNext: next, onPrev: prev, booking, setBooking }

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen bg-surface-gray"
    >
      {/* Page Hero */}
      <div className="bg-gradient-teal pt-24 pb-16">
        <div className="container-main text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3">Book an Appointment</h1>
          <p className="text-white/70 text-lg max-w-lg mx-auto">
            Seamless, secure online booking — your slot confirmed in under 2 minutes.
          </p>
        </div>
      </div>

      {/* Wizard Card */}
      <div className="container-main -mt-8 pb-20">
        <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-card-hover border border-gray-100 p-8 md:p-12">
          {/* Step Indicator */}
          <StepIndicator current={step} />

          {/* Steps */}
          <AnimatePresence mode="wait">
            {step === 1 && <Step1_SelectCondition key="step1" {...stepProps} />}
            {step === 2 && <Step2_ChooseDoctor    key="step2" {...stepProps} />}
            {step === 3 && <Step3_DateTime        key="step3" {...stepProps} />}
            {step === 4 && <Step4_PatientDetails  key="step4" {...stepProps} />}
            {step === 5 && <Step5_Confirmation    key="step5" booking={booking} />}
          </AnimatePresence>
        </div>

        {/* Info strip */}
        {step < 5 && (
          <p className="text-center text-xs text-text-muted mt-6">
            🔒 Your information is encrypted and never shared with third parties.
          </p>
        )}
      </div>
    </motion.div>
  )
}
