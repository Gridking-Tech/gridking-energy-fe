'use client';
import React from 'react';

type InputProps = {
  value: string;
  name: string;
  type?: any;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  label?: string;
  showLabel?: boolean;
};

function Input({ value, placeholder, className, name, onChange, type, label, showLabel = false }: InputProps) {
  return (
    <div className="flex flex-col">
      {showLabel && label && <label htmlFor={name} className="text-gray-700 font-black mb-1">{label}</label>}
      <input
        id={name}
        value={value}
        type={type}
        placeholder={placeholder}
        name={name}
        className={className || 'border-2  outline-0 border-gray-600 outline-0 p-2 text-black text-[0.9rem] rounded-md w-full'}
        onChange={onChange}
      />
    </div>
  );
}

export default Input;
