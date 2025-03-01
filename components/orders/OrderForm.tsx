import React, { useState } from 'react';

// Función para formatear la fecha para MySQL
const formatDateForMySQL = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Meses son 0-indexed
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

const FormularioPedido: React.FC<{ onSubmit: (idProveedor: number, montoTotal: number, fechaEntrega?: string, estado?: string) => void }> = ({ onSubmit }) => {
    const [idProveedor, setIdProveedor] = useState<number>(0);
    const [montoTotal, setMontoTotal] = useState<number>(0);
    const [fechaEntrega, setFechaEntrega] = useState<string>('');
    const [estado, setEstado] = useState<'Pendiente' | 'Entregado' | 'Cancelado'>('Pendiente');

    const manejarEnvio = (e: React.FormEvent) => {
        e.preventDefault();
        // Formatear la fecha antes de enviarla
        const formattedFechaEntrega = fechaEntrega ? formatDateForMySQL(new Date(fechaEntrega)) : undefined;
        onSubmit(idProveedor, montoTotal, formattedFechaEntrega, estado);
        // Limpiar los campos del formulario
        setIdProveedor(0);
        setMontoTotal(0);
        setFechaEntrega('');
        setEstado('Pendiente');
    };

    return (
        <form onSubmit={manejarEnvio} className="mb-4">
            <h2 className="title is-4" style={{ color: '#4A90E2', marginBottom: '1rem' }}>Crear Pedido</h2>
            <div className="field">
                <label className="label">ID del Proveedor</label>
                <div className="control">
                    <input
                        type="number"
                        value={idProveedor}
                        onChange={(e) => setIdProveedor(Number(e.target.value))}
                        placeholder="ID del Proveedor"
                        required
                        className="input"
                    />
                </div>
            </div>
            <div className="field">
                <label className="label">Monto Total</label>
                <div className="control">
                    <input
                        type="number"
                        value={montoTotal}
                        onChange={(e) => setMontoTotal(Number(e.target.value))}
                        placeholder="Monto Total"
                        required
                        className="input"
                    />
                </div>
            </div>
            <div className="field">
                <label className="label">Fecha de Entrega</label>
                <div className="control">
                    <input
                        type="date"
                        value={fechaEntrega}
                        onChange={(e) => setFechaEntrega(e.target.value)}
                        className="input"
                    />
                </div>
            </div>
            <div className="field">
                <label className="label">Estado</label>
                <div className="control">
                    <div className="select">
                        <select value={estado} onChange={(e) => setEstado(e.target.value as 'Pendiente' | 'Entregado' | 'Cancelado')}>
                            <option value="Pendiente">Pendiente</option>
                            <option value="Entregado">Entregado</option>
                            <option value="Cancelado">Cancelado</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="field">
                <div className="control">
                    <button type="submit" className="button is-primary">
                        Crear Pedido
                    </button>
                </div>
            </div>
        </form>
    );
};

export default FormularioPedido;