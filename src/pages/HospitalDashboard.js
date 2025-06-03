import React, { useState, useEffect } from 'react'
import {
  Box,
  Container,
  VStack,
  HStack,
  Heading,
  Text,
  Button,
  useToast,
  Avatar,
  Divider,
  Badge,
  Card,
  CardHeader,
  CardBody,
  SimpleGrid,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Flex,
  Spacer,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Spinner,
  Center,
  Image,
  Grid,
  GridItem,
  Stack,
  Circle,
  useColorModeValue,
  Tooltip,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  List,
  ListItem,
  ListIcon,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { FiLogOut, FiUser, FiBell, FiMapPin, FiMail, FiPhone, FiAward, FiWifi, FiWifiOff, FiCalendar, FiDroplet, FiAlertCircle, FiHome } from 'react-icons/fi'
import { MdLocalHospital } from 'react-icons/md'
import axios from 'axios'
import SOSDataTable from '../components/SOSDataTable'
import WebSocketService from '../services/WebSocketService'

const API_BASE_URL = 'https://eba.onrender.com'

function HospitalDashboard() {
  const [hospitalInfo, setHospitalInfo] = useState(null)
  const [sosAlerts, setSosAlerts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [sosData, setSOSData] = useState([])
  const [wsConnected, setWsConnected] = useState(false)
  const [alertUserInfo, setAlertUserInfo] = useState({})
  const toast = useToast()
  const navigate = useNavigate()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selectedPatient, setSelectedPatient] = useState(null)
  const { 
    isOpen: isProfileOpen, 
    onOpen: onProfileOpen, 
    onClose: onProfileClose 
  } = useDisclosure()
  const { 
    isOpen: isPatientOpen, 
    onOpen: onPatientOpen, 
    onClose: onPatientClose 
  } = useDisclosure()

  const fetchSOSHistory = async (hospitalId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/get-sas-data/`, {
        params: {
          hospital_id: hospitalId
        }
      })

      if (response.data.status === 200) {
        setSOSData(response.data.sasData)
      } else if (response.data.status === 404) {
        setSOSData([])
        console.log('No SOS data available')
      } else {
        console.log('Unexpected response:', response.data)
        setSOSData([])
      }
    } catch (error) {
      console.error('Error fetching SOS data:', error)
      setSOSData([])
      toast({
        title: 'Error',
        description: 'Failed to fetch emergency history',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    }
  }

  const handleAcceptAlert = async (alertId) => {
    try {
      const alert = sosAlerts.find(a => a.id === alertId)
      if (!alert) return

      if (!hospitalInfo || !hospitalInfo.latitude || !hospitalInfo.longitude) {
        toast({
          title: 'Error',
          description: 'Hospital location information not found',
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
        return
      }

      // Create form data
      const formData = new FormData()
      formData.append('userId', alert.userId)
      formData.append('hospitalId', hospitalInfo.userId)

      // Save SOS data to database
      const response = await axios.post(`${API_BASE_URL}/save-sas-data/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      })

      if (response.data.status === 200) {
        // Create and send hospital location URL through WebSocket
        const locationUrl = `https://www.google.com/maps?q=${hospitalInfo.latitude},${hospitalInfo.longitude}`
        WebSocketService.sendMessage(alert.userId, locationUrl)
        
        // Remove the alert from active alerts
        setSosAlerts(prevAlerts => prevAlerts.filter(a => a.id !== alertId))

        // Refresh the history section
        await fetchSOSHistory(hospitalInfo.userId)

        toast({
          title: 'Alert Accepted',
          description: 'Emergency alert has been accepted and location sent.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
      } else {
        throw new Error(response.data.message || 'Failed to save emergency data')
      }
    } catch (error) {
      console.error('Error accepting alert:', error)
      toast({
        title: 'Error',
        description: 'Failed to accept the alert. Please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  useEffect(() => {
    const checkLoginAndLoadData = async () => {
      try {
        // Check if user is logged in
        const userInfo = localStorage.getItem('hospitalUser')
        console.log('Stored user info:', userInfo)

        if (!userInfo) {
          console.log('No user info found, redirecting to login')
          navigate('/hospital-login')
          return
        }

        const parsedUserInfo = JSON.parse(userInfo)
        console.log('Parsed user info:', parsedUserInfo)

        if (!parsedUserInfo || !parsedUserInfo.userId) {
          console.log('Invalid user info, redirecting to login')
          localStorage.removeItem('hospitalUser')
          navigate('/hospital-login')
          return
        }

        setHospitalInfo(parsedUserInfo)

        // Initialize WebSocket connection
        WebSocketService.setOnStatusChangeCallback((status) => {
          setWsConnected(status)
          if (!status) {
            setSosAlerts([])
          }
        })
        WebSocketService.setOnMessageCallback(handleWebSocketMessage)
        WebSocketService.connect(parsedUserInfo.userId)

        // Fetch initial SOS history
        await fetchSOSHistory(parsedUserInfo.userId)

      } catch (error) {
        console.error('Error loading dashboard:', error)
        toast({
          title: 'Error',
          description: 'Failed to load dashboard data. Please try logging in again.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
        navigate('/hospital-login')
      } finally {
        setIsLoading(false)
      }
    }

    checkLoginAndLoadData()

    return () => {
      WebSocketService.disconnect()
    }
  }, [navigate, toast])

  const fetchUserInfo = async (userId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/get-user-info/`, {
        params: { userId }
      })
      
      if (response.data.status === 200) {
        const userInfo = response.data.userInfo
        setAlertUserInfo(prev => ({
          ...prev,
          [userId]: userInfo
        }))
        return userInfo
      } else if (response.data.status === 404) {
        toast({
          title: 'Warning',
          description: 'User information not found',
          status: 'warning',
          duration: 5000,
          isClosable: true,
        })
        return null
      } else {
        throw new Error(response.data.message || 'Failed to fetch user information')
      }
    } catch (error) {
      console.error('Error fetching user info:', error)
      toast({
        title: 'Error',
        description: 'Failed to fetch user information',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
      return null
    }
  }

  const handleWebSocketMessage = async (message) => {
    console.log('Received WebSocket message:', message)
    
    // Check if the message is a system message
    if (message.detail) {
      toast({
        title: 'System Message',
        description: message.detail,
        status: 'info',
        duration: 5000,
        isClosable: true,
      })
      return
    }

    // Handle SOS alert message
    if (message.content && message.sender_type === 'user') {
      try {
        // First fetch user information
        const userInfo = await fetchUserInfo(message.sender_id)
        
        if (!userInfo) {
          // If we couldn't get user info, still show the alert but with limited information
          console.warn('Proceeding with alert without user information')
        }

        const newAlert = {
          id: Date.now(),
          userId: message.sender_id,
          location: message.content,
          timestamp: new Date().toISOString(),
          status: 'active',
          userInfo: userInfo || null // Store user info with the alert
        }

        setSosAlerts(prev => [...prev, newAlert])

        // Show toast with user information if available
        toast({
          title: 'New Emergency Alert',
          description: userInfo 
            ? `Emergency alert from ${userInfo.name} (${userInfo.gender}, ${calculateAge(userInfo.borndate)} years)`
            : `Emergency alert from User ID: ${message.sender_id}`,
          status: 'error',
          duration: null, // Don't auto-dismiss emergency alerts
          isClosable: true,
        })

        // Play an alert sound if available
        const audio = new Audio('/alert-sound.mp3') // Make sure you have this file
        try {
          await audio.play()
        } catch (error) {
          console.log('Audio alert not supported or enabled')
        }
      } catch (error) {
        console.error('Error processing emergency alert:', error)
        toast({
          title: 'Error',
          description: 'Error processing emergency alert',
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
      }
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('hospitalUser')
    navigate('/hospital-login')
    toast({
      title: 'Logged Out',
      description: 'You have been successfully logged out.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    })
  }

  const handleViewLocation = (alert) => {
    window.open(`https://www.google.com/maps?q=${alert.location.lat},${alert.location.lng}`, '_blank')
  }

  const handlePatientClick = (userInfo) => {
    setSelectedPatient(userInfo)
    onPatientOpen()
  }

  if (isLoading) {
    return (
      <Container maxW="container.xl" py={10}>
        <Center>
          <VStack spacing={4}>
            <Spinner size="xl" />
            <Text>Loading dashboard...</Text>
          </VStack>
        </Center>
      </Container>
    )
  }

  if (!hospitalInfo) {
    return (
      <Container maxW="container.xl" py={10}>
        <Center>
          <VStack spacing={4}>
            <Text>No hospital information found. Please log in again.</Text>
            <Button colorScheme="blue" onClick={() => navigate('/hospital-login')}>
              Go to Login
            </Button>
          </VStack>
        </Center>
      </Container>
    )
  }

  return (
    <Container maxW="container.xl" py={5}>
      {/* Header */}
      <Flex mb={8} align="center">
        <VStack align="start" spacing={0}>
          <HStack>
            <Heading size="lg">{hospitalInfo.name}</Heading>
            <Tooltip label={wsConnected ? 'Connected to Emergency Alert System' : 'Disconnected'}>
              <IconButton
                icon={wsConnected ? <FiWifi /> : <FiWifiOff />}
                aria-label="WebSocket Connection Status"
                colorScheme={wsConnected ? 'green' : 'red'}
                variant="ghost"
                onClick={() => {
                  if (wsConnected) {
                    WebSocketService.disconnect()
                  } else {
                    WebSocketService.connect(hospitalInfo.userId)
                  }
                }}
                size="sm"
              />
            </Tooltip>
          </HStack>
          <Text color="gray.600">{hospitalInfo.email}</Text>
        </VStack>
        <Spacer />
        <HStack>
          <IconButton
            icon={<FiUser />}
            onClick={onOpen}
            aria-label="Profile"
            variant="ghost"
            _hover={{ bg: 'blue.50' }}
            size="lg"
          />
          <Button
            leftIcon={<FiLogOut />}
            onClick={handleLogout}
            colorScheme="red"
            variant="ghost"
            size="lg"
          >
            Logout
          </Button>
        </HStack>
      </Flex>

      {/* Main Content */}
      <VStack spacing={8} align="stretch">
        {/* SOS Alerts Section */}
        <Box>
          <Heading size="md" mb={4}>
            Active SOS Alerts
            {sosAlerts.length > 0 && (
              <Badge ml={2} colorScheme="red">
                {sosAlerts.filter(a => a.status === 'active').length}
              </Badge>
            )}
          </Heading>
          
          {sosAlerts.length > 0 ? (
            <Box overflowX="auto">
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Patient Details</Th>
                    <Th>Contact</Th>
                    <Th>Time</Th>
                    <Th>Location</Th>
                    <Th>Action</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {sosAlerts.map((alert) => {
                    const userInfo = alert.userInfo || alertUserInfo[alert.userId]
                    return (
                      <Tr key={alert.id}>
                        <Td>
                          <VStack align="start" spacing={0}>
                            <Text
                              fontWeight="medium"
                              color="blue.600"
                              cursor="pointer"
                              _hover={{ textDecoration: 'underline' }}
                              onClick={() => userInfo && handlePatientClick(userInfo)}
                            >
                              {userInfo?.name || 'Unknown User'}
                            </Text>
                            {userInfo && (
                              <>
                                <Text fontSize="sm" color="gray.500">
                                  {userInfo.gender}, {calculateAge(userInfo.borndate)} years
                                </Text>
                                <Text fontSize="sm" color="gray.500">
                                  Blood Group: {userInfo.bloodGroup || 'N/A'}
                                </Text>
                              </>
                            )}
                          </VStack>
                        </Td>
                        <Td>
                          {userInfo && (
                            <VStack align="start" spacing={0}>
                              <Text fontSize="sm">{userInfo.phoneNumber || 'N/A'}</Text>
                              <Text fontSize="xs" color="gray.500">
                                {userInfo.address || 'No address provided'}
                              </Text>
                            </VStack>
                          )}
                        </Td>
                        <Td>{new Date(alert.timestamp).toLocaleString()}</Td>
                        <Td>
                          <Button
                            leftIcon={<FiMapPin />}
                            size="sm"
                            colorScheme="blue"
                            variant="outline"
                            onClick={() => window.open(alert.location, '_blank')}
                          >
                            View Location
                          </Button>
                        </Td>
                        <Td>
                          {alert.status === 'active' && (
                            <Button
                              colorScheme="green"
                              size="sm"
                              onClick={() => handleAcceptAlert(alert.id)}
                            >
                              Accept
                            </Button>
                          )}
                        </Td>
                      </Tr>
                    )
                  })}
                </Tbody>
              </Table>
            </Box>
          ) : (
            <Card>
              <CardBody>
                <VStack py={4}>
                  <Circle size="60px" bg="gray.100">
                    <FiBell size="24px" color="gray" />
                  </Circle>
                  <Text color="gray.500" textAlign="center">
                    No active SOS alerts
                  </Text>
                  {!wsConnected && (
                    <Text fontSize="sm" color="red.500">
                      Not connected to alert system
                    </Text>
                  )}
                </VStack>
              </CardBody>
            </Card>
          )}
        </Box>

        {/* SOS Data Section */}
        <Box>
          <Heading size="md" mb={4}>Emergency History</Heading>
          {sosData.length === 0 ? (
            <Card>
              <CardBody>
                <Text color="gray.500" textAlign="center">
                  No emergency history available
                </Text>
              </CardBody>
            </Card>
          ) : (
            <SOSDataTable 
              sosData={sosData} 
              onPatientClick={handlePatientClick}
            />
          )}
        </Box>
      </VStack>

      {/* Profile Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px)"
        />
        <ModalContent
          mx={4}
          bg={useColorModeValue('white', 'gray.800')}
          boxShadow="xl"
          rounded="lg"
          overflow="hidden"
        >
          <ModalHeader>
            <Box
              bg="blue.500"
              w="100%"
              h="60px"
              position="relative"
              bgGradient="linear(to-r, blue.400, blue.600)"
              mb={2}
            />
          </ModalHeader>
          <ModalCloseButton
            color="white"
            top={3}
            right={3}
            _hover={{
              bg: 'whiteAlpha.300'
            }}
          />
          <ModalBody pt={4} pb={6}>
            <VStack spacing={6}>
              {/* Hospital Name and Status */}
              <Box textAlign="center" w="full">
                <Heading size="lg" mb={2}>{hospitalInfo.name}</Heading>
                <Badge colorScheme="green" px={3} py={1} borderRadius="full">
                  Active
                </Badge>
              </Box>

              <Divider />

              {/* Contact and Location Grid */}
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} w="full">
                {/* Contact Information */}
                <Card variant="outline">
                  <CardHeader pb={2}>
                    <Heading size="sm" color="blue.500">Contact Details</Heading>
                  </CardHeader>
                  <CardBody>
                    <VStack align="start" spacing={3}>
                      <HStack>
                        <Circle size="40px" bg="blue.50">
                          <FiPhone color="blue" />
                        </Circle>
                        <Box>
                          <Text fontSize="sm" color="gray.500">Phone</Text>
                          <Text fontWeight="medium">{hospitalInfo.phoneNumber}</Text>
                        </Box>
                      </HStack>
                      <HStack>
                        <Circle size="40px" bg="blue.50">
                          <FiMail color="blue" />
                        </Circle>
                        <Box>
                          <Text fontSize="sm" color="gray.500">Email</Text>
                          <Text fontWeight="medium">{hospitalInfo.email}</Text>
                        </Box>
                      </HStack>
                    </VStack>
                  </CardBody>
                </Card>

                {/* Location Information */}
                <Card variant="outline">
                  <CardHeader pb={2}>
                    <Heading size="sm" color="blue.500">Location</Heading>
                  </CardHeader>
                  <CardBody>
                    <VStack align="start" spacing={3}>
                      <HStack>
                        <Circle size="40px" bg="blue.50">
                          <FiMapPin color="blue" />
                        </Circle>
                        <Box>
                          <Text fontSize="sm" color="gray.500">Coordinates</Text>
                          <Text fontWeight="medium">
                            {hospitalInfo.latitude}, {hospitalInfo.longitude}
                          </Text>
                        </Box>
                      </HStack>
                      <Button
                        leftIcon={<FiMapPin />}
                        colorScheme="blue"
                        variant="outline"
                        size="sm"
                        w="full"
                        onClick={() => window.open(`https://www.google.com/maps?q=${hospitalInfo.latitude},${hospitalInfo.longitude}`, '_blank')}
                      >
                        View on Map
                      </Button>
                    </VStack>
                  </CardBody>
                </Card>
              </SimpleGrid>

              {/* Hospital Stats */}
              <SimpleGrid columns={3} spacing={4} w="full">
                <Card bg="blue.50" textAlign="center">
                  <CardBody>
                    <VStack>
                      <Circle size="40px" bg="blue.100">
                        <FiBell color="blue" />
                      </Circle>
                      <Text fontWeight="bold" fontSize="lg">{sosAlerts.length}</Text>
                      <Text fontSize="sm" color="gray.600">Active Alerts</Text>
                    </VStack>
                  </CardBody>
                </Card>
                <Card bg="green.50" textAlign="center">
                  <CardBody>
                    <VStack>
                      <Circle size="40px" bg="green.100">
                        <FiAward color="green" />
                      </Circle>
                      <Text fontWeight="bold" fontSize="lg">{sosData.length}</Text>
                      <Text fontSize="sm" color="gray.600">Total Cases</Text>
                    </VStack>
                  </CardBody>
                </Card>
                <Card bg="purple.50" textAlign="center">
                  <CardBody>
                    <VStack>
                      <Circle size="40px" bg="purple.100">
                        <MdLocalHospital color="purple" />
                      </Circle>
                      <Text fontWeight="bold" fontSize="lg">24/7</Text>
                      <Text fontSize="sm" color="gray.600">Availability</Text>
                    </VStack>
                  </CardBody>
                </Card>
              </SimpleGrid>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Patient Details Modal */}
      <Modal isOpen={isPatientOpen} onClose={onPatientClose} size="lg">
        <ModalOverlay 
          bg="blackAlpha.300"
          backdropFilter="blur(10px)"
        />
        <ModalContent>
          <ModalHeader>
            <HStack spacing={3}>
              <Circle size="40px" bg="blue.50">
                <FiUser size="20px" color="blue" />
              </Circle>
              <VStack align="start" spacing={0}>
                <Heading size="md">
                  {selectedPatient?.name || 'Patient Details'}
                </Heading>
                <Badge colorScheme="blue">
                  {selectedPatient?.gender || 'Unknown'}
                </Badge>
              </VStack>
            </HStack>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {selectedPatient ? (
              <VStack spacing={4} align="stretch">
                {/* Basic Information */}
                <Box>
                  <Heading size="sm" color="blue.600" mb={2}>Basic Information</Heading>
                  <List spacing={3}>
                    <ListItem>
                      <HStack>
                        <ListIcon as={FiCalendar} color="blue.500" />
                        <Text fontWeight="medium">Age:</Text>
                        <Text>{calculateAge(selectedPatient.borndate)} years</Text>
                      </HStack>
                    </ListItem>
                    <ListItem>
                      <HStack>
                        <ListIcon as={FiDroplet} color="red.500" />
                        <Text fontWeight="medium">Blood Group:</Text>
                        <Text>{selectedPatient.bloodGroup || 'Not specified'}</Text>
                      </HStack>
                    </ListItem>
                  </List>
                </Box>

                <Divider />

                {/* Contact Information */}
                <Box>
                  <Heading size="sm" color="blue.600" mb={2}>Contact Information</Heading>
                  <List spacing={3}>
                    <ListItem>
                      <HStack>
                        <ListIcon as={FiPhone} color="green.500" />
                        <Text fontWeight="medium">Phone:</Text>
                        <Text>{selectedPatient.phoneNumber || 'Not provided'}</Text>
                      </HStack>
                    </ListItem>
                    <ListItem>
                      <HStack align="start">
                        <ListIcon as={FiHome} color="orange.500" mt={1} />
                        <Text fontWeight="medium">Address:</Text>
                        <Text flex={1}>{selectedPatient.address || 'Not provided'}</Text>
                      </HStack>
                    </ListItem>
                  </List>
                </Box>

                <Divider />

                {/* Medical Information */}
                <Box>
                  <Heading size="sm" color="blue.600" mb={2}>Medical Information</Heading>
                  <List spacing={3}>
                    {selectedPatient.medicalConditions && (
                      <ListItem>
                        <HStack align="start">
                          <ListIcon as={FiAlertCircle} color="red.500" mt={1} />
                          <Text fontWeight="medium">Medical Conditions:</Text>
                          <Text flex={1}>{selectedPatient.medicalConditions}</Text>
                        </HStack>
                      </ListItem>
                    )}
                    {selectedPatient.allergies && (
                      <ListItem>
                        <HStack align="start">
                          <ListIcon as={FiAlertCircle} color="orange.500" mt={1} />
                          <Text fontWeight="medium">Allergies:</Text>
                          <Text flex={1}>{selectedPatient.allergies}</Text>
                        </HStack>
                      </ListItem>
                    )}
                    {!selectedPatient.medicalConditions && !selectedPatient.allergies && (
                      <Text color="gray.500">No medical conditions or allergies reported</Text>
                    )}
                  </List>
                </Box>
              </VStack>
            ) : (
              <Center py={8}>
                <Text color="gray.500">Patient information not available</Text>
              </Center>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Container>
  )
}

// Helper function to calculate age
const calculateAge = (borndate) => {
  const birthDate = new Date(borndate)
  const today = new Date()
  let age = today.getFullYear() - birthDate.getFullYear()
  const monthDiff = today.getMonth() - birthDate.getMonth()
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }
  return age
}

export default HospitalDashboard 