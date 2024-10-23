import { create } from 'zustand';

interface CalculatorState {
    value: string;
    operand: string | null;
    operator: string | null;
    history: string;
    addInput: (input: string) => void;
    setOperator: (op: string) => void;
    calculate: () => void;
    reset: () => void;
    toggleSign: () => void;
    deleteLast: () => void;
    applyPercent: () => void;
}

export const useCalculatorStore = create<CalculatorState>((set) => ({
    value: '0',
    operand: null,
    operator: null,
    history: '',
    addInput: (input: string) =>
        set((state) => ({
            value: state.value.includes('.') && input === '.'
                ? state.value
                : state.value === '0' && input !== '.'
                    ? input
                    : state.value + input,
        })),
    setOperator: (op: string) =>
        set((state) => {
            if (state.operator && state.operand !== null) {
                const result = eval(`${state.operand}${state.operator}${state.value}`);
                return {
                    value: '0',
                    operand: result.toString(),
                    operator: op,
                    history: `${state.history} ${state.value} ${op}`,
                };
            } else {
                return {
                    operator: op,
                    operand: state.value,
                    value: '0',
                    history: `${state.value} ${op}`,
                };
            }
        }),
    calculate: () =>
        set((state) => {
            if (state.operator && state.operand !== null) {
                const result = eval(`${state.operand}${state.operator}${state.value}`);
                return {
                    value: result.toString(),
                    operand: null,
                    operator: null,
                    history: '',
                };
            }
            return state;
        }),
    reset: () => set({ value: '0', operand: null, operator: null, history: '' }),
    toggleSign: () =>
        set((state) => ({
            value: (parseFloat(state.value) * -1).toString(),
        })),
    deleteLast: () =>
        set((state) => ({
            value: state.value.length > 1 ? state.value.slice(0, -1) : '0',
        })),
    applyPercent: () =>
        set((state) => ({
            value: (parseFloat(state.value) / 100).toString(),
        })),
}));
