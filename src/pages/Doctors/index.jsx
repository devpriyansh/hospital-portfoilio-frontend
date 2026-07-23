import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Search, SlidersHorizontal, Star, X, Loader2 } from 'lucide-react'
import DoctorCard from '../../components/ui/DoctorCard'
import SectionHeading from '../../components/ui/SectionHeading'
import { api } from '../../services/api'
import { useApi } from '../../hooks/useApi'

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.4 } },
  exit:    { opacity: 0, transition: { duration: 0.25 } },
}

export default function Doctors() {
  const [search,      setSearch]      = useState('')
  const [deptFilter,  setDeptFilter]  = useState('All')
  const [availFilter, setAvailFilter] = useState(false)
  const [ratingMin,   setRatingMin]   = useState(0)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const { data: doctorsData, loading: doctorsLoading, error: doctorsError } = useApi(api.getDoctors)
  const { data: servicesData } = useApi(api.getServices)
  
  const DEPARTMENTS = useMemo(() => {
    if (!servicesData) return ['All']
    return ['All', ...servicesData.map(s => s.name)]
  }, [servicesData])

  const filtered = useMemo(() => {
    let list = doctorsData || []
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(d =>
        d.name.toLowerCase().includes(q) ||
        d.specialty.toLowerCase().includes(q)
      )
    }
    if (deptFilter !== 'All') list = list.filter(d => d.specialty === deptFilter || (d.service && d.service.name === deptFilter))
    if (availFilter)          list = list.filter(d => d.availableToday)
    if (ratingMin > 0)        list = list.filter(d => d.rating >= ratingMin)
    return list
  }, [search, deptFilter, availFilter, ratingMin, doctorsData])

  const clearFilters = () => {
    setDeptFilter('All')
    setAvailFilter(false)
    setRatingMin(0)
    setSearch('')
  }

  const hasFilters = deptFilter !== 'All' || availFilter || ratingMin > 0 || search.trim()

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen"
    >
      {/* Page Hero */}
      <div className="bg-gradient-teal pt-24 pb-20">
        <div className="container-main text-center">
          <span className="inline-block bg-white/20 text-white text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full mb-5">
            Our Team
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Find Your Specialist
          </h1>
          <p className="text-white/70 text-lg max-w-xl mx-auto mb-8">
            Search by name, specialty, or condition. Book a slot in seconds.
          </p>
          {/* Search bar */}
          <div className="max-w-lg mx-auto relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or specialty…"
              className="w-full pl-12 pr-4 py-4 rounded-2xl border-0 shadow-lg text-navy placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-white/60 font-medium"
              aria-label="Search doctors"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-navy"
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="bg-surface-gray min-h-[60vh]">
        <div className="container-main py-12">
          <div className="flex gap-8">

            {/* ── Sidebar Filters (desktop) ── */}
            <aside className="hidden lg:block w-64 shrink-0">
              <div className="card p-6 sticky top-24">
                <div className="flex items-center justify-between mb-5">
                  <p className="font-bold text-navy text-sm flex items-center gap-2">
                    <SlidersHorizontal size={15} /> Filters
                  </p>
                  {hasFilters && (
                    <button onClick={clearFilters} className="text-xs text-teal-600 font-semibold hover:underline">
                      Clear all
                    </button>
                  )}
                </div>

                {/* Specialty */}
                <div className="mb-6">
                  <p className="text-xs font-bold uppercase tracking-wide text-text-muted mb-3">Specialty</p>
                  <div className="space-y-1">
                    {DEPARTMENTS.map(dept => (
                      <button
                        key={dept}
                        onClick={() => setDeptFilter(dept)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                          deptFilter === dept
                            ? 'bg-teal-50 text-teal-700 font-semibold'
                            : 'text-text-muted hover:bg-surface-gray hover:text-navy'
                        }`}
                      >
                        {dept}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Availability */}
                <div className="mb-6 border-t border-gray-100 pt-5">
                  <p className="text-xs font-bold uppercase tracking-wide text-text-muted mb-3">Availability</p>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={availFilter}
                      onChange={(e) => setAvailFilter(e.target.checked)}
                      className="w-4 h-4 accent-teal-600"
                    />
                    <span className="text-sm text-text-primary font-medium">Available Today</span>
                  </label>
                </div>

                {/* Rating */}
                <div className="border-t border-gray-100 pt-5">
                  <p className="text-xs font-bold uppercase tracking-wide text-text-muted mb-3">Minimum Rating</p>
                  <div className="flex gap-2">
                    {[0, 4.5, 4.7, 4.9].map(r => (
                      <button
                        key={r}
                        onClick={() => setRatingMin(r)}
                        className={`flex-1 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                          ratingMin === r
                            ? 'bg-teal-600 text-white border-teal-600'
                            : 'border-gray-100 text-text-muted hover:border-teal-200'
                        }`}
                      >
                        {r === 0 ? 'Any' : `${r}+`}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            {/* ── Main Grid ── */}
            <div className="flex-1 min-w-0">
              {doctorsLoading && (
                <div className="flex justify-center items-center py-20 text-teal-600">
                  <Loader2 className="animate-spin mr-2" size={32} />
                  <span className="text-lg font-medium">Loading specialists...</span>
                </div>
              )}

              {doctorsError && (
                <div className="text-center py-20 text-red-500 font-medium">
                  Failed to load doctors: {doctorsError}
                </div>
              )}

              {!doctorsLoading && !doctorsError && (
                <>
                  {/* Results count */}
                  <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-text-muted font-medium">
                  Showing <strong className="text-navy">{filtered.length}</strong> specialist{filtered.length !== 1 ? 's' : ''}
                  {deptFilter !== 'All' && <> in <span className="text-teal-600">{deptFilter}</span></>}
                </p>
                {hasFilters && (
                  <button onClick={clearFilters} className="text-xs text-teal-600 font-semibold hover:underline flex items-center gap-1 lg:hidden">
                    <X size={12} /> Clear filters
                  </button>
                )}
              </div>

                  {filtered.length === 0 ? (
                    <div className="card p-16 text-center">
                      <p className="text-2xl mb-3">🔍</p>
                      <p className="font-bold text-navy mb-2">No doctors match your search</p>
                      <p className="text-text-muted text-sm mb-6">Try adjusting your filters or searching for a different specialty.</p>
                      <button onClick={clearFilters} className="btn-primary text-sm py-2.5 px-6">Clear All Filters</button>
                    </div>
                  ) : (
                    <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                      {filtered.map(doctor => (
                        <DoctorCard key={doctor.id} doctor={doctor} />
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
