import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Auth } from "../../../../firebase.js"; // Asegúrate de ajustar la ruta según tu estructura de archivos

const URI = 'http://localhost:8000/users';

const CargaUsuario = () => {
  
  const [nombreUser, setNombreUser] = useState("");
  const [apellidoUser, setApellidoUser] = useState("");
  const [usuario, setUsuario] = useState(""); // Usado como correo electrónico
  const [password, setPassword] = useState("");
  const [tipoUsuario, setTipoUsuario] = useState("")

  const [generalError, setGeneralError] = useState("");

  const navigate = useNavigate();

  const store = async (e) => {
    e.preventDefault();
    setGeneralError("");

    try {
      // Crea el usuario en Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(Auth, usuario, password);
      const user = userCredential.user;

      // Si la creación de usuario fue exitosa en Firebase, envía los datos al backend
      const data = {
        uid: user.uid,
        nombreUser,
        apellidoUser,
        usuario,
        password,  
        tipoUsuario
        
      };

      await axios.post(URI, data);
      navigate("/ListaUsuario");
    } catch (error) {
      setGeneralError("Ocurrió un error al cargar el usuario. Inténtalo nuevamente.");
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={store}>
        <h1>Carga de Usuario</h1>
        <input 
          type="text"
          name="nombreUser"
          placeholder="Ingrese el nombre"
          value={nombreUser}
          onChange={(e) => setNombreUser(e.target.value)}
        />
        <input 
          type="text"
          name="apellidoUser"
          placeholder="Ingrese el apellido"
          value={apellidoUser}
          onChange={(e) => setApellidoUser(e.target.value)}
        />
        <input 
          type="email" // Cambia a tipo email para el usuario/correo
          name="usuario"
          placeholder="Ingrese el correo electrónico"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
        />
        <input 
          type="password"
          name="password"
          placeholder="Ingrese la contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <select name="user" onChange={(e)=>setTipoUsuario(e.target.value)}>
          <option value="">Seleccione el tipo de usuario</option>
          <option value="Administrador">Administrador</option>
          <option value="Usuario Regular">Usuario Regular</option>
        </select>
        <input type="submit" value="Cargar" className="btn btn-enviar" />
        {generalError && <p style={{ color: "red" }}>{generalError}</p>}
      </form>
    </div>
  );
};

export default CargaUsuario;
