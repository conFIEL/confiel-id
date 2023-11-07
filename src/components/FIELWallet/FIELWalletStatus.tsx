import { IconButton, useToast } from "@chakra-ui/react";
import { PiWalletFill } from "react-icons/pi";
import { useEffect } from "react";
import { useFIELStore } from "../../stores/FIEL";
import { useFIELWalletStore } from "../../stores/FIELWallet";
import { decryptCiphertextWithPassword, encryptPlaintext } from "../../lib/crypto";

export const FIELWalletStatus = () => {
  const toast = useToast();
  const credential = useFIELStore((state) => state.credential);
  const loadWallet = useFIELWalletStore((state) => state.loadWallet);

  const encryptDemo = async () => {
    console.log("Starting demo, plaintext is: Hello world");
    const encryptedText = await encryptPlaintext("Hello world", "password");
    console.log("Encrypted Text", encryptedText.crypto.ciphertext);
    const decryptedText = await decryptCiphertextWithPassword(encryptedText, "password");
    console.log("Decrypted Text", decryptedText);
  };

  const walletHandler = () => {
    encryptDemo();
    toast({
      title: `FIEL Wallet loaded!`,
      description: `Wallet has been loaded...`,
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  };

  return (
    credential && (
      <IconButton
        position="fixed"
        top={4}
        left={16}
        icon={<PiWalletFill />}
        aria-label="Payment Order Status"
        colorScheme={"gray"}
        onClick={() => walletHandler()}
      />
    )
  );
};
