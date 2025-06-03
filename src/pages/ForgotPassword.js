import React, { useState } from 'react';
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
  Spinner,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_BASE_URL = 'https://eba.onrender.com';

function ForgotPassword() {
  const [step, setStep] = useState(1); // 1: Email, 2: Verification, 3: New Password
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [userId, setUserId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const toast = useToast();
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(email);
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setErrors({ email: 'Please enter a valid email address' });
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/forgot-password/`, {
        params: {
          email: email
        }
      });

      if (response.data.status === 200) {
        setUserId(response.data.userId);
        setStep(2);
        toast({
          title: 'Success',
          description: response.data.message,
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          title: 'Error',
          description: response.data.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      let errorMessage = 'An error occurred. Please try again.';
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }

      toast({
        title: 'Error',
        description: errorMessage,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerificationSubmit = async (e) => {
    e.preventDefault();
    if (!code) {
      setErrors({ code: 'Please enter the verification code' });
      return;
    }

    if (!newPassword) {
      setErrors({ newPassword: 'Please enter a new password' });
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/new-password/`, {
        params: {
          userId: userId,
          code: code,
          newPassword: newPassword
        }
      });

      if (response.data.status === 200) {
        toast({
          title: 'Success',
          description: response.data.message,
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        navigate('/hospital-login');
      } else {
        toast({
          title: 'Error',
          description: response.data.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      let errorMessage = 'An error occurred. Please try again.';
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }

      toast({
        title: 'Error',
        description: errorMessage,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (!validateEmail(email)) {
      setErrors({ email: 'Please enter a valid email address' });
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/forgot-password/`, {
        params: {
          email: email
        }
      });

      if (response.data.status === 200) {
        toast({
          title: 'Success',
          description: response.data.message,
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          title: 'Error',
          description: response.data.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      let errorMessage = 'An error occurred. Please try again.';
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }

      toast({
        title: 'Error',
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
    <Container maxW="container.sm" py={10}>
      <Box p={8} borderWidth={1} borderRadius={8} boxShadow="lg">
        <VStack spacing={4} as="form" onSubmit={step === 1 ? handleEmailSubmit : handleVerificationSubmit}>
          <Heading size="lg">Forgot Password</Heading>

          {step === 1 && (
            <>
              <FormControl isInvalid={errors.email}>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                />
                <FormErrorMessage>{errors.email}</FormErrorMessage>
              </FormControl>

              <Button
                colorScheme="blue"
                width="full"
                type="submit"
                isLoading={isLoading}
                loadingText="Sending..."
              >
                Send Verification Code
              </Button>
            </>
          )}

          {step === 2 && (
            <>
              <FormControl isInvalid={errors.code}>
                <FormLabel>Verification Code</FormLabel>
                <Input
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Enter verification code"
                />
                <FormErrorMessage>{errors.code}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.newPassword}>
                <FormLabel>New Password</FormLabel>
                <Input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                />
                <FormErrorMessage>{errors.newPassword}</FormErrorMessage>
              </FormControl>

              <Button
                colorScheme="blue"
                width="full"
                type="submit"
                isLoading={isLoading}
                loadingText="Verifying..."
              >
                Reset Password
              </Button>

              <Button
                variant="ghost"
                width="full"
                onClick={handleResendCode}
                isLoading={isLoading}
                loadingText="Sending..."
              >
                Resend Code
              </Button>
            </>
          )}

          <Text fontSize="sm">
            Remember your password?{' '}
            <Link
              color="blue.500"
              onClick={() => navigate('/hospital-login')}
              _hover={{ textDecoration: 'underline', cursor: 'pointer' }}
            >
              Login here
            </Link>
          </Text>
        </VStack>
      </Box>
    </Container>
  );
}

export default ForgotPassword; 