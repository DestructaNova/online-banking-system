import React from 'react'
import { Alert, AlertTitle } from '@mui/material'
import { Info } from '@mui/icons-material'

const DemoBanner = () => {
  return (
    <Alert 
      severity="info" 
      icon={<Info />}
      sx={{ 
        mb: 2, 
        backgroundColor: '#e3f2fd',
        border: '1px solid #2196f3',
        '& .MuiAlert-message': {
          width: '100%'
        }
      }}
    >
      <AlertTitle sx={{ fontWeight: 'bold', color: '#1976d2' }}>
        🎉 Demo Mode - Live Banking System Showcase
      </AlertTitle>
      <div style={{ color: '#1565c0' }}>
        <strong>This is a fully functional demo with mock data.</strong> Try these features:
        <br />
        • <strong>Login:</strong> admin/admin123 (Admin) or demo/demo123 (User)
        • <strong>Banking:</strong> View accounts, make transfers, check transactions
        • <strong>Admin Panel:</strong> Manage users, view audit logs (admin only)
        • <strong>All features work!</strong> Data persists during your session
      </div>
    </Alert>
  )
}

export default DemoBanner
