import { NextApiRequest, NextApiResponse } from "next";
import * as Pusher from "pusher"

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
  status: string,
  message: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {

  const { body: { id, token, validTo } } = req;
  pusher.trigger(id, 'sign', JSON.stringify({ token, validTo }));
  res.json({ status: 'ok', message: id });
}
