import { useEffect, useState } from 'react'
import axios from 'axios'
import Alerta from '../components/Alerta'
// import clienteAxios from '../config/axios'
import { useParams, Link } from 'react-router-dom'
// leemos los parametros de la url con useParams

export const ConfirmarCuenta = () => {

  const [cuentaConfirmada, setCuentaConfirmada] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [alerta, setAlerta] = useState({});

  const params = useParams()
  // console.log(params);

  const { id } = params;

  useEffect(() => {
    const confirmarCuenta = async () => {
      try {
        const url = `http://localhost:4000/api/veterinarios/confirmar/${id}`
        // console.log(url);

        const { data } = await axios(url);
        // console.log(data); OJO revisar en la base de datos si el token pasa anull para estar seguro, me dio problema ya que se hace muy rapido

        setCuentaConfirmada(true);
        setAlerta({
          msg: data.msg,
          error: false
        })


      } catch (error) {
        // console.log(error);

        setTimeout(() => {
          setAlerta({
            msg: error.response.data.msg,
            error: true
          })
        }, 15000);


      }

      setCargando(false);
    }

    confirmarCuenta();
  }, [])

  return (
    <>
      <div>
        <h1 className='text-indigo-600 font-black text-6xl'>
          Confirma tu Cuenta y comienza a Aministrar tus {""}
          <span className='text-black'> Pacientes</span>
        </h1>
      </div>

      <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
        {/* Cuando ya no este cargando, entonces muestra Alerta */}
        {!cargando && <Alerta
          alerta={alerta}
        />}

        {cuentaConfirmada && (
          <Link
            className='block text-center my-5 text-gray-400'
            to='/'>Inicia Sesión</Link>
        )}
      </div>
    </>
  )
}
