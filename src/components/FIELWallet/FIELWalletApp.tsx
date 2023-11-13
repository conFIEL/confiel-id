import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Alert, AlertIcon, Button, Flex, Text } from "@chakra-ui/react";
import { useFIELStore } from "../../stores/FIEL";
import { SignatureAlgorithm } from "@nodecfdi/credentials";
import { abbreviate } from "../../helpers/strings";
import { useFIELWalletStore } from "../../stores/FIELWallet";

export const FIELWalletApp = () => {
  const router = useRouter();
  const { isReady, query } = router;
  const [appId, setAppId] = useState("");
  const credential = useFIELStore((state) => state.credential);
  const wallet = useFIELWalletStore((state) => state.wallet);

  useEffect(() => {
    const { paymentId } = query;
    if (paymentId) {
      console.log("Payment ID found", paymentId);
      setAppId(`${paymentId}`);
    }
  }, [isReady]);

  const handleConnectApp = async (appId: string) => {
    const certificate = credential.certificate();
    const certificateAsPEM = certificate.pem();
    const signature = credential.sign(appId);
    const response = await (
      await fetch("/api/apps/connect", {
        body: JSON.stringify({
          appId,
          signature,
          certificate: certificateAsPEM,
          walletAddress: wallet.address
        }),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })
    ).json();
    console.log("Response", response);
  };

  return (
    <Flex flexDir={"column"}>
      {!wallet && <Alert status="warning">
        <AlertIcon />
        Unable to accept apps without a wallet loaded.
      </Alert>}

      <Flex
        justifyContent={"space-between"}
        mt="2"
        gap="2"
        flexDirection={"column"}
        opacity={!wallet && '0.5'}
      >
        <Text fontSize={"md"} fontWeight={"bold"}>
          conFIEL Core
        </Text>
        <Flex gap="5">
          <Flex flexDir={"column"}>
            <Text fontSize={"xs"} fontWeight={"bold"}>
              Description
            </Text>
            <Text fontSize={"xs"} fontWeight={"300"}>
              conFIEL metadata connector for third-party applications.
            </Text>
          </Flex>
          <Flex flexDir={"column"} gap="2">
            <Text fontSize={"xs"} fontWeight={"bold"}>
              App Id
            </Text>
            <Text fontSize={"xs"} fontWeight={"300"}>
              {abbreviate(appId)}
            </Text>
          </Flex>
        </Flex>
        <Flex gap="2">
          <Button isDisabled={!wallet} size={"xs"} onClick={() => handleConnectApp(appId)}>
            Connect
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};
