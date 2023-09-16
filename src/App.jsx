import { BrowserRouter, Routes, Route } from 'react-router-dom'
//Browser rodea el router, routes para diferentes rutas y route para una en especifico
import { AuthLayout } from './layout/AuthLayout'
import { RutaProtegida } from './layout/RutaProtegida'

import { Login } from './paginas/login'
import { Registrar } from './paginas/Registrar'
import { ConfirmarCuenta } from './paginas/ConfirmarCuenta'
import { OlvidePassword } from './paginas/OlvidePassword'
import { NuevoPassword } from './paginas/NuevoPassword'
import { AdministrarPacientes } from './paginas/AdministrarPacientes'
import { EditarPerfil } from './paginas/EditarPerfil'
import { CambiarPassword } from './paginas/CambiarPassword'

import { AuthProvider } from './context/AuthProvider'
import { PacientesProvider } from './context/PacientesProvider'

function App() {

  // console.log(import.meta.env.VITE_BACKEND_URL);

  return (
    <BrowserRouter>
      <AuthProvider>
        <PacientesProvider>
          <Routes>
            {/* el element senala el componente del AUTHLAYOU */}
            {/* Area Publica no requiere token */}
            <Route path="/" element={<AuthLayout />}>

              <Route index element={<Login />} />
              <Route path="registrar" element={<Registrar />} />
              <Route path="olvide-password" element={<OlvidePassword />} />
              <Route path="olvide-password/:token" element={<NuevoPassword />} />
              <Route path="confirmar/:id" element={<ConfirmarCuenta />} />
            </Route>

            {/* Area Privada, si requiere token */}
            <Route path='/admin' element={<RutaProtegida />}>
              <Route index element={<AdministrarPacientes />} />
              <Route path='perfil' element={<EditarPerfil />} />
              <Route path='cambiar-password' element={<CambiarPassword />} />
            </Route>

          </Routes>
        </PacientesProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
