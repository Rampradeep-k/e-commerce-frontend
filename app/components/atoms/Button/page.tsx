'use client'
import React from 'react';

interface ButtonProps {
    onClick: () => void;
    children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onClick, children }) => (
    <button onClick={onClick} className="px-2 py-2 bg-blue-500 cursor-pointer rounded-md">
        {children}
    </button>
);

export default Button;
