import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  VStack,
  HStack,
  Heading,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  useToast,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Avatar,
  Flex,
  Spacer,
  Button,
  Card,
  CardHeader,
  CardBody,
  useColorModeValue,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Center,
  Spinner,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { FiLogOut, FiUser, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import { useDisclosure } from '@chakra-ui/react';

const API_BASE_URL = 'https://eba.onrender.com';

function AdminDashboard() {
  const [adminInfo, setAdminInfo] = useState(null);
  const [users, setUsers] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();
  const navigate = useNavigate();
  const { setAdminUser } = useAuth();
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const [selectedImage, setSelectedImage] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleLogout = () => {
    try {
      // Clear admin data from context
      setAdminUser(null);
      
      // Clear local storage
      localStorage.removeItem('adminUser');
      
      // Show success toast
      toast({
        title: 'Logged Out',
        description: 'You have been successfully logged out.',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });

      // Navigate after a short delay to ensure state is cleared
      setTimeout(() => {
        navigate('/admin-login');
      }, 100);
    } catch (error) {
      console.error('Logout error:', error);
      toast({
        title: 'Logout Error',
        description: 'An error occurred during logout. Please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    const checkLoginAndLoadData = async () => {
      try {
        // Check if admin is logged in
        const storedAdmin = localStorage.getItem('adminUser');
        if (!storedAdmin) {
          navigate('/admin-login');
          return;
        }

        const adminData = JSON.parse(storedAdmin);
        setAdminInfo(adminData);

        // Fetch users and hospitals data
        await Promise.all([
          fetchUsers(),
          fetchHospitals()
        ]);

      } catch (error) {
        console.error('Error loading dashboard:', error);
        toast({
          title: 'Error',
          description: 'Failed to load dashboard data',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setIsLoading(false);
      }
    };

    checkLoginAndLoadData();
  }, [navigate, toast]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/get-user`);
      if (response.data.status === 200) {
        // Transform the data to match our component's expectations
        const transformedUsers = response.data.hospitals.map(user => ({
          ...user,
          // Convert borndate to a proper date object if needed
          borndate: new Date(user.borndate),
          // Add any missing fields that the component expects
          medicalConditions: user.medicalConditions || '',
          allergies: user.allergies || '',
          address: user.address || '',
          bloodGroup: user.bloodGroup || 'Not specified'
        }));
        setUsers(transformedUsers);
      } else {
        throw new Error(response.data.message || 'Failed to fetch users');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch users. Please try again later.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const fetchHospitals = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/get-hospitals/`);
      if (response.data.status === 200) {
        setHospitals(response.data.hospitals);
      }
    } catch (error) {
      console.error('Error fetching hospitals:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch hospitals',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const calculateAge = (borndate) => {
    const birthDate = new Date(borndate);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleHospitalStatusChange = async (hospital) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/verify-hospital/`, {
        params: {
          email: hospital.email
        }
      });

      if (response.data.status === 200) {
        // Update the hospitals list locally
        setHospitals(prevHospitals => 
          prevHospitals.map(h => 
            h.email === hospital.email 
              ? { ...h, isValid: response.data.isVerified }
              : h
          )
        );

        toast({
          title: 'Status Updated',
          description: `Hospital ${response.data.isVerified ? 'activated' : 'deactivated'} successfully`,
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } else {
        throw new Error(response.data.message || 'Failed to update hospital status');
      }
    } catch (error) {
      console.error('Error updating hospital status:', error);
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to update hospital status. Please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    onOpen();
  };

  if (isLoading) {
    return (
      <Box minH="100vh" bg={useColorModeValue('gray.50', 'gray.800')} py={5}>
        <Container maxW="container.xl">
          <Center h="60vh">
            <VStack spacing={4}>
              <Spinner size="xl" color="blue.500" />
              <Text color={useColorModeValue('gray.600', 'gray.200')}>
                Loading dashboard...
              </Text>
            </VStack>
          </Center>
        </Container>
      </Box>
    );
  }

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.50', 'gray.800')} py={5}>
      <Container maxW="container.xl">
        {/* Admin Header */}
        <Box 
          bg={bgColor} 
          p={4} 
          borderRadius="lg" 
          boxShadow="sm"
          mb={6}
          borderWidth="1px"
          borderColor={borderColor}
        >
          <Flex align="center">
            <HStack spacing={4}>
              <Avatar 
                size="md" 
                name={adminInfo?.name} 
                bg="blue.500"
              />
              <Box>
                <Heading size="md" color={useColorModeValue('gray.800', 'white')}>
                  {adminInfo?.name}
                </Heading>
                <Text color={useColorModeValue('gray.600', 'gray.300')}>
                  {adminInfo?.email}
                </Text>
              </Box>
            </HStack>
            <Spacer />
            <Button
              leftIcon={<FiLogOut />}
              onClick={handleLogout}
              colorScheme="red"
              variant="ghost"
              _hover={{ bg: useColorModeValue('red.50', 'red.900') }}
            >
              Logout
            </Button>
          </Flex>
        </Box>

        {/* Main Content */}
        <Box
          bg={bgColor}
          borderRadius="lg"
          borderWidth="1px"
          borderColor={borderColor}
          overflow="hidden"
        >
          <Tabs variant="enclosed" colorScheme="blue">
            <TabList bg={useColorModeValue('gray.50', 'gray.700')}>
              <Tab _selected={{ bg: bgColor, borderBottomColor: bgColor }}>
                Users ({users.length})
              </Tab>
              <Tab _selected={{ bg: bgColor, borderBottomColor: bgColor }}>
                Hospitals ({hospitals.length})
              </Tab>
            </TabList>

            <TabPanels>
              {/* Users Panel */}
              <TabPanel p={0}>
                <Box overflow="auto">
                  <Table variant="simple">
                    <Thead bg={useColorModeValue('gray.50', 'gray.700')}>
                      <Tr>
                        <Th color={useColorModeValue('gray.600', 'gray.200')}>Name</Th>
                        <Th color={useColorModeValue('gray.600', 'gray.200')}>Contact</Th>
                        <Th color={useColorModeValue('gray.600', 'gray.200')}>Age</Th>
                        <Th color={useColorModeValue('gray.600', 'gray.200')}>Gender</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {users.map((user) => (
                        <Tr key={user.userId}>
                          <Td>
                            <HStack>
                              <Avatar size="sm" name={user.name} />
                              <Box>
                                <Text fontWeight="medium" color={useColorModeValue('gray.800', 'white')}>
                                  {user.name}
                                </Text>
                                <Text fontSize="sm" color={useColorModeValue('gray.600', 'gray.300')}>
                                  {user.email}
                                </Text>
                              </Box>
                            </HStack>
                          </Td>
                          <Td>
                            <VStack align="start" spacing={1}>
                              <HStack fontSize="sm">
                                <FiPhone color={useColorModeValue('gray.600', 'gray.300')} />
                                <Text color={useColorModeValue('gray.600', 'gray.300')}>
                                  {user.phoneNumber}
                                </Text>
                              </HStack>
                            </VStack>
                          </Td>
                          <Td color={useColorModeValue('gray.600', 'gray.300')}>
                            {calculateAge(user.borndate)} years
                          </Td>
                          <Td>
                            <Badge colorScheme={user.gender === 'Male' ? 'blue' : 'pink'}>
                              {user.gender}
                            </Badge>
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </Box>
              </TabPanel>

              {/* Hospitals Panel */}
              <TabPanel p={0}>
                <Box overflow="auto">
                  <Table variant="simple">
                    <Thead bg={useColorModeValue('gray.50', 'gray.700')}>
                      <Tr>
                        <Th color={useColorModeValue('gray.600', 'gray.200')}>Hospital Name</Th>
                        <Th color={useColorModeValue('gray.600', 'gray.200')}>Contact</Th>
                        <Th color={useColorModeValue('gray.600', 'gray.200')}>Location</Th>
                        <Th color={useColorModeValue('gray.600', 'gray.200')}>License</Th>
                        <Th color={useColorModeValue('gray.600', 'gray.200')}>Status</Th>
                        <Th color={useColorModeValue('gray.600', 'gray.200')}>Action</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {hospitals.map((hospital) => (
                        <Tr key={hospital.userId}>
                          <Td>
                            <HStack>
                              <Avatar size="sm" name={hospital.name} bg="green.500" />
                              <Box>
                                <Text fontWeight="medium" color={useColorModeValue('gray.800', 'white')}>
                                  {hospital.name}
                                </Text>
                                <Text fontSize="sm" color={useColorModeValue('gray.600', 'gray.300')}>
                                  {hospital.email}
                                </Text>
                              </Box>
                            </HStack>
                          </Td>
                          <Td>
                            <VStack align="start" spacing={1}>
                              <HStack fontSize="sm">
                                <FiPhone color={useColorModeValue('gray.600', 'gray.300')} />
                                <Text color={useColorModeValue('gray.600', 'gray.300')}>
                                  {hospital.phoneNumber}
                                </Text>
                              </HStack>
                              <HStack fontSize="sm">
                                <FiMail color={useColorModeValue('gray.600', 'gray.300')} />
                                <Text color={useColorModeValue('gray.600', 'gray.300')}>
                                  {hospital.email}
                                </Text>
                              </HStack>
                            </VStack>
                          </Td>
                          <Td>
                            <Button
                              leftIcon={<FiMapPin />}
                              size="sm"
                              colorScheme="blue"
                              variant="outline"
                              onClick={() => window.open(`https://www.google.com/maps?q=${hospital.latitude},${hospital.longitude}`, '_blank')}
                            >
                              View Location
                            </Button>
                          </Td>
                          <Td>
                            <Box
                              width="60px"
                              height="60px"
                              borderRadius="md"
                              overflow="hidden"
                              cursor="pointer"
                              onClick={() => hospital.photoUrl && handleImageClick(hospital.photoUrl)}
                              transition="transform 0.2s"
                              _hover={{ transform: 'scale(1.05)' }}
                            >
                              {hospital.photoUrl ? (
                                <Image
                                  src={hospital.photoUrl}
                                  alt={`${hospital.name} License`}
                                  width="100%"
                                  height="100%"
                                  objectFit="cover"
                                  fallback={
                                    <Center bg="gray.100" h="100%">
                                      <Text fontSize="xs" color="gray.500">No License</Text>
                                    </Center>
                                  }
                                />
                              ) : (
                                <Center bg="gray.100" h="100%">
                                  <Text fontSize="xs" color="gray.500">No License</Text>
                                </Center>
                              )}
                            </Box>
                          </Td>
                          <Td>
                            <Badge colorScheme={hospital.isValid ? "green" : "red"}>
                              {hospital.isValid ? "Active" : "Inactive"}
                            </Badge>
                          </Td>
                          <Td>
                            <Button
                              size="sm"
                              colorScheme={hospital.isValid ? "red" : "green"}
                              onClick={() => handleHospitalStatusChange(hospital)}
                            >
                              {hospital.isValid ? "Deactivate" : "Activate"}
                            </Button>
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </Box>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>

        {/* Image Preview Modal */}
        <Modal isOpen={isOpen} onClose={onClose} size="xl">
          <ModalOverlay />
          <ModalContent>
            <ModalCloseButton zIndex="modal" />
            <ModalBody p={0}>
              {selectedImage && (
                <Image
                  src={selectedImage}
                  alt="Hospital"
                  width="100%"
                  height="auto"
                  maxH="80vh"
                  objectFit="contain"
                />
              )}
            </ModalBody>
          </ModalContent>
        </Modal>

      </Container>
    </Box>
  );
}

export default AdminDashboard; 