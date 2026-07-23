import { Check } from 'lucide-react'
import { motion } from 'framer-motion'

const STEPS = [
  { n: 1, label: 'Find'     },
  { n: 2, label: 'Doctor'   },
  { n: 3, label: 'Schedule' },
  { n: 4, label: 'Details'  },
  { n: 5, label: 'Confirm'  },
]

export default function StepIndicator({ current }) {
  return (
    <div className="flex items-center justify-center w-full mb-10 select-none" role="list" aria-label="Booking steps">
      {STEPS.map((step, i) => {
        const done    = current > step.n
        const active  = current === step.n
        const pending = current < step.n

        return (
          <div key={step.n} className="flex items-center" role="listitem">
            {/* Circle */}
            <div className="flex flex-col items-center gap-1.5">
              <motion.div
                animate={{
                  backgroundColor: done ? '#059669' : active ? '#0D9488' : '#e2e8f0',
                  scale: active ? 1.12 : 1,
                }}
                transition={{ duration: 0.3 }}
                className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shadow-sm"
                style={{ color: pending ? '#94a3b8' : 'white' }}
              >
                {done ? <Check size={16} strokeWidth={2.5} /> : step.n}
              </motion.div>
              <span className={`text-[10px] font-semibold uppercase tracking-wider hidden sm:block ${
                active ? 'text-teal-600' : done ? 'text-success' : 'text-text-muted'
              }`}>
                {step.label}
              </span>
            </div>

            {/* Connector line */}
            {i < STEPS.length - 1 && (
              <motion.div
                className="h-0.5 mx-2 flex-1 min-w-[24px] max-w-[80px] rounded-full"
                animate={{ backgroundColor: done ? '#059669' : '#e2e8f0' }}
                transition={{ duration: 0.3 }}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
