import { IconButton, useDisclosure } from "@chakra-ui/react";
import { PiWalletFill } from "react-icons/pi";
import { useFIELStore } from "../../stores/FIEL";
import { useFIELWalletStore } from "../../stores/FIELWallet";
import { FIELWalletModal } from "./FIELWalletModal";

export const FIELWalletStatus = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const credential = useFIELStore((state) => state.credential);
  const loadWallet = useFIELWalletStore((state) => state.loadWallet);

  return (
    credential && (
      <>
      <IconButton
        position="fixed"
        top={4}
        left={16}
        icon={<PiWalletFill />}
        aria-label="Payment Order Status"
        colorScheme={"gray"}
        onClick={() => isOpen ? onClose() : onOpen()}
      />
      <FIELWalletModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
      </>
    )
  );
};
