import React from 'react';

const Select = ({ options, placeholder, className = "", ...props }) => {
    return (
        <select className={`border border-gray-300 rounded-md px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer ${className}`} {...props}>
            {placeholder && <option value="">{placeholder}</option>}
            {options.map((opt, idx) => (
                <option key={idx} value={opt.value}>{opt.label}</option>
            ))}
        </select>
    );
};

export default Select;