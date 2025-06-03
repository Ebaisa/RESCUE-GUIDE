import { createContext, useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { hospitalAPI, userAPI, adminAPI } from '../services/api'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    const token = localStorage.getItem('token')
    const userType = localStorage.getItem('userType')

    if (token) {
      try {
        let response
        switch (userType) {
          case 'hospital':
            response = await hospitalAPI.getProfile()
            break
          case 'user':
            response = await userAPI.getProfile()
            break
          case 'admin':
            // Assuming admin profile endpoint exists
            response = { data: { role: 'admin' } }
            break
          default:
            throw new Error('Invalid user type')
        }
        setUser({ ...response.data, type: userType })
      } catch (error) {
        console.error('Auth check failed:', error)
        logout()
      }
    }
    setLoading(false)
  }

  const login = async (credentials, type) => {
    try {
      let response
      switch (type) {
        case 'hospital':
          response = await hospitalAPI.login(credentials)
          break
        case 'user':
          response = await userAPI.login(credentials)
          break
        case 'admin':
          response = await adminAPI.login(credentials)
          break
        default:
          throw new Error('Invalid login type')
      }

      const { token, ...userData } = response.data
      localStorage.setItem('token', token)
      localStorage.setItem('userType', type)
      setUser({ ...userData, type })

      // Redirect based on user type
      switch (type) {
        case 'hospital':
          navigate('/hospital/dashboard')
          break
        case 'user':
          navigate('/dashboard')
          break
        case 'admin':
          navigate('/admin/dashboard')
          break
      }
    } catch (error) {
      console.error('Login failed:', error)
      throw error
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userType')
    setUser(null)
    navigate('/')
  }

  const value = {
    user,
    loading,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export default AuthContext 