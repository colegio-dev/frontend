import { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import "./index.css";

Modal.setAppElement("#root"); // Ajusta el selector según sea necesario

// desarrollo local
const URI = "http://localhost:8000/students";

// eslint-disable-next-line react/prop-types
const ListaAlumnos = ({ user }) => {
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
      setAlumnos(res.data);
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
              <th scope="col">Nombre</th>
              <th scope="col">Apellido</th>
              <th scope="col">Dni</th>
              <th scope="col">Domicilio</th>
              <th scope="col">Grado/Año</th>
              <th scope="col">Tutor</th>
              <th scope="col">Telefono</th>
              <th scope="col">Observaciones</th>
              {user === 1 && <th scope="col">Acciones</th>}
            </tr>
          </thead>
          <tbody>
            {alumnos.map((alumno) => (
              <tr key={alumno.id} className="contenido">
                <td data-label="Nombre">{alumno.nombres}</td>
                <td data-label="Apellido">{alumno.apellido}</td>
                <td data-label="Dni">{alumno.dni}</td>
                <td data-label="Domicilio">{alumno.domicilio}</td>
                <td data-label="Grado/Año">{alumno.grado}</td>
                <td data-label="Tutor">{alumno.tutor}</td>
                <td data-label="Telefono">{alumno.telefono}</td>
                <td data-label="Observaciones" className="observaciones">
                  {alumno.observaciones}
                </td>
                {user === 1 && (
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
                Nombre:
                <input
                  type="text"
                  name="nombres"
                  value={selectedAlumno.nombres}
                  onChange={handleInputChange}
                />
              </label>
              <br />
              <label>
                Apellido:
                <input
                  type="text"
                  name="apellido"
                  value={selectedAlumno.apellido}
                  onChange={handleInputChange}
                />
              </label>
              <br />
              <label>
                DNI:
                <input
                  type="number"
                  name="dni"
                  value={selectedAlumno.dni}
                  onChange={handleInputChange}
                  min="0" 
                  onInput={(e) => {
                    if (e.target.value.length > 8) {
                      e.target.value = e.target.value.slice(0, 8);
                    }
                  }}
                />
                {errors.dni && <span style={{ color: "red" }}>{errors.dni}</span>}
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
                Tutor:
                <input
                  type="text"
                  name="tutor"
                  value={selectedAlumno.tutor}
                  onChange={handleInputChange}
                />
              </label>
              <br />
              <label>
                Teléfono:
                <input
                  type="text"
                  name="telefono"
                  value={selectedAlumno.telefono}
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

