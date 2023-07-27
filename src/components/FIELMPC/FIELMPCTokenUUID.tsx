import { useContext } from "react";
import { FIELMPCStoreContext } from "./FIELMPCContext";
import { Input, Text } from "@chakra-ui/react";

export const FIELMPCTokenUUIDInput = () => {
  const context = useContext(FIELMPCStoreContext);
  if (!context)
    throw new Error(
      "FIELMPCTokenUUIDInput must be used within a FIELMPCStoreContext"
    );

  const [state, dispatch] = context;
  const { tokenUUID } = state;
  const handleChange = (e) =>
    dispatch({ type: "SET_TOKEN_UUID_STRING", payload: e.target.value });
  return (
    <>
      <Input
        type="password"
        placeholder="Token único de acceso"
        onChange={handleChange}
        value={tokenUUID}
      />
      <Text py="2" fontSize={"xs"}>
        Copia el token único de acceso.
      </Text>
    </>
  );
};
