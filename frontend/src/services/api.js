import axios from 'axios'
import { mockApi } from './mockApi.js'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'
const USE_MOCK_API = import.meta.env.VITE_USE_MOCK_API !== 'false' // Default to true for demo

// Create axios instance for real API
const realApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add auth token
realApi.interceptors.request.use(
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

// Response interceptor to handle auth errors
realApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// Mock API wrapper to match axios response format
const mockApiWrapper = {
  get: async (url) => {
    if (url === '/health') return mockApi.health()
    if (url === '/accounts') return mockApi.accounts.getAll()
    if (url === '/transactions') return mockApi.transactions.getAll()
    if (url === '/admin/users') return mockApi.admin.getAllUsers()
    if (url === '/admin/audit-logs') return mockApi.admin.getAuditLogs()
    throw new Error(`Mock API: Unsupported GET ${url}`)
  },

  post: async (url, data) => {
    if (url === '/auth/signin') return mockApi.auth.signin(data)
    if (url === '/auth/signup') return mockApi.auth.signup(data)
    if (url === '/accounts') return mockApi.accounts.create(data)
    if (url === '/transactions/transfer') return mockApi.transactions.transfer(data)
    if (url === '/transactions/deposit') return mockApi.transactions.deposit(data)
    if (url === '/transactions/withdraw') return mockApi.transactions.withdraw(data)
    if (url.includes('/admin/users/') && url.includes('/promote')) {
      const userId = parseInt(url.split('/')[3])
      return mockApi.admin.promoteUser(userId)
    }
    throw new Error(`Mock API: Unsupported POST ${url}`)
  },

  delete: async (url) => {
    if (url.includes('/admin/users/')) {
      const userId = parseInt(url.split('/')[3])
      return mockApi.admin.deactivateUser(userId)
    }
    throw new Error(`Mock API: Unsupported DELETE ${url}`)
  }
}

// Export the appropriate API based on environment
const api = USE_MOCK_API ? mockApiWrapper : realApi

export default api
