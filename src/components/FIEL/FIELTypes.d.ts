export interface FIELState {
    privateKey: ArrayBuffer | string;
    certificate: ArrayBuffer | string;
    password: string;
  }
  
  export type FIELAction =
    | { type: 'SET_KEY_FILE'; payload: ArrayBuffer | string }
    | { type: 'SET_CER_FILE'; payload: ArrayBuffer | string }
    | { type: 'SET_PASSWORD'; payload: string };