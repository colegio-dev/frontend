
import { useEffect, useState } from "react";
import axios from "axios";
import {
  getAuth,
  updatePassword,
  updateEmail,
  updateProfile,
  reauthenticateWithCredential,
  EmailAuthProvider,
  deleteUser
} from "firebase/auth";
import "./index.css";

//const URI = "http://localhost:8000/users";

const URI = "https://backend-9rzw.onrender.com/users"

const ListaUsuario = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(URI);
        setUsers(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Error fetching users:", error);
        setError("Error al cargar usuarios");
      }
    };

    fetchUsers();
  }, []);

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const handleChange = (e) => {
    setSelectedUser({ ...selectedUser, [e.target.name]: e.target.value });
  };

  const handleSaveChanges = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      setError("No hay un usuario autenticado en Firebase.");
      return;
    }

    try {
      // Reautenticar al usuario
      const currentPassword = prompt("Ingresa tu contraseña actual para confirmar:");
      if (!currentPassword) {
        setError("No se proporcionó la contraseña actual.");
        return;
      }

      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, credential);

      // Actualizar correo si ha cambiado
      if (selectedUser.usuario && selectedUser.usuario !== user.email) {
        await updateEmail(user, selectedUser.usuario);
        console.log("Correo actualizado en Firebase");
      }

      // Actualizar contraseña si ha cambiado
      if (selectedUser.password && selectedUser.password !== "") {
        await updatePassword(user, selectedUser.password);
        console.log("Contraseña actualizada en Firebase");
      }

      // Actualizar nombre y apellido
      if (
        selectedUser.nombreUser ||
        selectedUser.apellidoUser
      ) {
        await updateProfile(user, {
          displayName: `${selectedUser.nombreUser} ${selectedUser.apellidoUser}`,
        });
        console.log("Perfil actualizado en Firebase");
      }

      // Actualizar datos en el backend
      await axios.put(`${URI}/${selectedUser.id}`, selectedUser);
      setUsers(users.map((u) => (u.id === selectedUser.id ? selectedUser : u)));
      closeModal();
    } catch (error) {
      console.error("Error al guardar los cambios:", error.message);
      setError(
        "Error al guardar los cambios. Asegúrate de que los datos son válidos y que el usuario está autenticado."
      );
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      deleteUser(user).then(()=>{
        //
      }).catch(()=>{
        //
      })
      
      // Elimina el usuario de la base de datos
      await axios.delete(`${URI}/${userId}`);
      setUsers(users.filter((user) => user.id !== userId)); // Actualiza la lista de usuarios
    } catch (error) {
      console.error("Error deleting user:", error);
    
      setError("Error al eliminar el usuario");
    }
  };

  return (
    <div>
      <h1>Usuarios Registrados</h1>
      {error && <p className="error-msg">{error}</p>}
      <table className="table-responsive">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Email</th>
            {/* <th>Password</th> */}
            <th>Tipo de Usuario</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.nombreUser}</td>
              <td>{user.apellidoUser}</td>
              <td>{user.usuario}</td>
              {/* <td>********</td> */}
              <td>{user.tipoUsuario}</td>
              <td>
                <button onClick={() => handleEditUser(user)}>Editar</button>
                <button
                  onClick={() => handleDeleteUser(user.id, user.firebaseUid)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Editar Usuario</h2>
            <label>
              Nombre:
              <input
                type="text"
                name="nombreUser"
                value={selectedUser.nombreUser || ""}
                onChange={handleChange}
              />
            </label>
            <label>
              Apellido:
              <input
                type="text"
                name="apellidoUser"
                value={selectedUser.apellidoUser || ""}
                onChange={handleChange}
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                name="usuario"
                value={selectedUser.usuario || ""}
                onChange={handleChange}
              />
            </label>
            {/* <label>
              Password:
              <input
                type="text"
                name="password"
                value={selectedUser.password || ""}
                onChange={handleChange}
              />
            </label> */}
            <label>
              Tipo de Usuario:
              <select
                name="tipoUsuario"
                value={selectedUser.tipoUsuario || ""}
                onChange={handleChange}
              >
                <option value="" disabled>
                  Seleccione un tipo
                </option>
                <option value="Administrador">Administrador</option>
                <option value="Usuario Regular">Usuario Regular</option>
              </select>
            </label>
            <div className="modal-buttons">
              <button onClick={handleSaveChanges}>Guardar cambios</button>
              <button onClick={closeModal}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListaUsuario;



