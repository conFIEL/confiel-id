import { IconButton } from "@chakra-ui/react";
import { TbCertificate2Off } from 'react-icons/tb'


export const FIELStatus = () => {
  return (
    <IconButton
      position="fixed"
      top={4}
      left={4}
      icon={<TbCertificate2Off />}
      aria-label="FIEL Status"
      colorScheme="gray"
      onClick={() => {}}
    />
  );
};
