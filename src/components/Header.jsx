import { Link } from "react-router-dom"
import useAuth from "../Hooks/useAuth"

export const Header = () => {

    const {cerrarSesion} = useAuth()
    return (
        <header className='py-10 bg-indigo-600'>
            <div className='container mx-auto flex flex-col lg:flex-row justify-between items-center'>
                <h1 className='text-center font-bold text-2xl text-indigo-200'>Administrador de Pacientes de {' '}
                    <span className=' text-white font-black'>Veterinaria</span>
                </h1>

                <nav className="mt-5 flex flex-col items-center lg:flex-row gap-4 lg:mt-0">
                    <Link to="/admin" className="text-white text-sm uppercase font-bold">Pacientes</Link>
                    <Link to="/admin/perfil" className="text-white text-sm uppercase font-bold">Perfil</Link>
                
                <button
                type="button"
                className="text-white text-sm uppercase font-bold"
                onClick={cerrarSesion}
                >
                    Cerrar Sesión
                </button>
                </nav>
            </div>
        </header>
    )
}
