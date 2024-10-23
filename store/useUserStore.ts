import { create } from 'zustand';

interface Store {
    userName: string;
    setUserName: (value: string) => void;
}


export const useUserStore = create<Store>((set) => ({
    userName: '',
    setUserName: (value) => set({ userName: value }),
}));



