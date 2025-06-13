import { 
  mockUsers, 
  mockAccounts, 
  mockTransactions, 
  mockAuditLogs, 
  mockSessions,
  mockAuthToken 
} from './mockData.js'

// Simulate API delay
const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms))

// Mock API responses
export const mockApi = {
  // Authentication
  auth: {
    signin: async (credentials) => {
      await delay()
      const { username, password } = credentials
      
      // Simple mock authentication
      if ((username === 'admin' && password === 'admin123') || 
          (username === 'demo' && password === 'demo123')) {
        return {
          data: {
            token: mockAuthToken,
            user: mockSessions[username]
          }
        }
      }
      
      throw new Error('Invalid credentials')
    },
    
    signup: async (userData) => {
      await delay()
      const newUser = {
        id: mockUsers.length + 1,
        ...userData,
        role: 'USER',
        enabled: true,
        createdAt: new Date().toISOString()
      }
      mockUsers.push(newUser)
      return { data: { message: 'User created successfully' } }
    }
  },

  // Account management
  accounts: {
    getAll: async () => {
      await delay()
      // Get current user from localStorage
      const currentUser = JSON.parse(localStorage.getItem('user') || '{}')
      const userId = currentUser.id

      // Filter accounts by current user
      const userAccounts = mockAccounts.filter(acc =>
        acc.isActive && (userId === 1 || acc.userId === userId) // Admin sees all, users see their own
      )

      return { data: userAccounts }
    },
    
    create: async (accountData) => {
      await delay()
      const newAccount = {
        id: mockAccounts.length + 1,
        accountNumber: `ACC${Date.now()}`,
        balance: 0,
        isActive: true,
        createdAt: new Date().toISOString(),
        ...accountData
      }
      mockAccounts.push(newAccount)
      return { data: newAccount }
    },
    
    getBalance: async (accountNumber) => {
      await delay()
      const account = mockAccounts.find(acc => acc.accountNumber === accountNumber)
      if (!account) throw new Error('Account not found')
      return { data: { balance: account.balance } }
    }
  },

  // Transactions
  transactions: {
    getAll: async (page = 0, size = 10) => {
      await delay()
      // Get current user from localStorage
      const currentUser = JSON.parse(localStorage.getItem('user') || '{}')
      const userId = currentUser.id

      // Get user's account numbers
      const userAccounts = mockAccounts.filter(acc =>
        acc.isActive && (userId === 1 || acc.userId === userId)
      )
      const userAccountNumbers = userAccounts.map(acc => acc.accountNumber)

      // Filter transactions by user's accounts
      const userTransactions = mockTransactions.filter(trans =>
        userId === 1 || // Admin sees all
        userAccountNumbers.includes(trans.fromAccountNumber) ||
        userAccountNumbers.includes(trans.toAccountNumber)
      ).map(trans => ({
        ...trans,
        transactionDate: trans.createdAt // Map createdAt to transactionDate for compatibility
      }))

      // Return in paginated format that the frontend expects
      const startIndex = page * size
      const endIndex = startIndex + size
      const paginatedTransactions = userTransactions.slice(startIndex, endIndex)

      return {
        data: {
          content: paginatedTransactions,
          totalElements: userTransactions.length,
          totalPages: Math.ceil(userTransactions.length / size),
          size: size,
          number: page
        }
      }
    },
    
    transfer: async (transferData) => {
      await delay()
      const { fromAccountNumber, toAccountNumber, amount, description } = transferData
      
      // Find accounts
      const fromAccount = mockAccounts.find(acc => acc.accountNumber === fromAccountNumber)
      const toAccount = mockAccounts.find(acc => acc.accountNumber === toAccountNumber)
      
      if (!fromAccount || !toAccount) {
        throw new Error('Account not found')
      }
      
      if (fromAccount.balance < amount) {
        throw new Error('Insufficient funds')
      }
      
      // Update balances
      fromAccount.balance -= parseFloat(amount)
      toAccount.balance += parseFloat(amount)
      
      // Create transaction record
      const newTransaction = {
        id: mockTransactions.length + 1,
        fromAccountNumber,
        toAccountNumber,
        amount: parseFloat(amount),
        description,
        transactionType: 'TRANSFER',
        status: 'COMPLETED',
        createdAt: new Date().toISOString(),
        completedAt: new Date().toISOString()
      }
      
      mockTransactions.unshift(newTransaction)
      return { data: newTransaction }
    },
    
    deposit: async (depositData) => {
      await delay()
      const { accountNumber, amount, description } = depositData
      
      const account = mockAccounts.find(acc => acc.accountNumber === accountNumber)
      if (!account) throw new Error('Account not found')
      
      account.balance += parseFloat(amount)
      
      const newTransaction = {
        id: mockTransactions.length + 1,
        fromAccountNumber: null,
        toAccountNumber: accountNumber,
        amount: parseFloat(amount),
        description,
        transactionType: 'DEPOSIT',
        status: 'COMPLETED',
        createdAt: new Date().toISOString(),
        completedAt: new Date().toISOString()
      }
      
      mockTransactions.unshift(newTransaction)
      return { data: newTransaction }
    },
    
    withdraw: async (withdrawData) => {
      await delay()
      const { accountNumber, amount, description } = withdrawData
      
      const account = mockAccounts.find(acc => acc.accountNumber === accountNumber)
      if (!account) throw new Error('Account not found')
      
      if (account.balance < amount) {
        throw new Error('Insufficient funds')
      }
      
      account.balance -= parseFloat(amount)
      
      const newTransaction = {
        id: mockTransactions.length + 1,
        fromAccountNumber: accountNumber,
        toAccountNumber: null,
        amount: parseFloat(amount),
        description,
        transactionType: 'WITHDRAWAL',
        status: 'COMPLETED',
        createdAt: new Date().toISOString(),
        completedAt: new Date().toISOString()
      }
      
      mockTransactions.unshift(newTransaction)
      return { data: newTransaction }
    }
  },

  // Admin functions
  admin: {
    getAllUsers: async () => {
      await delay()
      return { data: mockUsers }
    },
    
    promoteUser: async (userId) => {
      await delay()
      const user = mockUsers.find(u => u.id === userId)
      if (user) {
        user.role = 'ADMIN'
      }
      return { data: { message: 'User promoted successfully' } }
    },
    
    deactivateUser: async (userId) => {
      await delay()
      const user = mockUsers.find(u => u.id === userId)
      if (user) {
        user.enabled = false
      }
      return { data: { message: 'User deactivated successfully' } }
    },
    
    getAuditLogs: async () => {
      await delay()
      return { data: mockAuditLogs }
    }
  },

  // Health check
  health: async () => {
    await delay(100)
    return { 
      data: { 
        status: 'UP', 
        message: 'Mock API is running',
        timestamp: new Date().toISOString()
      } 
    }
  }
}
