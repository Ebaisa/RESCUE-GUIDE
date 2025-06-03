import React from 'react';
import { Container, Heading, Text, Box, SimpleGrid, Button, VStack } from '@chakra-ui/react';

function UserDashboard() {
  return (
    <Container maxW="container.xl" py={10}>
      <Heading mb={6}>User Dashboard</Heading>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
        <Box p={6} borderWidth={1} borderRadius={8} boxShadow="lg">
          <VStack align="start" spacing={4}>
            <Heading size="md">Find Hospital Beds</Heading>
            <Text>Search for available hospital beds in your area.</Text>
            <Button colorScheme="green">Search Beds</Button>
          </VStack>
        </Box>
        <Box p={6} borderWidth={1} borderRadius={8} boxShadow="lg">
          <VStack align="start" spacing={4}>
            <Heading size="md">My Bookings</Heading>
            <Text>View and manage your bed bookings.</Text>
            <Button colorScheme="blue">View Bookings</Button>
          </VStack>
        </Box>
      </SimpleGrid>
      <Box mt={10}>
        <Text fontSize="lg">Welcome to your dashboard. Here you can search for hospital beds and manage your bookings.</Text>
      </Box>
    </Container>
  );
}

export default UserDashboard; 