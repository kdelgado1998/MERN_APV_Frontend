import React from 'react'
import { useState } from 'react'
import { AdminNav } from '../components/AdminNav'
import Alerta from '../components/Alerta'
import useAuth from '../Hooks/useAuth'

export const CambiarPassword = () => {

    const { guardarPassword } = useAuth()

    const [alerta, setAlerta] = useState({})
    const [password, setPassword] = useState({
        pwd_actual: '',
        pwd_neuvo: ''
    })

    const handleSubmit = async e => {
        e.preventDefault()

        // console.log(Object.values(password).some(campo => campo === ''))
        if (Object.values(password).some(campo => campo === '')) {
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            })

            return
        }

        if (password.pwd_neuvo.length < 6) {
            setAlerta({
                msg: 'El password debe de tener minimo 6 caracteres',
                error: true
            })
            return
        }

        const respuesta = await guardarPassword(password)

        setAlerta(respuesta)
    }


    const { msg } = alerta

    return (
        <>
            <AdminNav />


            <h2 className='font-black text-xl text-center mt-10'>Cambiar Password</h2>
            <p className='text-xl mt-5 mb-10 text-center'>Modifica tu {' '}
                <span className='text-indigo-600 font-bold'>Password </span> aquí</p>


            <div className='flex justify-center'>
                <div className='w-full md:w-1/2 bg-white shadow rounded-lg p-5'>

                    {msg && <Alerta alerta={alerta} />}
                    <form
                        onSubmit={handleSubmit}
                    >
                        <div className='my-3'>
                            <label className='uppercase font-bold text-gray-600'>Password Actual: </label>
                            <input
                                type='password'
                                className='border bg-gray-50 w-full p-2 rounded-lg'
                                name='pwd_actual'
                                placeholder='Escribe tu password actual'
                                onChange={e => setPassword({
                                    ...password,
                                    [e.target.name]: e.target.value
                                })}
                            />
                        </div>

                        <div className='my-3'>
                            <label className='uppercase font-bold text-gray-600'>Nuevo Password: </label>
                            <input
                                type='password'
                                className='border bg-gray-50 w-full p-2 rounded-lg'
                                name='pwd_neuvo'
                                placeholder='Escribe tu nuevo password'
                                onChange={e => setPassword({
                                    ...password,
                                    [e.target.name]: e.target.value
                                })}
                            />
                        </div>

                        <input
                            type='submit'
                            value="Actualizar"
                            className=' w-full mt-5 bg-indigo-700 px-10 py-3 font-bold text-white rounded-lg uppercase'
                        />
                    </form>
                </div>
            </div>
        </>
    )
}
