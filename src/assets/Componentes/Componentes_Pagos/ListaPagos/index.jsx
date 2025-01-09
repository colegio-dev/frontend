import { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";

//const URI = "http://localhost:8000/students/";

const URI = "https://backend-9rzw.onrender.com/students"

// eslint-disable-next-line react/prop-types
const ListaPagos = () => {
  const [pagos, setPagos] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    getPagos();
  }, []);

  const getPagos = async () => {
    try {
      const res = await axios.get(URI);
      if (Array.isArray(res.data)) {
        setPagos(res.data);
      } else {
        console.error("Error: La respuesta no es un array");
      }
    } catch (error) {
      console.error("Error al obtener pagos", error);
    }
  };


  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredPagos = pagos.filter(
    (pago) =>
      pago.apellidoAlumno &&
      pago.apellidoAlumno.toLowerCase().includes(filter.toLowerCase())
  );
  
  return (
    <>
      <h2>Lista de Pagos</h2>
      <div>
        <input
          type="text"
          placeholder="Filtrar por Apellido"
          value={filter}
          onChange={handleFilterChange}
        />
      </div>
      {/* Presentacion en tablas */}
      <table className="table-responsive">
        <thead>
          <tr>
            <th>Nombres</th>
            <th>Apellido</th>
            <th>DNI</th>
            <th>Cuotas Pagadas</th>
            <th>Cuotas Restantes</th>
            <th>Ultimo Importe<br /> Ingresado</th>
            <th>Ultimo N°<br /> Comprobante</th>
            <th>Forma de Pago</th>
            <th>Importe Restante</th>
          </tr>
        </thead>
        <tbody>
          {filteredPagos.length > 0 ? (
          filteredPagos.map((pago,index) => (
            <tr key={pago.id || `${pago.apellidoAlumno}-${index}`}>
              <td className="nombres">{pago.nombreAlumno}</td>
              <td className="apellido">{pago.apellidoAlumno}</td>
              <td className="dni">{pago.dniAlumno}</td>
              <td className="cuotasPagadas">{pago.cuotasPagadas}</td>
              <td className="cuotasRestantes">{pago.totalCuotas-pago.cuotasPagadas}</td>
              <td className="ultimoImporte">$ {pago.importe}</td>
              <td>{pago.comprobante}</td>
              <td>{pago.tipoPago}</td>
              <td className="importe">$ {pago.montoPorCuota}</td>
            </tr>
          )))
          : (
            <p>No se encontraron pagos para el apellido ingresado.</p>
          )}
          
        </tbody>
      </table>
      {/* presentacion en cards */}

      {/* <div className="container-cards">
        <div className="cards">
          {filteredPagos.length > 0 ? (
            filteredPagos.map((pago, index) => (
              <div key={pago.id || `${pago.apellidoAlumno}-${index}`} id="card">
                <div className="headerCard">
                  <p>Nombres: {pago.nombreAlumno}</p>
                  <p>Apellido: {pago.apellidoAlumno}</p>
                  <p>DNI: {pago.dniAlumno}</p>
                  <p>Cuotas Pagadas: {pago.cuotasPagadas}</p>
                  <p>Importe Restante: ${pago.montoPorCuota}</p>
                  <p>Cuotas Restantes: {pago.totalCuotas-pago.cuotasPagadas}</p>
                  <p>Ultimo Importe ingresado: ${pago.importe}</p>
                  
                </div>
                <hr />
              </div>
            ))
          ) : (
            <p>No se encontraron pagos para el apellido ingresado.</p>
          )}
        </div>
      </div> */}
    </>
  );
};

export default ListaPagos;
