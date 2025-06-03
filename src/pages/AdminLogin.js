import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Box, 
  Heading, 
  FormControl, 
  FormLabel, 
  Input, 
  Button, 
  VStack,
  useToast,
  FormErrorMessage,
  Text,
  Link,
  useColorModeValue,
} from '@chakra-ui/react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const API_BASE_URL = 'https://eba.onrender.com';

function AdminLogin() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();
  const { setAdminUser, adminUser } = useAuth();

  const bgColor = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  // Redirect if already logged in
  useEffect(() => {
    if (adminUser) {
      navigate('/admin');
    }
  }, [adminUser, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      // Create form data
      const data = new FormData();
      data.append('email', formData.email);
      data.append('password', formData.password);

      // Make API call
      const response = await axios.post(`${API_BASE_URL}/admin-login/`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });

      if (response.data.status === 200) {
        const adminData = {
          userId: response.data.userId,
          name: response.data.name,
          email: response.data.email
        };

        // Update context and localStorage
        setAdminUser(adminData);
        localStorage.setItem('adminUser', JSON.stringify(adminData));

        toast({
          title: 'Login Successful',
          description: 'Welcome to the admin dashboard',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        
        // Navigate to admin dashboard
        navigate('/admin');
      } else {
        throw new Error(response.data.message || 'Login failed');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'An error occurred during login';
      toast({
        title: 'Login Failed',
        description: errorMessage,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.50', 'gray.800')} py={10}>
      <Container maxW="container.sm">
        <Box 
          p={8} 
          borderWidth={1} 
          borderRadius={8} 
          boxShadow="lg"
          bg={bgColor}
          borderColor={borderColor}
        >
          <VStack spacing={6} as="form" onSubmit={handleSubmit}>
            <Heading size="lg" color={useColorModeValue('gray.800', 'white')}>
              Admin Login
            </Heading>
            
            <FormControl isInvalid={errors.email}>
              <FormLabel color={useColorModeValue('gray.700', 'gray.200')}>
                Email
              </FormLabel>
              <Input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                bg={useColorModeValue('white', 'gray.800')}
              />
              <FormErrorMessage>{errors.email}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.password}>
              <FormLabel color={useColorModeValue('gray.700', 'gray.200')}>
                Password
              </FormLabel>
              <Input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                bg={useColorModeValue('white', 'gray.800')}
              />
              <FormErrorMessage>{errors.password}</FormErrorMessage>
            </FormControl>

            <Button
              colorScheme="blue"
              width="full"
              type="submit"
              isLoading={isLoading}
              loadingText="Logging in..."
              size="lg"
            >
              Login
            </Button>

            <Text fontSize="sm" color={useColorModeValue('gray.600', 'gray.300')}>
              Not an admin? {' '}
              <Link color="blue.500" href="/hospital-login">
                Login as Hospital
              </Link>
            </Text>
          </VStack>
        </Box>
      </Container>
    </Box>
  );
}

export default AdminLogin; 