import {
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Input,
  PinInput,
  PinInputField,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

export const FIELWalletInput = ({
  email,
  rfc,
  pin,
  setPin,
  setCanGenerateWallet,
}: {
  email: string,
  rfc: string,
  pin: string,
  setPin: (pin: string) => void,
  setCanGenerateWallet: (canGenerateWallet: boolean) => void,
}) => {
  useEffect(() => {
    setCanGenerateWallet(false);
    pin.length == 6 && setCanGenerateWallet(true);
  }, [pin]);
  return (
    <Flex flexDir={"column"} gap="4">
      <FormControl>
        <FormLabel>RFC</FormLabel>
        <Input type="text" disabled value={rfc} />
        <FormHelperText>
          Your RFC is your unique serial number.
        </FormHelperText>
      </FormControl>
      <FormControl>
        <FormLabel>Email address</FormLabel>
        <Input type="email" disabled value={email} />
        <FormHelperText>
          Your email will be derived from your FIEL.
        </FormHelperText>
      </FormControl>
      <FormControl>
        <FormLabel>Pin</FormLabel>
        <HStack>
          <PinInput value={pin} onChange={(e) => setPin(e)}>
            <PinInputField />
            <PinInputField />
            <PinInputField />
            <PinInputField />
            <PinInputField />
            <PinInputField />
          </PinInput>
        </HStack>
        <FormHelperText>
          Your pin is used to derive a unique wallet and can not be changed.
          Ensure you write it down to load the same wallet everytime.
        </FormHelperText>
      </FormControl>
    </Flex>
  );
};
