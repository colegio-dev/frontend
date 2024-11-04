
import './App.css'
import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Home from './assets/Componentes/Componentes_Alumnos/Home'
import ListaPagos from './assets/Componentes/Componentes_Pagos/ListaPagos';
import CargaPagos from './assets/Componentes/Componentes_Pagos/CargaPagos';
import ListaAlumnos from './assets/Componentes/Componentes_Alumnos/Lista';
import CargaAlumno from './assets/Componentes/Componentes_Alumnos/Carga';
import Login from './assets/Login/index'
import RegistroPago from './assets/Componentes/Componentes_Pagos/RegistroPago';



function App() {


  const [user, setUser] = useState(null);

  return (
    <>
    {
      user ? (
          <Routes>
            <Route path='/' element={<Home user={user} setUser={setUser} />} >
              <Route path='Lista' element={<ListaAlumnos user={user} />} />
              <Route path='Carga' element={<CargaAlumno />} user={user} />
              <Route path='ListaPagos' element={<ListaPagos user={user} />} />
              <Route path='CargaPagos' element={<CargaPagos />} />
              <Route path='RegistroPago' element={<RegistroPago />} />
            </Route>
          </Routes>
      ) : (
        <Login setUser={setUser} />
      )}
    </>
  )
}

export default App;
