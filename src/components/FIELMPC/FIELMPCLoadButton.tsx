import { Button } from "@chakra-ui/react";
import { FIELMPCStoreContext } from "./FIELMPCContext";
import { useContext, useEffect, useState } from "react";

export const FIELMPCLoadButton = () => {
  const context = useContext(FIELMPCStoreContext);
  if (!context)
    throw new Error("FIELMPCLoadButton must be used within a FIELStoreProvider");
  
  const [state] = context;
  const { keyShare, rfc, certificateId, tokenUUID, pubKey } = state;

  const [canLoadKeyShare, setCanLoadKeyShare] = useState(false);

  useEffect(() => {
    certificateId && rfc && keyShare && tokenUUID && pubKey && setCanLoadKeyShare(true);
    return () => setCanLoadKeyShare(false)
  }, [rfc, certificateId, keyShare, tokenUUID, pubKey])

  return (
    <Button opacity={!canLoadKeyShare && '0.5'} disabled={!canLoadKeyShare} mt="2" onClick={() => {}}>
      Firmar con Fragmento FIEL
    </Button>
  );
};
