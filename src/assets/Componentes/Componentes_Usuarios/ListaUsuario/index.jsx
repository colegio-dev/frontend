import { useEffect, useState } from 'react';
import axios from 'axios';
import { getAuth, deleteUser } from 'firebase/auth';

// import { useNavigate } from 'react-router-dom';
import './index.css'

const URI = 'http://localhost:8000/users'; // Cambia esta URI según tu backend

const ListaUsuario = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para el modal
  const [selectedUser, setSelectedUser] = useState(null); // Usuario en edición

  // const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(URI);
        if (Array.isArray(response.data)) {
          setUsers(response.data);
        } else {
          console.error("La respuesta no es un array:", response.data);
          setUsers([]);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
        setError('Error al cargar usuarios');
      }
    };

    fetchUsers();
  }, []);

  const handleEditUser = (user) => {
    setSelectedUser(user); // Guardar el usuario seleccionado
    setIsModalOpen(true);  // Abrir el modal
  };

  const handleDeleteUser = async (userId, firebaseUid) => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;

      // Verifica si el usuario autenticado es el mismo que el que estamos eliminando
      if (user && user.uid === firebaseUid) {
        // Elimina el usuario de Firebase Authentication
        await deleteUser(user);
        console.log('Usuario eliminado de Firebase Authentication');
      }

      // Elimina el usuario de la base de datos
      await axios.delete(`${URI}/${userId}`);
      setUsers(users.filter((user) => user.id !== userId)); // Actualiza la lista de usuarios
    } catch (error) {
      console.error('Error deleting user:', error);
      setError('Error al eliminar el usuario');
    }
  };

  // Maneja el cierre del modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  // Maneja el cambio de los campos en el modal
  const handleChange = (e) => {
    setSelectedUser({ ...selectedUser, [e.target.name]: e.target.value });
  };

  // Guarda los cambios del usuario editado
  const handleSaveChanges = async () => {
    try {
      await axios.put(`${URI}/${selectedUser.id}`, selectedUser);
      setUsers(users.map((user) => (user.id === selectedUser.id ? selectedUser : user)));
      closeModal();
    } catch (error) {
      console.error('Error updating user:', error);
      setError('Error al actualizar el usuario');
    }
  };

  return (
    <div >
      <h1>Usuarios Registrados</h1>
      {error && <p className="error-msg">{error}</p>}
      <table className='table-responsive'>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Email</th>
            <th>UID</th>
            <th>Password</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.nombreUser}</td>
              <td>{user.apellidoUser}</td>
              <td>{user.usuario}</td>
              <td>{user.uid}</td>
              <td>{user.password}</td>
              <td>
                <button onClick={() => handleEditUser(user)}>Editar</button>
                <button onClick={() => handleDeleteUser(user.id, user.firebaseUid)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal de Edición */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Editar Usuario</h2>
            <label>
              Nombre:
              <input
                type="text"
                name="nombreUser"
                value={selectedUser.nombreUser || ''}
                onChange={handleChange}
              />
            </label>
            <label>
              Apellido:
              <input
                type="text"
                name="apellidoUser"
                value={selectedUser.apellidoUser || ''}
                onChange={handleChange}
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                name="usuario"
                value={selectedUser.usuario || ''}
                onChange={handleChange}
              />
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
