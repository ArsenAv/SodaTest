import React from 'react';
import styles from "./styles.module.scss";
interface InputProps {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input: React.FC<InputProps> = ({ value, onChange }) => {
    return (
        <input
            type="text"
            value={value}
            className={styles.input}
            onChange={onChange}
        />
    );
};