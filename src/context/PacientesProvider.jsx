import { createContext, useState, useEffect } from "react"
import axios from "axios";
import useAuth from "../Hooks/useAuth";

const PacientesContext = createContext()

export const PacientesProvider = ({ children }) => {

    const [pacientes, setPacientes] = useState([])
    const [paciente, setPaciente] = useState({})

    const { auth } = useAuth()

    useEffect(() => {
        const obtenerPacientes = async () => {
            try {
                const token = localStorage.getItem('token')
                if (!token) return

                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

                const { data } = await axios('http://localhost:4000/api/pacientes', config)
                // console.log(data)
            } catch (error) {
                console.log(error)
            }
        }
        obtenerPacientes()
    }, [auth])

    const guardarPaciente = async (paciente) => {
        // console.log(paciente)

        const token = localStorage.getItem('token')
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        if (paciente.id) {
            try {
                const { data } = await axios.put(`http://localhost:4000/api/pacientes/${paciente.id}`, paciente,
                    config)

                // console.log(data)
                const pacientesActualizado = pacientes.map(pacienteState => pacienteState._id ===
                    data._id ? data : pacienteState)
                setPacientes(pacientesActualizado)
            } catch (error) {

            }
        } else {

            try {

                const { data } = await axios.post('http://localhost:4000/api/pacientes'
                    , paciente, config);
                // console.log(data)

                //Crea un nuevo objeto quitando lo que esta entre {}
                const { createdAt, updatedAt, __v, ...pacienteAlmacenado } = data

                setPacientes([pacienteAlmacenado, ...pacientes])
            } catch (error) {
                console.log(error.response.data.msg)
            }
        }


    }

    const setEdicion = (paciente) => {
        // console.log('Editando', id)
        setPaciente(paciente)
    }

    const eliminarPaciente = async id => {
        // console.log(id)
        const confirmar = confirm('Deseas eliminar el registro?')

        if (confirmar) {
            try {

                const token = localStorage.getItem('token')
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

                const {data} = await axios.delete(`http://localhost:4000/api/pacientes/${id}`, config);

                // console.log(data)

                const pacientesActualizado = pacientes.filter(pacientesState =>
                     pacientesState._id !== id)
                     setPacientes(pacientesActualizado)

            } catch (error) {
                console.log(error)
            }
        }

    }
    return (
        <PacientesContext.Provider
            value={{
                pacientes,
                guardarPaciente,
                setEdicion,
                paciente,
                eliminarPaciente
            }}
        >
            {children}
        </PacientesContext.Provider>
    )
}


export default PacientesContext;



