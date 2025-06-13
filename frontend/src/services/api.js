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
    console.log('Mock API GET:', url)

    if (url === '/health') return mockApi.health()
    if (url === '/accounts' || url === '/accounts/my-accounts') return mockApi.accounts.getAll()
    if (url === '/transactions' || url.includes('/transactions/my-transactions')) {
      // Extract pagination parameters if present
      const urlObj = new URL(url, 'http://localhost')
      const page = parseInt(urlObj.searchParams.get('page') || '0')
      const size = parseInt(urlObj.searchParams.get('size') || '10')
      return mockApi.transactions.getAll(page, size)
    }
    if (url === '/admin/users') return mockApi.admin.getAllUsers()
    if (url === '/admin/audit-logs') return mockApi.admin.getAuditLogs()
    if (url.includes('/accounts/') && url.includes('/balance')) {
      const accountNumber = url.split('/')[2]
      return mockApi.accounts.getBalance(accountNumber)
    }
    if (url.includes('/transactions/account/')) {
      return mockApi.transactions.getAll()
    }
    throw new Error(`Mock API: Unsupported GET ${url}`)
  },

  post: async (url, data) => {
    console.log('Mock API POST:', url, data)

    if (url === '/auth/signin') return mockApi.auth.signin(data)
    if (url === '/auth/signup') return mockApi.auth.signup(data)
    if (url === '/accounts' || url.includes('/accounts/create')) return mockApi.accounts.create(data)
    if (url === '/transactions/transfer') return mockApi.transactions.transfer(data)
    if (url === '/transactions/deposit') return mockApi.transactions.deposit(data)
    if (url === '/transactions/withdraw') return mockApi.transactions.withdraw(data)
    if (url.includes('/accounts/') && url.includes('/deposit')) {
      const accountNumber = url.split('/')[2]
      const amount = new URLSearchParams(url.split('?')[1]).get('amount')
      return mockApi.transactions.deposit({ accountNumber, amount, description: 'Deposit' })
    }
    if (url.includes('/accounts/') && url.includes('/withdraw')) {
      const accountNumber = url.split('/')[2]
      const amount = new URLSearchParams(url.split('?')[1]).get('amount')
      return mockApi.transactions.withdraw({ accountNumber, amount, description: 'Withdrawal' })
    }
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
