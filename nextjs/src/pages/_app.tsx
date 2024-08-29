"use client";

import * as React from "react";
import { ChakraProvider, Text } from '@chakra-ui/react';
import { NamedNetwork } from "@nillion/client-core";
import { createSignerFromKey } from "@nillion/client-payments";
import { NillionClientProvider } from "@nillion/client-react-hooks";
import { NillionClient } from "@nillion/client-vms";
import type { AppProps } from "next/app";

const client = NillionClient.create({
  network: NamedNetwork.enum.Devnet,
  overrides: async () => {
    const signer = await createSignerFromKey(
      process.env.NEXT_PUBLIC_NILLION_NILCHAIN_PRIVATE_KEY_0!,
    );
    return {
      endpoint: "http://localhost:8080/nilchain",
      signer,
      userSeed: "example@nillion",
      cluster: process.env.NEXT_PUBLIC_NILLION_CLUSTER_ID,
      bootnodes: [process.env.NEXT_PUBLIC_NILLION_BOOTNODE_WEBSOCKET],
    };
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <NillionClientProvider client={client}>
        <Component {...pageProps} />
      </NillionClientProvider>
    </ChakraProvider>
  );
}
