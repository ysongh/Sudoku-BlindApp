import { Container, Box, Flex, Heading, Spacer, Button } from '@chakra-ui/react';
import Link from 'next/link';

function Navbar() {
  return (
    <Box p={2}>
      <Container maxW='1100px'>
        <Flex minWidth='max-content' alignItems='center' gap='2'>
          <Box mr="4">
            <Heading color="green" mt="3" mb="5">Sudoku</Heading>
          </Box>
          <Link href='/' passHref>
            Home
          </Link>
          <Link href='/game' passHref>
            Game
          </Link>
          <Spacer />
          <w3m-button />
        </Flex>
      </Container>
    </Box>
  )
}

export default Navbar;