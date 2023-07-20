import { useContext, useEffect, useState } from "react";
import { FIELStoreContext } from "./FIELContext";
import {
  Credential as NodeCFDICredential,
  SignatureAlgorithm,
} from "@nodecfdi/credentials";
import { KEYUTIL, RSAKey, hex2b64 } from "jsrsasign";
import { importPrivateKey } from "../../helpers/RSA";
import { bufferToHex } from "../../helpers/buffers";
import { Button, Flex, Input, Text } from "@chakra-ui/react";
import { CircleIcon } from "../atoms/CircleIcon";

type SignedData = {
  signedToken: string;
  validTo: string;
};

export const FIELLoadButton = () => {
  const context = useContext(FIELStoreContext);
  if (!context)
    throw new Error("FIELLoadButton must be used within a FIELStoreProvider");

  const [isLoadingFIEL, setLoadingFiel] = useState(false);
  const [canLoadFIEL, setCanLoadFIEL] = useState(false);
  const [cryptoRSAKey, setCryptoRSAkey] = useState<CryptoKey>(null);

  const [state] = context;
  const { privateKey, certificate, password } = state;

  const handleFIELLoad = async () => {
    setLoadingFiel(true);
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
    setLoadingFiel(false);
  };

  useEffect(() => {
    if (privateKey && certificate && password?.length != 0) {
      setCanLoadFIEL(true);
    }
    return () => setCanLoadFIEL(false);
  }, [privateKey, certificate, password]);

  return !canLoadFIEL ? (
    <Text py="2" fontSize={"xs"}>
      Please upload all files and type password
    </Text>
  ) : (
    <>
      <Button isLoading={isLoadingFIEL} mt="2" onClick={handleFIELLoad}>
        Load FIEL
      </Button>
      <Flex justifyContent={"center"} alignItems={"center"} mt="2">
        <CircleIcon color={cryptoRSAKey ? "green.500" : "red.500"} mr='2'/>
        <Text fontSize={'xs'} fontFamily={"mono"}>
          {cryptoRSAKey
            ? "La e.FIRMA se ha cargado."
            : "Sin e.FIRMA en el sistema"}
        </Text>
      </Flex>
    </>
  );
};
