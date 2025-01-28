import React from 'react'

const Input = (name, placeholder, type, required, className, ...props ) => {
  return (
    <input
    name={name}
    placeholder={placeholder}
    type={type}
    required={required}
    className={className}
    {...props} // Pasa cualquier otra prop al input
  />
  )
}

export  {Input}

