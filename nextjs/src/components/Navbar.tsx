import { Container, Box, Flex, Heading, Text, Spacer, Button } from '@chakra-ui/react';
import Link from 'next/link';

function Navbar() {
  return (
    <Box p={2}>
      <Container maxW='1100px' mb="2">
        <Flex minWidth='max-content' alignItems='center' gap='2'>
          <Box mr="4" color="green">
            <Heading mb="-5px">Sudoku</Heading>
            <Text fontSize="20px">Blind App</Text>
          </Box>
          <Link href='/' passHref>
            Home
          </Link>
          <Link href='/listofgame' passHref>
            Games
          </Link>
          <Spacer />
          <w3m-button />
        </Flex>
      </Container>
    </Box>
  )
}

export default Navbar;