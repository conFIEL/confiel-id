import { Flex } from "@chakra-ui/react"
import { FIELWalletBalance } from "./FIELWalletBalance"
import { FIELWalletAddress } from "./FIELWalletAddress"

export const FIELWalletInfo = ({ address, timestampForReload }: { address: string, timestampForReload: number }) => {
    return (
        <Flex flexDir={'column'}>
          <FIELWalletAddress address={address} />
          <FIELWalletBalance address={address} hasReload={true} timestampForReload={timestampForReload} />
        </Flex>
    )
}