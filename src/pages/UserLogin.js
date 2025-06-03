import React from 'react';
import { Container, Box, Heading, FormControl, FormLabel, Input, Button, VStack } from '@chakra-ui/react';

function UserLogin() {
  return (
    <Container maxW="container.sm" py={10}>
      <Box p={8} borderWidth={1} borderRadius={8} boxShadow="lg">
        <VStack spacing={4}>
          <Heading>User Login</Heading>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input type="email" placeholder="Enter your email" />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input type="password" placeholder="Enter your password" />
          </FormControl>
          <Button colorScheme="green" width="full">
            Login
          </Button>
        </VStack>
      </Box>
    </Container>
  );
}

export default UserLogin; 