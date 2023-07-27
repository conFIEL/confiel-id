export interface FIELMPCState {
    keyShare: string;
    pubKey: string;
    rfc: string;
    certificateId: string;
    tokenUUID: string;
    signatureShare: string;
    hasFragmentKey: boolean;
  }
  
  export type FIELMPCAction =
    | { type: 'SET_KEY_SHARE_STRING'; payload: string }
    | { type: 'SET_PUB_KEY_STRING'; payload: string }
    | { type: 'SET_RFC_STRING'; payload: string }
    | { type: 'SET_CERTIFICATE_ID_STRING'; payload: string }
    | { type: 'SET_HAS_FRAGMENT_KEY_BOOLEAN'; payload: boolean }
    | { type: 'SET_TOKEN_UUID_STRING'; payload: string }
    | { type: 'SET_SIGNATURE_SHARE_STRING'; payload: string }