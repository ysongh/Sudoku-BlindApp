import * as React from "react";
import {
  useRunProgram,
  useStoreValue,
  useStoreProgram,
  useNillion,
  useFetchProgramOutput,
} from "@nillion/client-react-hooks";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Container, VStack, Grid, Box, Code, Input, Heading, Button } from '@chakra-ui/react'
import {
  ProgramId,
  PartyName,
  Permissions,
  PartyId,
  StoreId,
  ProgramBindings,
  NadaValues,
  NadaValue,
  NamedValue,
} from "@nillion/client-core";
import { transformNadaProgramToUint8Array } from "@/utils/transformNadaProgramToUint8Array";
import { useWeb3ModalProvider, useWeb3ModalAccount } from '@web3modal/ethers/react'
import { BrowserProvider, Contract } from 'ethers'

import GenerateSudokuNumbers from "@/components/GenerateSudokuNumbers";
import Sudoku from "@/artifacts/contracts/Sudoku.sol/Sudoku.json";

const SudokuAddress = "0xF18e390B93177B436482633E86dC88233Ae8AdDc";

export default function Compute() {
  const { id } = useParams();
  const { address, chainId, isConnected } = useWeb3ModalAccount()
  const { walletProvider } = useWeb3ModalProvider()

  // Use of Nillion Hooks
  const client = useNillion();
  const storeProgram = useStoreProgram();
  const storeValue = useStoreValue();
  const runProgram = useRunProgram();

  const [answerBoard, setAnswerBoard] = useState([]);
  const [board, setBoard] = useState([]);
  const [cellToRemove, setCellToRemove] = useState([]);
  const [showCode, setShowCode] = useState(false);
  const [selectedCell, setSelectedCell] = useState(null);

  // UseStates
  const [selectedProgramCode, setSelectedProgramCode] = useState("");

  const [programID, setProgramID] = useState<ProgramId>();
  const [secretSudokuGameID, setSecretSudokuGameID] = useState<StoreId>();
  const [computeResult, setComputeResult] = useState<any | null>(null);
  const [computeID, setComputeID] = useState<any | null>(null);

  // Other CONSTS
  const PARTY_NAME = "Party1" as PartyName;
  const PROGRAM_NAME = "game";

  // Use of FetchProgram Hook
  const fetchProgram = useFetchProgramOutput({
    id: computeID,
  });

  // Handle using the main Program
  const handleUseProgram = async () => {
    try {
      // Bindings
      const bindings = ProgramBindings.create(programID!);
      bindings.addInputParty(
        PARTY_NAME as PartyName,
        client.vm.partyId as PartyId
      );
      bindings.addOutputParty(
        PARTY_NAME as PartyName,
        client.vm.partyId as PartyId
      );

      const values = NadaValues.create()
        .insert(
          NamedValue.parse("player_input_1"),
          NadaValue.createSecretInteger(+board[0].toString())
        )
        .insert(
          NamedValue.parse("player_input_2"),
          NadaValue.createSecretInteger(+board[1].toString())
        )
        .insert(
          NamedValue.parse("player_input_3"),
          NadaValue.createSecretInteger(+board[2].toString())
        )
        .insert(
          NamedValue.parse("player_input_4"),
          NadaValue.createSecretInteger(+board[3].toString())
        )
        .insert(
          NamedValue.parse("player_input_5"),
          NadaValue.createSecretInteger(+board[4].toString())
        )
        .insert(
          NamedValue.parse("player_input_6"),
          NadaValue.createSecretInteger(+board[5].toString())
        )
        .insert(
          NamedValue.parse("player_input_7"),
          NadaValue.createSecretInteger(+board[6].toString())
        )
        .insert(
          NamedValue.parse("player_input_8"),
          NadaValue.createSecretInteger(+board[7].toString())
        )
        .insert(
          NamedValue.parse("player_input_9"),
          NadaValue.createSecretInteger(+board[8].toString())
        )
        .insert(
          NamedValue.parse("player_input_10"),
          NadaValue.createSecretInteger(+board[9].toString())
        )
        .insert(
          NamedValue.parse("player_input_11"),
          NadaValue.createSecretInteger(+board[10].toString())
        )
        .insert(
          NamedValue.parse("player_input_12"),
          NadaValue.createSecretInteger(+board[11].toString())
        )
        .insert(
          NamedValue.parse("player_input_13"),
          NadaValue.createSecretInteger(+board[12].toString())
        )
        .insert(
          NamedValue.parse("player_input_14"),
          NadaValue.createSecretInteger(+board[13].toString())
        )
        .insert(
          NamedValue.parse("player_input_15"),
          NadaValue.createSecretInteger(+board[14].toString())
        )
        .insert(
          NamedValue.parse("player_input_16"),
          NadaValue.createSecretInteger(+board[15].toString())
        );

        console.log(values);

      const res = await runProgram.mutateAsync({
        bindings: bindings,
        values,
        storeIds: [secretSudokuGameID],
      });

      setComputeID(res);
    } catch (error) {
      console.error("Error executing program:", error);
      throw error;
    }
  };

  useEffect(() => {
    if (fetchProgram.data) {
      //@ts-ignore
      setComputeResult(fetchProgram.data);
    }
  }, [fetchProgram.data]);

  useEffect(() => {
    handleGetGame();
  }, []);

  const handleCellClick = (index) => {
    setSelectedCell(index);
  };

  const handleInputChange = (e) => {
    if (selectedCell === null) return;
    const value = parseInt(e.target.value) || 0;
    if (value >= 0 && value <= 9) {
      const newBoard = [...board];
      newBoard[selectedCell] = value;
      setBoard(newBoard);
    }
  };

  const handleGetGame = async () => {
    if (!isConnected) throw Error('User disconnected');

    const ethersProvider = new BrowserProvider(walletProvider);
    const signer = await ethersProvider.getSigner();

    // The Contract object
    const SudokuContract = new Contract(SudokuAddress, Sudoku.abi, signer);
    const games = await SudokuContract.getGames();
    console.log(games);
    setProgramID(games[id][0]);
    setSecretSudokuGameID(games[id][1]);

    const game = await SudokuContract.getNumbers(id);
    console.log(Object.values(game));
    setBoard(Object.values(game));
  }

  return (
    <Container className="flex flex-col justify-center min-h-screen p-8" maxW='1100px'>
      {programID && (
        <div className="mt-4">
          <p className="text-sm text-gray-600">Program ID: {programID}</p>
        </div>
      )}

      {secretSudokuGameID && (
        <div className="mt-2">
          <p className="text-sm text-gray-600">
            Secret Sudoku Game ID: {secretSudokuGameID}
          </p>
        </div>
      )}

      <VStack spacing={8} align="center" justify="center" marginTop="10px" mb="10">
        <Grid templateColumns="repeat(4, 1fr)" gap={2}>
          {board.map((cell, index) => (
            <Box
              key={index}
              w="50px"
              h="50px"
              border="2px"
              borderColor="gray.300"
              onClick={() => handleCellClick(index)}
              bg={selectedCell === index ? "blue.100" : "white"}
            >
              <Input
                value={+cell.toString() || ''}
                onChange={handleInputChange}
                textAlign="center"
                fontSize="xl"
                border="none"
              />
            </Box>
          ))}
        </Grid>
      </VStack>

      <div className="border-t border-gray-300 my-4"></div>

      {/* Compute Section */}
      <center>
        <h3 className="text-lg font-semibold mb-2 text-left">Compute:</h3>
        <Button
          onClick={() => handleUseProgram()}
          className="bg-blue-500 mb-4 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out mt-2"
        >
          Compute
        </Button>
        {computeResult && (
          <div className="mt-2">
            <div className="text-sm text-gray-600">
              Compute Result: {computeResult && Object.keys(computeResult).map(key => (
                <p className="p-4 m-2 bg-yellow-200" key={key}>
                  {key} = {computeResult[key].toString()}
                </p>
              ))}
            </div>
          </div>
        )}
      </center>
    </Container>
  );
}
