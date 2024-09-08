import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ChakraProvider, Box, VStack, Heading, Text, Button, Grid, useColorModeValue } from '@chakra-ui/react';
import { useWeb3ModalProvider, useWeb3ModalAccount } from '@web3modal/ethers/react';
import { BrowserProvider, Contract } from 'ethers';

import Sudoku from "@/artifacts/contracts/Sudoku.sol/Sudoku.json";

const SudokuAddress = "0xF18e390B93177B436482633E86dC88233Ae8AdDc";

// Mock data for Sudoku games
const sudokuGames = [
  { id: 1, difficulty: 'Easy', size: '4x4', completed: false },
  { id: 2, difficulty: 'Medium', size: '4x4', completed: true },
  { id: 3, difficulty: 'Hard', size: '4x4', completed: false },
  { id: 4, difficulty: 'Easy', size: '4x4', completed: false },
  { id: 5, difficulty: 'Medium', size: '4x4', completed: false },
  { id: 6, difficulty: 'Hard', size: '4x4', completed: true },
];

const SudokuCard = ({ game, onPlay, index }) => {
  const cardBg = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  console.log(game)

  return (
    <Box 
      borderWidth="1px" 
      borderRadius="lg" 
      overflow="hidden" 
      p={4}
      bg={cardBg}
      borderColor={borderColor}
    >
      <VStack align="start" spacing={2}>
        <Heading size="md">Sudoku #{index + 1}</Heading>
        <Text>Difficulty: Easy</Text>
        <Text>Size: 4x4</Text>
        <Text fontSize="5px">
          {game[0]}
        </Text>
        <Text fontSize="10px">
          {game[1]}
        </Text>
        <Link href={`/game/${index}`} passHref>
          <Button colorScheme="blue">
            Play
          </Button>
        </Link>
      </VStack>
    </Box>
  );
};

const SudokuListPage = () => {
  const { address, chainId, isConnected } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();

  const [listgames, setListgames] = useState([]);

  useEffect(() => {
    handleGetGames();
  }, [address])
  

  const handlePlay = (gameId) => {
    // In a real application, this would navigate to the game page
    alert(`Starting game ${gameId}`);
  };

  const handleGetGames = async () => {
    if (!isConnected) throw Error('User disconnected');

    const ethersProvider = new BrowserProvider(walletProvider);
    const signer = await ethersProvider.getSigner();

    // The Contract object
    const SudokuContract = new Contract(SudokuAddress, Sudoku.abi, signer);
    const games = await SudokuContract.getGames();
    setListgames(games);
  }

  return (
    <ChakraProvider>
      <Box minHeight="100vh" py={16} px={8}>
        <VStack spacing={16}>
          <VStack spacing={4} textAlign="center">
            <Heading as="h1" size="2xl">
              Sudoku Games
            </Heading>
            <Text fontSize="xl" maxW="2xl">
              Choose a Sudoku puzzle to play from the list below.
            </Text>
          </VStack>

          <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap={8}>
            {listgames.map((game, index) => (
              <SudokuCard key={index} game={game} onPlay={handlePlay} index={index} />
            ))}
          </Grid>
          <Link href='/game' passHref>
            <Button colorScheme="green" size="lg">
              Generate New Game
            </Button>
          </Link>
        </VStack>
      </Box>
    </ChakraProvider>
  );
};

export default SudokuListPage;