import { create } from 'zustand'
import { Wallet } from 'xrpl'

interface FIELWalletState {
  wallet: Wallet,
  loadWallet: (wallet: Wallet) => void,
  resetWallet: () => void
}

export const useFIELWalletStore = create<FIELWalletState>()((set) => ({
  wallet: null,
  loadWallet: (wallet: Wallet) => set({ wallet }),
  resetWallet: () => set({ wallet: null }),
}))