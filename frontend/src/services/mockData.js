// Mock data for demo purposes
export const mockUsers = [
  {
    id: 1,
    username: 'admin',
    email: 'admin@banking.com',
    firstName: 'System',
    lastName: 'Administrator',
    phoneNumber: '1234567890',
    role: 'ADMIN',
    enabled: true,
    createdAt: '2024-01-01T00:00:00'
  },
  {
    id: 2,
    username: 'demo',
    email: 'demo@banking.com',
    firstName: 'Demo',
    lastName: 'User',
    phoneNumber: '9876543210',
    role: 'USER',
    enabled: true,
    createdAt: '2024-01-15T00:00:00'
  },
  {
    id: 3,
    username: 'john_doe',
    email: 'john@example.com',
    firstName: 'John',
    lastName: 'Doe',
    phoneNumber: '5551234567',
    role: 'USER',
    enabled: true,
    createdAt: '2024-02-01T00:00:00'
  },
  {
    id: 4,
    username: 'jane_smith',
    email: 'jane@example.com',
    firstName: 'Jane',
    lastName: 'Smith',
    phoneNumber: '5559876543',
    role: 'USER',
    enabled: false,
    createdAt: '2024-02-15T00:00:00'
  }
]

export const mockAccounts = [
  {
    id: 1,
    accountNumber: 'ACC001234567890',
    accountType: 'SAVINGS',
    balance: 15750.50,
    userId: 2,
    createdAt: '2024-01-15T00:00:00',
    isActive: true
  },
  {
    id: 2,
    accountNumber: 'ACC001234567891',
    accountType: 'CHECKING',
    balance: 3250.75,
    userId: 2,
    createdAt: '2024-01-15T00:00:00',
    isActive: true
  },
  {
    id: 3,
    accountNumber: 'ACC001234567892',
    accountType: 'SAVINGS',
    balance: 25000.00,
    userId: 3,
    createdAt: '2024-02-01T00:00:00',
    isActive: true
  }
]

export const mockTransactions = [
  {
    id: 1,
    fromAccountNumber: 'ACC001234567890',
    toAccountNumber: 'ACC001234567891',
    amount: 500.00,
    description: 'Transfer to checking',
    transactionType: 'TRANSFER',
    status: 'COMPLETED',
    createdAt: '2024-06-13T10:30:00',
    completedAt: '2024-06-13T10:30:01'
  },
  {
    id: 2,
    fromAccountNumber: null,
    toAccountNumber: 'ACC001234567890',
    amount: 2000.00,
    description: 'Salary deposit',
    transactionType: 'DEPOSIT',
    status: 'COMPLETED',
    createdAt: '2024-06-12T09:00:00',
    completedAt: '2024-06-12T09:00:01'
  },
  {
    id: 3,
    fromAccountNumber: 'ACC001234567891',
    toAccountNumber: null,
    amount: 150.00,
    description: 'ATM withdrawal',
    transactionType: 'WITHDRAWAL',
    status: 'COMPLETED',
    createdAt: '2024-06-11T14:20:00',
    completedAt: '2024-06-11T14:20:01'
  },
  {
    id: 4,
    fromAccountNumber: 'ACC001234567890',
    toAccountNumber: 'ACC001234567892',
    amount: 1000.00,
    description: 'Transfer to John Doe',
    transactionType: 'TRANSFER',
    status: 'COMPLETED',
    createdAt: '2024-06-10T16:45:00',
    completedAt: '2024-06-10T16:45:02'
  },
  {
    id: 5,
    fromAccountNumber: 'ACC001234567891',
    toAccountNumber: null,
    amount: 75.50,
    description: 'Online purchase',
    transactionType: 'WITHDRAWAL',
    status: 'COMPLETED',
    createdAt: '2024-06-09T11:15:00',
    completedAt: '2024-06-09T11:15:01'
  }
]

export const mockAuditLogs = [
  {
    id: 1,
    action: 'USER_LOGIN',
    username: 'demo',
    details: 'User logged in successfully',
    ipAddress: '192.168.1.100',
    timestamp: '2024-06-13T08:30:00'
  },
  {
    id: 2,
    action: 'TRANSFER_CREATED',
    username: 'demo',
    details: 'Transfer of $500.00 from ACC001234567890 to ACC001234567891',
    ipAddress: '192.168.1.100',
    timestamp: '2024-06-13T10:30:00'
  },
  {
    id: 3,
    action: 'USER_PROMOTED',
    username: 'admin',
    details: 'User john_doe promoted to ADMIN role',
    ipAddress: '192.168.1.50',
    timestamp: '2024-06-12T15:20:00'
  },
  {
    id: 4,
    action: 'ACCOUNT_CREATED',
    username: 'jane_smith',
    details: 'New SAVINGS account created',
    ipAddress: '192.168.1.200',
    timestamp: '2024-06-11T09:45:00'
  },
  {
    id: 5,
    action: 'USER_DEACTIVATED',
    username: 'admin',
    details: 'User jane_smith account deactivated',
    ipAddress: '192.168.1.50',
    timestamp: '2024-06-10T13:10:00'
  }
]

// Mock authentication token
export const mockAuthToken = 'mock-jwt-token-for-demo-purposes'

// Mock user sessions
export const mockSessions = {
  admin: {
    id: 1,
    username: 'admin',
    email: 'admin@banking.com',
    firstName: 'System',
    lastName: 'Administrator',
    role: 'ADMIN',
    token: mockAuthToken
  },
  demo: {
    id: 2,
    username: 'demo',
    email: 'demo@banking.com',
    firstName: 'Demo',
    lastName: 'User',
    role: 'USER',
    token: mockAuthToken
  }
}
