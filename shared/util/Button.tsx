import React from 'react'

function Button({
  title, 
  type,
  onClick, 
  className = "",
  disabled
}: { 
  title: string, 
  type?: any,
  onClick?: () => void, 
  className?: string 
  disabled: boolean
}) {
  return (
    <button 
    disabled={disabled}
    type={type}
      onClick={onClick} 
      className={`w-[50%] bg-black text-white text-lg  font-semibold py-3 rounded-lg mt-6 ${className}`}
    >
      {title}
    </button>
  )
}

export default Button;
