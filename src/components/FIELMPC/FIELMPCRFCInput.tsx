import { useContext } from "react";
import { FIELMPCStoreContext } from "./FIELMPCContext";
import { Input, Text } from "@chakra-ui/react";

export const FIELMPCRFCInput = () => {
  const context = useContext(FIELMPCStoreContext);
  if (!context)
    throw new Error(
      "FIELMPCRFCInput must be used within a FIELMPCStoreContext"
    );

  const [state, dispatch] = context;
  const { rfc } = state;
  const handleChange = (e) =>
    dispatch({ type: "SET_RFC_STRING", payload: e.target.value });
  return (
    <>
      <Input
        type="text"
        placeholder="RFC de la FIEL"
        onChange={handleChange}
        value={rfc}
      />
    </>
  );
};
