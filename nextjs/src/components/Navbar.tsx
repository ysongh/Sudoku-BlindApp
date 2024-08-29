import { Container, Box, Flex, Heading, Spacer, Button, Link } from '@chakra-ui/react';

function Navbar() {
  return (
    <Box p={2}>
      <Container maxW='1100px'>
        <Flex minWidth='max-content' alignItems='center' gap='2'>
          <Box mr="4">
            <Heading color="green" mt="3" mb="5">Sudoku</Heading>
          </Box>
          <Spacer />
          <Button>
            Connect Wallet
          </Button>
        </Flex>
      </Container>
    </Box>
  )
}

export default Navbar;