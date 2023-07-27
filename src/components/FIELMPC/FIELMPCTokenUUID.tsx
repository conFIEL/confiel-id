import { useContext, useEffect } from "react";
import { FIELMPCStoreContext } from "./FIELMPCContext";
import { Input, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";

export const FIELMPCTokenUUIDInput = () => {
  const router = useRouter();
  const { query } = router;
  const token = query?.token && `${query.token}`;
  
  const context = useContext(FIELMPCStoreContext);
  if (!context)
    throw new Error(
      "FIELMPCTokenUUIDInput must be used within a FIELMPCStoreContext"
    );

  const [state, dispatch] = context;
  const { tokenUUID } = state;
  const handleChange = (e) =>
    dispatch({ type: "SET_TOKEN_UUID_STRING", payload: e.target.value });

  useEffect(() => {
    token && dispatch({ type: "SET_TOKEN_UUID_STRING", payload: token });
  }, [token])
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
