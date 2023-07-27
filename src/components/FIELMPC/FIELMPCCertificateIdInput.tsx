import { useContext } from "react";
import { FIELMPCStoreContext } from "./FIELMPCContext";
import { Input, Text } from "@chakra-ui/react";

export const FIELMPCCertificateIdInput = () => {
  const context = useContext(FIELMPCStoreContext);
  if (!context)
    throw new Error(
      "FIELMPCCertificateIdInput must be used within a FIELMPCStoreContext"
    );

  const [state, dispatch] = context;
  const { certificateId } = state;
  const handleChange = (e) =>
    dispatch({ type: "SET_CERTIFICATE_ID_STRING", payload: e.target.value });
  return (
    <>
      <Input
        type="text"
        placeholder="ID del Certificado FIEL"
        onChange={handleChange}
        value={certificateId}
      />
    </>
  );
};
