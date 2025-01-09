/* import { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import "./index.css";

Modal.setAppElement("#root"); // Ajusta el selector según sea necesario

// desarrollo local
const URI = "http://localhost:8000/students";


////* const URI = "https://facturador-backend.onrender.com/students"; 

// eslint-disable-next-line react/prop-types
const ListaAlumnos = ( {user} ) => {
  const [alumnos, setAlumnos] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedAlumno, setSelectedAlumno] = useState(null);
  const [errors, setErrors] = useState({ dni: "", telefono: "" });
  

  useEffect(() => {
    getAlumnos();
  }, []);


  const getAlumnos = async () => {
    try {
      const res = await axios.get(URI);
      const data = Array.isArray(res.data) ? res.data : [];
      setAlumnos(data);
    } catch (error) {
      console.error("Error al obtener los alumnos:", error);
    }
  };


  const deleteAlumno = async (id) => {
    if (!id) {
      console.error("ID inválido:", id);
      return;
    }
    const confirmDelete = window.confirm(
      "¿Estás seguro de que deseas eliminar este alumno?"
    );
    if (confirmDelete) {
      try {
        console.log("Intentando eliminar el alumno con ID:", id);
        const res = await axios.delete(`${URI}/${id}`);
        if (res.status === 200) {
          console.log("Alumno eliminado con éxito");
          getAlumnos();
        } else {
          console.error(
            "Error al eliminar alumno: ",
            res.status,
            res.statusText
          );
        }
      } catch (error) {
        console.error("Error al eliminar alumno", error);
      }
    }
  };

  const openModal = (alumno) => {
    setSelectedAlumno(alumno);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedAlumno(null);
    setErrors({ dni: "", telefono: "" }); // Reiniciar errores al cerrar
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedAlumno((prevAlumno) => ({
      ...prevAlumno,
      [name]: value,
    }));

    // Validaciones
    if (name === "dni") {
      // Validar DNI
      const dniValue = Number(value);
      if (value.length > 8 || dniValue < 0 || isNaN(dniValue)) {
        setErrors((prev) => ({
          ...prev,
          dni: "El DNI debe ser un número positivo y tener hasta 8 dígitos.",
        }));
      } else {
        setErrors((prev) => ({ ...prev, dni: "" }));
      }
    }

    if (name === "telefono") {
      // Validar Teléfono
      const telefonoValue = value.replace(/[^0-9]/g, ""); // Eliminar caracteres no numéricos
      if (telefonoValue.length < 10 || telefonoValue.length > 15) {
        setErrors((prev) => ({
          ...prev,
          telefono: "El teléfono debe tener entre 10 y 15 dígitos.",
        }));
      } else {
        setErrors((prev) => ({ ...prev, telefono: "" }));
      }
    }
  };

  const updateAlumno = async () => {
    if (!selectedAlumno || !selectedAlumno.id) {
      console.error("Alumno inválido:", selectedAlumno);
      return;
    }

    // Verificar si hay errores antes de enviar
    if (errors.dni || errors.telefono) {
      console.error("Errores en los campos:", errors);
      return;
    }

    try {
      console.log("Actualizando alumno con ID:", selectedAlumno.id);
      const res = await axios.put(
        `${URI}/${selectedAlumno.id}`,
        selectedAlumno
      );
      if (res.status === 200) {
        console.log("Alumno actualizado con éxito");
        getAlumnos();
        closeModal();
      } else {
        console.error(
          "Error al actualizar alumno: ",
          res.status,
          res.statusText
        );
      }
    } catch (error) {
      console.error("Error al actualizar alumno", error);
    }
  };

  

  return (
    <>
      <div className="contenedor">
        <h2>Lista de Alumnos</h2>
        
        <table className="table table-responsive">
          <thead>
            <tr className="titulos">
              <th scope="col">Nombres</th>
              <th scope="col">Apellido</th>
              <th scope="col">Dni</th>
              <th scope="col">Fecha de Nacimiento</th>
              <th scope="col">Domicilio</th>
              <th scope="col">Grado/Año</th>
              <th scope="col">Nombre del Padre</th>
              <th scope="col">Dni del Padre</th>
              <th scope="col">Telefono del Padre</th>
              <th scope="col">Nombre del Madre</th>
              <th scope="col">Dni de la Madre</th>
              <th scope="col">Telefono de la Madre</th>
              <th scope="col">Observaciones</th>
              {user === 1 && <th scope="col">Acciones</th>}
            </tr>
          </thead>
          <tbody>
            
            {alumnos.map((alumno) => (
              <tr key={alumno.id} className="contenido">
                <td data-label="Nombre">{alumno.nombreAlumno}</td>
                <td data-label="Apellido">{alumno.apellidoAlumno}</td>
                <td data-label="Dni">{alumno.dniAlumno}</td>
                <td data-label="Fecha de Nacimiento">{alumno.fechaNac}</td>
                <td data-label="Domicilio">{alumno.domicilio}</td>
                <td data-label="Grado/Año">{alumno.grado}</td>
                <td data-label="Nombre del Padre">{alumno.nombrePadre}</td>
                <td data-label="Dni del Padre">{alumno.dniPadre}</td>
                <td data-label="Telefono del Padre">{alumno.telefonoPadre}</td>
                <td data-label="Nombre de la Madre">{alumno.nombreMadre}</td>
                <td data-label="Dni de la Madre">{alumno.dniMadre}</td>
                <td data-label="Telefono de la Madre">
                  {alumno.telefonoMadre}
                </td>
                <td data-label="Observaciones" className="observaciones">
                  {alumno.observaciones}
                </td>
                {user  === 'Administrador' && (
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteAlumno(alumno.id)}
                    >
                      <i className="fas fa-trash-alt"></i>
                    </button>
                    <button
                      className="btn btn-primary"
                      onClick={() => openModal(alumno)}
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Modificar Alumno"
      >
        {selectedAlumno && (
          <div>
            <h2>Modificar Alumno</h2>
            <form>
              <label>
                Nombre de alumno:
                <input
                  type="text"
                  name="nombreAlumno"
                  value={selectedAlumno.nombreAlumno}
                  onChange={handleInputChange}
                />
              </label>
              <br />
              <label>
                Apellido:
                <input
                  type="text"
                  name="apellidoAlumno"
                  value={selectedAlumno.apellidoAlumno}
                  onChange={handleInputChange}
                />
              </label>
              <br />
              <label>
                DNI:
                <input
                  type="number"
                  name="dniAlumno"
                  value={selectedAlumno.dniAlumno}
                  onChange={handleInputChange}
                  min="0"
                  onInput={(e) => {
                    if (e.target.value.length > 8) {
                      e.target.value = e.target.value.slice(0, 8);
                    }
                  }}
                />
                {errors.dni && (
                  <span style={{ color: "red" }}>{errors.dni}</span>
                )}
              </label>
              <br />
              <label>
                Fecha de Nacimiento:
                <input
                  type="date"
                  name="fechaNac"
                  value={selectedAlumno.fechaNac || ""}
                  onChange={handleInputChange}
                />
              </label>
              <br />
              <label>
                Domicilio:
                <input
                  type="text"
                  name="domicilio"
                  value={selectedAlumno.domicilio}
                  onChange={handleInputChange}
                />
              </label>
              <br />
              <label>
                Grado/Año:
                <select
                  name="grado"
                  value={selectedAlumno.grado}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Seleccione el Grado/Año</option>
                  <option value="Sala de 3">Sala de 3</option>
                  <option value="Sala de 4">Sala de 4</option>
                  <option value="Sala de 5">Sala de 5</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="1° Ciclo Basico">1° Ciclo Basico</option>
                  <option value="2° Ciclo Basico">2° Ciclo Basico</option>
                  <option value="3° Ciclo Basico">3° Ciclo Basico</option>
                </select>
              </label>
              <br />
              <label>
                Nombre del Padre:
                <input
                  type="text"
                  name="nombrePadre"
                  value={selectedAlumno.nombrePadre}
                  onChange={handleInputChange}
                />
              </label>
              <br />
              <label>
                DNI del Padre:
                <input
                  type="number"
                  name="dniPadre"
                  value={selectedAlumno.dniPadre}
                  onChange={handleInputChange}
                  onInput={(e) => {
                    if (e.target.value.length > 8) {
                      e.target.value = e.target.value.slice(0, 8);
                    }
                  }}
                />
                {errors.dni && (
                  <span style={{ color: "red" }}>{errors.dni}</span>
                )}
              </label>
              <br />
              <label>
                Teléfono del padre:
                <input
                  type="text"
                  name="telefonoPadre"
                  value={selectedAlumno.telefonoPadre}
                  onChange={handleInputChange}
                  maxLength={15}
                />
                {errors.telefono && (
                  <span style={{ color: "red" }}>{errors.telefono}</span>
                )}
              </label>
              <br />
              <label>
                Nombre de la Madre:
                <input
                  type="text"
                  name="nombreMadre"
                  value={selectedAlumno.nombreMadre}
                  onChange={handleInputChange}
                />
              </label>
              <br />
              <label>
                DNI de la Madre:
                <input
                  type="number"
                  name="dniMadre"
                  value={selectedAlumno.dniMadre}
                  onChange={handleInputChange}
                  onInput={(e) => {
                    if (e.target.value.length > 8) {
                      e.target.value = e.target.value.slice(0, 8);
                    }
                  }}
                />
                {errors.dni && (
                  <span style={{ color: "red" }}>{errors.dni}</span>
                )}
              </label>
              <br />
              <label>
                Teléfono de la Madre:
                <input
                  type="text"
                  name="telefonoMadre"
                  value={selectedAlumno.telefonoMadre}
                  onChange={handleInputChange}
                  maxLength={15}
                />
                {errors.telefono && (
                  <span style={{ color: "red" }}>{errors.telefono}</span>
                )}
              </label>
              <br />
              <label>
                Observaciones:
                <input
                  type="text"
                  name="observaciones"
                  value={selectedAlumno.observaciones}
                  onChange={handleInputChange}
                />
              </label>
              <br />
              <div className="botones-modal">
                <button className="btn" type="button" onClick={updateAlumno}>
                  Guardar
                </button>
                <button className="btn" type="button" onClick={closeModal}>
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}
      </Modal>
    </>
  );
};

export default ListaAlumnos;
 */






import { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import "./index.css";

Modal.setAppElement("#root");

//desarrollo produccion
// const URI = "https://facturador-backend.onrender.com/students";


// desarrollo local
const URI = "http://localhost:8000/students";

const ListaAlumnos = ({ user }) => {
  const [alumnos, setAlumnos] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedAlumno, setSelectedAlumno] = useState(null);
  const [errors, setErrors] = useState({ dni: "", telefono: "" });
  const [gradoSeleccionado, setGradoSeleccionado] = useState("");

  useEffect(() => {
    getAlumnos();
  }, []);

  const getAlumnos = async () => {
    try {
      const res = await axios.get(URI);
      const data = Array.isArray(res.data) ? res.data : [];
      setAlumnos(data);
    } catch (error) {
      console.error("Error al obtener los alumnos:", error);
    }
  };

  const deleteAlumno = async (id) => {
    if (!id) return;
    const confirmDelete = window.confirm(
      "¿Estás seguro de que deseas eliminar este alumno?"
    );
    if (confirmDelete) {
      try {
        const res = await axios.delete(`${URI}/${id}`);
        if (res.status === 200) getAlumnos();
      } catch (error) {
        console.error("Error al eliminar alumno", error);
      }
    }
  };

  const openModal = (alumno) => {
    setSelectedAlumno(alumno);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedAlumno(null);
    setErrors({ dni: "", telefono: "" });
  };

  const handleFiltroGrado = (e) => {
    setGradoSeleccionado(e.target.value);
  };

  const alumnosFiltrados = gradoSeleccionado
    ? alumnos.filter((alumno) => alumno.grado === gradoSeleccionado)
    : alumnos;

  return (
    <>
      <div className="contenedor">
        <h2>Lista de Alumnos</h2>

        {/* Filtro por grado */}
        <div>
          <label htmlFor="grado-select">Filtrar por Grado/Año: </label>
          <select
            id="grado-select"
            value={gradoSeleccionado}
            onChange={handleFiltroGrado}
          >
            <option value="">Todos</option>
            <option value="Sala de 3">Sala de 3</option>
            <option value="Sala de 4">Sala de 4</option>
            <option value="Sala de 5">Sala de 5</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="1° Ciclo Basico">1° Ciclo Basico</option>
            <option value="2° Ciclo Basico">2° Ciclo Basico</option>
            <option value="3° Ciclo Basico">3° Ciclo Basico</option>
          </select>
        </div>

        <table className="table table-responsive">
          <thead>
            <tr className="titulos">
              <th scope="col">Nombres</th>
              <th scope="col">Apellido</th>
              <th scope="col">Dni</th>
              <th scope="col">Fecha de Nacimiento</th>
              <th scope="col">Domicilio</th>
              <th scope="col">Grado/Año</th>
              <th scope="col">Nombre del Padre</th>
              <th scope="col">Dni del Padre</th>
              <th scope="col">Telefono del Padre</th>
              <th scope="col">Nombre del Madre</th>
              <th scope="col">Dni de la Madre</th>
              <th scope="col">Telefono de la Madre</th>
              <th scope="col">Observaciones</th>
              {user === "Administrador" && <th scope="col">Acciones</th>}
            </tr>
          </thead>
          <tbody>
            {alumnosFiltrados.map((alumno) => (
              <tr key={alumno.id} className="contenido">
                <td data-label="Nombre">{alumno.nombreAlumno}</td>
                <td data-label="Apellido">{alumno.apellidoAlumno}</td>
                <td data-label="Dni">{alumno.dniAlumno}</td>
                <td data-label="Fecha de Nacimiento">{alumno.fechaNac}</td>
                <td data-label="Domicilio">{alumno.domicilio}</td>
                <td data-label="Grado/Año">{alumno.grado}</td>
                <td data-label="Nombre del Padre">{alumno.nombrePadre}</td>
                <td data-label="Dni del Padre">{alumno.dniPadre}</td>
                <td data-label="Telefono del Padre">{alumno.telefonoPadre}</td>
                <td data-label="Nombre de la Madre">{alumno.nombreMadre}</td>
                <td data-label="Dni de la Madre">{alumno.dniMadre}</td>
                <td data-label="Telefono de la Madre">
                  {alumno.telefonoMadre}
                </td>
                <td data-label="Observaciones" className="observaciones">
                  {alumno.observaciones}
                </td>
                {user === "Administrador" && (
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteAlumno(alumno.id)}
                    >
                      <i className="fas fa-trash-alt"></i>
                    </button>
                    <button
                      className="btn btn-primary"
                      onClick={() => openModal(alumno)}
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal de edición */}
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Modificar Alumno">
        {/* Contenido del modal */}
      </Modal>
    </>
  );
};

export default ListaAlumnos;
