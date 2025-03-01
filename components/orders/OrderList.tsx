import React from 'react';

const OrderList: React.FC<{ orders: any[] }> = ({ orders }) => {
    return (
        <div className="overflow-x-auto">
            <h2 className="title is-4" style={{ color: '#4A90E2', marginBottom: '1rem' }}>Lista de Pedidos</h2>
            <table className="table is-striped is-fullwidth" style={{ backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                <thead>
                    <tr>
                        <th className="has-text-centered">ID del Pedido</th>
                        <th className="has-text-centered">Proveedor</th>
                        <th className="has-text-centered">Monto Total</th>
                        <th className="has-text-centered">Fecha</th>
                        <th className="has-text-centered">Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.length > 0 ? (
                        orders.map((order) => (
                            <tr key={order.id}> {/* Asegúrate de que 'id' sea único */}
                                <td className="border-b p-2">{order.id}</td>
                                <td className="border-b p-2">{order.supplierName}</td>
                                <td className="border-b p-2">{order.totalAmount}</td>
                                <td className="border-b p-2">{new Date(order.fecha_solicitud).toLocaleString()}</td>
                                <td className="border-b p-2">{order.estado}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={5} className="border-b p-2 text-center">No hay pedidos disponibles</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default OrderList;