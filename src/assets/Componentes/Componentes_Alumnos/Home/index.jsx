import "./index.css";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { Auth } from "../../../../firebase.js";
import {
  signOut,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import { useState } from "react";

// eslint-disable-next-line react/prop-types
function Home({ user, setUser }) {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogOut = async () => {
    try {
      await signOut(Auth);
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const handlePasswordChange = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Las nuevas contraseñas no coinciden.");
      return;
    }

    setLoading(true);
    try {
      const currentUser = Auth.currentUser;
      if (currentUser) {
        const credential = EmailAuthProvider.credential(
          currentUser.email,
          currentPassword
        );

        await reauthenticateWithCredential(currentUser, credential);
        await updatePassword(currentUser, newPassword);

        alert("Contraseña actualizada exitosamente.");
      } else {
        alert("No se pudo autenticar al usuario.");
      }
    } catch (error) {
      console.error("Error al actualizar la contraseña:", error);
      alert(
        "Hubo un error al actualizar la contraseña. Asegúrate de ingresar la contraseña actual correctamente."
      );
    } finally {
      setLoading(false);
      setShowModal(false);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
  };

  return (
    <>
      <div className="home">
        <div className="nav">
          <div className="user-info">
            <button 
              className="btn-password"
              onMouseEnter={(e) => e.currentTarget.classList.add("hover")}
              onMouseLeave={(e) => e.currentTarget.classList.remove("hover")} 
              onClick={() => setShowModal(true)}>
              <span className="hover-text-password">Cambiar Contraseña</span>
              <i className="fa-solid fa-user-gear"></i>
            </button>
            <button className="btn btn-logout" onClick={handleLogOut}>
              Cerrar Sesión
            </button>
          </div>
        </div>

        <h1 className="titulo">Registro de Alumnos y Pago de Cuotas</h1>
        <h4>A continuación seleccione una opción:</h4>

        <ul className="d-flex">
          {user && user === "Administrador" && (
            <>
              <li>
                <Link
                  className="btn btn-carga"
                  to="/Carga"
                  onMouseEnter={(e) => e.currentTarget.classList.add("hover")}
                  onMouseLeave={(e) =>
                    e.currentTarget.classList.remove("hover")
                  }
                >
                  <span className="hover-text-carga">Carga de Alumnos</span>
                  <i className="fa-solid fa-user-plus"></i>
                </Link>
              </li>
              <li>
                <Link
                  className="btn btn-lista"
                  to="/Lista"
                  onMouseEnter={(e) => e.currentTarget.classList.add("hover")}
                  onMouseLeave={(e) =>
                    e.currentTarget.classList.remove("hover")
                  }
                >
                  <span className="hover-text-lista">Lista de Alumnos</span>
                  <i className="fa-solid fa-users"></i>
                </Link>
              </li>
              
              <li>
                <Link 
                  className="btn btn-carga-user" 
                  to="/CargaUsuario"
                  onMouseEnter={(e) => e.currentTarget.classList.add("hover")}
                  onMouseLeave={(e) => e.currentTarget.classList.remove("hover")}
                  >
                  <span className="hover-text-carga-user">Carga de Usuario</span>
                <i className="fa-solid fa-user-tie"></i>
                </Link>
              </li>
              <li>
              <Link 
                  className="btn btn-carga-userlist" 
                  to="/ListaUsuario"
                  onMouseEnter={(e) => e.currentTarget.classList.add("hover")}
                  onMouseLeave={(e) => e.currentTarget.classList.remove("hover")}
                  >
                  <span className="hover-text-userlist">Lista de Usuarios</span>
                <i className="fa-solid fa-users-viewfinder"></i>
                </Link>
                
              </li>
              <li>
              <Link 
                  className="btn btn-newinvoice" 
                  to="/CargaPagos"
                  onMouseEnter={(e) => e.currentTarget.classList.add("hover")}
                  onMouseLeave={(e) => e.currentTarget.classList.remove("hover")}
                  >
                  <span className="hover-text-newinvoice">Carga de Pagos</span>
                <i className="fa-solid fa-file-invoice-dollar"></i>
                </Link>
              </li>
              <li>
              <Link 
                  className="btn btn-invoicelist" 
                  to="/ListaPagos"
                  onMouseEnter={(e) => e.currentTarget.classList.add("hover")}
                  onMouseLeave={(e) => e.currentTarget.classList.remove("hover")}
                  >
                  <span className="hover-text-invoicelist">Lista de Pagos Registrados</span>
                <i className="fa-solid fa-receipt"></i>
                </Link>
                
              </li>
            </>
          )}
          {user && user === "Usuario Regular" && (
            <>
              <li>
                <Link className="btn btn-carga" to="/Carga">
                  Carga de Alumnos
                </Link>
              </li>
              <li>
                <Link className="btn btn-lista" to="/Lista">
                  Lista de Alumnos
                </Link>
              </li>
              <li>
                <Link className="btn" to="/CargaPagos">
                  Carga de Pagos
                </Link>
              </li>
              <li>
                <Link className="btn" to="/ListaPagos">
                  Lista de Pagos Registrados
                </Link>
              </li>
            </>
          )}
        </ul>

        <hr />

        <Outlet />

        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <h2>Cambiar Contraseña</h2>
              <input
                type="password"
                placeholder="Contraseña actual"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
              <input
                type="password"
                placeholder="Nueva contraseña"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <input
                type="password"
                placeholder="Confirmar nueva contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <div className="modal-actions">
                <button
                  className="btn"
                  onClick={handlePasswordChange}
                  disabled={loading}
                >
                  {loading ? "Actualizando..." : "Actualizar"}
                </button>
                <button className="btn" onClick={() => setShowModal(false)}>
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Home;
