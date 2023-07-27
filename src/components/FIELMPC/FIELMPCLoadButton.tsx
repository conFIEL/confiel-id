import { Button, Flex, Box, Text } from "@chakra-ui/react";
import { FIELMPCStoreContext } from "./FIELMPCContext";
import { useContext, useEffect, useState } from "react";
import { signWithShare } from "../../lib/fiel-mpc";
import { CircleIcon } from "../atoms/CircleIcon";
import { pushData } from "../../lib/pusher";

type FragmentKey = {
  keyShare: string;
  rfc: string;
  certificateId: string;
  pubKey: string;
};

export const FIELMPCLoadButton = () => {
  const context = useContext(FIELMPCStoreContext);
  if (!context)
    throw new Error(
      "FIELMPCLoadButton must be used within a FIELStoreProvider"
    );

  const [state, dispatch] = context;
  const { keyShare, rfc, certificateId, tokenUUID, pubKey } = state;

  const [canLoadKeyShare, setCanLoadKeyShare] = useState(false);
  const [fragmentKey, setFragmentKey] = useState<FragmentKey>();

  const handleSignShare = async () => {
    console.log("Signing...");
    const signedShare = await signWithShare({
      keyShare,
      rfc,
      certificateId,
      tokenUUID,
      pubKey,
    });
    console.log("Partial Signature", signedShare);
    //@TODO: Fix hardcoded value for validTo
    return await pushData({ id: tokenUUID, signedShare, validTo: '261025214030Z' }, 'partial-sign');
  };

  const loadFragmentKey = (fragmentKey: FragmentKey) => {
    setFragmentKey(fragmentKey);
    dispatch({ type: "SET_HAS_FRAGMENT_KEY_BOOLEAN", payload: true });
  };

  useEffect(() => {
    certificateId && rfc && keyShare && pubKey && setCanLoadKeyShare(true);
    return () => setCanLoadKeyShare(false);
  }, [rfc, certificateId, keyShare, pubKey]);

  return (
    <>
      <Button
        opacity={!canLoadKeyShare && "0.5"}
        disabled={!canLoadKeyShare}
        mt="2"
        onClick={() => {
          loadFragmentKey({ certificateId, rfc, keyShare, pubKey });
        }}
      >
        Cargar Fragmento FIEL
      </Button>
      <Flex
        justifyContent={"center"}
        alignItems={"center"}
        mt="2"
        direction={"column"}
      >
        <Flex>
          <CircleIcon color={fragmentKey ? "green.500" : "red.500"} mr="2" />
          <Text fontSize={"xs"} fontFamily={"mono"}>
            {fragmentKey
              ? "Fragmento FIEL cargado."
              : "Sin fragmento en el sistema"}
          </Text>
        </Flex>
        {fragmentKey && (
          <Box mt="5">
            <Button
              disabled={!fragmentKey}
              variant={"outline"}
              colorScheme="red"
              mt={2}
              onClick={handleSignShare}
            >
              🖊️ Firmar con Fragmento
            </Button>
          </Box>
        )}
      </Flex>
    </>
  );
};
