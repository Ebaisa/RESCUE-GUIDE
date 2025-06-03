import React, { useState } from 'react'
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  useToast,
  FormErrorMessage,
  Text,
  Link,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const API_BASE_URL = 'https://eba.onrender.com'

function HospitalLogin() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast()
  const navigate = useNavigate()

  const validateEmail = (email) => {
    // RFC 5322 compliant email regex
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors = {}
    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    if (!formData.password) {
      newErrors.password = 'Password is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all required fields correctly.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
      return
    }

    setIsLoading(true)
    
    try {
      console.log('Attempting login...')
      const formDataToSend = new FormData()
      formDataToSend.append('email', formData.email)
      formDataToSend.append('password', formData.password)

      const response = await axios.post(`${API_BASE_URL}/Hospital-login/`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      })

      console.log('Login response:', response.data)

      if (response.data.status === 200) {
        const userData = {
          userId: response.data.userId,
          name: response.data.name,
          email: response.data.email,
          photoUrl: response.data.photoUrl,
          phoneNumber: response.data.phoneNumber,
          latitude: response.data.latitude,
          longitude: response.data.longitude,
        }
        
        console.log('Saving user data:', userData)
        localStorage.setItem('hospitalUser', JSON.stringify(userData))

        toast({
          title: 'Login Successful',
          description: response.data.message,
          status: 'success',
          duration: 5000,
          isClosable: true,
        })

        console.log('Navigating to dashboard...')
        navigate('/hospital-dashboard');
      } else if (response.data.status === 401 && response.data.message.includes('Email not verified')) {
        // Redirect to verification page if email is not verified
        navigate('/verify');
      } else {
        throw new Error(response.data.message || 'Login failed')
      }
    } catch (error) {
      console.error('Login error:', error)
      let errorMessage = 'An error occurred during login.'
      
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message
      } else if (error.message && !error.message.includes('status')) {
        errorMessage = error.message
      }

      toast({
        title: 'Login Failed',
        description: errorMessage,
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Container maxW="container.sm" py={10}>
      <Box p={8} borderWidth={1} borderRadius={8} boxShadow="lg">
        <VStack spacing={4} as="form" onSubmit={handleSubmit}>
          <Heading>Hospital Login</Heading>
          
          <FormControl isInvalid={errors.email}>
            <FormLabel>Email</FormLabel>
            <Input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email address"
            />
            <FormErrorMessage>{errors.email}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.password}>
            <FormLabel>Password</FormLabel>
            <Input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
            />
            <FormErrorMessage>{errors.password}</FormErrorMessage>
          </FormControl>

          <Button
            colorScheme="blue"
            width="full"
            type="submit"
            isLoading={isLoading}
            loadingText="Logging in..."
          >
            Login
          </Button>

          <Text fontSize="sm">
            Don't have an account?{' '}
            <Link
              color="blue.500"
              onClick={() => navigate('/hospital-register')}
              _hover={{ textDecoration: 'underline', cursor: 'pointer' }}
            >
              Register here
            </Link>
          </Text>
          <Text fontSize="sm">
            <Link
              color="blue.500"
              onClick={() => navigate('/forgot-password')}
              _hover={{ textDecoration: 'underline', cursor: 'pointer' }}
            >
              Forgot Password?
            </Link>
          </Text>
        </VStack>
      </Box>
    </Container>
  )
}

export default HospitalLogin 