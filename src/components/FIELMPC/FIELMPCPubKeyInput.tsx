import { useContext } from "react";
import { FIELMPCStoreContext } from "./FIELMPCContext";
import { Input, Text } from "@chakra-ui/react";

export const FIELMPCPubKeyInput = () => {
  const context = useContext(FIELMPCStoreContext);
  if (!context)
    throw new Error(
      "FIELMPCPubKeyInput must be used within a FIELMPCStoreContext"
    );

  const [state, dispatch] = context;
  const { pubKey } = state;
  const handleChange = (e) =>
    dispatch({ type: "SET_PUB_KEY_STRING", payload: e.target.value });
  return (
    <>
      <Input
        type="text"
        placeholder="Llave pública de la FIEL"
        onChange={handleChange}
        value={pubKey}
      />
      <Text py="2" fontSize={"xs"}>
        Copia la llave pública de la FIEL compartida.
      </Text>
    </>
  );
};
