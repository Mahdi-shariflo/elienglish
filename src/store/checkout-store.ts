import { Address, Payment, shippingMethod } from '@/types';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
type TypeCheckout = {
  checkout: {
    transport?: shippingMethod | null;
    address?: Address | null;
    payment?: Payment | null;
    discountCode?: {
      discountCodeType: 'fixed' | 'percent';
      code: string;
      discountCodePrice: string;
      discountCode: { _id: string };
    } | null;
  };
  // @ts-expect-error error
  setCheckout: (checkout) => void;
};

export const useCheckoutStore = create<TypeCheckout>()(
  persist(
    (set) => ({
      checkout: {
        address: null,
        discountCode: null,
        payment: null,
        transport: null,
      },
      setCheckout: (checkout) => set({ checkout }),
    }),
    {
      name: 'checkout', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
