import React, {useState, useContext} from 'react'
import { LoginInput } from './components/LoginInput'
import { Button } from '../../components/Button'
import {useNavigate} from 'react-router-dom'
import axios from "axios"
import { AuthContext } from '../../context/AuthContext'
import Cookies from 'js-cookie'

const FormLogin = () => {
    const [values, setValues] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState('');

    const navigate = useNavigate();

    const inputs = [

        {
            name: "email",
            placeholder: "email@mail.com",
            label: "Email",
            type: "email",
            errorMessage: "El mail es incorrecto",
            required: true,
            pattern: "'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"
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
        setValues({...values, [e.target.name]: e.target.value})
    }

    const navigateRegister = () => {
        navigate("/users/register")
    }

    const {setUser, user, role} = useContext(AuthContext);

    const handleLogin = async (e) =>{
        e.preventDefault();
        const {email, password} = values;

        try {
            // console.log("Logeado")
            const res = await axios.post('http://localhost:3000/login',  { email, password });

            console.log("RES: " , res.data);

            setUser ({
                name: res.data.name,
                id: res.data.id,
                email: res.data.email,
                role: res.data.role,
            });

            //Guardar Token. Expires indica cuánto de vida le doy la cookie.
            Cookies.set('jwToken', res.data.token, {expires: 3});
            
            // Redirigir al home si se logea bien
             navigate('/');
        } catch (err){
            console.log(err);
            const errorMessage = err.response?.data?.message || 'Error al iniciar sesión. Inténtalo nuevamente.';
            setError(errorMessage);        }
    }

    if (user){
        navigate('/')
    }

  return (
    <div className='form-login'>
        <h1 className='headline-brand'><span className='logo-text'>MoviePickr</span></h1>
        <p className='subtitle'>Descubrí en qué plataformas podés ver tus películas favoritas</p>

        <h2>Iniciá sesión</h2>
        {error && <div className="alert alert-danger" role="alert">{error}</div>} {/* Mensaje de error */}

        <form action="/login" >
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
        </form>
        <button type='submit' className="btn btn-primary mt-3" onClick={handleLogin}>Ingresar</button>
       
        <p>¿No tienes una cuenta?</p>
        <button className='btn btn-secondary' onClick={navigateRegister}>Registrarse</button>
        
    </div>
      
  )
}

export {FormLogin}
