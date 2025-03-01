import React, { useEffect, useState } from 'react';
import axios from 'axios';
import OrderList from './OrderList'; // Asegúrate de que la ruta sea correcta

const OrdersContainer: React.FC = () => {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://localhost:3000/pedido');
                setOrders(response.data);
            } catch (err) {
                setError('Error al obtener los pedidos');
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) {
        return <div>Cargando pedidos...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return <OrderList orders={orders} />;
};

export default OrdersContainer;