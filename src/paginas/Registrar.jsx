import { Link } from 'react-router-dom'
import { useState } from 'react'
import Alerta from '../components/Alerta'
import axios from 'axios'
// import clienteAxios from '../config/axios'

export const Registrar = () => {
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repetirPassword, setRepetirPassword] = useState('')

  const [alerta, setAlerta] = useState({})

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([nombre, email, password, repetirPassword].includes('')) {

      setAlerta({ msg: 'Hay campos vacios!', error: true });
      return;
    }

    if (password !== repetirPassword) {
      // console.log('Los passwords no son iguales!');
      setAlerta({ msg: 'Los passwords no son iguales!', error: true });
      return;
    }

    if (password.length < 6) {
      // console.log('El password es muy corto, agrega minimo 6 caracteres');
      setAlerta({ msg: 'El password es muy corto, agrega minimo 6 caracteres', error: true });
    }
    setAlerta({});

    //Crear el usuario en el API

    try {
      // const url = `${import.meta.env.VITE_BACKEND_URL}/api/veterinarios`;
      const url = `http://localhost:4000/api/veterinarios`;
      
      await axios.post(url, {nombre, email, password});
      
      setAlerta({
        msg: 'Creado Correctamente!!, revisa tu email',
        error: false
      })
    } catch (error) {
      // console.log(error.response);
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }

    
  }

  const {msg} = alerta;
  return (
    <>
      <div>
        <h1 className='text-indigo-600 font-black text-6xl'>
          Crea tu Cuenta y Administra tus {""}
          <span className='text-black'> Pacientes</span></h1>
      </div>

      <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
        
        {/* Si en msg hay algo entonces muestra el componente Alerta */}
        {msg && <Alerta
          alerta={alerta}
        />}

        <form
        // validacion de formulario en handelSubmit
          onSubmit={handleSubmit}
        >
          <div className='my-5'>

            <div className='my-5'>
              <label
                className='uppercase text-gray-500 block text-xl font-bold'
              >
                NOMBRE
              </label>

              <input
                type="text"
                placeholder='Tu nombre'
                className='border w-full p-3 mt-4 bg-gray-50 rounded-xl'
                value={nombre}
                onChange={e => setNombre(e.target.value)}
              />
            </div>

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



          <div className='my-5'>
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

          <div className='my-5'>
            <label
              className='uppercase text-gray-500 block text-xl font-bold'
            >
              REPETIR PASSWORD
            </label>

            <input
              type="password"
              placeholder='Repite tu password'
              className='border w-full p-3 mt-4 bg-gray-50 rounded-xl'
              value={repetirPassword}
              onChange={e => setRepetirPassword(e.target.value)}
            />
          </div>

          <input
            type="submit"
            value="Registrar"
            className='bg-indigo-700 w-full py-3 px-10 rounded-xl
             text-white uppercase font-bold mt-5 
             hover:cursor-pointer hover:bg-indigo-800 md:w-auto '
          />
        </form>

        <nav className='mt-10 font-bold lg:flex lg:justify-between'>
          <Link
            className='block text-center my-5 text-gray-400'
            to='/'>¿Ya tienes una cuenta? Inicia Sesión</Link>
          <Link
            className='block text-center my-5 text-gray-400'
            to='/olvide-password'>Olvide mi password</Link>
        </nav>
      </div>

      
    </>
  )
}
