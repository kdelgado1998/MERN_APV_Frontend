import React from 'react'
import usePacientes from '../Hooks/usePacientes'
import { Paciente } from './Paciente';

export const ListadoPacientes = () => {
  const { pacientes } = usePacientes();
  return (
    <>

      {pacientes.length ? (

        <>
          <h2 className='font-black text-3xl text-center'>Listado Pacientes</h2 >

          <p className='text-xl mt-5 mb-10 text-center'>
            Administra tus {' '}
            <span className='text-indigo-600 font-bold'>Pacientes y Citas</span>
          </p>

          {pacientes.map(paciente => (
            <Paciente 
              key={paciente._id}
              paciente={paciente}
            />
          ))}
        </>
      ) :
        (
          <>
            <h2 className='font-black text-3xl text-center'>No hay Pacientes</h2 >

            <p className='text-xl mt-5 mb-10 text-center'>
              Comienza agregando tus Pacientes {' '}
              <span className='text-indigo-600 font-bold'>y apareceran abajo</span>
            </p>
          </>

        )}
    </>
  )
}
