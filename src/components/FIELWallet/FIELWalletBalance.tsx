import { RepeatIcon } from "@chakra-ui/icons";
import {
  Flex,
  Skeleton,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { xrpldGetBalance } from "../../lib/xrpl";
import {
  DEFAULT_TIMEOUT_IN_MS,
  DEFAULT_XRPL_API_URL,
  RESERVE_FUNDING_AMOUNT,
} from "../../constants/xrpl";
import { Client, dropsToXrp } from "xrpl";

export const FIELWalletBalance = ({
  address,
  hasReload = false,
  timestampForReload,
}: {
  address: string;
  hasReload?: boolean;
  timestampForReload?: number;
}) => {
  const [balance, setBalance] = useState<string>();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [client, setClient] = useState<Client>();

  useEffect(() => {
    const loadClient = async () => {
      const client = new Client(DEFAULT_XRPL_API_URL);
      await client.connect();
      setClient(client);
    };
    loadClient();
  }, []);

  useEffect(() => {
    Date.now() > timestampForReload && loadBalance(true);
  }, [timestampForReload]);

  const loadBalance = async (withDelay = false) => {
    if (address.length == 0) return;
    setLoading(true);
    if (withDelay) {
      await new Promise((res) =>
        setTimeout(() => res("Solved"), DEFAULT_TIMEOUT_IN_MS)
      );
    }
    const response = await xrpldGetBalance(client, address, true);
    const { status } = response;
    if (status == "ok") {
      const balance = Number(response.balance);
      isNaN(balance) ? setBalance("0.00") : setBalance(balance.toFixed(2));
    } else {
      setBalance("0.00");
    }
    setTimeout(() => setLoading(false), 1000);
  };
  useEffect(() => {
    client && loadBalance();
  }, [client, address]);

  return (
    <Skeleton isLoaded={!isLoading}>
      <Flex alignItems="center">
        <Stat>
          <StatLabel>
            Wallet Balance{" "}
            {hasReload && <RepeatIcon mr="2" onClick={() => loadBalance()} />}
          </StatLabel>
          <StatNumber>XRP {balance}</StatNumber>
          <StatHelpText fontSize={"xs"}>
            XRP {dropsToXrp(RESERVE_FUNDING_AMOUNT)} reserve
          </StatHelpText>
        </Stat>
      </Flex>
    </Skeleton>
  );
};
