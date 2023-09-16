import { useState, useEffect, createContext } from "react";
import axios from "axios";

const AuthContext = createContext()

const AuthProvider = ({ children }) => {

    const [cargando, setCargando] = useState(true)
    const [auth, setAuth] = useState({});

    useEffect(() => {
        const autenticarUsuario = async () => {
            const token = localStorage.getItem('token');
            // console.log(token);
            if (!token) {
                setCargando(false)
                return
            }

            //Crear el bearer de authenticacion necesario porque asi lo pusimos en postman
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            try {
                const { data } = await axios('http://localhost:4000/api/veterinarios/perfil',
                    config);
                // console.log(data);
                setAuth(data);
            } catch (error) {
                console.log(error.response.data.msg)
                setAuth({})
            }

            setCargando(false)

        }
        autenticarUsuario();
    }, [])

    const cerrarSesion = () => {
        localStorage.removeItem('token')
        setAuth({})
    }

    const actualizarPerfil = async datos => {
        // console.log(datos)
        const token = localStorage.getItem('token');
        if (!token) {
            setCargando(false)
            return
        }
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const url = `/veterinarios/perfil/${datos._id}`
            const { data } = await axios.put('http://localhost:4000/api/',url, datos, config)

            return {
                msg: 'Almacenado correctamente'
            }
        } catch (error) {
            // console.log(error.response)
            return {
                msg: error.response.data.msg,
                error: true
            }
        }
    }


    const guardarPassword = async (datos) => {
        const token = localStorage.getItem('token');
        if (!token) {
            setCargando(false)
            return
        }
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const url = '/veterinarios/actualizar-password'

            const {data} = await axios.put('http://localhost:4000/api/',url, datos, config)
            console.log(data)

            return{
                msg: data.msg
            }
        } catch (error) {
            console.log(error.response.data.msg)
            return{
                msg: error.response.data.msg,
                error: true
            }
        }
    }

    return (
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                cargando,
                cerrarSesion,
                actualizarPerfil,
                guardarPassword
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
}

export default AuthContext;