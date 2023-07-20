import { useReducer } from "react";
import { FIELLoadButton } from "./FIELLoadButton";
import { FIELPassword } from "./FIELPassword";
import { FIELUploadCer } from "./FIELUploadCer";
import { FIELUploadKey } from "./FIELUploadKey";
import { FIELStoreContext, FIELreducer } from "./FIELContext";
import { Box, Flex, SimpleGrid } from "@chakra-ui/react";

function FIEL() {
  const [state, dispatch] = useReducer(FIELreducer, {
    privateKey: null,
    certificate: null,
    password: "",
  });
  return (
    <Flex justifyContent={'center'}>
      <Box >
        <FIELStoreContext.Provider value={[state, dispatch]}>
          <SimpleGrid columns={2} p="2" spacing={'2'}>
            <FIELUploadKey />
            <FIELUploadCer />
          </SimpleGrid>
          <FIELPassword />
          <FIELLoadButton />
        </FIELStoreContext.Provider>
      </Box>
    </Flex>
  );
}

export default FIEL;
