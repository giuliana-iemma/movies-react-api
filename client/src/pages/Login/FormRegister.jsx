import React, {useState} from 'react'
import { LoginInput } from './components/LoginInput'
import { Button } from '../../components/Button'
import {useNavigate} from 'react-router-dom'
import axios from "axios"

const FormRegister = () => {
    const [values, setValues] = useState ({
        name: "",
        lastname: "",
        email: "",
        password: "",
    });

    const [error, setError] = useState('');
    const navigate = useNavigate();

    const inputs = [
        {
            name: "name",
            placeholder: "Nombre",
            label: "Nombre",
            type: "text",
            errorMessage: "Ingresa un nombre válido",
            required: true,
            pattern: "/^[a-zA-ZáéíóúÁÉÍÓÚñÑ]{2,}$/"
        },
        {
            name: "lastname",
            placeholder: "Apellido",
            label: "Apellido",
            type: "text",
            errorMessage: "Ingresa un apellido válido",
            required: false,
            pattern: "/^[a-zA-ZáéíóúÁÉÍÓÚñÑ]{2,}$/"
        },
        {
            name: "email",
            placeholder: "email@mail.com",
            label: "Email",
            type: "email",
            errorMessage: "El mail es incorrecto",
            required: true,
            pattern: "[a-zA-Z0-9_\.\+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-\.]+"
        },
        {
            name: "password",
            placeholder: "Contraseña",
            label: "Contraseña",
            type: "password",
            errorMessage: "Debe tener al menos 4 caracteres",
            required: true,
            pattern: "/^.{6,}$/",
        }
    ]

    const handleOnChange = (e) => {
        setValues({...values,  [e.target.name]: e.target.value})
    }

    const navigateLogin = () => {
        navigate("/users/login")
    }

    const handleRegister = async (e) => {
        e.preventDefault();
        const {name, lastname, email, password, role} = values;

        try{
            const res = await axios.post ('http://localhost:3000/users', {
                name, lastname, email, password, role
            });

            console.log(res.data);

            //Guardar Token
            navigate('/users/login')
        // console.log("Registrado")
        } catch(err) {
            console.log(err);
            // setError(error.response.data.message);
        }
    }

  return (
    <div className='form-login'>
      <h2>Registro</h2>
      <form action="#" >
                {
                    inputs.map((input) => (
                        <LoginInput
                        key={input.name}
                        value={values[input.name]}
                        handleOnChange={handleOnChange}
                        {...input}
                        />
                    ))
                }
            <input onClick={handleRegister} type="submit" className='mt-3 btn btn-primary' value='Registrarse'/>
            {
                error && <p>{error}</p>
            }
        </form>

        <p className='mt-3'>¿Ya tienes una cuenta?</p>
        <button className='btn btn-secondary' onClick={navigateLogin}>Iniciar sesión</button>

    </div>
  )
}

export {FormRegister}
