import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import DoctorCard from '../../components/ui/DoctorCard'
import SectionHeading from '../../components/ui/SectionHeading'
import { api } from '../../services/api'
import { useApi } from '../../hooks/useApi'

export default function DoctorsCarousel() {
  const scrollRef  = useRef(null)
  const [canLeft,  setCanLeft]  = useState(false)
  const [canRight, setCanRight] = useState(true)
  const { data: doctors, loading, error } = useApi(api.getDoctors)

  const scroll = (dir) => {
    const el = scrollRef.current
    if (!el) return
    const amount = 340
    el.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' })
  }

  const onScroll = () => {
    const el = scrollRef.current
    if (!el) return
    setCanLeft(el.scrollLeft > 16)
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 16)
  }

  return (
    <section className="section-padding bg-surface-gray">
      <div className="container-main">
        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <SectionHeading
            label="Our Specialists"
            title="Doctors Who Go Beyond Diagnosis"
            subtitle="Each of our physicians is handpicked for clinical excellence and a commitment to compassionate care."
          />
          {/* Arrow controls */}
          <div className="flex gap-3 shrink-0">
            <button
              onClick={() => scroll('left')}
              disabled={!canLeft}
              aria-label="Scroll left"
              className={`w-11 h-11 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                canLeft
                  ? 'border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white'
                  : 'border-gray-200 text-gray-300 cursor-not-allowed'
              }`}
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canRight}
              aria-label="Scroll right"
              className={`w-11 h-11 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                canRight
                  ? 'border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white'
                  : 'border-gray-200 text-gray-300 cursor-not-allowed'
              }`}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Carousel */}
        {loading && (
          <div className="flex justify-center items-center py-20 text-teal-600">
            <span className="text-lg font-medium">Loading doctors...</span>
          </div>
        )}

        {error && (
          <div className="text-center py-20 text-red-500 font-medium">
            Failed to load doctors: {error}
          </div>
        )}

        {!loading && !error && doctors && (
          <div
            ref={scrollRef}
            onScroll={onScroll}
            className="flex gap-6 overflow-x-auto pb-4 scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {doctors.map((doctor) => (
              <div key={doctor.id} className="flex-shrink-0 w-72">
                <DoctorCard doctor={doctor} compact />
              </div>
            ))}
          </div>
        )}

        {/* "View all" CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mt-10"
        >
          <a href="/doctors" className="btn-secondary">
            View All Specialists
            <ChevronRight size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
