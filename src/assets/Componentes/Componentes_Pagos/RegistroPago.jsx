import axios from 'axios';
import { useState } from 'react';

const RegistroPago = () => {
    const [idCliente, setIdCliente] = useState('');
    const [montoPago, setMontoPago] = useState('');
    const [fechaPago, setFechaPago] = useState('');
    const [mensaje, setMensaje] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/pagos', {
                id_cliente: idCliente,
                monto_pago: montoPago,
                fecha_pago: fechaPago
            });
            setMensaje(response.data.mensaje);
        } catch (error) {
            setMensaje(error.response?.data?.mensaje || 'Error al registrar el pago');
        }
    };

    return (
        <div>
            <h2>Registrar Pago</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type='number'
                    placeholder='Id Cliente'
                    value={idCliente}
                    onChange={(e) => setIdCliente(e.target.value)}
                    required
                />
                <input
                    type='number'
                    placeholder='Monto de Pago'
                    value={montoPago}
                    onChange={(e) => setMontoPago(e.target.value)}
                    required
                />
                <input
                    type='date'
                    value={fechaPago}
                    onChange={(e) => setFechaPago(e.target.value)}
                    required
                />
                <button type="submit">Registrar Pago</button>
            </form>
            {mensaje && <p>{mensaje}</p>}
        </div>
    );
};

export default RegistroPago;
