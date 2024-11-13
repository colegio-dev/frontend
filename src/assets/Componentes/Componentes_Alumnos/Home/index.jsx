//import { useState, useEffect } from 'react';
import './index.css';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { Auth } from '../../../../firebase.js'; // Importa el objeto auth desde firebaseConfig.js
import { /* onAuthStateChanged, */ signOut } from 'firebase/auth';



/* const URI = 'http://localhost:8000/users'; */

function Home({setUser}) {
    
    
    
    
    
    const navigate = useNavigate();
    
    /* useEffect(() => {
        // Verifica si el usuario está autenticado
        const unsubscribe = onAuthStateChanged(Auth, (user) => {
            if (user) {
                
                setUser(user); // Opcional: Guarda el usuario en el estado global o en el padre
            } else {
                navigate('/'); // Si no hay usuario, redirige al login
            }
        });

        return () => unsubscribe(); // Limpia el listener al desmontar el componente
    }, [navigate, setUser]); */

    const handleLogOut = async () => {
        try {
            await signOut(Auth); // Cierra sesión en Firebase
            setUser(null);
            
            navigate('/'); // Redirige al login
        } catch (error) {
            console.error("Error al cerrar sesión: ", error);
        }
    };

    

    return (
        <>
            <div className='container-fluid home'>
                <div className='nav'>
                    
                    
                    
                    <div className="user-info">
                        
                        <button className='btn btn-logout' onClick={handleLogOut}>Cerrar Sesión</button>
                        
                        
                    </div>
                </div>
                
                <h1 className="titulo">Registro de Alumnos y Pago de Cuotas</h1>
                <h4>A continuación seleccione una opción:</h4>
                
                <ul className="d-flex">
                    <li><Link className="btn btn-carga" to="/Carga">Carga de Alumnos</Link></li>
                    <li><Link className="btn btn-lista" to="/Lista">Lista de Alumnos</Link></li>
                    
                </ul>
                
                <hr />

                <Outlet />
                
        
            </div>
        </>
    );
}

export default Home;

