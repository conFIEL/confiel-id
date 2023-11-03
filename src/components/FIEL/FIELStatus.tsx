import { IconButton, useToast } from "@chakra-ui/react";
import { PiCertificateFill, PiCertificateLight } from "react-icons/pi";
import { useFIELStore } from "../../stores/FIEL";

export const FIELStatus = () => {
  const toast = useToast();
  const credential = useFIELStore((state) => state.credential);
  const fielStatusHandler = () => {
    if (!credential) {
      toast({
        title: "No FIEL found.",
        description: "There are no credentials loaded into the app.",
        status: "info",
        duration: 9000,
        isClosable: true,
      });
      return;
    }
    const certificate = credential.certificate();
    toast({
      title: `${certificate.legalName()} FIEL loaded.`,
      description: `RFC: ${certificate.rfc()}, Email: ${certificate.issuerData(
        "E"
      )}`,
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  };

  return (
    <IconButton
      position="fixed"
      top={4}
      left={4}
      icon={credential ? <PiCertificateFill /> : <PiCertificateLight />}
      aria-label="FIEL Status"
      colorScheme={credential ? "green" : "gray"}
      onClick={() => fielStatusHandler()}
    />
  );
};
