import { Outlet, Navigate } from "react-router-dom"
import { Header } from "../components/Header"
import { Footer } from "../components/Footer"
import useAuth from "../Hooks/useAuth"

export const RutaProtegida = () => {
    const { auth, cargando } = useAuth()
    // console.log(auth);
    // console.log(cargando);

    if (cargando) return 'Cargando...'

    return (
        <>
            <Header />
            {/* Si auth tiene algo entonces muestra el outle y sino navega al usuario a incia sesion */}
            {/* {auth?._id ? <Outlet /> : <Navigate to="/" />} */}
            {auth?._id ? (
                <main className="container mx-auto mt-10">
                    <Outlet />
                </main>
            ) : <Navigate to="/" />}
            <Footer />
        </>
    )
}
