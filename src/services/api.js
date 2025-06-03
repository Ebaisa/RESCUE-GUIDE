import axios from 'axios'

const API_BASE_URL = 'https://eba.onrender.com'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Hospital endpoints
export const hospitalAPI = {
  register: (data) => api.post('/hospital/register', data),
  login: (data) => api.post('/hospital/login', data),
  getProfile: () => api.get('/hospital/profile'),
  updateBeds: (data) => api.put('/hospital/beds', data),
}

// User endpoints
export const userAPI = {
  register: (data) => api.post('/user/register', data),
  login: (data) => api.post('/user/login', data),
  getProfile: () => api.get('/user/profile'),
}

// Admin endpoints
export const adminAPI = {
  login: (data) => api.post('/admin/login', data),
  getAllHospitals: () => api.get('/admin/hospitals'),
  getAllUsers: () => api.get('/admin/users'),
}

// Emergency endpoints
export const emergencyAPI = {
  createRequest: (data) => api.post('/emergency/request', data),
  getAvailableBeds: () => api.get('/emergency/beds'),
  updateRequestStatus: (requestId, data) => api.put(`/emergency/request/${requestId}`, data),
}

export default api 