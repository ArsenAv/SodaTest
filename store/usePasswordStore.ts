import { create } from 'zustand';

interface PasswordStore {
    length: number;
    useLower: boolean;
    useNumbers: boolean;
    useUpper: boolean;
    useSymbols: boolean;
    noRepeats: boolean;
    password: Array<string>;
    setLength: (length: number) => void;
    toggleUseLower: () => void;
    toggleUseUpper: () => void;
    toggleUseNumbers: () => void;
    toggleUseSymbols: () => void;
    toggleNoRepeats: () => void;
    setPassword: (password: Array<string>) => void;
}

export const usePasswordStore = create<PasswordStore>((set) => ({
    length: 8,
    useLower: true,
    useUpper: true,
    useNumbers: true,
    useSymbols: true,
    noRepeats: false,
    password: [],
    setLength: (length: number) => set({ length }),
    toggleUseUpper: () => set((state) => ({ useUpper: !state.useUpper })),
    toggleUseLower: () => set((state) => ({ useLower: !state.useLower })),
    toggleUseNumbers: () => set((state) => ({ useNumbers: !state.useNumbers })),
    toggleUseSymbols: () => set((state) => ({ useSymbols: !state.useSymbols })),
    toggleNoRepeats: () => set((state) => ({ noRepeats: !state.noRepeats })),
    setPassword: (password: Array<string>) => set({ password }),
}));
