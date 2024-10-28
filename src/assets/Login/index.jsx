/* eslint-disable react/prop-types */
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
      const response = await axios.post( 'http://localhost:8000/logins/'  /* 'https://sistema-novedades-backend.onrender.com/logins' */, {
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

export default Login;