const API_BASE_URL = 'https://hospital-portfoilio-backend.onrender.com'

async function fetchApi(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong')
  }

  return data
}

export const api = {
  getServices: () => fetchApi('/services'),

  getConditions: (serviceId) => {
    const query = serviceId ? `?serviceId=${serviceId}` : ''
    return fetchApi(`/conditions${query}`)
  },

  getDoctors: (filters = {}) => {
    const queryParams = new URLSearchParams()
    if (filters.specialty) queryParams.append('specialty', filters.specialty)
    if (filters.search) queryParams.append('search', filters.search)
    if (filters.available) queryParams.append('available', 'true')

    const queryString = queryParams.toString()
    const url = queryString ? `/doctors?${queryString}` : '/doctors'
    return fetchApi(url)
  },

  getDoctor: (id) => fetchApi(`/doctors/${id}`),

  getAvailableSlots: (doctorId, date) => fetchApi(`/slots?doctorId=${doctorId}&date=${date}`),

  createAppointment: (payload) => fetchApi('/appointments', {
    method: 'POST',
    body: JSON.stringify(payload),
  }),

  getAppointment: (bookingId) => fetchApi(`/appointments/${bookingId}`),

  getTestimonials: () => fetchApi('/testimonials'),

  getConfig: () => fetchApi('/config'),
}
