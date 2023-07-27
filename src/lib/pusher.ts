type BasePayload = {
  id: string
  validTo: string
}

export type Signature = BasePayload & {
  token: string
}

export type PartialSignature = BasePayload & {
  signedShare: string
}

export async function pushData(data: Signature | PartialSignature, endpoint: string) {
  const res = await fetch(`/api/${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    console.error('failed to push data');
  }
}