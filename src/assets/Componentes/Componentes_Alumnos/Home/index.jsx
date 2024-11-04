import { useEffect } from 'react';
import './index.css'
import { Outlet, Link, useNavigate } from 'react-router-dom';




// eslint-disable-next-line react/prop-types, no-unused-vars
function Home({ user, setUser }) {

    const navigate = useNavigate();
    
    useEffect(()=>{
        if(!user){
            navigate('/')
        }
    }, [user, navigate])
    
    const handleLogOut = () => {
        setUser('')
        navigate('/')
    }

    return (
        <>
                <div className='container-fluid  home'>
                    <div className='nav'>
                        <img src="src/assets/img/logo_colegio_1.jpg" alt="" />
                        <button className='btn btn-logout' onClick={handleLogOut} >Cerrar Sesion</button>
                    </div>
                    <h1 className="titulo">Registro de Alumnos y Pago de Cuotas</h1>
                    
                    <h4>A continuacion seleccione una opcion:</h4>
                    <ul className="d-flex" >
                        <li><Link className="btn btn-carga" to="/Carga"  >Carga de Alumnos</Link></li>
                        <li><Link className="btn btn-lista" to="/Lista"  >Lista de Alumnos</Link></li>
                        {/* <li><Link className='btn btn-carga' to="/CargaPagos" >Carga de Pagos</Link></li>
                        <li><Link className='btn btn-lista' to="/ListaPagos" >Lista de Pagos</Link></li>
                        <li><Link className='btn' to="/RegistroPago">Registro de Pago</Link></li> */}
                        
                    </ul>
                    <hr />
                    <Outlet />
                </div>
          

        </>
    )
}

export default Home;