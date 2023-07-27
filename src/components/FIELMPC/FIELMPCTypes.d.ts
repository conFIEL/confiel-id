export interface FIELMPCState {
    keyShare: string;
    rfc: string;
    certificateId: string;
    signatureShare: string;
  }
  
  export type FIELMPCAction =
    | { type: 'SET_KEY_SHARE_STRING'; payload: string }
    | { type: 'SET_RFC_STRING'; payload: string }
    | { type: 'SET_CERTIFICATE_ID_STRING'; payload: string }
    | { type: 'SET_SIGNATURE_SHARE_STRING'; payload: string }