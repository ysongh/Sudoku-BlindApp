import * as React from "react";
import {
  useRunProgram,
  useStoreValue,
  useStoreProgram,
  useNillion,
  useFetchProgramOutput,
} from "@nillion/client-react-hooks";
import { useEffect, useState } from "react";
import { Container, Code, Input, Heading, Button } from '@chakra-ui/react'
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

export default function Compute() {
  // Use of Nillion Hooks
  const client = useNillion();
  const storeProgram = useStoreProgram();
  const storeValue = useStoreValue();
  const runProgram = useRunProgram();

  // UseStates
  const [selectedProgramCode, setSelectedProgramCode] = useState("");
  const [secretValue1, setSecretValue1] = useState<number>(1);
  const [secretValue2, setSecretValue2] = useState<number>(4);
  const [secretValue3, setSecretValue3] = useState<number>(5);
  const [secretValue4, setSecretValue4] = useState<number>(6);
  const [secretValue5, setSecretValue5] = useState<number>(7);
  const [secretValue6, setSecretValue6] = useState<number>(8);
  const [secretValue7, setSecretValue7] = useState<number>(9);
  const [secretValue8, setSecretValue8] = useState<number>(11);
  const [secretValue9, setSecretValue9] = useState<number>(13);
  const [secretValue10, setSecretValue10] = useState<number>(14);

  const [targetNumber1, setTargetNumber1] = useState<number>(0);
  const [targetNumber2, setTargetNumber2] = useState<number>(0);
  const [targetNumber3, setTargetNumber3] = useState<number>(0);
  const [targetNumber4, setTargetNumber4] = useState<number>(0);
  const [targetNumber5, setTargetNumber5] = useState<number>(0);
  const [targetNumber6, setTargetNumber6] = useState<number>(0);
  const [targetNumber7, setTargetNumber7] = useState<number>(0);
  const [targetNumber8, setTargetNumber8] = useState<number>(0);
  const [targetNumber9, setTargetNumber9] = useState<number>(0);
  const [targetNumber10, setTargetNumber10] = useState<number>(0);

  const [targetValue1, setTargetValue1] = useState<number>(0);
  const [targetValue2, setTargetValue2] = useState<number>(0);
  const [targetValue3, setTargetValue3] = useState<number>(0);
  const [targetValue4, setTargetValue4] = useState<number>(0);
  const [targetValue5, setTargetValue5] = useState<number>(0);
  const [targetValue6, setTargetValue6] = useState<number>(0);
  const [targetValue7, setTargetValue7] = useState<number>(0);
  const [targetValue8, setTargetValue8] = useState<number>(0);
  const [targetValue9, setTargetValue9] = useState<number>(0);
  const [targetValue10, setTargetValue10] = useState<number>(0);

  const [programID, setProgramID] = useState<ProgramId>();
  const [secretValue1ID, setSecretValue1ID] = useState<StoreId>();
  const [secretValue2ID, setSecretValue2ID] = useState<StoreId>();
  const [secretValue3ID, setSecretValue3ID] = useState<StoreId>();
  const [secretValue4ID, setSecretValue4ID] = useState<StoreId>();
  const [secretValue5ID, setSecretValue5ID] = useState<StoreId>();
  const [secretValue6ID, setSecretValue6ID] = useState<StoreId>();
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
          NadaValue.createSecretInteger(secretValue1)
        )
        .insert(
          NamedValue.parse("my_int2"),
          NadaValue.createSecretInteger(secretValue2)
        )
        .insert(
          NamedValue.parse("my_int3"),
          NadaValue.createSecretInteger(secretValue3)
        )
        .insert(
          NamedValue.parse("my_int4"),
          NadaValue.createSecretInteger(secretValue4)
        )
        .insert(
          NamedValue.parse("my_int5"),
          NadaValue.createSecretInteger(secretValue5)
        )
        .insert(
          NamedValue.parse("my_int6"),
          NadaValue.createSecretInteger(secretValue6)
        )
        .insert(
          NamedValue.parse("my_int7"),
          NadaValue.createSecretInteger(secretValue7)
        )
        .insert(
          NamedValue.parse("my_int8"),
          NadaValue.createSecretInteger(secretValue8)
        )
        .insert(
          NamedValue.parse("my_int9"),
          NadaValue.createSecretInteger(secretValue9)
        )
        .insert(
          NamedValue.parse("my_int10"),
          NadaValue.createSecretInteger(secretValue10)
        )

        .insert(
          NamedValue.parse("player_target_1"),
          NadaValue.createSecretInteger(targetNumber1)
        )
        .insert(
          NamedValue.parse("player_target_2"),
          NadaValue.createSecretInteger(targetNumber2)
        )
        .insert(
          NamedValue.parse("player_target_3"),
          NadaValue.createSecretInteger(targetNumber3)
        )
        .insert(
          NamedValue.parse("player_target_4"),
          NadaValue.createSecretInteger(targetNumber4)
        )
        .insert(
          NamedValue.parse("player_target_5"),
          NadaValue.createSecretInteger(targetNumber5)
        )
        .insert(
          NamedValue.parse("player_target_6"),
          NadaValue.createSecretInteger(targetNumber6)
        )
        .insert(
          NamedValue.parse("player_target_7"),
          NadaValue.createSecretInteger(targetNumber7)
        )
        .insert(
          NamedValue.parse("player_target_8"),
          NadaValue.createSecretInteger(targetNumber8)
        )
        .insert(
          NamedValue.parse("player_target_9"),
          NadaValue.createSecretInteger(targetNumber9)
        )
        .insert(
          NamedValue.parse("player_target_10"),
          NadaValue.createSecretInteger(targetNumber10)
        )

        .insert(
          NamedValue.parse("player_input_1"),
          NadaValue.createSecretInteger(targetValue1)
        )
        .insert(
          NamedValue.parse("player_input_2"),
          NadaValue.createSecretInteger(targetValue2)
        )
        .insert(
          NamedValue.parse("player_input_3"),
          NadaValue.createSecretInteger(targetValue3)
        )
        .insert(
          NamedValue.parse("player_input_4"),
          NadaValue.createSecretInteger(targetValue4)
        )
        .insert(
          NamedValue.parse("player_input_5"),
          NadaValue.createSecretInteger(targetValue5)
        )
        .insert(
          NamedValue.parse("player_input_6"),
          NadaValue.createSecretInteger(targetValue6)
        )
        .insert(
          NamedValue.parse("player_input_7"),
          NadaValue.createSecretInteger(targetValue7)
        )
        .insert(
          NamedValue.parse("player_input_8"),
          NadaValue.createSecretInteger(targetValue8)
        )
        .insert(
          NamedValue.parse("player_input_9"),
          NadaValue.createSecretInteger(targetValue9)
        )
        .insert(
          NamedValue.parse("player_input_10"),
          NadaValue.createSecretInteger(targetValue10)
        );
        

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
          mySecretInt: secretValue1,
        },
        ttl: 3600,
        permissions,
      });
      setSecretValue1ID(result);
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
          mySecretInt: secretValue2,
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

  const handleStoreSecretInteger3 = async () => {
    try {
      const permissions = Permissions.create().allowCompute(
        client.vm.userId,
        programID as ProgramId
      );
      const result = await storeValue.mutateAsync({
        values: {
          mySecretInt: secretValue3,
        },
        ttl: 3600,
        permissions,
      });
      console.log("Stored SecretInteger3:", result);
      setSecretValue3ID(result);
    } catch (error) {
      console.error("Error storing SecretInteger3:", error);
    }
  };

  const handleStoreSecretInteger4 = async () => {
    try {
      const permissions = Permissions.create().allowCompute(
        client.vm.userId,
        programID as ProgramId
      );
      const result = await storeValue.mutateAsync({
        values: {
          mySecretInt: secretValue4,
        },
        ttl: 3600,
        permissions,
      });
      console.log("Stored SecretInteger4:", result);
      setSecretValue4ID(result);
    } catch (error) {
      console.error("Error storing SecretInteger4:", error);
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
          <pre className="whitespace-pre-wrap break-words">
            <Code>{selectedProgramCode}</Code>
          </pre>
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

      <div>
        <Heading my="2">Inputs</Heading>
        <Input
          placeholder="Grid Target 1"
          value={targetNumber1}
          onChange={(e) => setTargetNumber1(Number(e.target.value))}
        />
        <Input
          placeholder="Grid Value 1"
          value={targetValue1}
          onChange={(e) => setTargetValue1(Number(e.target.value))}
        />
        <Input
          placeholder="Grid Target 2"
          value={targetNumber2}
          onChange={(e) => setTargetNumber2(Number(e.target.value))}
        />
        <Input
          placeholder="Grid Value 2"
          value={targetValue2}
          onChange={(e) => setTargetValue2(Number(e.target.value))}
        />
        <Input
          placeholder="Grid Target 3"
          value={targetNumber3}
          onChange={(e) => setTargetNumber3(Number(e.target.value))}
        />
        <Input
          placeholder="Grid Value 3"
          value={targetValue3}
          onChange={(e) => setTargetValue3(Number(e.target.value))}
        />
        <Input
          placeholder="Grid Target 4"
          value={targetNumber4}
          onChange={(e) => setTargetNumber4(Number(e.target.value))}
        />
        <Input
          placeholder="Grid Value 4"
          value={targetValue4}
          onChange={(e) => setTargetValue4(Number(e.target.value))}
        />
        <Input
          placeholder="Grid Target 5"
          value={targetNumber5}
          onChange={(e) => setTargetNumber5(Number(e.target.value))}
        />
        <Input
          placeholder="Grid Value 5"
          value={targetValue5}
          onChange={(e) => setTargetValue5(Number(e.target.value))}
        />
        <Input
          placeholder="Grid Target 6"
          value={targetNumber6}
          onChange={(e) => setTargetNumber6(Number(e.target.value))}
        />
        <Input
          placeholder="Grid Value 6"
          value={targetValue6}
          onChange={(e) => setTargetValue6(Number(e.target.value))}
        />
        <Input
          placeholder="Grid Target 7"
          value={targetNumber7}
          onChange={(e) => setTargetNumber7(Number(e.target.value))}
        />
        <Input
          placeholder="Grid Value 7"
          value={targetValue7}
          onChange={(e) => setTargetValue7(Number(e.target.value))}
        />
        <Input
          placeholder="Grid Target 8"
          value={targetNumber8}
          onChange={(e) => setTargetNumber8(Number(e.target.value))}
        />
        <Input
          placeholder="Grid Value 8"
          value={targetValue8}
          onChange={(e) => setTargetValue8(Number(e.target.value))}
        />
        <Input
          placeholder="Grid Target 9"
          value={targetNumber9}
          onChange={(e) => setTargetNumber9(Number(e.target.value))}
        />
        <Input
          placeholder="Grid Value 9"
          value={targetValue9}
          onChange={(e) => setTargetValue9(Number(e.target.value))}
        />
        <Input
          placeholder="Grid Target 10"
          value={targetNumber10}
          onChange={(e) => setTargetNumber10(Number(e.target.value))}
        />
        <Input
          placeholder="Grid Value 10"
          value={targetValue10}
          onChange={(e) => setTargetValue10(Number(e.target.value))}
        />
      </div>

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
