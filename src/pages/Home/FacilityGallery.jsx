import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ZoomIn } from 'lucide-react'
import { GALLERY_IMAGES } from '../../data/data'
import SectionHeading from '../../components/ui/SectionHeading'

export default function FacilityGallery() {
  const [lightbox, setLightbox] = useState(null)

  return (
    <section className="section-padding bg-surface-gray">
      <div className="container-main">
        <SectionHeading
          label="Our Facilities"
          title="A Space Built for Healing"
          subtitle="Every corner of NovaCare is thoughtfully designed to support recovery, comfort, and clinical excellence."
          center
        />

        {/* Mosaic Grid */}
        <div className="grid grid-cols-3 gap-4 mt-14 auto-rows-[220px]">
          {GALLERY_IMAGES.map((img, i) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className={`relative overflow-hidden rounded-2xl group cursor-pointer ${img.span}`}
              onClick={() => setLightbox(img)}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/50 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center gap-2">
                  <ZoomIn size={28} className="text-white" />
                  <span className="text-white text-sm font-semibold">{img.label}</span>
                </div>
              </div>
              {/* Label badge */}
              <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm text-navy text-xs font-bold px-3 py-1 rounded-full">
                {img.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox */}
        <AnimatePresence>
          {lightbox && (
            <motion.div
              key="lightbox"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
              onClick={() => setLightbox(null)}
            >
              <button
                onClick={() => setLightbox(null)}
                className="absolute top-5 right-5 text-white/70 hover:text-white"
                aria-label="Close lightbox"
              >
                <X size={28} />
              </button>
              <motion.img
                initial={{ scale: 0.92, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.92, opacity: 0 }}
                transition={{ duration: 0.25 }}
                src={lightbox.src}
                alt={lightbox.alt}
                className="max-h-[85vh] max-w-5xl w-full object-contain rounded-2xl"
                onClick={(e) => e.stopPropagation()}
              />
              <p className="absolute bottom-6 text-white/60 text-sm">{lightbox.label}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
