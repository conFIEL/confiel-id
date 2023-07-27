export const signWithShare = async ({ keyShare, pubKey, tokenUUID, rfc, certificateId }: { keyShare: string, pubKey: string, tokenUUID: string, rfc: string, certificateId: string }) => {
  const co = `${tokenUUID}|${rfc}|${certificateId}`
  const partialSignature = await window.signShare(keyShare, pubKey, co);
  return partialSignature;
}