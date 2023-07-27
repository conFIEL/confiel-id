import { useReducer } from "react";
import { Box, SimpleGrid, Text } from "@chakra-ui/react";
import { FIELMPCStoreContext, FIELMPCreducer } from "./FIELMPCContext";
import { FIELMPCKeyShareInput } from "./FIELMPCKeyShareInput";
import { FIELMPCRFCInput } from "./FIELMPCRFCInput";
import { FIELMPCCertificateIdInput } from "./FIELMPCCertificateIdInput";
import { FIELMPCLoadButton } from "./FIELMPCLoadButton";
import { FIELMPCTokenUUIDInput } from "./FIELMPCTokenUUID";
import { FIELMPCPubKeyInput } from "./FIELMPCPubKeyInput";

export const FIELMPC = () => {
  const [state, dispatch] = useReducer(FIELMPCreducer, {
    keyShare: null,
    pubKey: null,
    rfc: null,
    tokenUUID: null,
    certificateId: null,
    signatureShare: null,
  });
  return (
    <Box>
      <FIELMPCStoreContext.Provider value={[state, dispatch]}>
        <Text fontFamily={"heading"} as="h3" mb="2">
          Firmar con fragmento de FIEL
        </Text>
        <FIELMPCKeyShareInput />
        <FIELMPCPubKeyInput />
        <SimpleGrid columns={2} spacing={2}>
          <FIELMPCRFCInput />
          <FIELMPCCertificateIdInput />
        </SimpleGrid>
        <Text py="2" fontSize={"xs"}>
          Copia la RFC y el ID del certificado de la FIEL original.
        </Text>
        <FIELMPCTokenUUIDInput />
        <FIELMPCLoadButton />
      </FIELMPCStoreContext.Provider>
    </Box>
  );
};
