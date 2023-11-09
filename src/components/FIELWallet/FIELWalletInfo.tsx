import { Flex } from "@chakra-ui/react"
import { FIELWalletBalance } from "./FIELWalletBalance"
import { FIELWalletAddress } from "./FIELWalletAddress"

export const FIELWalletInfo = ({ address }: { address: string }) => {
    return (
        <Flex flexDir={'column'}>
          <FIELWalletAddress address={address} />
          <FIELWalletBalance address={address} hasReload={true} />
        </Flex>
    )
}