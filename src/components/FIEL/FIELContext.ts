import { createContext } from "react";
import type { FIELAction, FIELState } from "./FIELTypes";

// Creating a context for our store
export const FIELStoreContext = createContext<[FIELState, React.Dispatch<FIELAction>] | undefined>(undefined);

// Defining the reducer function
export function FIELreducer(state: FIELState, action: FIELAction): FIELState {
  switch (action.type) {
    case 'SET_KEY_FILE':
      return { ...state, privateKey: action.payload };
    case 'SET_CER_FILE':
      return { ...state, certificate: action.payload };
    case 'SET_PASSWORD':
      return { ...state, password: action.payload };
    default:
      return state;
  }
}