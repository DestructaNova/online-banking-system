import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { toast } from 'react-toastify'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Lock, User, CreditCard, Shield, TrendingUp } from 'lucide-react'

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const { login } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      await login(formData.username, formData.password)
      toast.success('Welcome back! 🎉')
      navigate('/dashboard')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Professional Banking Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900"></div>

      {/* Animated Geometric Shapes */}
      <div className="absolute top-20 left-20 float">
        <div className="w-32 h-32 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-3xl backdrop-blur-sm transform rotate-12"></div>
      </div>
      <div className="absolute top-40 right-32 float" style={{ animationDelay: '2s' }}>
        <div className="w-24 h-24 bg-gradient-to-r from-green-400/20 to-blue-400/20 rounded-2xl backdrop-blur-sm transform -rotate-12"></div>
      </div>
      <div className="absolute bottom-32 left-40 float" style={{ animationDelay: '4s' }}>
        <div className="w-20 h-20 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-xl backdrop-blur-sm transform rotate-45"></div>
      </div>
      <div className="absolute top-1/2 left-10 float" style={{ animationDelay: '1s' }}>
        <div className="w-16 h-16 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-full backdrop-blur-sm"></div>
      </div>
      <div className="absolute bottom-20 right-20 float" style={{ animationDelay: '3s' }}>
        <div className="w-28 h-28 bg-gradient-to-r from-indigo-400/20 to-cyan-400/20 rounded-2xl backdrop-blur-sm transform -rotate-6"></div>
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left Side - Professional Branding */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white space-y-10"
          >
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.8 }}
                className="flex items-center space-x-4"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-xl flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold">SecureBank Pro</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-5xl lg:text-7xl font-bold leading-tight"
              >
                Next-Gen
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500">
                  Digital Banking
                </span>
                <span className="block text-3xl lg:text-4xl font-medium text-blue-200 mt-2">
                  Built for Tomorrow
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-xl text-blue-100 leading-relaxed max-w-lg"
              >
                Experience enterprise-grade banking with AI-powered fraud detection,
                instant global transfers, and military-grade encryption. Your financial
                future starts here.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
              <div className="glass-card p-4 rounded-2xl flex items-center space-x-4 hover-lift">
                <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-xl flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Military-Grade Security</h3>
                  <p className="text-blue-200 text-sm">256-bit encryption</p>
                </div>
              </div>

              <div className="glass-card p-4 rounded-2xl flex items-center space-x-4 hover-lift">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">AI Analytics</h3>
                  <p className="text-blue-200 text-sm">Smart insights</p>
                </div>
              </div>

              <div className="glass-card p-4 rounded-2xl flex items-center space-x-4 hover-lift">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-xl flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Instant Transfers</h3>
                  <p className="text-blue-200 text-sm">Global payments</p>
                </div>
              </div>

              <div className="glass-card p-4 rounded-2xl flex items-center space-x-4 hover-lift">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center">
                  <Lock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Fraud Protection</h3>
                  <p className="text-blue-200 text-sm">24/7 monitoring</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side - Login Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-md mx-auto"
          >
            <div className="glass-card rounded-3xl p-10 shadow-2xl border border-white/20">
              <div className="text-center mb-10">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                  className="w-20 h-20 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg"
                >
                  <CreditCard className="w-10 h-10 text-white" />
                </motion.div>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-4xl font-bold text-white mb-3"
                >
                  Welcome Back
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-blue-200 text-lg"
                >
                  Access your secure banking portal
                </motion.p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="space-y-2"
                >
                  <label htmlFor="username" className="block text-sm font-medium text-blue-200 mb-2">
                    Username
                  </label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-300 group-focus-within:text-blue-400 transition-colors" />
                    <input
                      id="username"
                      type="text"
                      name="username"
                      required
                      className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                      placeholder="Enter your username"
                      value={formData.username}
                      onChange={handleChange}
                    />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="space-y-2"
                >
                  <label htmlFor="password" className="block text-sm font-medium text-blue-200 mb-2">
                    Password
                  </label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-300 group-focus-within:text-blue-400 transition-colors" />
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      required
                      className="w-full pl-12 pr-14 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-blue-300 hover:text-blue-400 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </motion.div>

                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-bold text-lg rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {loading ? (
                    <div className="flex items-center justify-center space-x-3">
                      <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Authenticating...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <span>Access Account</span>
                      <Lock className="w-5 h-5" />
                    </div>
                  )}
                </motion.button>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 }}
                  className="text-center space-y-6"
                >
                  <Link
                    to="/register"
                    className="text-blue-300 hover:text-blue-100 font-medium transition-colors text-lg"
                  >
                    New to SecureBank? Create Account →
                  </Link>

                  <div className="border-t border-white/20 pt-6">
                    <p className="text-blue-200 font-medium mb-4">Demo Access Credentials</p>
                    <div className="grid grid-cols-1 gap-3">
                      <div className="glass-card p-3 rounded-xl">
                        <div className="flex items-center justify-between">
                          <span className="text-blue-200 text-sm">👤 Standard User</span>
                          <span className="text-white font-mono text-sm">demo / demo123</span>
                        </div>
                      </div>
                      <div className="glass-card p-3 rounded-xl">
                        <div className="flex items-center justify-between">
                          <span className="text-blue-200 text-sm">👨‍💼 Administrator</span>
                          <span className="text-white font-mono text-sm">admin / admin123</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Login
