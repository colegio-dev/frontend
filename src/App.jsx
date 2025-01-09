import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Home from './assets/Componentes/Componentes_Alumnos/Home';
import ListaAlumnos from './assets/Componentes/Componentes_Alumnos/Lista/index';
import CargaAlumno from './assets/Componentes/Componentes_Alumnos/Carga/index';
import Login from './assets/Login/index';
import CargaUsuario from './assets/Componentes/Componentes_Usuarios/CargaUsuario/index';
import ListaUsuario from './assets/Componentes/Componentes_Usuarios/ListaUsuario/index';
import CargaPagos from './assets/Componentes/Componentes_Pagos/CargaPagos';
import ListaPagos from './assets/Componentes/Componentes_Pagos/ListaPagos';

function App() {
  const [user, setUser] = useState(null);

  return (
    <Routes>
      {/* Ruta de login */}
      <Route path="/login" element={<Login setUser={setUser} />} />

      {/* Rutas protegidas (necesitan estar autenticados) */}
      {user ? (
        <Route path="/" element={<Home user={user} setUser={setUser} />}>
          {/* Rutas secundarias dependiendo del tipo de usuario */}
          <Route path="Carga" element={<CargaAlumno />} />
          <Route path="Lista" element={<ListaAlumnos user={user}/>} />
          <Route path="CargaUsuario" element={<CargaUsuario />} />
          <Route path="ListaUsuario" element={<ListaUsuario />} />
          <Route path='CargaPagos' element={<CargaPagos />} />
          <Route path='ListaPagos' element={<ListaPagos user={user} />} />
        </Route>
      ) : (
        // Si no está autenticado, redirigir al login
        <Route path="*" element={<Navigate to="/login" replace />} />
      )}
    </Routes>
  );
}

export default App;
