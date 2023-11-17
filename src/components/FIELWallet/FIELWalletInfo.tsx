import { Flex, Text } from "@chakra-ui/react";
import { FIELWalletBalance } from "./FIELWalletBalance";
import { FIELWalletAddress } from "./FIELWalletAddress";
import { FIELWalletTransaction } from "./FIELWalletTransaction";


export const FIELWalletInfo = ({
  address,
  timestampForReload,
}: {
  address: string;
  timestampForReload: number;
}) => {
  
  return (
    <Flex flexDir={"column"}>
      <FIELWalletAddress address={address} />
      <FIELWalletBalance
        address={address}
        hasReload={true}
        timestampForReload={timestampForReload}
      />
      <FIELWalletTransaction />
    </Flex>
  );
};
