import * as React from "react";
import {
  useRunProgram,
  useStoreValue,
  useStoreProgram,
  useNillion,
  useFetchProgramOutput,
} from "@nillion/client-react-hooks";
import { useEffect, useState } from "react";
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

const initialBoard = [
  1, 0, 2, 3,
  0, 0, 0, 0,
  0, 0, 4, 0,
  4, 0, 0, 1
];

const SudokuAddress = "0x0e79dd711611bB54d70BFac1a5f8A3de62f8d015";

export default function Compute() {
  const { address, chainId, isConnected } = useWeb3ModalAccount()
  const { walletProvider } = useWeb3ModalProvider()

  // Use of Nillion Hooks
  const client = useNillion();
  const storeProgram = useStoreProgram();
  const storeValue = useStoreValue();
  const runProgram = useRunProgram();

  const [answerBoard, setAnswerBoard] = useState([]);
  const [board, setBoard] = useState(initialBoard);
  const [cellToRemove, setCellToRemove] = useState([]);
  const [showCode, setShowCode] = useState(false);
  const [selectedCell, setSelectedCell] = useState(null);

  // UseStates
  const [selectedProgramCode, setSelectedProgramCode] = useState("");
  const [secretValue1, setSecretValue1] = useState<number>(1);
  const [secretValue2, setSecretValue2] = useState<number>(4);

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
        // .insert(
        //   NamedValue.parse("answer_input_1"),
        //   NadaValue.createSecretInteger(answerBoard[0])
        // )
        // .insert(
        //   NamedValue.parse("answer_input_2"),
        //   NadaValue.createSecretInteger(answerBoard[1])
        // )
        // .insert(
        //   NamedValue.parse("answer_input_3"),
        //   NadaValue.createSecretInteger(answerBoard[2])
        // )
        // .insert(
        //   NamedValue.parse("answer_input_4"),
        //   NadaValue.createSecretInteger(answerBoard[3])
        // )
        // .insert(
        //   NamedValue.parse("answer_input_5"),
        //   NadaValue.createSecretInteger(answerBoard[4])
        // )
        // .insert(
        //   NamedValue.parse("answer_input_6"),
        //   NadaValue.createSecretInteger(answerBoard[5])
        // )
        // .insert(
        //   NamedValue.parse("answer_input_7"),
        //   NadaValue.createSecretInteger(answerBoard[6])
        // )
        // .insert(
        //   NamedValue.parse("answer_input_8"),
        //   NadaValue.createSecretInteger(answerBoard[7])
        // )
        // .insert(
        //   NamedValue.parse("answer_input_9"),
        //   NadaValue.createSecretInteger(answerBoard[8])
        // )
        // .insert(
        //   NamedValue.parse("answer_input_10"),
        //   NadaValue.createSecretInteger(answerBoard[9])
        // )
        // .insert(
        //   NamedValue.parse("answer_input_11"),
        //   NadaValue.createSecretInteger(answerBoard[10])
        // )
        // .insert(
        //   NamedValue.parse("answer_input_12"),
        //   NadaValue.createSecretInteger(answerBoard[11])
        // )
        // .insert(
        //   NamedValue.parse("answer_input_13"),
        //   NadaValue.createSecretInteger(answerBoard[12])
        // )
        // .insert(
        //   NamedValue.parse("answer_input_14"),
        //   NadaValue.createSecretInteger(answerBoard[13])
        // )
        // .insert(
        //   NamedValue.parse("answer_input_15"),
        //   NadaValue.createSecretInteger(answerBoard[14])
        // )
        // .insert(
        //   NamedValue.parse("answer_input_16"),
        //   NadaValue.createSecretInteger(answerBoard[15])
        // )

        // .insert(
        //   NamedValue.parse("my_int1"),
        //   NadaValue.createSecretInteger(cellToRemove[0])
        // )
        // .insert(
        //   NamedValue.parse("my_int2"),
        //   NadaValue.createSecretInteger(cellToRemove[1])
        // )
        // .insert(
        //   NamedValue.parse("my_int3"),
        //   NadaValue.createSecretInteger(cellToRemove[2])
        // )
        // .insert(
        //   NamedValue.parse("my_int4"),
        //   NadaValue.createSecretInteger(cellToRemove[3])
        // )
        // .insert(
        //   NamedValue.parse("my_int5"),
        //   NadaValue.createSecretInteger(cellToRemove[4])
        // )
        // .insert(
        //   NamedValue.parse("my_int6"),
        //   NadaValue.createSecretInteger(cellToRemove[5])
        // )
        // .insert(
        //   NamedValue.parse("my_int7"),
        //   NadaValue.createSecretInteger(cellToRemove[6])
        // )
        // .insert(
        //   NamedValue.parse("my_int8"),
        //   NadaValue.createSecretInteger(cellToRemove[7])
        // )
        // .insert(
        //   NamedValue.parse("my_int9"),
        //   NadaValue.createSecretInteger(cellToRemove[8])
        // )
        // .insert(
        //   NamedValue.parse("my_int10"),
        //   NadaValue.createSecretInteger(cellToRemove[9])
        // )
        
        .insert(
          NamedValue.parse("player_input_1"),
          NadaValue.createSecretInteger(board[0])
        )
        .insert(
          NamedValue.parse("player_input_2"),
          NadaValue.createSecretInteger(board[1])
        )
        .insert(
          NamedValue.parse("player_input_3"),
          NadaValue.createSecretInteger(board[2])
        )
        .insert(
          NamedValue.parse("player_input_4"),
          NadaValue.createSecretInteger(board[3])
        )
        .insert(
          NamedValue.parse("player_input_5"),
          NadaValue.createSecretInteger(board[4])
        )
        .insert(
          NamedValue.parse("player_input_6"),
          NadaValue.createSecretInteger(board[5])
        )
        .insert(
          NamedValue.parse("player_input_7"),
          NadaValue.createSecretInteger(board[6])
        )
        .insert(
          NamedValue.parse("player_input_8"),
          NadaValue.createSecretInteger(board[7])
        )
        .insert(
          NamedValue.parse("player_input_9"),
          NadaValue.createSecretInteger(board[8])
        )
        .insert(
          NamedValue.parse("player_input_10"),
          NadaValue.createSecretInteger(board[9])
        )
        .insert(
          NamedValue.parse("player_input_11"),
          NadaValue.createSecretInteger(board[10])
        )
        .insert(
          NamedValue.parse("player_input_12"),
          NadaValue.createSecretInteger(board[11])
        )
        .insert(
          NamedValue.parse("player_input_13"),
          NadaValue.createSecretInteger(board[12])
        )
        .insert(
          NamedValue.parse("player_input_14"),
          NadaValue.createSecretInteger(board[13])
        )
        .insert(
          NamedValue.parse("player_input_15"),
          NadaValue.createSecretInteger(board[14])
        )
        .insert(
          NamedValue.parse("player_input_16"),
          NadaValue.createSecretInteger(board[15])
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

  // Action to handle storing Sudoku Game
  const handleStoreSecretSudokuGame = async () => {
    try {
      const permissions = Permissions.create().allowCompute(
        client.vm.userId,
        programID as ProgramId
      );

      const result = await storeValue.mutateAsync({
        values: {
          answer_input_1: answerBoard[0],
          answer_input_2: answerBoard[1],
          answer_input_3: answerBoard[2],
          answer_input_4: answerBoard[3],
          answer_input_5: answerBoard[4],
          answer_input_6: answerBoard[5],
          answer_input_7: answerBoard[6],
          answer_input_8: answerBoard[7],
          answer_input_9: answerBoard[8],
          answer_input_10: answerBoard[9],
          answer_input_11: answerBoard[10],
          answer_input_12: answerBoard[11],
          answer_input_13: answerBoard[12],
          answer_input_14: answerBoard[13],
          answer_input_15: answerBoard[14],
          answer_input_16: answerBoard[15],
          my_int1: cellToRemove[0],
          my_int2: cellToRemove[1],
          my_int3: cellToRemove[2],
          my_int4: cellToRemove[3],
          my_int5: cellToRemove[4],
          my_int6: cellToRemove[5],
          my_int7: cellToRemove[6],
          my_int8: cellToRemove[7],
          my_int9: cellToRemove[8],
          my_int10: cellToRemove[9]
        },
        ttl: 3600,
        permissions,
      });
      setSecretSudokuGameID(result);
      console.log(result, "result")
    } catch (error) {
      console.error("Error storing SecretInteger:", error);
    }
  };


  // Action to store Program with Nada
  const handleStoreProgram = async () => {
    try {
      const programBinary = await transformNadaProgramToUint8Array(
        `./programs/${PROGRAM_NAME}.nada.bin`
      );
      const result = await storeProgram.mutateAsync({
        name: PROGRAM_NAME,
        program: programBinary,
      });
      setProgramID(result!);
    } catch (error) {
      console.log("error", error);
    }
  };

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

  // Fetch Nada Program Code.
  useEffect(() => {
    const fetchProgramCode = async () => {
      const response = await fetch(`./programs/game.py`);
      const text = await response.text();
      setSelectedProgramCode(text);
    };
    fetchProgramCode();
  }, [selectedProgramCode]);

  const handleSaveOnChain = async () => {
    if (!isConnected) throw Error('User disconnected');

    const ethersProvider = new BrowserProvider(walletProvider);
    const signer = await ethersProvider.getSigner();

    // The Contract object
    const SudokuContract = new Contract(SudokuAddress, Sudoku.abi, signer);
    const transactionHash = await SudokuContract.createGame(programID, secretSudokuGameID, answerBoard);
    console.log(transactionHash);
  }

  return (
    <Container className="flex flex-col justify-center min-h-screen p-8" maxW='1100px'>
      {/* Store Programs Section */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">Program Code:</h3>
        <div className="border-2 border-gray-300 rounded-lg p-4 max-h-60 overflow-y-auto bg-white">
          {showCode && <pre className="whitespace-pre-wrap break-words">
            <Code>{selectedProgramCode}</Code>
          </pre>}
          <Button
            onClick={() => setShowCode(!showCode)}
          >
            {showCode ? "Hide Code" : "Display Code"}
          </Button>
        </div>
        <Button
          onClick={() => handleStoreProgram()}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out mt-2 inline-block"
        >
          Store Program
        </Button>
      </div>

      {programID && (
        <div className="mt-4">
          <p className="text-sm text-gray-600">Program ID: {programID}</p>
        </div>
      )}

      <div className="border-t border-gray-300 my-4"></div>

      <GenerateSudokuNumbers setAnswerBoard={setAnswerBoard} cellToRemove={cellToRemove} setCellToRemove={setCellToRemove} />
      
      {/* Store Secrets Section */}
      <center>
        <Button
          onClick={() => handleStoreSecretSudokuGame()}
          mt="3"
          mb="4"
        >
          Store Secret Sudoku Game
        </Button>

        {secretSudokuGameID && (
          <div className="mt-2">
            <p className="text-sm text-gray-600">
              Secret Sudoku Game ID: {secretSudokuGameID}
            </p>
          </div>
        )}

        <br />

        <Button
          onClick={() => handleSaveOnChain()}
          mt="3"
          mb="4"
        >
         Save Game on-chain
        </Button>
      </center>

      <VStack spacing={8} align="center" justify="center" marginTop="300px" mb="10">
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
                value={cell || ''}
                onChange={handleInputChange}
                textAlign="center"
                fontSize="xl"
                border="none"
                isReadOnly={initialBoard[index] !== 0}
              />
            </Box>
          ))}
        </Grid>
      </VStack>

      <div className="border-t border-gray-300 my-4"></div>

      {/* Compute Section */}
      <div>
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
      </div>
    </Container>
  );
}
