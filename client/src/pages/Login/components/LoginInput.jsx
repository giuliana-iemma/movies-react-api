import React, {useState} from 'react'

const LoginInput = (props) => {
    //Estado focused para manejar estilos del input solo cuando este focused
    const [focused, setFocused] = useState(false);

    //Props
    const {label, errorMessage, handleOnChange, ...otrasProps} = props;

  return (
    <div className='loginInput'>
      <label>{label}</label>
      <input 
      className='form-control'
      onChange={handleOnChange}
      onFocus={(e) => setFocused(true)}
      focused={focused.toString()}
      {...otrasProps}
      />
      {/* <span>{errorMessage}</span> */}
    </div>
  )
}

export {LoginInput}
