import { motion } from 'framer-motion'
import HeroSection      from './HeroSection'
import ServicesSection  from './ServicesSection'
import WhyChooseUs      from './WhyChooseUs'
import DoctorsCarousel  from './DoctorsCarousel'
import Testimonials     from './Testimonials'
import FacilityGallery  from './FacilityGallery'
import AppointmentCTA   from './AppointmentCTA'

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.4 } },
  exit:    { opacity: 0, transition: { duration: 0.25 } },
}

export default function Home() {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <HeroSection />
      <ServicesSection />
      <WhyChooseUs />
      <DoctorsCarousel />
      <Testimonials />
      <FacilityGallery />
      <AppointmentCTA />
    </motion.div>
  )
}
