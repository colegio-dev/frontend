import "./index.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

/* const URI = "http://localhost:8000/students/"; */

const URI = "https://facturador-backend.onrender.com/students";

const CargaAlumno = () => {
  const [nombreAlumno, setNombreAlumno] = useState("");
  const [apellidoAlumno, setApellidoalumno] = useState("");
  const [dniAlumno, setDniAlumno] = useState("");
  const [fechaNac, setFechaNac] = useState("");
  const [domicilio, setDomicilio] = useState("");
  const [grado, setGrado] = useState("");
  const [nombrePadre, setNombrePadre] = useState("");
  const [dniPadre, setDniPadre] = useState("");
  const [telefonoPadre, setTelefonoPadre] = useState("");
  const [nombreMadre, setNombreMadre] = useState("");
  const [dniMadre, setDniMadre] = useState("");
  const [telefonoMadre, setTelefonoMadre] = useState("");
  const [observaciones, setObservaciones] = useState("");
  const [loading, setLoading] = useState(false);

  // Estados de error separados
  const [errorDniAlumno, setErrorDniAlumno] = useState("");
  const [errorDniPadre, setErrorDniPadre] = useState("");
  const [errorDniMadre, setErrorDniMadre] = useState("");
  const [errorTelefonoPadre, setErrorTelefonoPadre] = useState("");
  const [errorTelefonoMadre, setErrorTelefonoMadre] = useState("");
  const [generalError, setGeneralError] = useState("");

  const [existingAlumnoId, setExistingAlumnoId] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const fetchAlumno = async () => {
        const response = await axios.get(`${URI}${id}`);
        const alumno = response.data;
        setNombreAlumno(alumno.nombreAlumno);
        setApellidoalumno(alumno.apellidoAlumno);
        setDniAlumno(alumno.dniAlumno);
        setFechaNac(alumno.fechaNac);
        setDomicilio(alumno.domicilio);
        setGrado(alumno.grado);
        setNombrePadre(alumno.nombrePadre);
        setDniPadre(alumno.dniPadre);
        setTelefonoPadre(alumno.telefonoPadre);
        setNombreMadre(alumno.nombreMadre);
        setDniMadre(alumno.dniMadre);
        setTelefonoMadre(alumno.telefonoMadre);
        setObservaciones(alumno.observaciones);
        setExistingAlumnoId(alumno.id);
      };
      fetchAlumno();
    }
  }, [id]);

  const store = async (e) => {
    e.preventDefault();
    setLoading(true);
    setGeneralError("");

    try {

      const data = {
        nombreAlumno,
        apellidoAlumno,
        dniAlumno,
        fechaNac,
        domicilio,
        grado,
        nombrePadre,
        dniPadre,
        telefonoPadre,
        nombreMadre,
        dniMadre,
        telefonoMadre,
        observaciones,
      };

      if (existingAlumnoId) {
        await axios.put(`${URI}${existingAlumnoId}`, data);
      } else {
        await axios.post(URI, data);
      }

      navigate("/Lista");
    } catch (error) {
      setGeneralError("Ocurrió un error al cargar el alumno. Inténtalo nuevamente.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDniChangeAlumno = (e) => {
    const value = e.target.value;
    if (/^\d{0,8}$/.test(value)) {
      setDniAlumno(value);
      setErrorDniAlumno(value.length >= 7 ? "" : "El DNI debe tener entre 7 y 8 dígitos");
    }
  };
  
  const handleDniChangePadre = (e) => {
    const value = e.target.value;
    if (/^\d{0,8}$/.test(value)) {
      setDniPadre(value);
      setErrorDniPadre(value.length >= 7 ? "" : "El DNI debe tener entre 7 y 8 dígitos");
    }
  };
  
  const handleDniChangeMadre = (e) => {
    const value = e.target.value;
    if (/^\d{0,8}$/.test(value)) {
      setDniMadre(value);
      setErrorDniMadre(value.length >= 7 ? "" : "El DNI debe tener entre 7 y 8 dígitos");
    }
  };
  
  const handleTelefonoChangePadre = (e) => {
    const value = e.target.value;
    if (/^\d{0,15}$/.test(value)) {
      setTelefonoPadre(value);
      setErrorTelefonoPadre(value.length >= 10 && value.length <= 15 ? "" : "El número debe tener entre 10 y 15 dígitos.");
    }
  };

  const handleTelefonoChangeMadre = (e) => {
    const value = e.target.value;
    if (/^\d{0,15}$/.test(value)) {
      setTelefonoMadre(value);
      setErrorTelefonoMadre(value.length >= 10 && value.length <= 15 ? "" : "El número debe tener entre 10 y 15 dígitos.");
    }
  };

  return (
    <div>
      <form method="post" className="form-register" onSubmit={store}>
        <h4 className="form-titulo">Carga de Alumno</h4>
        <div className="contenedor-carga">
          <input
            type="text"
            name="nombres"
            id="nombres"
            placeholder="Nombres"
            required
            value={nombreAlumno}
            onChange={(e) => setNombreAlumno(e.target.value)}
          />
          <input
            type="text"
            name="apellido"
            id="apellido"
            placeholder="Apellido"
            required
            value={apellidoAlumno}
            onChange={(e) => setApellidoalumno(e.target.value)}
          />
          <input
            type="text"
            id="dniAlumno"
            value={dniAlumno}
            onChange={handleDniChangeAlumno}
            placeholder="Ingrese su DNI"
          />
          {errorDniAlumno && <span style={{ color: "red" }}>{errorDniAlumno}</span>}
          <input 
          type="date" 
          name="fechaNac" 
          placeholder="Fecha de Nacimiento"
          value={fechaNac}
          onChange={(e)=>setFechaNac(e.target.value)}
          />
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
            name="nombrePadre"
            placeholder="Nombre completo del padre"
            required
            value={nombrePadre}
            onChange={(e) => setNombrePadre(e.target.value)}
          />
          <input
            type="text"
            id="dni"
            value={dniPadre}
            onChange={handleDniChangePadre}
            placeholder="Ingrese su DNI"
          />
          {errorDniPadre && <span style={{ color: "red" }}>{errorDniPadre}</span>}
          <input
        type="text"
        id="telefono"
        value={telefonoPadre}
        onChange={handleTelefonoChangePadre}
        placeholder="Ingrese su número de teléfono"
      />
      {errorTelefonoPadre && <span style={{ color: "red" }}>{errorTelefonoPadre}</span>}
      <input
            type="text"
            name="nombreMadre"
            placeholder="Nombre completo de la madre"
            required
            value={nombreMadre}
            onChange={(e) => setNombreMadre(e.target.value)}
          />
          <input
            type="text"
            id="dni"
            value={dniMadre}
            onChange={handleDniChangeMadre}
            placeholder="Ingrese su DNI"
          />
          {errorDniMadre && <span style={{ color: "red" }}>{errorDniMadre}</span>}
          <input
        type="text"
        id="telefono"
        value={telefonoMadre}
        onChange={handleTelefonoChangeMadre}
        placeholder="Ingrese su número de teléfono"
      />
      {errorTelefonoMadre && <span style={{ color: "red" }}>{errorTelefonoMadre}</span>}
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
          {generalError && <p style={{ color: "red" }}>{generalError}</p>}
        </div>
      </form>
    </div>
  );
};

export default CargaAlumno;
