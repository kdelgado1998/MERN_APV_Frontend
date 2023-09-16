import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import Alerta from '../components/Alerta';
import useAuth from '../Hooks/useAuth';
import axios from 'axios';

export const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [alerta, setAlerta] = useState({})

  const {setAuth} = useAuth()

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log('Iniciando Sesion')

    if([email, password].includes('')){
      setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true
      });
    }

    try {
      const {data} = await axios.post('http://localhost:4000/api/veterinarios/login', {email, password});
      // console.log(data);

      //Aqui almacenamos el token en localstorage
      localStorage.setItem('token', data.token);
      setAuth(data)

      //Si todo esta correcto redireccionamos a admin
      navigate('/admin')
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      });
    }
  }

  const { msg } = alerta;
  return (
    <>

      <div>
        <h1 className='text-indigo-600 font-black text-6xl'>
          Inicia Sesión y Administra tus {""}
          <span className='text-black'>Pacientes</span></h1>
      </div>

      <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>

        {msg && <Alerta
          alerta={alerta}
        />}
        <form onSubmit={handleSubmit}>
          <div className='my-5'>
            <label
              className='uppercase text-gray-500 block text-xl font-bold'
            >
              EMAIL
            </label>

            <input
              type="email"
              placeholder='Email de Registro'
              className='border w-full p-3 mt-4 bg-gray-50 rounded-xl'
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label
              className='uppercase text-gray-500 block text-xl font-bold'
            >
              PASSWORD
            </label>

            <input
              type="password"
              placeholder='Tu password'
              className='border w-full p-3 mt-4 bg-gray-50 rounded-xl'
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <input
            type="submit"
            value="Iniciar Sesión"
            className='bg-indigo-700 w-full py-3 px-10 rounded-xl
             text-white uppercase font-bold mt-5 
             hover:cursor-pointer hover:bg-indigo-800 md:w-auto '
          />
        </form>

        <nav className='mt-10 font-bold lg:flex lg:justify-between'>
          <Link
            className='block text-center my-5 text-gray-400'
            to='/registrar'>¿No tienes una cuenta? Registrate</Link>
          <Link
            className='block text-center my-5 text-gray-400'
            to='/olvide-password'>Olvide mi password</Link>
        </nav>
      </div>
    </>
  );
};
