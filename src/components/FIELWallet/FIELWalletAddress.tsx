import {
  Link as ChakraLink,
  Flex,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { abbreviate } from "../../helpers/strings";

export const FIELWalletAddress = ({ address }: { address: string }) => {
  return (
    <>
      <Stat>
        <StatLabel>Wallet Address</StatLabel>
        <StatNumber>
          <Flex>
            {abbreviate(address)}
            <ChakraLink
              display="flex"
              alignItems="center"
              ml="1"
              isExternal
              href={`https://testnet.xrpl.org/accounts/${address}`}
            >
              <ExternalLinkIcon boxSize="3" />
            </ChakraLink>
          </Flex>
        </StatNumber>
        <StatHelpText>Testnet Network</StatHelpText>
      </Stat>
    </>
  );
};
