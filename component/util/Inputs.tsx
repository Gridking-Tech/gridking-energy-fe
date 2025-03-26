import React from 'react'

type InputsProps =  {
    text: string,
    placeholder: string,
    className?: any
}
function Inputs({text,placeholder,className}:InputsProps) {
  return (
    <input type={text} placeholder={placeholder} className={className} />
  )
}

export default Inputs