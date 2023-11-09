import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Code,
  Box,
} from "@chakra-ui/react";
import { FIELWalletInput } from "./FIELWalletInput";
import { useFIELStore } from "../../stores/FIEL";
import { useState } from "react";
import { generateXPRLWallet } from "../../lib/xrpl";
import { useFIELWalletStore } from "../../stores/FIELWallet";
import { FIELWalletInfo } from "./FIELWalletInfo";

export const FIELWalletModal = ({
  isOpen,
  onOpen,
  onClose,
}: {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}) => {
  const credential = useFIELStore((state) => state.credential);
  const loadWallet = useFIELWalletStore((state) => state.loadWallet);
  const wallet = useFIELWalletStore((state) => state.wallet);
  const [pin, setPin] = useState("");
  const certificate = credential && credential.certificate();
  const email = certificate && certificate.issuerData("E");
  const [canGenerateWallet, setCanGenerateWallet] = useState(false);
  const generateWalletHandler = async () => {
    const wallet = await generateXPRLWallet(credential, email, pin);
    loadWallet(wallet);
  };
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>conFIEL Wallet</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box mb="4">
              {wallet ? (
                <FIELWalletInfo address={wallet.address} />
              ) : (
                "No wallet has been found"
              )}
            </Box>
            {certificate && (
              <FIELWalletInput
                setCanGenerateWallet={setCanGenerateWallet}
                email={email}
                pin={pin}
                setPin={setPin}
              />
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              onClick={() => generateWalletHandler()}
              isDisabled={!canGenerateWallet}
              colorScheme="red"
              variant="outline"
            >
              Load Wallet
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
