import { btoe } from "rfc1751.js";
import { Credential, SignatureAlgorithm } from "@nodecfdi/credentials";
import { encryptPlaintext } from "./crypto";
import { Client, Wallet, dropsToXrp } from "xrpl";
import { RESERVE_FUNDING_AMOUNT } from "../constants/xrpl";

export type BalanceResponse = {
  status: 'ok' | 'err'
  balance: string
}

export const generateXPRLWallet = async (FIEL: Credential, email: string, pin: string, derivationPath = "0/0/1") => {
  const signatureSeed = FIEL.sign(derivationPath, SignatureAlgorithm.SHA1);
  const userSeed = await encryptPlaintext(email, pin)
  const walletSeed = await window.crypto.subtle.digest(
    'SHA-256',
    new TextEncoder().encode(signatureSeed + userSeed.crypto.ciphertext)
  );

  const rfc1751 = btoe(new Uint8Array(walletSeed));
  const wallet = Wallet.fromMnemonic(rfc1751, {
    mnemonicEncoding: "rfc1751",
  });
  return wallet;
};

export const requestFundsFromFaucet = async (address: string) => {
  await fetch("https://faucet.altnet.rippletest.net/accounts", {
    "headers": {
      "content-type": "application/json; charset=UTF-8",
    },
    "body": JSON.stringify({ destination: address, memos: [{ data: "xrpl.org-faucet" }] }),
    "method": "POST",
    "mode": "cors",
    "credentials": "omit"
  });
}

export const xrpldGetBalance = async (xrpClient: Client, address: string, noReserve?: boolean): Promise<BalanceResponse> => {
  if (!xrpClient) return ({
    status: 'err',
    balance: '-1'
  } as BalanceResponse);
  return xrpClient
    .request({
      command: "account_info",
      account: address,
      ledger_index: "validated",
    })
    .then((walletResponse) => {
      const balance = dropsToXrp(
        Number(walletResponse.result.account_data.Balance) - (noReserve ? 0 : RESERVE_FUNDING_AMOUNT)
      );
      return ({ status: 'ok', balance } as BalanceResponse);
    })
    .catch((err) => {
      console.error(err);
      return ({
        status: 'err',
        balance: '-1'
      } as BalanceResponse);
    });
}
