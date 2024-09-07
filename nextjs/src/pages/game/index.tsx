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

import SudokuFlip from "@/components/SudokuFlip";

const initialBoard = [
  1, 0, 2, 3,
  0, 0, 0, 0,
  0, 0, 4, 0,
  4, 0, 0, 1
];

export default function Compute() {
  // Use of Nillion Hooks
  const client = useNillion();
  const storeProgram = useStoreProgram();
  const storeValue = useStoreValue();
  const runProgram = useRunProgram();

  const [board, setBoard] = useState(initialBoard);
  const [cellToRemove, setCellToRemove] = useState([]);
  const [showCode, setShowCode] = useState(false);
  const [selectedCell, setSelectedCell] = useState(null);

  // UseStates
  const [selectedProgramCode, setSelectedProgramCode] = useState("");
  const [secretValue1, setSecretValue1] = useState<number>(1);
  const [secretValue2, setSecretValue2] = useState<number>(4);

  const [programID, setProgramID] = useState<ProgramId>();
  const [secretValue1ID, setSecretValue1ID] = useState<StoreId>();
  const [secretValue2ID, setSecretValue2ID] = useState<StoreId>();
  const [secretValue3ID, setSecretValue3ID] = useState<StoreId>();
  const [secretValue4ID, setSecretValue4ID] = useState<StoreId>();
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
          NamedValue.parse("my_int1"),
          NadaValue.createSecretInteger(cellToRemove[0])
        )
        .insert(
          NamedValue.parse("my_int2"),
          NadaValue.createSecretInteger(cellToRemove[1])
        )
        .insert(
          NamedValue.parse("my_int3"),
          NadaValue.createSecretInteger(cellToRemove[2])
        )
        .insert(
          NamedValue.parse("my_int4"),
          NadaValue.createSecretInteger(cellToRemove[3])
        )
        .insert(
          NamedValue.parse("my_int5"),
          NadaValue.createSecretInteger(cellToRemove[4])
        )
        .insert(
          NamedValue.parse("my_int6"),
          NadaValue.createSecretInteger(cellToRemove[5])
        )
        .insert(
          NamedValue.parse("my_int7"),
          NadaValue.createSecretInteger(cellToRemove[6])
        )
        .insert(
          NamedValue.parse("my_int8"),
          NadaValue.createSecretInteger(cellToRemove[7])
        )
        .insert(
          NamedValue.parse("my_int9"),
          NadaValue.createSecretInteger(cellToRemove[8])
        )
        .insert(
          NamedValue.parse("my_int10"),
          NadaValue.createSecretInteger(cellToRemove[9])
        )
        
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
        storeIds: [],
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

  // Action to handle storing secret integer 1
  const handleStoreSecretInteger1 = async () => {
    try {
      const permissions = Permissions.create().allowCompute(
        client.vm.userId,
        programID as ProgramId
      );

      const result = await storeValue.mutateAsync({
        values: {
          my_int1: secretValue1,
        },
        ttl: 3600,
        permissions,
      });
      setSecretValue1ID(result);
      console.log(result, "result")
    } catch (error) {
      console.error("Error storing SecretInteger:", error);
    }
  };

  // Action to handle storing secret integer 2
  const handleStoreSecretInteger2 = async () => {
    try {
      const permissions = Permissions.create().allowCompute(
        client.vm.userId,
        programID as ProgramId
      );
      const result = await storeValue.mutateAsync({
        values: {
          my_int2: secretValue2,
        },
        ttl: 3600,
        permissions,
      });
      console.log("Stored SecretInteger2:", result);
      setSecretValue2ID(result);
    } catch (error) {
      console.error("Error storing SecretInteger2:", error);
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

      <SudokuFlip cellToRemove={cellToRemove} setCellToRemove={setCellToRemove} />

      {/* Store Secrets Section */}
      <div>
        <h3 className="text-lg font-semibold mb-2 text-left">Store Secret:</h3>
        <p> Store your int_1</p>
        <Input
          placeholder="Enter your secret value"
          value={secretValue1}
          onChange={(e) => setSecretValue1(Number(e.target.value))}
          className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
        />
        <Button
          onClick={() => handleStoreSecretInteger1()}
          className="bg-blue-500 mb-4 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out mt-2"
        >
          Store Secret
        </Button>

        {secretValue1ID && (
          <div className="mt-2">
            <p className="text-sm text-gray-600">
              Secret Value 1 ID: {secretValue1ID}
            </p>
          </div>
        )}

        <p> Store your int_2</p>
        <Input
          placeholder="Enter your secret value"
          value={secretValue2}
          onChange={(e) => setSecretValue2(Number(e.target.value))}
          className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
        />
        <Button
          onClick={() => handleStoreSecretInteger2()}
          className="bg-blue-500 mb-4 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out mt-2"
        >
          Store Secret
        </Button>

        {secretValue2ID && (
          <div className="mt-2">
            <p className="text-sm text-gray-600">
              Secret Value 2 ID: {secretValue2ID}
            </p>
          </div>
        )}
      </div>

      <VStack spacing={8} align="center" justify="center">
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
