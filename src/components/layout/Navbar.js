import { Box, Flex, Button, Stack, useDisclosure, IconButton, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon, ChevronDownIcon } from '@chakra-ui/icons'
import { Link as RouterLink, useLocation } from 'react-router-dom'

function Navbar() {
  const { isOpen, onToggle } = useDisclosure()
  const location = useLocation()

  return (
    <Box bg="green.500" px={4}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <RouterLink to="/">
          <Box fontSize="xl" fontWeight="bold" color="white">
            Rescue Guide
          </Box>
        </RouterLink>

        <IconButton
          display={{ base: 'block', md: 'none' }}
          onClick={onToggle}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          variant="ghost"
          color="white"
          aria-label="Toggle Navigation"
        />

        <Stack
          direction={{ base: 'column', md: 'row' }}
          display={{ base: isOpen ? 'flex' : 'none', md: 'flex' }}
          width={{ base: 'full', md: 'auto' }}
          alignItems="center"
          flexGrow={1}
          mt={{ base: 4, md: 0 }}
          spacing={4}
          position={{ base: 'absolute', md: 'static' }}
          top={{ base: '4rem', md: 'auto' }}
          left={0}
          bg={{ base: 'green.500', md: 'transparent' }}
          p={{ base: 4, md: 0 }}
          zIndex="dropdown"
        >
          <Button as={RouterLink} to="/guidelines" variant="ghost" color="white">
            First Aid Guidelines
          </Button>
          
          {/* Hospital Section */}
          <Menu>
            <MenuButton as={Button} variant="ghost" color="white" rightIcon={<ChevronDownIcon />}>
              Hospital
            </MenuButton>
            <MenuList>
              <MenuItem as={RouterLink} to="/hospital-register">Register Hospital</MenuItem>
              <MenuItem as={RouterLink} to="/hospital-login">Hospital Login</MenuItem>
            </MenuList>
          </Menu>

          <Button as={RouterLink} to="/about" variant="ghost" color="white">
            About
          </Button>
        </Stack>
      </Flex>
    </Box>
  )
}

export default Navbar 