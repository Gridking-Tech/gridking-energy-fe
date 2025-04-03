import React from 'react'

function Button({
  title, 
  type,
  onClick, 
  className = ""
}: { 
  title: string, 
  type?: any,
  onClick?: () => void, 
  className?: string 
}) {
  return (
    <button 
    type={type}
      onClick={onClick} 
      className={`w-full bg-black text-white text-lg cursor-pointer font-semibold py-3 rounded-lg mt-6 ${className}`}
    >
      {title}
    </button>
  )
}

export default Button;
