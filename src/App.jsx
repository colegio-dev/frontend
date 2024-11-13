
import './App.css'
import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Home from './assets/Componentes/Componentes_Alumnos/Home'

import ListaAlumnos from './assets/Componentes/Componentes_Alumnos/Lista';
import CargaAlumno from './assets/Componentes/Componentes_Alumnos/Carga';
import Login from './assets/Login/index'






function App() {


  const [user, setUser] = useState('');

  return (
    <>
    {
      user ? (
          <Routes>
            <Route path='/' element={<Home user={user} setUser={setUser} />} >
              <Route path='Carga' element={<CargaAlumno />} user={user} />
              <Route path='Lista' element={<ListaAlumnos user={user} />} />
              
            </Route>
          </Routes>
      ) : (
        <Login setUser={setUser} />
      )}
    </>
  )
}

export default App;
