import { createContext } from "react";
import type { FIELMPCAction, FIELMPCState } from "./FIELMPCTypes";

// Creating a context for our store
export const FIELMPCStoreContext = createContext<[FIELMPCState, React.Dispatch<FIELMPCAction>] | undefined>(undefined);

// Defining the reducer function
export function FIELMPCreducer(state: FIELMPCState, action: FIELMPCAction): FIELMPCState {
  switch (action.type) {
    case 'SET_KEY_SHARE_STRING':
      return { ...state, keyShare: action.payload };
    case 'SET_SIGNATURE_SHARE_STRING':
      return { ...state, signatureShare: action.payload };
    default:
      return state;
  }
}