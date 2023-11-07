

import { IconButton, useToast } from "@chakra-ui/react";
import { PiReceiptFill } from "react-icons/pi";
import { PaymentOrder, usePaymentOrderStore } from "../../stores/PaymentOrder";
import { useEffect } from "react";
import { useRouter } from "next/router";

export const PaymentOrderStatus = () => {
  const toast = useToast();
  const router = useRouter()
  const { isReady, query } = router;
  const paymentOrder = usePaymentOrderStore((state) => state.paymentOrder);
  const loadPaymentOrder = usePaymentOrderStore((state) => state.loadPaymentOrder);

  useEffect(() => {
    const { paymentOrder: paymentOrderAsBase64EncodedURI } = query;
    if (paymentOrderAsBase64EncodedURI) {
      const paymentOrderAsBase64 = decodeURIComponent(`${paymentOrderAsBase64EncodedURI}`);
      const paymentOrderAsStringifiedJSON = atob(paymentOrderAsBase64);
      const paymentOrder = JSON.parse(paymentOrderAsStringifiedJSON) as PaymentOrder;
      loadPaymentOrder(paymentOrder);
    }
  }, [isReady]);

  const paymentOrderHandler = () => {
    if (!paymentOrder) {
      toast({
        title: "No Payment Order found.",
        description: "There are no payment orders loaded into the app.",
        status: "info",
        duration: 9000,
        isClosable: true,
      });
      return;
    }
    toast({
      title: `${paymentOrder.name} FIEL loaded.`,
      description: `Description: ${paymentOrder.description}, Amount: ${paymentOrder.amount}`,
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  };

  return (
    paymentOrder && <IconButton
      position="fixed"
      top={16}
      left={4}
      icon={<PiReceiptFill />}
      aria-label="Payment Order Status"
      colorScheme={"gray"}
      onClick={() => paymentOrderHandler()}
    />
  );
};
