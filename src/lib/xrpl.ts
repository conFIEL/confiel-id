import { btoe } from "rfc1751.js";
import { Credential, SignatureAlgorithm } from "@nodecfdi/credentials";
import { encryptPlaintext } from "./crypto";
import { Wallet } from "xrpl";

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