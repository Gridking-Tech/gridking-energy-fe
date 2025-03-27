import React from 'react'

function Button({
  title, 
  onClick, 
  className = ""
}: { 
  title: string, 
  onClick?: () => void,
  className?: string
}) {
  return (
    <button 
      onClick={onClick} 
      className={`px-4 py-2 text-white bg-black rounded-lg font-semibold ${className}`}
    >
      {title}
    </button>
  )
}

export default Button;
