import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone } from 'lucide-react'
import { NAV_LINKS } from '../data/data'

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)
  const navigate                  = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menu on route change
  const handleNavClick = (path) => {
    setMenuOpen(false)
    if (path.startsWith('/#')) {
      const id = path.slice(2)
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      } else {
        navigate('/')
        setTimeout(() => {
          document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
        }, 300)
      }
    } else {
      navigate(path)
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-md shadow-nav'
          : 'bg-transparent'
      }`}
    >
      <div className="container-main">
        <nav className="flex items-center justify-between h-16 md:h-20" aria-label="Main navigation">

          {/* ── Logo ── */}
          <Link to="/" className="flex items-center gap-2.5 group" aria-label="NovaCare home">
            <div className="w-9 h-9 bg-teal-600 rounded-xl flex items-center justify-center shadow-md group-hover:bg-teal-700 transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2v20M2 12h20" />
              </svg>
            </div>
            <span className={`text-xl font-extrabold tracking-tight transition-colors ${
              scrolled ? 'text-navy' : 'text-white'
            }`}>
              Nova<span className="text-teal-500">Care</span>
            </span>
          </Link>

          {/* ── Desktop Nav ── */}
          <ul className="hidden md:flex items-center gap-1" role="list">
            {NAV_LINKS.map((link) => (
              <li key={link.path}>
                <button
                  onClick={() => handleNavClick(link.path)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 relative group ${
                    scrolled
                      ? 'text-text-primary hover:text-teal-600 hover:bg-teal-50'
                      : 'text-white/90 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {link.label}
                  <span className="absolute bottom-1 left-4 right-4 h-0.5 bg-teal-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 rounded-full" />
                </button>
              </li>
            ))}
          </ul>

          {/* ── Desktop CTA ── */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="tel:+15552345678"
              className={`flex items-center gap-2 text-sm font-semibold transition-colors ${
                scrolled ? 'text-text-muted hover:text-teal-600' : 'text-white/80 hover:text-white'
              }`}
            >
              <Phone size={14} />
              +1 (555) 234-5678
            </a>
            <button
              onClick={() => navigate('/appointments')}
              className="btn-primary py-2.5 text-sm"
            >
              Book Appointment
            </button>
          </div>

          {/* ── Mobile Hamburger ── */}
          <button
            className={`md:hidden p-2 rounded-lg transition-colors ${
              scrolled ? 'text-navy hover:bg-gray-100' : 'text-white hover:bg-white/10'
            }`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </div>

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden bg-white border-t border-gray-100 shadow-nav overflow-hidden"
          >
            <div className="container-main py-4 flex flex-col gap-1">
              {NAV_LINKS.map((link, i) => (
                <motion.button
                  key={link.path}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => handleNavClick(link.path)}
                  className="text-left px-4 py-3 rounded-xl text-sm font-semibold text-text-primary hover:bg-teal-50 hover:text-teal-600 transition-colors"
                >
                  {link.label}
                </motion.button>
              ))}
              <div className="border-t border-gray-100 mt-2 pt-3">
                <button
                  onClick={() => { navigate('/appointments'); setMenuOpen(false) }}
                  className="btn-primary w-full justify-center"
                >
                  Book Appointment
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
