import { useRef, useEffect, useState } from 'react'
import { motion, useInView, useMotionValue, useSpring, animate } from 'framer-motion'
import { CheckCircle, Award, Users, Clock } from 'lucide-react'
import SectionHeading from '../../components/ui/SectionHeading'
import { STATS } from '../../data/data'

function AnimatedCounter({ target, suffix, format }) {
  const ref        = useRef(null)
  const inView     = useInView(ref, { once: true, margin: '-80px' })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, target, {
      duration: 2,
      ease: 'easeOut',
      onUpdate: (v) => setCount(Math.floor(v)),
    })
    return controls.stop
  }, [inView, target])

  const display = format === 'compact' && count >= 1000
    ? (count / 1000).toFixed(count % 1000 === 0 ? 0 : 0) + 'k'
    : count.toLocaleString()

  return (
    <span ref={ref} className="text-4xl font-extrabold text-navy tabular-nums">
      {display}{suffix}
    </span>
  )
}

const FEATURES = [
  'Round-the-clock critical care and emergency response.',
  'Multidisciplinary teams who collaborate on complex cases.',
  'State-of-the-art diagnostic imaging and lab facilities.',
  'Patient portal for records, results, and teleconsultations.',
  'Transparent billing and compassionate financial assistance.',
]

export default function WhyChooseUs() {
  return (
    <section id="about" className="section-padding bg-white overflow-hidden">
      <div className="container-main">

        {/* ── Row 1: Image left, Text right ── */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=800&q=80"
                alt="Doctors collaborating on patient care at NovaCare"
                className="w-full h-96 lg:h-[500px] object-cover"
                loading="lazy"
              />
              {/* Floating experience badge */}
              <div className="absolute bottom-6 left-6 bg-white rounded-2xl px-5 py-4 shadow-lg flex items-center gap-3">
                <Award size={24} className="text-gold" />
                <div>
                  <p className="text-navy font-extrabold text-2xl">25+</p>
                  <p className="text-text-muted text-xs font-medium">Years of Excellence</p>
                </div>
              </div>
            </div>
            {/* Decorative teal block */}
            <div className="absolute -z-10 -bottom-6 -left-6 w-48 h-48 bg-teal-50 rounded-3xl" />
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
          >
            <SectionHeading
              label="Why NovaCare"
              title="Medicine Delivered With Precision and Humanity"
              subtitle="We believe exceptional healthcare is both a science and an art — evidence-based decisions, delivered with genuine warmth."
            />

            <ul className="mt-8 space-y-4">
              {FEATURES.map((feature, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.45 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle size={18} className="text-teal-600 shrink-0 mt-0.5" />
                  <span className="text-text-muted text-[0.95rem] leading-relaxed">{feature}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* ── Stats Row ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="card p-7 text-center"
            >
              <div className="flex justify-center mb-2">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} format={stat.format} />
              </div>
              <p className="text-text-muted text-sm font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* ── Row 2: Text left, Image right (reversed) ── */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
            className="order-2 lg:order-1"
          >
            <SectionHeading
              label="Our Facilities"
              title="Designed Around Your Comfort and Recovery"
              subtitle="From private patient suites and advanced imaging centres to serene recovery lounges — every space is crafted for healing."
            />
            <div className="mt-8 grid grid-cols-2 gap-4">
              {[
                { icon: Users, label: '120+ ICU Beds',          sub: 'Fully equipped critical care' },
                { icon: Clock, label: 'Open 24/7',              sub: 'Emergency & outpatient care' },
                { icon: Award, label: 'JCI Accredited',         sub: 'International quality standards' },
                { icon: CheckCircle, label: 'Zero-Wait Billing', sub: 'Streamlined patient experience' },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} className="bg-surface-gray rounded-2xl p-4 flex flex-col gap-2">
                  <Icon size={18} className="text-teal-600" />
                  <p className="font-bold text-navy text-sm">{label}</p>
                  <p className="text-text-muted text-xs">{sub}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
            className="relative order-1 lg:order-2"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80"
                alt="Modern patient room at NovaCare Medical Center"
                className="w-full h-96 lg:h-[500px] object-cover"
                loading="lazy"
              />
            </div>
            <div className="absolute -z-10 -top-6 -right-6 w-48 h-48 bg-gold/10 rounded-3xl" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
