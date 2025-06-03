import React from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Badge,
  Text,
  Box,
  Heading,
  useColorModeValue,
} from '@chakra-ui/react';

const SOSDataTable = ({ sosData, onPatientClick }) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
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

  if (!sosData || sosData.length === 0) {
    return (
      <Box p={4} textAlign="center">
        <Text>No SOS data available</Text>
      </Box>
    );
  }

  return (
    <Box
      bg={bgColor}
      borderRadius="lg"
      borderWidth="1px"
      borderColor={borderColor}
      p={4}
      shadow="sm"
    >
      <Heading size="md" mb={4}>SOS Alerts</Heading>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Patient Name</Th>
              <Th>Gender</Th>
              <Th>Age</Th>
              <Th>Contact</Th>
              <Th>Emergency Details</Th>
              <Th>Date</Th>
            </Tr>
          </Thead>
          <Tbody>
            {sosData.map((sos) => (
              <Tr key={sos.sos_id}>
                <Td>
                  <Text
                    fontWeight="medium"
                    color="blue.600"
                    cursor="pointer"
                    _hover={{ textDecoration: 'underline' }}
                    onClick={() => onPatientClick({
                      name: sos.name,
                      gender: sos.gender,
                      borndate: sos.borndate,
                      phoneNumber: sos.phoneNumber,
                      address: sos.address,
                      bloodGroup: sos.bloodGroup,
                      medicalConditions: sos.medicalConditions,
                      allergies: sos.allergies
                    })}
                  >
                    {sos.name}
                  </Text>
                </Td>
                <Td>
                  <Badge colorScheme={sos.gender === 'Male' ? 'blue' : 'pink'}>
                    {sos.gender}
                  </Badge>
                </Td>
                <Td>{calculateAge(sos.borndate)} years</Td>
                <Td>
                  <Text fontSize="sm">{sos.phoneNumber}</Text>
                  <Text fontSize="xs" color="gray.500">{sos.address}</Text>
                </Td>
                <Td>
                  <Text fontSize="sm" fontWeight="medium">
                    Blood Group: {sos.bloodGroup}
                  </Text>
                  {sos.medicalConditions && (
                    <Text fontSize="xs" color="red.500">
                      Conditions: {sos.medicalConditions}
                    </Text>
                  )}
                  {sos.allergies && (
                    <Text fontSize="xs" color="orange.500">
                      Allergies: {sos.allergies}
                    </Text>
                  )}
                </Td>
                <Td>
                  <Text fontSize="sm">{formatDate(sos.date)}</Text>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default SOSDataTable; 