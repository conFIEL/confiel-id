import { useReducer } from "react";
import { Box, SimpleGrid, Text } from "@chakra-ui/react";
import { FIELMPCStoreContext, FIELMPCreducer } from "./FIELMPCContext";
import { FIELMPCKeyShareInput } from "./FIELMPCKeyShareInput";
import { FIELMPCRFCInput } from "./FIELMPCRFCInput";
import { FIELMPCCertificateIdInput } from "./FIELMPCCertificateIdInput";
import { FIELMPCLoadButton } from "./FIELMPCLoadButton";
import { FIELMPCTokenUUIDInput } from "./FIELMPCTokenUUID";
import { FIELMPCPubKeyInput } from "./FIELMPCPubKeyInput";
import { MPCWrapper } from "./MPCWrapper/MPCWrapper";

export const FIELMPC = () => {
  const [state, dispatch] = useReducer(FIELMPCreducer, {
    keyShare: "",
    pubKey: "",
    rfc: "",
    tokenUUID: "",
    certificateId: "",
    signatureShare: null,
    hasFragmentKey: false,
  });
  return (
    <Box>
      <MPCWrapper>
        <FIELMPCStoreContext.Provider value={[state, dispatch]}>
          <Text fontFamily={"heading"} as="h3" mb="2">
            Firmar con fragmento de FIEL
          </Text>
          {!state.hasFragmentKey && (
            <>
              <FIELMPCKeyShareInput />
              <FIELMPCPubKeyInput />
              <SimpleGrid columns={2} spacing={2}>
                <FIELMPCRFCInput />
                <FIELMPCCertificateIdInput />
              </SimpleGrid>
              <Text py="2" fontSize={"xs"}>
                Copia la RFC y el ID del certificado de la FIEL original.
              </Text>
            </>
          )}
          {state.hasFragmentKey && <FIELMPCTokenUUIDInput />}
          <FIELMPCLoadButton />
        </FIELMPCStoreContext.Provider>
      </MPCWrapper>
    </Box>
  );
};
