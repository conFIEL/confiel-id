import { Credential } from '@nodecfdi/credentials';


export const loadSystemDemoFIEL = async (callback?: () => void, user = "maria"): Promise<Credential> => {
  const blobPrivateKey = await (
    await fetch(`/demo/${user}/private.key`)
  ).arrayBuffer();
  const blobCertificate = await (
    await fetch(`/demo/${user}/public.cer`)
  ).arrayBuffer();
  const privateKey = Buffer.from(await blobPrivateKey).toString("binary");
  const certificate = Buffer.from(await blobCertificate).toString("binary");
  const fiel = Credential.create(
    String(certificate),
    String(privateKey),
    "12345678a"
  );
  return fiel
};