

import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./index.css";

//const URI_ALUMNOS = "http://localhost:8000/students";

const URI_ALUMNOS = "https://backend-9rzw.onrender.com/students"

const CargaPagos = () => {
  const [nombreAlumno, setNombreAlumno] = useState("");
  const [apellidoAlumno, setApellidoAlumno] = useState("");
  const [dniAlumno, setDniAlumno] = useState("");
  const [tipoPago, setTipoPago] = useState("");
  const [importe, setImporte] = useState("");
  const [comprobante, setComprobante] = useState("");
  const [alumnos, setAlumnos] = useState([]);
  const [cuotasRestantes, setCuotasRestantes] = useState("");
  const [montoPorCuota, setMontoPorCuota] = useState("");
  const [cuotasPagadas, setCuotasPagadas] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [totalCuotas, setTotalCuotas] = useState("");
  const [idAlumno, setIdAlumno] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    getAlumnos();
  }, []);

  const getAlumnos = async () => {
    try {
      const res = await axios.get(URI_ALUMNOS);
      setAlumnos(res.data);
    } catch (error) {
      console.error("Error al obtener los alumnos:", error);
    }
  };

  const handleDniChange = async (dniIngresado) => {
    setDniAlumno(dniIngresado);
    const alumnoSeleccionado = alumnos.find(
      (alumno) => String(alumno.dniAlumno) === dniIngresado
    );

    if (alumnoSeleccionado) {
      setNombreAlumno(alumnoSeleccionado.nombreAlumno);
      setApellidoAlumno(alumnoSeleccionado.apellidoAlumno);
      setCuotasRestantes(alumnoSeleccionado.totalCuotas - alumnoSeleccionado.cuotasPagadas);
      setMontoPorCuota(alumnoSeleccionado.montoPorCuota);
      setCuotasPagadas(alumnoSeleccionado.cuotasPagadas);
      setIdAlumno(alumnoSeleccionado.id);
    } else {
      setNombreAlumno("");
      setApellidoAlumno("");
      setCuotasRestantes(0);
      setMontoPorCuota(0);
      setCuotasPagadas(0);
      setTotalCuotas(0);
      setIdAlumno("");
    }
  };

  const handleImporteChange = (e) => {
    let valorIngresado = parseFloat(e.target.value);

    // Asegurarse de que el valor sea un número positivo
    if (isNaN(valorIngresado) || valorIngresado <= 0) {
      setImporte("");
      return;
    }

    // Restringir el importe al monto pendiente
    if (valorIngresado > montoPorCuota) {
      alert(`El importe no puede exceder el monto pendiente (${montoPorCuota}).`);
      setImporte(montoPorCuota);
    } else {
      setImporte(valorIngresado);
    }
  };

  
  const store = async (e) => {
    e.preventDefault();
  
    if (!dniAlumno || !nombreAlumno || !apellidoAlumno || !idAlumno) {
      alert("Debe seleccionar un alumno válido.");
      return;
    }
  
    try {
      const response = await axios.put(`${URI_ALUMNOS}/${idAlumno}`, { 
        importe, 
        comprobante, 
        tipoPago
      });
  
      if (response.data && response.data.updatedStudent) {
        const updatedStudent = response.data.updatedStudent;
        setCuotasRestantes(updatedStudent.cuotasRestantes);
        setCuotasPagadas(updatedStudent.cuotasPagadas);
        setMontoPorCuota(updatedStudent.montoPorCuota);
        setTotalCuotas(updatedStudent.totalCuotas);
        alert("Pago registrado correctamente.");
        navigate("/ListaPagos");
      } else {
        throw new Error("Respuesta inesperada del servidor.");
      }
    } catch (error) {
      console.error("Error al actualizar el pago:", error.response || error);
      alert("Hubo un error al registrar el pago. Verifique la conexión y los datos.");
    }
  };
  
  return (
    <div>
      <form onSubmit={store}>
        <h4 className="form-titulo">Carga de Pago de Cuotas</h4>
        <select
          name="dniAlumno"
          value={dniAlumno}
          onChange={(e) => handleDniChange(e.target.value)}
          required
        >
          <option value="">Seleccione un alumno por DNI</option>
          {alumnos.map((alumno) => (
            <option key={alumno.dniAlumno} value={alumno.dniAlumno}>
              {alumno.nombreAlumno} {alumno.apellidoAlumno} - DNI: {alumno.dniAlumno}
            </option>
          ))}
        </select>
          
        <input type="text" name="nombreAlumno" value={nombreAlumno} placeholder="Nombre del Alumno" readOnly disabled />
        <input type="text" name="apellidoAlumno" value={apellidoAlumno} placeholder="Apellido del Alumno" readOnly disabled />
        <input type="number" name="cuotasPagadas" value={cuotasPagadas} placeholder="Cantidad de cuotas pagadas" readOnly disabled />
        <input type="number" name="cuotasRestantes" value={cuotasRestantes} placeholder="Cantidad de cuotas de restantes" readOnly disabled />
        <input type="number" name="montoPendiente" value={montoPorCuota} placeholder="Monto pendiente de abonar" readOnly disabled />

        <p>Forma de Pago</p>
        <select
          name="tipoPago"
          value={tipoPago}
          onChange={(e) => setTipoPago(e.target.value)}
          required
        >
          <option value="">Seleccione una opción de pago</option>
          <option value="Transferencia">Transferencia</option>
          <option value="Efectivo">Efectivo</option>
          <option value="Tarjeta de Crédito/Débito">Tarjeta de Crédito/Débito</option>
        </select>

        <input
          type="number"
          name="importe"
          placeholder="Ingrese el Importe"
          value={importe}
          onChange={handleImporteChange}
          required
        />

        <input
          type="text"
          placeholder="Numero de comprobante"
          value={comprobante}
          onChange={(e) => setComprobante(e.target.value)}
        />
        <input type="submit" className="btn" value="Guardar" />
      </form>
    </div>
  );
};

export default CargaPagos;


