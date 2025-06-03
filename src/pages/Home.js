import { Box, Container, Heading, Text, SimpleGrid, Icon, Button, VStack, Image } from '@chakra-ui/react'
import { FaHospital, FaFirstAid, FaMobileAlt } from 'react-icons/fa'
import { Link as RouterLink } from 'react-router-dom'

function Home() {
  return (
    <Container maxW="container.xl" py={10}>
      <VStack spacing={8} textAlign="center">
        <Box>
          <Heading as="h1" size="2xl" mb={4} color="green.600">
            Welcome to Rescue Guide
          </Heading>
          <Text fontSize="xl" color="gray.600">
            Your Comprehensive Emergency Response and First Aid Resource
          </Text>
        </Box>

        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} py={10}>
          <Box p={6} boxShadow="lg" borderRadius="lg" bg="white">
            <Icon as={FaFirstAid} w={10} h={10} color="green.500" mb={4} />
            <Heading as="h3" size="md" mb={3}>
              First Aid Guidelines
            </Heading>
            <Text color="gray.600" mb={4}>
              Access comprehensive first aid instructions for various emergency situations
            </Text>
            <Button as={RouterLink} to="/guidelines" colorScheme="green">
              View Guidelines
            </Button>
          </Box>

          <Box p={6} boxShadow="lg" borderRadius="lg" bg="white">
            <Icon as={FaHospital} w={10} h={10} color="green.500" mb={4} />
            <Heading as="h3" size="md" mb={3}>
              For Hospitals
            </Heading>
            <Text color="gray.600" mb={4}>
              Register your hospital and connect with emergency services
            </Text>
            <Button as={RouterLink} to="/hospital-register" colorScheme="green">
              Register Hospital
            </Button>
          </Box>

          <Box p={6} boxShadow="lg" borderRadius="lg" bg="white">
            <Icon as={FaMobileAlt} w={10} h={10} color="green.500" mb={4} />
            <Heading as="h3" size="md" mb={3}>
              Mobile App
            </Heading>
            <Text color="gray.600" mb={4}>
              Download our mobile app for advanced features and offline access
            </Text>
            <Button as={RouterLink} to="/about" colorScheme="green">
              Learn More
            </Button>
          </Box>
        </SimpleGrid>

        <Box maxW="container.md" textAlign="center">
          <Heading as="h2" size="lg" mb={4} color="green.600">
            Why Choose Rescue Guide?
          </Heading>
          <Text fontSize="lg" color="gray.600" mb={6}>
            Rescue Guide provides essential emergency response tools and first aid guidelines,
            helping you make critical decisions when every second counts. With our mobile app,
            you'll have expert guidance at your fingertips, even without an internet connection.
          </Text>
        </Box>

        <Box bg="gray.50" p={8} borderRadius="lg" w="full">
          <Heading as="h3" size="lg" mb={4} color="green.600">
            Download Our Mobile App
          </Heading>
          <Text fontSize="md" color="gray.600" mb={6}>
            Get access to advanced features including:
          </Text>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} maxW="container.md" mx="auto">
            <Box>
              <Text fontSize="md" mb={2}>✓ Offline First Aid Guidelines</Text>
              <Text fontSize="md" mb={2}>✓ Emergency Contact Management</Text>
              <Text fontSize="md" mb={2}>✓ Location-based Hospital Finder</Text>
            </Box>
            <Box>
              <Text fontSize="md" mb={2}>✓ Interactive First Aid Tutorials</Text>
              <Text fontSize="md" mb={2}>✓ Emergency Alert System</Text>
              <Text fontSize="md" mb={2}>✓ Multi-language Support</Text>
            </Box>
          </SimpleGrid>
        </Box>
      </VStack>
    </Container>
  )
}

export default Home 