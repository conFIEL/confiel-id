import { usePaymentOrderStore } from "../../stores/PaymentOrder";
import { useFIELWalletStore } from "../../stores/FIELWallet";
import { Flex, Text, Box, Card, CardBody, Button } from "@chakra-ui/react";

export const FIELWalletTransaction = () => {
  const recipientAddress = usePaymentOrderStore(
    (state) => state.recipientAddress
  );
  const wallet = useFIELWalletStore((state) => state.wallet);
  const paymentOrder = usePaymentOrderStore((state) => state.paymentOrder);
  return (
    <Flex flexDir={"column"}>
      <Card>
        <CardBody>
          <Text fontSize={'xs'} mb="5" fontWeight={"900"}>
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
          <Button float='right' mt="2">Send KYC Payment</Button>
        </CardBody>
      </Card>
    </Flex>
  );
};
