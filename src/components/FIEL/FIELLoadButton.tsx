import { useContext, useEffect, useState } from "react";
import { FIELStoreContext } from "./FIELContext";
import { Credential as NodeCFDICredential, SignatureAlgorithm } from "@nodecfdi/credentials";
import { KEYUTIL, RSAKey, hex2b64 } from 'jsrsasign';
import { importPrivateKey } from "../../helpers/RSA";
import { bufferToHex } from "../../helpers/buffers";
import { Button, Input, Text } from "@chakra-ui/react";


type SignedData = {
  signedToken: string;
  validTo: string;
}

export const FIELLoadButton = () => {
  const context = useContext(FIELStoreContext);
  if (!context) throw new Error("FIELLoadButton must be used within a FIELStoreProvider");

  const [canLoadFIEL, setCanLoadFIEL] = useState(false);
  const [tokenUUID, setTokenUUID] = useState("");
  const [signedData, setSignedData] = useState<SignedData>(null);

  const [state] = context;
  const { privateKey, certificate, password } = state;

  const handleFIELLoad = async () => {
    const fiel = NodeCFDICredential.create(
      String(certificate),
      String(privateKey),
      password
    );
    const eFirma = fiel.certificate();

    if (!tokenUUID) {
      console.log("No token found");
      return;
    }

    const co = `${tokenUUID}|${eFirma.rfc()}|${eFirma.serialNumber().bytes()}`;

    const rsaKey: RSAKey = KEYUTIL.getKeyFromEncryptedPKCS8PEM(fiel.privateKey().pem(), fiel.privateKey().passPhrase())
    const decryptedPEM = KEYUTIL.getPEM(rsaKey, "PKCS8PRV");
    const cryptoKey = await importPrivateKey(decryptedPEM);
    const encoded = new TextEncoder().encode(co);
    const signature = await window.crypto.subtle.sign(
      "RSASSA-PKCS1-v1_5",
      cryptoKey,
      encoded
    );
    const signatureAsHex = bufferToHex(signature);
    const digestSignatureAsB64 = hex2b64(signatureAsHex);

    const digestAsHex = fiel.sign(co, SignatureAlgorithm.SHA1);
    const digestAsB64 = hex2b64(digestAsHex)

    console.log("Is native same as from eFirma", digestAsB64, digestSignatureAsB64, digestAsB64 === digestSignatureAsB64);

    const lf = btoa(digestAsB64)
    const token = btoa(btoa(co) + "#" + lf);

    setSignedData({ signedToken: token, validTo: eFirma.validTo() })
  }

  const handleTokenUUIDChange = (e) => setTokenUUID( e.target.value );

  useEffect(() => {
    if (privateKey && certificate && (password?.length != 0)) {
      setCanLoadFIEL(true);
    }
    return () => setCanLoadFIEL(false)
  }, [privateKey, certificate, password])

  return (!canLoadFIEL ?
    <Text py="2" fontSize={'xs'}>Please upload all files and type password</Text> :
    <div>
      <Input placeholder="tokenUUID" type="text" onChange={handleTokenUUIDChange} value={tokenUUID} />
      <Button onClick={handleFIELLoad}>Load FIEL</Button>
      {
        signedData &&
        <>
          <p>Signed Token: {signedData.signedToken}</p><br/>
          <p>Valid To: {signedData.validTo}</p>
        </>
        
      }
    </div>
  )
}