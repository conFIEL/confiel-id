import { useReducer } from "react";
import { Box, SimpleGrid, Text } from "@chakra-ui/react";
import { FIELMPCStoreContext, FIELMPCreducer } from "./FIELMPCContext";
import { FIELMPCKeyShareInput } from "./FIELMPCKeyShareInput";
import { FIELMPCRFCInput } from "./FIELMPCRFCInput";
import { FIELMPCCertificateIdInput } from "./FIELMPCCertificateIdInput";
import { FIELMPCLoadButton } from "./FIELMPCLoadButton";

export const FIELMPC = () => {
  const [state, dispatch] = useReducer(FIELMPCreducer, {
    keyShare: null,
    rfc: null,
    certificateId: null,
    signatureShare: null,
  });
  return (
    <Box>
      <FIELMPCStoreContext.Provider value={[state, dispatch]}>
        <Text fontFamily={"heading"} as="h3" mb="2">
          Agregar fragmento de FIEL
        </Text>
        <FIELMPCKeyShareInput />
        <SimpleGrid columns={2} spacing={2}>
          <FIELMPCRFCInput />
          <FIELMPCCertificateIdInput />
        </SimpleGrid>
        <Text py="2" fontSize={"xs"}>
          Copia la RFC y el ID del certificado de la FIEL original.
        </Text>
        <FIELMPCLoadButton />
      </FIELMPCStoreContext.Provider>
    </Box>
  );
};
