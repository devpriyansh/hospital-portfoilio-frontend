import { Link, useNavigate } from 'react-router-dom'
import { MapPin, Phone, Mail } from 'lucide-react'

// Inline social SVG icons (lucide-react doesn't have social brand icons)
const SocialIcons = {
  Facebook: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  ),
  Twitter: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  ),
  Linkedin: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  ),
  Instagram: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  ),
}

const quickLinks = ['About Us', 'Our Doctors', 'Services', 'Appointments', 'Contact']
const services   = ['Cardiology', 'Orthopedics', 'Neurology', 'Pediatrics', 'Dermatology', 'Pulmonology']

export default function Footer() {
  const navigate = useNavigate()

  return (
    <footer className="bg-navy-dark text-white" id="contact">
      {/* Main Footer */}
      <div className="container-main py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* ── Brand Column ── */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 bg-teal-600 rounded-xl flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v20M2 12h20" />
                </svg>
              </div>
              <span className="text-xl font-extrabold tracking-tight">
                Nova<span className="text-teal-400">Care</span>
              </span>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-xs">
              Compassionate, world-class healthcare delivered by specialists who genuinely care about your wellbeing.
            </p>
            {/* Social Icons */}
            <div className="flex gap-3">
              {[
                { key: 'Facebook',  href: '#', label: 'Facebook' },
                { key: 'Twitter',   href: '#', label: 'Twitter' },
                { key: 'Linkedin',  href: '#', label: 'LinkedIn' },
                { key: 'Instagram', href: '#', label: 'Instagram' },
              ].map(({ key, href, label }) => {
                const Icon = SocialIcons[key]
                return (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-white/10 hover:bg-teal-600 flex items-center justify-center transition-colors duration-200"
                >
                  <Icon />
                </a>
                )
              })}
            </div>
          </div>

          {/* ── Quick Links ── */}
          <div>
            <h3 className="font-bold text-sm tracking-wider uppercase text-white/40 mb-5">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((item) => (
                <li key={item}>
                  <button
                    onClick={() => {
                      if (item === 'Appointments') navigate('/appointments')
                      else if (item === 'Our Doctors') navigate('/doctors')
                      else window.scrollTo({ top: 0, behavior: 'smooth' })
                    }}
                    className="text-white/60 hover:text-teal-400 text-sm transition-colors duration-200 text-left"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Services ── */}
          <div>
            <h3 className="font-bold text-sm tracking-wider uppercase text-white/40 mb-5">Services</h3>
            <ul className="space-y-3">
              {services.map((s) => (
                <li key={s}>
                  <button
                    onClick={() => navigate('/doctors')}
                    className="text-white/60 hover:text-teal-400 text-sm transition-colors duration-200 text-left"
                  >
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Contact Info ── */}
          <div>
            <h3 className="font-bold text-sm tracking-wider uppercase text-white/40 mb-5">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-teal-400 shrink-0 mt-0.5" />
                <span className="text-white/60 text-sm leading-relaxed">
                  123 Wellness Avenue,<br />MedCity, HC 482001
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-teal-400 shrink-0" />
                <a href="tel:+15552345678" className="text-white/60 hover:text-teal-400 text-sm transition-colors">
                  +1 (555) 234-5678
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-teal-400 shrink-0" />
                <a href="mailto:contact@novacare.com" className="text-white/60 hover:text-teal-400 text-sm transition-colors">
                  contact@novacare.com
                </a>
              </li>
            </ul>

            {/* Emergency badge */}
            <div className="mt-6 bg-red-500/10 border border-red-500/20 rounded-xl p-4">
              <p className="text-red-400 text-xs font-bold uppercase tracking-wide mb-1">24/7 Emergency</p>
              <a href="tel:+15552340911" className="text-white font-bold text-lg hover:text-red-400 transition-colors">
                +1 (555) 234-0911
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom Bar ── */}
      <div className="border-t border-white/10">
        <div className="container-main py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/40 text-sm text-center">
            © {new Date().getFullYear()} NovaCare Medical Center. All rights reserved.
          </p>
          <div className="flex gap-5">
            {['Privacy Policy', 'Terms of Service', 'Accessibility'].map((item) => (
              <a key={item} href="#" className="text-white/40 hover:text-teal-400 text-xs transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
