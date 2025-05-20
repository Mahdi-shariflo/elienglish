import { Address } from '@/types';
import { Order, Product } from '@/types/home';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

type OrderStore = {
  orderItems: Product[];
  setOrderItems: (orders: Product[]) => void;
  address: Address | null;
  setAddress: (address: Address) => void;
};

const useOrderStore = create<OrderStore>()(
  devtools(
    immer((set) => ({
      address: null,
      setAddress: (address) => {
        set((state) => {
          state.address = address;
        });
      },
      orderItems: [],
      setOrderItems: (orderItems) => {
        set((state) => {
          state.orderItems = orderItems;
        });
      },
    }))
  )
);

export default useOrderStore;
