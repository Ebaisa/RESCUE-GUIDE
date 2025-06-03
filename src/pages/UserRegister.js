import React from 'react';
import { Container, Box, Heading, FormControl, FormLabel, Input, Button, VStack } from '@chakra-ui/react';

function UserRegister() {
  return (
    <Container maxW="container.sm" py={10}>
      <Box p={8} borderWidth={1} borderRadius={8} boxShadow="lg">
        <VStack spacing={4}>
          <Heading>User Registration</Heading>
          <FormControl>
            <FormLabel>Full Name</FormLabel>
            <Input type="text" placeholder="Enter your full name" />
          </FormControl>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input type="email" placeholder="Enter your email" />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input type="password" placeholder="Enter your password" />
          </FormControl>
          <FormControl>
            <FormLabel>Confirm Password</FormLabel>
            <Input type="password" placeholder="Confirm your password" />
          </FormControl>
          <Button colorScheme="green" width="full">
            Register
          </Button>
        </VStack>
      </Box>
    </Container>
  );
}

export default UserRegister; 