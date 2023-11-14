import { create } from 'zustand'

export type PaymentOrder = {
  name: string,
  recipientAddress: string,
  description: string,
  amount: number,
}

interface PaymentOrderState {
  paymentOrder: PaymentOrder,
  recipientAddress: string,
  loadPaymentOrder: (paymentOrder: PaymentOrder) => void,
  loadRecipientAddress: (recipientAddress: string) => void,
  resetCredential: () => void
}

export const usePaymentOrderStore = create<PaymentOrderState>()((set) => ({
  paymentOrder: null,
  recipientAddress: "",
  loadPaymentOrder: (paymentOrder: PaymentOrder) => set({ paymentOrder }),
  loadRecipientAddress: (recipientAddress: string) => set({ recipientAddress }),
  resetCredential: () => set({ paymentOrder: null }),
}))