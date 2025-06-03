import { Box, Container, Stack, Text, Link } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'

function Footer() {
  return (
    <Box bg="gray.50" color="gray.700" mt="auto">
      <Container maxW="container.xl" py={4}>
        <Stack
          direction={{ base: 'column', md: 'row' }}
          spacing={4}
          justify="space-between"
          align="center"
        >
          <Stack direction="row" spacing={2} align="center">
            <Text>© 2024 EBA Healthcare.</Text>
            <Text>All rights reserved.</Text>
            <Link 
              as={RouterLink} 
              to="/admin/login" 
              color="gray.500" 
              fontSize="sm"
              _hover={{ color: 'gray.600', textDecoration: 'none' }}
            >
              ·
            </Link>
          </Stack>
          
          <Stack direction="row" spacing={6}>
            <Link as={RouterLink} to="/about" color="green.600">
              About
            </Link>
            <Link as={RouterLink} to="/contact" color="green.600">
              Contact
            </Link>
            <Link as={RouterLink} to="/privacy" color="green.600">
              Privacy Policy
            </Link>
            <Link as={RouterLink} to="/terms" color="green.600">
              Terms of Service
            </Link>
          </Stack>
        </Stack>
      </Container>
    </Box>
  )
}

export default Footer 