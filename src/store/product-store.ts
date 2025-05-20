import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

type ProductStore = {
  selected: {
    tab: string;
    userInteracted: boolean;
  };
  setSelected: (select: { tab: string; userInteracted: boolean }) => void;
};

const useProductStore = create<ProductStore>()(
  devtools(
    immer((set) => ({
      selected: {
        tab: '',
        userInteracted: true,
      },
      setSelected: (data) => {
        set((state) => {
          state.selected = data;
        });
      },
    }))
  )
);

export default useProductStore;
