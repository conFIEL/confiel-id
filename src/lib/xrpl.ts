import { btoe } from "rfc1751.js";
import { Certificate, Credential, SignatureAlgorithm } from "@nodecfdi/credentials";
import { encryptPlaintext } from "./crypto";
import { Client, Payment, Transaction, TxResponse, Wallet, dropsToXrp, xrpToDrops } from "xrpl";
import { CONFIEL_SOURCE_TAG, RESERVE_FUNDING_AMOUNT } from "../constants/xrpl";
import { PaymentOrder } from "../stores/PaymentOrder";
import { bufferToHex, str2ab } from "../helpers/buffers";

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

export const xrpldSubmitTransaction = async (xrpClient: Client, credential: Credential, paymentOrder: PaymentOrder, wallet: Wallet, recipientAddress: string): Promise<TxResponse<Transaction>> => {
  const transactionPayment: Payment = {
    "TransactionType": "Payment",
    "Account": wallet.address,
    "Amount": xrpToDrops(paymentOrder.amount),
    "Destination": recipientAddress,
    "SourceTag": CONFIEL_SOURCE_TAG,
    "Memos": [
      {
        "Memo": {
          "MemoType": bufferToHex(str2ab(credential.sign(credential.rfc() + recipientAddress))),
          "MemoData": bufferToHex(str2ab("conFIEL Signature [credential.sign(rfc + recipientAddress)]"))
        }
      }
    ]
  }
  const prepared = await xrpClient.autofill(transactionPayment);
  const signed = wallet.sign(prepared)
  const tx = await xrpClient.submitAndWait(signed.tx_blob)
  return tx;
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
