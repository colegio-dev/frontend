
import { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";

// Desarrollo local
/* const URI = "http://localhost:8000/invoices/"; */

const URI = "https://facturador-backend.onrender.com/invoices/";


// eslint-disable-next-line react/prop-types
const ListaPagos = ({ user }) => {
  const [pagos, setPagos] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    getPagos();
  }, []);

  // Obtener pagos desde el backend
  const getPagos = async () => {
    try {
      const res = await axios.get(URI);
      console.log("Respuesta del servidor:", res.data); // Log de la respuesta
      if (Array.isArray(res.data)) {
        setPagos(res.data);
      } else if (res.data && res.data.results) {
        setPagos(res.data.results); // Ajusta esto según la estructura de tu respuesta
      } else {
        console.error("Error: La respuesta no es un array ni contiene los datos esperados");
      }
    } catch (error) {
      console.error("Error al obtener pagos", error);
    }
  };

  // Eliminar un pago por ID
  const deletePagos = async (id) => {
    if (!id) {
      console.error("ID inválido:", id);
      return;
    }
    const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este pago?");
    if (confirmDelete) {
      try {
        console.log("Intentando eliminar el pago con ID:", id); // Log para confirmar el ID
        const res = await axios.delete(`${URI}${id}`);
        if (res.status === 200) {
          console.log("Pago eliminado con éxito");
          getPagos();
        } else {
          console.error("Error al eliminar pago: ", res.status, res.statusText);
        }
      } catch (error) {
        console.error("Error al eliminar pago", error);
      }
    }
  };

  // Filtrar los pagos por DNI
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  // Filtrar pagos por el DNI ingresado
  const filteredPagos = pagos.filter(
    (pago) => pago.dni && String(pago.dni).includes(filter) // Convertir DNI a string y verificar que no sea null/undefined
  );

  return (
    <>
      <h2>Lista de Pagos</h2>
      <div>
        <input
          type="text"
          placeholder="Filtrar por DNI"
          value={filter}
          onChange={handleFilterChange}
        />
      </div>
      <div className="container-cards">
        <div className="cards">
          {filteredPagos.length > 0 ? (
            filteredPagos.map((pago, index) => (
              <div key={pago.id || `${pago.dni}-${index}`} id="card">
                <div className="headerCard">
                  <p>Id: {pago.id}</p>
                  <p>Nombres: {pago.nombres}</p>
                  <p>Apellido: {pago.apellido}</p>
                  <p>DNI: {pago.dni}</p>
                  <p>Tipo de Pago: {pago.tipoPago}</p>
                  <p>Importe Abonado: {pago.importe}</p>
                  <p>Número de Cuota: {pago.numCuota}</p>
                </div>
                {user === 1 && (
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      console.log("ID del pago a eliminar:", pago.id); // Log del id del pago que se va a eliminar
                      deletePagos(pago.id);
                    }}
                  >
                    <i className="fas fa-trash-alt"></i>
                  </button>
                )}
                <hr />
              </div>
            ))
          ) : (
            <p>No se encontraron pagos para el DNI ingresado.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default ListaPagos;

