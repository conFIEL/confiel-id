import { Credential } from '@nodecfdi/credentials'
import { create } from 'zustand'

interface FIELState {
  credential: Credential,
  loadCredential: (credential: Credential) => void,
  resetCredential: () => void
}

export const useFIELStore = create<FIELState>()((set) => ({
  credential: null,
  loadCredential: (credential: Credential) => set({ credential }),
  resetCredential: () => set({ credential: null }),
}))