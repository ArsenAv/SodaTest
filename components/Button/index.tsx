import React from 'react';

interface ButtonProps {
    label: string;
    onClick: () => void;
    style?: string;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, style }) => {
    return (
        <button onClick={onClick} className={style}>
            {label}
        </button>
    );
};

export default Button;
