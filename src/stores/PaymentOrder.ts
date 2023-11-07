import { create } from 'zustand'

export type PaymentOrder = {
  name: string,
  description: string,
  amount: number,
}

interface PaymentOrderState {
  paymentOrder: PaymentOrder,
  loadPaymentOrder: (paymentOrder: PaymentOrder) => void,
  resetCredential: () => void
}

export const usePaymentOrderStore = create<PaymentOrderState>()((set) => ({
  paymentOrder: null,
  loadPaymentOrder: (paymentOrder: PaymentOrder) => set({ paymentOrder }),
  resetCredential: () => set({ paymentOrder: null }),
}))