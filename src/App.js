import { ChakraProvider, Spinner, Center } from '@chakra-ui/react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import Guidelines from './pages/Guidelines'
import About from './pages/About'
import HospitalRegister from './pages/HospitalRegister'
import HospitalLogin from './pages/HospitalLogin'
import HospitalDashboard from './pages/HospitalDashboard'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import UserRegister from './pages/UserRegister'
import UserLogin from './pages/UserLogin'
import UserDashboard from './pages/UserDashboard'
import Verify from './pages/Verify'
import ForgotPassword from './pages/ForgotPassword'

// Protected Route Component
const ProtectedAdminRoute = ({ children }) => {
  const { adminUser, loading } = useAuth();
  
  if (loading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" color="blue.500" />
      </Center>
    );
  }
  
  if (!adminUser) {
    return <Navigate to="/admin-login" replace />;
  }
  
  return children;
};

function AppRoutes() {
  const { loading } = useAuth()

  if (loading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" color="green.500" />
      </Center>
    )
  }

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={
        <>
          <Navbar />
          <Home />
          <Footer />
        </>
      } />
      <Route path="/guidelines" element={
        <>
          <Navbar />
          <Guidelines />
          <Footer />
        </>
      } />
      <Route path="/about" element={
        <>
          <Navbar />
          <About />
          <Footer />
        </>
      } />
      
      {/* Hospital routes */}
      <Route path="/hospital-register" element={
        <>
          <Navbar />
          <HospitalRegister />
          <Footer />
        </>
      } />
      <Route path="/hospital-login" element={
        <>
          <Navbar />
          <HospitalLogin />
          <Footer />
        </>
      } />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/hospital-dashboard" element={<HospitalDashboard />} />
      
      {/* User routes */}
      <Route path="/user-register" element={
        <>
          <Navbar />
          <UserRegister />
          <Footer />
        </>
      } />
      <Route path="/user-login" element={
        <>
          <Navbar />
          <UserLogin />
          <Footer />
        </>
      } />
      <Route path="/dashboard" element={<UserDashboard />} />
      
      {/* Verification page route */}
      <Route path="/verify" element={<Verify />} />
      
      {/* Admin routes */}
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route 
        path="/admin" 
        element={
          <ProtectedAdminRoute>
            <AdminDashboard />
          </ProtectedAdminRoute>
        } 
      />

      {/* Catch-all redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

function App() {
  return (
    <ChakraProvider>
      <Router>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </Router>
    </ChakraProvider>
  )
}

export default App 