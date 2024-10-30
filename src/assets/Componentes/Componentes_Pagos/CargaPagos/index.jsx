import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./index.css";

// Desarrollo local
/* const URI_ALUMNOS = "http://localhost:8000/students"; // Endpoint para obtener alumnos
const URI_PAGOS = "http://localhost:8000/invoices"; // Endpoint para registrar pagos */

const URI_ALUMNOS = "https://facturador-backend.onrender.com/students";
const URI_PAGOS = "https://facturador-backend.onrender.com/invoices";

const CargaPagos = () => {
  const [nombres, setNombres] = useState("");
  const [apellido, setApellido] = useState("");
  const [dni, setDni] = useState(""); // Aquí se guarda el DNI ingresado
  const [tipoPago, setTipoPago] = useState("");
  const [importe, setImporte] = useState("");
  const [numCuota, setNumCuota] = useState("");
  const [comprobante, setComprobante] = useState("");
  const [alumnos, setAlumnos] = useState([]); // Lista de alumnos
  const navigate = useNavigate();

  useEffect(() => {
    getAlumnos(); // Obtener la lista de alumnos al cargar el componente
  }, []);

  // Obtener alumnos desde el backend
  const getAlumnos = async () => {
    try {
      const res = await axios.get(URI_ALUMNOS);
      setAlumnos(res.data); // Guardar la lista de alumnos en el estado
    } catch (error) {
      console.error("Error al obtener los alumnos:", error);
    }
  };

  // Función para buscar un alumno por DNI
  const handleDniChange = (dniIngresado) => {
    setDni(dniIngresado);

    // Buscar el alumno en la lista basado en el DNI ingresado
    const alumnoSeleccionado = alumnos.find((alumno) => String(alumno.dni) === dniIngresado);

    // Autocompletar los campos de nombres y apellidos si el alumno es encontrado
    if (alumnoSeleccionado) {
      setNombres(alumnoSeleccionado.nombres);
      setApellido(alumnoSeleccionado.apellido);
    } else {
      setNombres("");
      setApellido("");
    }
  };

  // Validar importe
  const validateImporte = (value) => {
    const numberValue = parseFloat(value);
    return !isNaN(numberValue) && numberValue > 0; // Verifica que sea un número positivo
  };

  // Guardar el pago
  const store = async (e) => {
    e.preventDefault();

    // Validar el importe antes de enviar el formulario
    if (!validateImporte(importe)) {
      alert("El importe debe ser un número positivo.");
      return;
    }

    try {
      await axios.post(URI_PAGOS, {
        nombres: nombres,
        apellido: apellido,
        dni: dni, // Usar el DNI ingresado
        tipoPago: tipoPago,
        importe: importe,
        numCuota: numCuota,
        comprobante: comprobante
      });

      navigate("/ListaPagos");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div>
        <form onSubmit={store}>
          <h4 className="form-titulo">Carga de Pago de Cuotas</h4>

          {/* Dropdown para seleccionar un alumno por DNI */}
          <select
            name="dni"
            value={dni}
            onChange={(e) => handleDniChange(e.target.value)} // Manejar la selección del alumno
            required
          >
            <option value="">Seleccione un alumno por DNI</option>
            {alumnos.map((alumno) => (
              <option key={alumno.dni} value={alumno.dni}>
                {alumno.nombres} {alumno.apellido} - DNI: {alumno.dni}
              </option>
            ))}
          </select>

          {/* Nombres y apellidos autocompletados */}
          <input
            type="text"
            name="nombres"
            placeholder="Nombres"
            value={nombres}
            readOnly
            disabled
          />
          <input
            type="text"
            name="apellido"
            placeholder="Apellido"
            value={apellido}
            readOnly
            disabled
          />

          {/* Selección de tipo de pago */}
          <select
            name="tipoPago"
            value={tipoPago}
            onChange={(e) => setTipoPago(e.target.value)}
            required
          >
            <option value="">Seleccione una opción</option>
            <option value="Transferencia">Transferencia</option>
            <option value="Efectivo">Efectivo</option>
            <option value="Tarjeta de Crédito/Débito">Tarjeta de Crédito/Débito</option>
          </select>

          {/* Importe y número de cuota */}
          <input
            type="number"
            name="importe"
            placeholder="Ingrese el Importe"
            value={importe}
            onChange={(e) => setImporte(e.target.value)}
            required
          />

          <select
            name="numCuota"
            value={numCuota}
            onChange={(e) => setNumCuota(e.target.value)}
          >
            <option value="">Seleccione la Cuota</option>
            {[...Array(12).keys()].map((cuota) => (
              <option key={cuota + 1} value={cuota + 1}>
                {cuota + 1}
              </option>
            ))}
          </select>
          <input type="text "
            value={comprobante}
            onChange={(e)=> setComprobante(e.target.value)}
          />

          <input type="submit" className="btn" value="Guardar" />
        </form>
      </div>
    </>
  );
};

export default CargaPagos;
