import { bufferToHex, hexToBuffer } from "../helpers/buffers";

type CryptoParams = {
  ciphertext: string;
  cipherparams: {
    iv: string;
    name: string;
    length: number;
  };
  kdf: string;
  kdfparams: {
    salt: string;
    iterations: number;
    hash: string;
  };
};

export type Ciphertext = {
  version: number;
  id: string;
  crypto: CryptoParams;
  algorithm: string;
};

export async function decryptCiphertextWithPassword(
  ciphertext: Ciphertext,
  password: string,
): Promise<string> {
  const passwordKey = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    { name: ciphertext.crypto.kdf },
    false,
    ["deriveKey"],
  );

  const derivedKey = await crypto.subtle.deriveKey(
    {
      name: ciphertext.crypto.kdf,
      salt: new TextEncoder().encode(ciphertext.crypto.kdfparams.salt),
      iterations: ciphertext.crypto.kdfparams.iterations,
      hash: ciphertext.crypto.kdfparams.hash,
    },
    passwordKey,
    {
      name: ciphertext.crypto.cipherparams.name,
      length: ciphertext.crypto.cipherparams.length,
    },
    true,
    ["decrypt"],
  );

  const decryptedContent = await crypto.subtle.decrypt(
    {
      name: ciphertext.crypto.cipherparams.name,
      iv: new Uint8Array(
        ciphertext.crypto.cipherparams.iv.split(",").map((byte) => +byte),
      ),
    },
    derivedKey,
    hexToBuffer(ciphertext.crypto.ciphertext),
  );

  return new TextDecoder().decode(new Uint8Array(decryptedContent));
}

export async function encryptPlaintext(
  plaintext: string,
  password: string,
): Promise<Ciphertext> {
  const cryptoConfig = {
    kdf: "PBKDF2",
    cipherparams: {
      name: "AES-GCM",
      length: 256,
    },
    kdfparams: {
      salt: crypto.getRandomValues(new Uint8Array(16)).toString(),
      iterations: 100000,
      hash: "SHA-256",
    },
  };

  const passwordKey = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    { name: cryptoConfig.kdf },
    false,
    ["deriveKey"],
  );

  const derivedKey = await crypto.subtle.deriveKey(
    {
      name: cryptoConfig.kdf,
      salt: new TextEncoder().encode(cryptoConfig.kdfparams.salt),
      iterations: cryptoConfig.kdfparams.iterations,
      hash: cryptoConfig.kdfparams.hash,
    },
    passwordKey,
    {
      name: cryptoConfig.cipherparams.name,
      length: cryptoConfig.cipherparams.length,
    },
    true,
    ["encrypt"],
  );

  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encryptedContent = await crypto.subtle.encrypt(
    {
      name: cryptoConfig.cipherparams.name,
      iv: iv,
    },
    derivedKey,
    new TextEncoder().encode(plaintext),
  );

  const ciphertext: Ciphertext = {
    version: 1,
    id: crypto.randomUUID(),
    crypto: {
      ciphertext: bufferToHex(new Uint8Array(encryptedContent)),
      cipherparams: {
        iv: Array.from(iv).toString(),
        ...cryptoConfig.cipherparams,
      },
      kdf: cryptoConfig.kdf,
      kdfparams: cryptoConfig.kdfparams,
    },
    algorithm: "pbkdf2-aes-gcm",
  };

  return ciphertext;
}
