import React from 'react';

const PrimaryButton = ({ children, onClick, className = "", ...props }) => {
    return (
        <button 
            className={`bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-semibold transition shadow-md hover:shadow-lg active:scale-95 ${className}`}
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    );
};

export default PrimaryButton;