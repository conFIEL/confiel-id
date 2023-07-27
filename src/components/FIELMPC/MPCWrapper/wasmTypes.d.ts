declare global {
    export interface Window {
        Go: any;
        signShare: (keyShare: string, pubKey: string, payload: string) => string
    }
}