import "./index.css";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

//desarrollo local
/* const URI = "http://localhost:8000/students/"; */
//desarrollo en produccion
const URI = 'https://facturador-backend.onrender.com/students/';

const CargaAlumno = () => {
  const [nombres, setNombres] = useState("");
  const [apellido, setApellido] = useState("");
  const [dni, setDni] = useState("");
  const [domicilio, setDomicilio] = useState("");
  const [grado, setGrado] = useState("");
  const [tutor, setTutor] = useState("");
  const [telefono, setTelefono] = useState("");
  const [observaciones, setObservaciones] = useState("");
  const [loading, setLoading] = useState(false); // Estado para manejar el spinner
  const [error, setError] = useState(""); // Estado para manejar errores
  const navigate = useNavigate();

  //procedimiento para guardar el alumno
  const store = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await axios.post(URI, {
        nombres,
        apellido,
        dni,
        domicilio,
        grado,
        tutor,
        telefono,
        observaciones,
      });
      navigate("/Lista");
    } catch (error) {
      setError("Ocurrió un error al cargar el alumno. Inténtalo nuevamente.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDniChange = (e) => {
    const value = e.target.value;

    // Validación para que solo se acepten números y entre 7 y 8 dígitos
    if (/^\d{0,8}$/.test(value)) {
      setDni(value);
      setError(
        value.length >= 7 ? "" : "El DNI debe tener entre 7 y 8 dígitos"
      );
    }
  };

  const handleTelefonoChange = (e) => {
    const value = e.target.value;

    // Expresión regular para permitir solo dígitos y un máximo de 15 caracteres
    if (/^\d{0,15}$/.test(value)) {
      setTelefono(value);

      // Verificar si el número tiene entre 10 y 15 dígitos
      if (value.length >= 10 && value.length <= 15) {
        setError("");
      } else {
        setError("El número debe tener entre 10 y 15 dígitos.");
      }
    }
  };

  return (
    <div>
      <form method="post" className="form-register" onSubmit={store}>
        <h4 className="form-titulo">Carga de Alumno</h4>
        <div className="contenedor">
          <input
            type="text"
            name="nombres"
            id="nombres"
            placeholder="Nombres"
            required
            value={nombres}
            onChange={(e) => setNombres(e.target.value)}
          />
          <input
            type="text"
            name="apellido"
            id="apellido"
            placeholder="Apellido"
            required
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
          />
          <input
            type="text"
            id="dni"
            value={dni}
            onChange={handleDniChange}
            placeholder="Ingrese su DNI"
          />
          {error && <span style={{ color: "red" }}>{error}</span>}
          <input
            type="text"
            name="domicilio"
            id="domicilio"
            placeholder="Domicilio"
            value={domicilio}
            onChange={(e) => setDomicilio(e.target.value)}
          />

          <select onChange={(e) => setGrado(e.target.value)} required>
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

          <input
            type="text"
            id="tutor"
            name="tutor"
            placeholder="Tutor"
            required
            value={tutor}
            onChange={(e) => setTutor(e.target.value)}
          />
          <input
        type="text"
        id="telefono"
        value={telefono}
        onChange={handleTelefonoChange}
        placeholder="Ingrese su número de teléfono"
      />
      {error && <span style={{ color: "red" }}>{error}</span>}
          <input
            type="text"
            name="observaciones"
            id="observaciones"
            placeholder="Ingrese observaciones necesarias"
            value={observaciones}
            onChange={(e) => setObservaciones(e.target.value)}
          />

          {loading ? (
            <p>Cargando...</p> // Spinner mientras se envían los datos
          ) : (
            <input type="submit" value="Cargar" className="btn btn-enviar" />
          )}
          {error && <p className="error">{error}</p>}
        </div>
      </form>
    </div>
  );
};

export default CargaAlumno;
