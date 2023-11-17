import { usePaymentOrderStore } from "../../stores/PaymentOrder";
import { useFIELWalletStore } from "../../stores/FIELWallet";
import {
  Flex,
  Text,
  Box,
  Card,
  CardBody,
  Button,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { Client } from "xrpl";
import { DEFAULT_XRPL_API_URL } from "../../constants/xrpl";
import { xrpldSubmitTransaction } from "../../lib/xrpl";
import { useFIELStore } from "../../stores/FIEL";
import { ExternalLinkIcon } from "@chakra-ui/icons";

export const FIELWalletTransaction = () => {
  const recipientAddress = usePaymentOrderStore(
    (state) => state.recipientAddress
  );
  const wallet = useFIELWalletStore((state) => state.wallet);
  const paymentOrder = usePaymentOrderStore((state) => state.paymentOrder);
  const credential = useFIELStore((state) => state.credential);

  const [client, setClient] = useState<Client>();
  const [loading, setLoading] = useState(false);
  const [transactionHash, setTransactionHash] = useState("");

  useEffect(() => {
    const loadClient = async () => {
      const client = new Client(DEFAULT_XRPL_API_URL);
      await client.connect();
      setClient(client);
    };
    loadClient();
  }, []);

  const handleSubmitTransaction = async () => {
    setLoading(true);
    const tx = await xrpldSubmitTransaction(
      client,
      credential,
      paymentOrder,
      wallet,
      recipientAddress
    );
    console.log("TX", tx);
    setTransactionHash(tx.result.hash);
    setLoading(false);
  };

  return (
    <Flex flexDir={"column"}>
      <Card>
        <CardBody>
          <Text fontSize={"xs"} mb="5" fontWeight={"900"}>
            Execute KYC payment for payment order
          </Text>
          <Flex flexDir={"column"} gap="5">
            {Object.keys(paymentOrder).map((key) => (
              <Box key={key}>
                <Text fontSize={"xs"}>{key.toLocaleUpperCase()}</Text>
                <Text>{paymentOrder[key]}</Text>
              </Box>
            ))}
          </Flex>
          <Flex flexDir={'column'} gap="2">
          <Button
            onClick={handleSubmitTransaction}
            isLoading={loading}
            float="right"
            mt="2"
          >
            Send KYC Payment
          </Button>
          {transactionHash && (
            <Flex fontSize='xs'>
              Success! Transaction submitted.
              <ChakraLink
                display="flex"
                alignItems="center"
                ml="1"
                isExternal
                href={`https://testnet.xrpl.org/transactions/${transactionHash}`}
              >
                <ExternalLinkIcon boxSize="3" />
              </ChakraLink>
            </Flex>
          )}
          </Flex>
        </CardBody>
      </Card>
    </Flex>
  );
};
