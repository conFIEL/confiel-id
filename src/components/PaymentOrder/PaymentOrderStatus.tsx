

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
  const loadRecipientAddress = usePaymentOrderStore((state) => state.loadRecipientAddress);
  const recipientAddress = usePaymentOrderStore((state) => state.recipientAddress);

  useEffect(() => {
    const { paymentOrder: paymentOrderAsBase64EncodedURI, recipientAddress } = query;
    if (paymentOrderAsBase64EncodedURI) {
      const paymentOrderAsBase64 = decodeURIComponent(`${paymentOrderAsBase64EncodedURI}`);
      const paymentOrderAsStringifiedJSON = atob(paymentOrderAsBase64);
      const paymentOrder = JSON.parse(paymentOrderAsStringifiedJSON) as PaymentOrder;
      loadPaymentOrder(paymentOrder);
    }
    if (recipientAddress) {
      loadRecipientAddress(`${recipientAddress}`)
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
      title: `Payment order loaded.`,
      description: `Product: ${paymentOrder.name}, Description: ${paymentOrder.description}, Amount: ${paymentOrder.amount}. ${recipientAddress ? `Recipient: ${recipientAddress}` : 'Recipient address not confirmed.'}`,
      status: recipientAddress ? "success" : "warning",
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
      colorScheme={recipientAddress ? "green" : "gray"}
      onClick={() => paymentOrderHandler()}
    />
  );
};
