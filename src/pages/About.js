import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Button,
  Image,
  VStack,
  HStack,
  Icon,
  Divider,
} from '@chakra-ui/react'
import { FaGooglePlay, FaApple, FaStar, FaDownload, FaUsers } from 'react-icons/fa'

function About() {
  return (
    <Container maxW="container.xl" py={10}>
      <VStack spacing={12}>
        {/* Hero Section */}
        <Box textAlign="center">
          <Heading as="h1" size="2xl" color="green.600" mb={4}>
            About Rescue Guide
          </Heading>
          <Text fontSize="xl" color="gray.600" maxW="container.md" mx="auto">
            Empowering everyone with life-saving knowledge and immediate access to emergency resources
          </Text>
        </Box>

        {/* Mission Section */}
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} w="full">
          <Box>
            <Heading as="h2" size="lg" mb={6}>
              Our Mission
            </Heading>
            <Text fontSize="lg" color="gray.600" mb={4}>
              Rescue Guide was created with a simple but powerful mission: to make emergency
              response knowledge accessible to everyone, everywhere.
            </Text>
            <Text fontSize="lg" color="gray.600">
              We believe that immediate access to first aid guidelines and emergency resources
              can make the difference between life and death in critical situations.
            </Text>
          </Box>
          <Box>
            <HStack spacing={8} mb={6}>
              <VStack align="center">
                <Icon as={FaUsers} w={10} h={10} color="green.500" />
                <Text fontWeight="bold">100,000+</Text>
                <Text>Active Users</Text>
              </VStack>
              <VStack align="center">
                <Icon as={FaStar} w={10} h={10} color="green.500" />
                <Text fontWeight="bold">4.8/5</Text>
                <Text>User Rating</Text>
              </VStack>
              <VStack align="center">
                <Icon as={FaDownload} w={10} h={10} color="green.500" />
                <Text fontWeight="bold">50,000+</Text>
                <Text>Downloads</Text>
              </VStack>
            </HStack>
          </Box>
        </SimpleGrid>

        <Divider />

        {/* Mobile App Section */}
        <Box w="full" bg="gray.50" p={10} borderRadius="lg">
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} alignItems="center">
            <Box>
              <Heading as="h2" size="lg" mb={6}>
                Download Our Mobile App
              </Heading>
              <Text fontSize="lg" mb={6}>
                Get instant access to comprehensive first aid guidelines, emergency services,
                and life-saving features – all available offline.
              </Text>
              <VStack spacing={4} align="stretch">
                <Text fontSize="md" mb={2}>✓ Offline Access to All Guidelines</Text>
                <Text fontSize="md" mb={2}>✓ Interactive First Aid Tutorials</Text>
                <Text fontSize="md" mb={2}>✓ Emergency Services Locator</Text>
                <Text fontSize="md" mb={2}>✓ One-Touch Emergency Calls</Text>
                <Text fontSize="md" mb={2}>✓ Multi-language Support</Text>
              </VStack>
              <HStack spacing={4} mt={8}>
                <Button
                  leftIcon={<FaGooglePlay />}
                  colorScheme="green"
                  size="lg"
                  onClick={() => window.open('https://play.google.com')}
                >
                  Google Play
                </Button>
                <Button
                  leftIcon={<FaApple />}
                  colorScheme="green"
                  size="lg"
                  onClick={() => window.open('https://apps.apple.com')}
                >
                  App Store
                </Button>
              </HStack>
            </Box>
            <Box>
              {/* Replace with actual app screenshots */}
              <Image
                src="/app-preview.png"
                alt="Rescue Guide Mobile App"
                fallbackSrc="https://via.placeholder.com/300x600?text=App+Preview"
                borderRadius="lg"
                shadow="2xl"
              />
            </Box>
          </SimpleGrid>
        </Box>

        {/* Features Section */}
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} w="full">
          <Box textAlign="center" p={6}>
            <Heading as="h3" size="md" mb={4}>
              Comprehensive Guidelines
            </Heading>
            <Text color="gray.600">
              Detailed step-by-step instructions for various emergency situations,
              regularly updated by medical professionals.
            </Text>
          </Box>
          <Box textAlign="center" p={6}>
            <Heading as="h3" size="md" mb={4}>
              Hospital Integration
            </Heading>
            <Text color="gray.600">
              Direct connection with registered hospitals for real-time
              emergency response coordination.
            </Text>
          </Box>
          <Box textAlign="center" p={6}>
            <Heading as="h3" size="md" mb={4}>
              24/7 Availability
            </Heading>
            <Text color="gray.600">
              Access life-saving information anytime, anywhere, even without
              an internet connection.
            </Text>
          </Box>
        </SimpleGrid>
      </VStack>
    </Container>
  )
}

export default About 