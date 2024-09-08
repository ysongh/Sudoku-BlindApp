"use client";

import React from 'react';
import { ChakraProvider, Box, VStack, Heading, Text, Button, Grid, Image, useColorModeValue } from '@chakra-ui/react';

const Feature = ({ title, description, icon }) => {
  return (
    <VStack>
      <Box
        w="12"
        h="12"
        display="flex"
        alignItems="center"
        justifyContent="center"
        rounded="full"
        bg={useColorModeValue("blue.100", "blue.900")}
        color={useColorModeValue("blue.600", "blue.200")}
      >
        {icon}
      </Box>
      <Text fontWeight="bold">{title}</Text>
      <Text textAlign="center">{description}</Text>
    </VStack>
  );
};

const LandingPage = () => {
  return (
    <ChakraProvider>
      <Box minHeight="100vh" py={16}>
        <VStack spacing={16}>
          {/* Hero Section */}
          <VStack spacing={8} textAlign="center">
            <Heading as="h1" size="2xl">
              4x4 Sudoku Challenge
            </Heading>
            <Text fontSize="xl" maxW="2xl">
              Experience the thrill of Sudoku in a compact 4x4 grid. Perfect for quick games and Sudoku beginners!
            </Text>
            <Button colorScheme="blue" size="lg" onClick={() => alert('Start Game!')}>
              Play Now
            </Button>
          </VStack>

          {/* Features Section */}
          <Box>
            <Heading as="h2" size="xl" textAlign="center" mb={12}>
              Game Features
            </Heading>
            <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }} gap={8}>
              <Feature
                icon="🧩"
                title="4x4 Grid"
                description="A perfect size for quick games and learning Sudoku basics."
              />
              <Feature
                icon="🔄"
                title="Random Generation"
                description="Each game is unique with our smart puzzle generator."
              />
              <Feature
                icon="👆"
                title="Click-to-Zero"
                description="Clear the board by clicking cells. A new twist on classic Sudoku!"
              />
            </Grid>
          </Box>

          {/* How to Play Section */}
          <VStack spacing={8} textAlign="center">
            <Heading as="h2" size="xl">
              How to Play
            </Heading>
            <Text fontSize="lg" maxW="2xl">
              1. Start a new game to get a random 4x4 Sudoku board.<br/>
              2. Click on cells to turn them to zero.<br/>
              3. Your goal is to clear all cells on the board.<br/>
              4. Use strategy to decide which cells to clear first!<br/>
              5. Click "Check Solution" to see if you've won.
            </Text>
          </VStack>

          {/* Call to Action */}
          <VStack spacing={4}>
            <Heading as="h2" size="lg">
              Ready to Challenge Yourself?
            </Heading>
            <Button colorScheme="green" size="lg" onClick={() => alert('Start Game!')}>
              Start Playing Now
            </Button>
          </VStack>
        </VStack>
      </Box>
    </ChakraProvider>
  );
};

export default LandingPage;