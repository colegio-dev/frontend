/* /* 
// eslint-disable react/prop-types 
import axios from 'axios';
import { useState } from 'react';



import './index.css';



function Login({ setUser }) {
  const [username, setUsername] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false)


  // eslint-disable-next-line no-unused-vars
 
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (username === '' || password === '') {
        setError('Por favor, complete ambos campos')
        setIsLoading(false);
        return;
      }
      const response = await axios.post(  'http://localhost:8000/logins/'    'https://facturador-backend.onrender.com/logins' , {
        username,
        password
      });
      setUser(response.data.user);
      setIsLoading(false);
      console.log(response.data.user);
      setError('')
    } catch (error) {
      setError('Invalid username or password');
      setIsLoading(false);
      alert('Usuario o Password incorrectas')
    }

  };

  return (
    <>

      <div className="container">
        {isLoading && (

          <div className="modal" id="loadingModal" tabIndex="-1" aria-labelledby="loadingModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-body text-center">
                    
                  </div>
                  <h3 className="mt-2">Cargando...</h3>
                </div>
              </div>
                  <div className='loading'>
                    <div>

                      
                      
                    </div>
            </div>
          </div>
        )}
        <div className="forms-container">
        
        
          <div className="signin-signup">
            <form onSubmit={handleSubmit} className="sign-in-form">
              {error && <p className='error-msg'>{error}</p>}
              <h2 className="title">Login</h2>
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input
                  type="text"
                  placeholder="Username"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  name='username' />
              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input
                  type="password"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  name='password' />
              </div>
              <input type="submit" value="Iniciar Sesion" className="btn" />
            </form>
          </div>
        </div>

        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
            </div>
            
            
          </div>
        </div>
      </div>
    </>
  )
}

export default Login; */ 




import { useState } from 'react';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { Auth } from "../../firebase.js"; 
import axios from 'axios';
import './index.css';
import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
function Login({ setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(''); // Estado para el mensaje de restablecimiento
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    try {
      if (email === '' || password === '') {
        setError('Por favor, complete ambos campos');
        setIsLoading(false);
        return;
      }
  
      // Autenticación con Firebase
      const userCredential = await signInWithEmailAndPassword(Auth, email, password);
      const user = userCredential.user;
  
      // Obtener el tipo de usuario desde el backend
      const response = await axios.get(`http://localhost:8000/users?uid=${user.uid}`);
      
      // Si la respuesta es un arreglo, toma el primer elemento
      const userType = Array.isArray(response.data)
      ?  response.data.find(u => u.uid === user.uid)
      : response.data.tipoUsuario
  
      if (!userType) {
        throw new Error('Usuario no encontrado o sin tipoUsuario');
      }
      
      
      // Pasar usuario y tipo de usuario al componente principal
      setUser( userType.tipoUsuario );
      navigate('/')
      setIsLoading(false);
      setError('');
      
    } catch (error) {
      setError('Correo o contraseña incorrecta o datos incompletos');
      setIsLoading(false);
      console.error('Error:', error);
    }
  };
  

  const handlePasswordReset = async () => {
    if (email === '') {
      setError('Por favor, ingrese su correo electrónico');
      return;
    }
    try {
      await sendPasswordResetEmail(Auth, email);
      setMessage('Se ha enviado un enlace de restablecimiento de contraseña a su correo');
      setError(''); // Limpiar errores
    } catch (error) {
      setError('Error al enviar el correo de restablecimiento de contraseña');
      console.error(error);
    }
  };

  return (
    <>
      <div className="container">
        {isLoading && (
          <div className="modal" id="loadingModal" tabIndex="-1" aria-labelledby="loadingModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-body text-center">
                  <h3 className="mt-2">Cargando...</h3>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="forms-container">
          <div className="signin-signup">
            <form onSubmit={handleSubmit} className="sign-in-form">
              {error && <p className='error-msg'>{error}</p>}
              {message && <p className='success-msg'>{message}</p>}
              <h2 className="title">Login</h2>
              <div className="input-field">
                <i className="fas fa-envelope"></i>
                <input
                  type="email"
                  placeholder="Correo electrónico"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  name='email' />
              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input
                  type="password"
                  placeholder="Contraseña"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  name='password' />
              </div>
              <input type="submit" value="Iniciar Sesión" className="btn" />
            </form>
            <button onClick={handlePasswordReset} className="btn-reset">
              Restablecer Contraseña
            </button>
          </div>
        </div>

        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;




