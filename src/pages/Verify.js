import React, { useEffect, useState } from 'react';
import { Box, Heading, Text, VStack, Container, Input, Button, HStack, Spinner } from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Verify() {
  const [email, setEmail] = useState('');
  const [userId, setUserId] = useState('');
  const [code, setCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setEmail(localStorage.getItem('verificationEmail') || '');
    setUserId(localStorage.getItem('verificationUserId') || '');
  }, []);

  const handleVerify = async () => {
    setIsVerifying(true);
    try {
      console.log(code.toString())
      const response = await axios.get('https://eba.onrender.com/email-verify', {
        params: {
          userId: userId,
          code: code.toString(),
          email: email
        }
      });
      console.log(response.data.status)
      if (response.data.status === 200) {
        // Redirect to login page on successful verification
        navigate('/hospital-login');
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      alert('Error verifying email. Please try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleSendAgain = async () => {
    try {
      const response = await axios.get('https://eba.onrender.com/get-code', {
        params: {
          userId: userId,
          email: email
        }
      });
      if (response.data.status === 200) {
        alert(response.data.message);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      alert('Error sending verification code. Please try again.');
    }
  };

  return (
    <Container maxW="container.md" py={10}>
      <VStack spacing={4} align="stretch">
        <Heading>Verify Your Email</Heading>
        <Input
          placeholder="Enter verification code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <HStack spacing={4}>
          <Button colorScheme="blue" onClick={handleVerify} isLoading={isVerifying}>
            {isVerifying ? <Spinner size="sm" /> : 'Verify'}
          </Button>
          <Button onClick={handleSendAgain}>Send Again</Button>
        </HStack>
      </VStack>
    </Container>
  );
}

export default Verify; 