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
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { FIELWalletInput } from "./FIELWalletInput";
import { useFIELStore } from "../../stores/FIEL";
import { useState } from "react";
import { generateXPRLWallet, requestFundsFromFaucet } from "../../lib/xrpl";
import { useFIELWalletStore } from "../../stores/FIELWallet";
import { FIELWalletInfo } from "./FIELWalletInfo";
import { FIELWalletApp } from "./FIELWalletApp";

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
  const [isLoadingFaucet, setIsLoadingFaucet] = useState(false);
  const [timestampForReload, setTimestampForReload] = useState(Date.now());

  const generateWalletHandler = async () => {
    const wallet = await generateXPRLWallet(credential, email, pin);
    loadWallet(wallet);
  };
  const requestFundsFromFaucetHandler = async() => {
    setIsLoadingFaucet(true);
    await requestFundsFromFaucet(wallet.address)
    setIsLoadingFaucet(false);
    setTimestampForReload(Date.now())
  }
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>conFIEL Wallet</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Tabs>
              <TabList>
                <Tab>Wallet</Tab>
                <Tab>Settings</Tab>
                <Tab>Apps</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <Box mb="4">
                    {wallet ? (
                      <FIELWalletInfo address={wallet.address} timestampForReload={timestampForReload} />
                    ) : (
                      "No wallet has been found"
                    )}
                  </Box>
                  <Button
                    mt="5"
                    isDisabled={!wallet}
                    onClick={() => requestFundsFromFaucetHandler()}
                    isLoading={isLoadingFaucet}
                    colorScheme="red"
                    variant="outline"
                  >
                    Request funds
                  </Button>
                </TabPanel>
                <TabPanel>
                  {certificate ? (
                    <FIELWalletInput
                      setCanGenerateWallet={setCanGenerateWallet}
                      email={email}
                      pin={pin}
                      setPin={setPin}
                    />
                  ) : (
                    "No FIEL certificate has been found"
                  )}
                  <Button
                    mt="5"
                    onClick={() => generateWalletHandler()}
                    isDisabled={!canGenerateWallet}
                    colorScheme="red"
                    variant="outline"
                  >
                    Load Wallet
                  </Button>
                </TabPanel>
                <TabPanel>
                  <FIELWalletApp />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
