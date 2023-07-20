import { useContext, useEffect, useState } from "react";
import { FIELStoreContext } from "./FIELContext";
import {
  Credential as NodeCFDICredential,
  SignatureAlgorithm,
} from "@nodecfdi/credentials";
import { KEYUTIL, RSAKey, hex2b64 } from "jsrsasign";
import { importPrivateKey } from "../../helpers/RSA";
import { bufferToHex } from "../../helpers/buffers";
import {
  Box,
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { CircleIcon } from "../atoms/CircleIcon";
import { QRScanner } from "../QRScanner/QRScanner";

type SignedData = {
  signedToken: string;
  validTo: string;
};

export const FIELLoadButton = () => {
  const context = useContext(FIELStoreContext);
  if (!context)
    throw new Error("FIELLoadButton must be used within a FIELStoreProvider");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoadingFIEL, setLoadingFiel] = useState(false);
  const [canLoadFIEL, setCanLoadFIEL] = useState(false);
  const [QRScannerValue, setQRScannerValue] = useState("");
  const [cryptoRSAKey, setCryptoRSAkey] = useState<CryptoKey>(null);

  const [state] = context;
  const { privateKey, certificate, password } = state;

  const loadFIEL = async () => {
    setLoadingFiel(true);
    await new Promise<void>((res) =>
      setTimeout(() => handleFIELLoad(res), 100)
    );
    setLoadingFiel(false);
  };

  const clearComponent = () => {
    onClose();
  };

  const handleFIELLoad = async (callback: () => void) => {
    const fiel = NodeCFDICredential.create(
      String(certificate),
      String(privateKey),
      password
    );

    const rsaKey: RSAKey = KEYUTIL.getKeyFromEncryptedPKCS8PEM(
      fiel.privateKey().pem(),
      fiel.privateKey().passPhrase()
    );
    const decryptedPEM = KEYUTIL.getPEM(rsaKey, "PKCS8PRV");
    const cryptoKey = await importPrivateKey(decryptedPEM);

    setCryptoRSAkey(cryptoKey);
    callback();
  };

  useEffect(() => {
    if (privateKey && certificate && password?.length != 0) {
      setCanLoadFIEL(true);
    }
    return () => setCanLoadFIEL(false);
  }, [privateKey, certificate, password]);

  return (
    <>
      <Text py="2" fontSize={"xs"}>
        Sube tu <code>.key</code>, <code>.cer</code> y escribe tu password.
      </Text>

      <Button
        disabled={!canLoadFIEL}
        isLoading={isLoadingFIEL}
        mt="2"
        onClick={() => {
          loadFIEL();
          setTimeout(() => setLoadingFiel(false), 10000);
        }}
      >
        Load FIEL
      </Button>
      <Flex
        justifyContent={"center"}
        alignItems={"center"}
        mt="2"
        direction={"column"}
      >
        <Flex>
          <CircleIcon color={cryptoRSAKey ? "green.500" : "red.500"} mr="2" />
          <Text fontSize={"xs"} fontFamily={"mono"}>
            {cryptoRSAKey
              ? "La e.FIRMA se ha cargado."
              : "Sin e.FIRMA en el sistema"}
          </Text>
        </Flex>
        <Flex>
          {cryptoRSAKey && (
            <Button
              disabled={!cryptoRSAKey}
              variant={"ghost"}
              colorScheme="red"
              mt={2}
              onClick={() => onOpen()}
            >
              📸 Escanear código conFIEL
            </Button>
          )}
        </Flex>
        {/* @TODO: Find a better place for this code. */}
        <Modal isOpen={isOpen} onClose={clearComponent}>
          <ModalOverlay />
          <ModalContent mx="5">
            <ModalHeader>Escanear código conFIEL</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Box width="100%" pb="5">
                <QRScanner setBarcodeValue={setQRScannerValue} />
              </Box>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Flex>
    </>
  );
};
