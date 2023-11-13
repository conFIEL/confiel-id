import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Button, Flex, Text } from "@chakra-ui/react";
import { useFIELStore } from "../../stores/FIEL";
import { SignatureAlgorithm } from "@nodecfdi/credentials";
import { abbreviate } from "../../helpers/strings";

export const FIELWalletApp = () => {
  const router = useRouter();
  const { isReady, query } = router;
  const [appId, setAppId] = useState("");
  const credential = useFIELStore((state) => state.credential);

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
      <Flex
        justifyContent={"space-between"}
        mt="2"
        gap="2"
        flexDirection={"column"}
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
          <Button size={"xs"} onClick={() => handleConnectApp(appId)}>
            Connect
          </Button>
          <Button size={"xs"}>Ignore</Button>
        </Flex>
      </Flex>
    </Flex>
  );
};
