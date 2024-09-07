import { useState, useEffect } from 'react';
import { Box, Grid, Button, VStack, Heading, useToast } from '@chakra-ui/react';

// Function to generate a valid 4x4 Sudoku board
function generateSudoku() {
  // Define the possible values for a 4x4 Sudoku
  const values = [1, 2, 3, 4];

  // Create an empty 4x4 grid
  let grid = Array(4).fill().map(() => Array(4).fill(0));

  // Helper function to check if a value is valid in a given position
  function isValid(row, col, num) {
    // Check row and column
    for (let x = 0; x < 4; x++) {
      if (grid[row][x] === num || grid[x][col] === num) {
        return false;
      }
    }

    // Check 2x2 box
    let boxRow = Math.floor(row / 2) * 2;
    let boxCol = Math.floor(col / 2) * 2;
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 2; j++) {
        if (grid[boxRow + i][boxCol + j] === num) {
          return false;
        }
      }
    }

    return true;
  }

  // Recursive function to fill the grid
  function fillGrid(row = 0, col = 0) {
    if (col === 4) {
      row++;
      col = 0;
      if (row === 4) {
        return true; // Grid is filled
      }
    }

    if (grid[row][col] !== 0) {
      return fillGrid(row, col + 1);
    }

    // Shuffle the values array for randomness
    let shuffled = values.sort(() => Math.random() - 0.5);

    for (let num of shuffled) {
      if (isValid(row, col, num)) {
        grid[row][col] = num;
        if (fillGrid(row, col + 1)) {
          return true;
        }
        grid[row][col] = 0; // Backtrack
      }
    }

    return false;
  }

  // Fill the grid
  fillGrid();

  // Flatten the 2D array to 1D for our game board
  return grid.flat();
}

export default function GenerateSudokuNumbers() {
  const [board, setBoard] = useState([]);
  const toast = useToast();

  useEffect(() => {
    // Generate a new Sudoku board when the component mounts
    setBoard(generateSudoku());
  }, []);

  const handleCellClick = (index) => {
    if (board[index] !== 0) {
      const newBoard = [...board];
      newBoard[index] = 0;
      setBoard(newBoard);
    }
  };


  const newGame = () => {
    setBoard(generateSudoku());
  };

  return (
    <VStack spacing={8} align="center" justify="center">
      <Heading>Generate Sudoku</Heading>
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
      <Button colorScheme="green" onClick={newGame}>New Game</Button>
    </VStack>
  );
}