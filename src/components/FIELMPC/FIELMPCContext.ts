import { createContext } from "react";
import type { FIELMPCAction, FIELMPCState } from "./FIELMPCTypes";

// Creating a context for our store
export const FIELMPCStoreContext = createContext<[FIELMPCState, React.Dispatch<FIELMPCAction>] | undefined>(undefined);

// Defining the reducer function
export function FIELMPCreducer(state: FIELMPCState, action: FIELMPCAction): FIELMPCState {
  switch (action.type) {
    case 'SET_KEY_SHARE_STRING':
      return { ...state, keyShare: action.payload };
    case 'SET_PUB_KEY_STRING':
      return { ...state, pubKey: action.payload };
    case 'SET_RFC_STRING':
      return { ...state, rfc: action.payload };
    case 'SET_CERTIFICATE_ID_STRING':
      return { ...state, certificateId: action.payload };
    case 'SET_HAS_FRAGMENT_KEY_BOOLEAN':
        return { ...state, hasFragmentKey: action.payload };
    case 'SET_TOKEN_UUID_STRING':
      return { ...state, tokenUUID: action.payload };
    case 'SET_SIGNATURE_SHARE_STRING':
      return { ...state, signatureShare: action.payload };
    default:
      return state;
  }
}