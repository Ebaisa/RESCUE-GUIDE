import React, { useState, useEffect } from 'react'
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Text,
  useToast,
  FormErrorMessage,
  Image,
  Link,
  useColorModeValue,
  Alert,
  AlertIcon,
  AlertDescription,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

// Add base URL for the backend
const API_BASE_URL = 'https://eba.onrender.com'

// Configure axios defaults
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.timeout = 10000; // 10 seconds timeout

function HospitalRegister() {
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    password: '',
    photo: null,
  })
  const [location, setLocation] = useState(null)
  const [locationError, setLocationError] = useState('')
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [previewImage, setPreviewImage] = useState(null)
  const toast = useToast()
  const navigate = useNavigate()

  useEffect(() => {
    // Get user's location when component mounts
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude.toString(),
            longitude: position.coords.longitude.toString()
          });
          setLocationError('');
        },
        (error) => {
          console.error('Error getting location:', error);
          setLocationError('Unable to get your location. Please enable location services.');
        }
      );
    } else {
      setLocationError('Geolocation is not supported by your browser.');
    }
  }, []);

  const validateEmail = (email) => {
    // RFC 5322 compliant email regex
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors = {}
    if (!formData.name) newErrors.name = 'Name is required'
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = 'Phone number is required'
    } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid 10-digit phone number'
    }
    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }
    if (!formData.photo) newErrors.photo = 'Photo is required'
    if (!location) newErrors.location = 'Location access is required for registration'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData((prev) => ({
        ...prev,
        photo: file,
      }))
      
      // Create preview URL
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewImage(reader.result)
      }
      reader.readAsDataURL(file)
    }
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
      const formDataToSend = new FormData()
      formDataToSend.append('photo', formData.photo)
      formDataToSend.append('name', formData.name)
      formDataToSend.append('phoneNumber', formData.phoneNumber)
      formDataToSend.append('email', formData.email)
      formDataToSend.append('password', formData.password)
      formDataToSend.append('latitude', location.latitude)
      formDataToSend.append('longitude', location.longitude)

      const response = await axios.post(`${API_BASE_URL}/Hospital-register/`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      })

      if (response.data.status === 200) {
        toast({
          title: 'Registration Successful',
          description: response.data.message,
          status: 'success',
          duration: 5000,
          isClosable: true,
        })
        navigate('/hospital-login')
      } else {
        throw new Error(response.data.message || 'Registration failed')
      }
    } catch (error) {
      let errorMessage = 'An error occurred during registration.'
      
      // Get the error message from the API response if available
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message
      } else if (error.message && !error.message.includes('status')) {
        errorMessage = error.message
      }

      toast({
        title: 'Registration Failed',
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
    <Box minH="100vh" bg={useColorModeValue('gray.50', 'gray.800')} py={10}>
      <Container maxW="container.sm">
        <Box 
          p={8} 
          borderWidth={1} 
          borderRadius={8} 
          boxShadow="lg"
          bg={useColorModeValue('white', 'gray.700')}
        >
          <VStack spacing={6} as="form" onSubmit={handleSubmit}>
            <Heading size="lg">Hospital Registration</Heading>

            {locationError && (
              <Alert status="warning">
                <AlertIcon />
                <AlertDescription>{locationError}</AlertDescription>
              </Alert>
            )}
            
            <FormControl isInvalid={errors.name}>
              <FormLabel>Hospital Name</FormLabel>
              <Input
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter hospital name"
              />
              <FormErrorMessage>{errors.name}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.phoneNumber}>
              <FormLabel>Phone Number</FormLabel>
              <Input
                name="phoneNumber"
                type="tel"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                placeholder="Enter phone number"
              />
              <FormErrorMessage>{errors.phoneNumber}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.email}>
              <FormLabel>Email</FormLabel>
              <Input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter email address"
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
                placeholder="Enter password"
              />
              <FormErrorMessage>{errors.password}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.photo}>
              <FormLabel>Hospital Photo</FormLabel>
              <Input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                p={1}
              />
              <FormErrorMessage>{errors.photo}</FormErrorMessage>
            </FormControl>

            {previewImage && (
              <Box>
                <Image
                  src={previewImage}
                  alt="Preview"
                  maxH="200px"
                  objectFit="contain"
                />
              </Box>
            )}

            <Text fontSize="sm" color="gray.600">
              Your location will be automatically determined during registration.
            </Text>

            <Button
              colorScheme="blue"
              width="full"
              type="submit"
              isLoading={isLoading}
              loadingText="Registering..."
              isDisabled={!location || !!locationError}
            >
              Register
            </Button>

            <Text fontSize="sm">
              Already have an account? {' '}
              <Link color="blue.500" href="/hospital-login">
                Login here
              </Link>
            </Text>
          </VStack>
        </Box>
      </Container>
    </Box>
  )
}

export default HospitalRegister 