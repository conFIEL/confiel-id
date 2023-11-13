import { createPublicKey } from "crypto";
import { NextApiRequest, NextApiResponse } from "next";
import { BigInteger, KEYUTIL, KJUR, RSAKey, stob64, X509 } from 'jsrsasign';



import * as Pusher from "pusher"
import { SignatureAlgorithm } from "@nodecfdi/credentials";

const {
  APP_ID: appId,
  KEY: key,
  SECRET: secret,
  CLUSTER: cluster,
} = process.env;

const pusher = new Pusher.default({
  appId,
  key,
  secret,
  cluster,
  useTLS: true
})

type Response = {
  status: 'error' | 'ok',
  error?: string
  message?: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  try {
    const { body: { appId: data, certificate: certificateAsPEM, signature: signatureAsBase64, walletAddress } } = req;
    const sig = new KJUR.crypto.Signature({ alg: SignatureAlgorithm.SHA256 });
    sig.init(certificateAsPEM);
    sig.updateString(data);
    const isValid = sig.verify(signatureAsBase64);
    if (isValid) {
      await pusher.trigger(data, 'connect', JSON.stringify({ message: { walletAddress } }));
      return res.json({ status: 'ok', message: `Connection to app ${data} successful` });
    } else {
      return res.json({ status: 'error', error: 'Invalid signature, connection rejected' })
    }
  } catch (error) {
    return res.json({ status: 'error', error })
  }
}
