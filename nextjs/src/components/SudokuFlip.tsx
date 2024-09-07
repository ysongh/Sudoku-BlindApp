import { useState } from 'react';
import { ChakraProvider, Box, Grid, Button, VStack, Heading, useToast } from '@chakra-ui/react';

const initialBoard = [
  1, 2, 3, 4,
  3, 4, 1, 2,
  2, 1, 4, 3,
  4, 3, 2, 1
];

export default function SudokuFlip() {
  const [board, setBoard] = useState(initialBoard);

  const handleCellClick = (index) => {
    if (board[index] !== 0) {
      const newBoard = [...board];
      newBoard[index] = 0;
      setBoard(newBoard);
    }
  };

  return (
    <ChakraProvider>
      <VStack spacing={8} align="center" justify="center" height="100vh">
        <Heading>Click-to-Zero Sudoku</Heading>
        <Grid templateColumns="repeat(4, 1fr)" gap={2}>
          {board.map((cell, index) => (
            <Box
              key={index}
              w="50px"
              h="50px"
              border="2px"
              borderColor="gray.300"
              bg={cell === 0 ? "gray.100" : "white"}
              display="flex"
              alignItems="center"
              justifyContent="center"
              fontSize="xl"
              fontWeight="bold"
              onClick={() => handleCellClick(index)}
              cursor={cell !== 0 ? "pointer" : "default"}
              transition="background-color 0.3s"
            >
              {cell !== 0 ? cell : ''}
            </Box>
          ))}
        </Grid>
      </VStack>
    </ChakraProvider>
  );
}