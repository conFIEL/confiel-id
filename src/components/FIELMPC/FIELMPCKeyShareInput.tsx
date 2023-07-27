import { useContext } from "react";
import { FIELMPCStoreContext } from "./FIELMPCContext";
import { Input, Text } from "@chakra-ui/react";

export const FIELMPCKeyShareInput = () => {
  const context = useContext(FIELMPCStoreContext);
  if (!context)
    throw new Error(
      "FIELMPCKeyShareInput must be used within a FIELMPCStoreContext"
    );

  const [state, dispatch] = context;
  const { keyShare } = state;
  const handleChange = (e) =>
    dispatch({ type: "SET_KEY_SHARE_STRING", payload: e.target.value });
  return (
    <>
      <Input
        type="password"
        placeholder="Fragmento secreto FIEL"
        onChange={handleChange}
        value={keyShare}
      />
      <Text py="2" fontSize={"xs"}>
        Copia el fragmento FIEL compartido por un usuario.
      </Text>
    </>
  );
};
