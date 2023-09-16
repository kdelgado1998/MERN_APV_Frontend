import React from 'react'
import usePacientes from '../Hooks/usePacientes';

export const Paciente = ({paciente}) => {

    console.log(paciente)
    const {setEdicion, eliminarPaciente} = usePacientes()

    const {email, fecha, nombre, propietario,
         sintomas, _id} =  paciente;

    const formatearFecha = (fecha) => {
        const nuevaFecha = new Date(fecha)
        //Accede a una API de JS para formatear la fecha
        return new Intl.DateTimeFormat('es-MX', {dateStyle: 'long'}).format(nuevaFecha);
    }

  return (
    <div className='mx-5 my-10 bg-white shadow-md px-5 py-10
     rounded-xl'>
        <p className='font-bold uppercase text-indigo-600 my-2'>Nombre: {' '}
            <span className='font-normal normal-case text-black'>{nombre}</span>
        </p>

        <p className='font-bold uppercase text-indigo-600 my-2'>Propietario: {' '}
            <span className='font-normal normal-case text-black'>{propietario}</span>
        </p>

        <p className='font-bold uppercase text-indigo-600 my-2'>Email Contacto: {' '}
            <span className='font-normal normal-case text-black'>{email}</span>
        </p>

        <p className='font-bold uppercase text-indigo-600 my-2'>Fecha De Alta: {' '}
            <span className='font-normal normal-case text-black'>{formatearFecha(fecha)}</span>
        </p>

        <p className='font-bold uppercase text-indigo-600 my-2'>Sintomas: {' '}
            <span className='font-normal normal-case text-black'>{sintomas}</span>
        </p>

        <div className='flex  my-5'>
            <button 
            type='button' 
            className='py-2 px-10 bg-indigo-600 hover:bg-indigo-800 text-white uppercase font-bold rounded-lg'
            onClick={() => setEdicion(paciente)}
            >
                editar
            </button>


            <button 
            type='button' 
            className='py-2 px-10 bg-red-600 hover:bg-red-800 text-white uppercase font-bold rounded-lg'
            onClick={() => eliminarPaciente(_id)}
            >
                Eliminar 
            </button>
        </div>
    </div>
  )
}
