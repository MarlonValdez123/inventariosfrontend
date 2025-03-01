import React, { useState, useEffect } from 'react';
import axios from 'axios';
import OrderForm from '../components/orders/OrderForm';
import OrderList from '../components/orders/OrderList';
import SupplierList from '../components/orders/SupplierList';
import Modal from 'react-modal';
import Navbar from '../components/dashboard/Navbar';

const OrdersPage: React.FC = () => {
    const [orders, setOrders] = useState<any[]>([]);  // Estado para los pedidos
    const [suppliers, setSuppliers] = useState<any[]>([]);  // Estado para los proveedores
    const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar el modal

    // Obtener los proveedores desde la API
    useEffect(() => {
        const fetchSuppliers = async () => {
            try {
                const response = await axios.get('http://localhost:3000/proveedor');
                setSuppliers(response.data);  // Guardar los proveedores en el estado
            } catch (error) {
                console.error('Error al obtener los proveedores:', error);
            }
        };

        fetchSuppliers();
    }, []);

    // Obtener los pedidos desde la API
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://localhost:3000/pedido');
                setOrders(response.data);  // Guardar los pedidos en el estado
            } catch (error) {
                console.error('Error al obtener los pedidos:', error);
            }
        };

        fetchOrders();
    }, []);

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

    // Manejar el envío de un nuevo pedido
    const handleCreateOrder = async (totalAmount: number) => {
        try {
            const newOrder = {
                id_empresa: 1,  // Suponiendo que la empresa es la misma
                fecha_entrega: formatDateForMySQL(new Date()), // Formato correcto para MySQL
                estado: 'Pendiente'  // Estado inicial
            };

            // Crear el pedido en la API
            const response = await axios.post('http://localhost:3000/pedido', newOrder);

            // Actualizar la lista de pedidos después de crear el nuevo
            setOrders([...orders, response.data]);
            setIsModalOpen(false); // Cerrar el modal después de crear el pedido
        } catch (error) {
            console.error('Error al crear el pedido:', error);
        }
    };

    return (
        <div>
            <Navbar /> {/* Coloca la barra de navegación aquí */}
            <div className="container is-fluid" style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem', backgroundColor: '#F5F7FA', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                <h1 className="title is-3 has-text-centered" style={{ color: '#4A90E2' }}>Gestión de Pedidos</h1>

                {/* Botón para abrir el modal de creación de pedido */}
                <button className="button is-primary mb-4" onClick={() => setIsModalOpen(true)}>
                    Crear Nuevo Pedido
                </button>

                {/* Formulario para crear un nuevo pedido en un modal */}
                <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} className="modal-content" overlayClassName="modal-overlay">
                    <div className="box" style={{ borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                        <h2 className="title is-4" style={{ color: '#4A90E2' }}>Crear Nuevo Pedido</h2>
                        <OrderForm onSubmit={handleCreateOrder} />
                        <button className="button is-light mt-2" onClick={() => setIsModalOpen(false)}>Cancelar</button>
                    </div>
                </Modal>

                {/* Lista de proveedores */}
                <SupplierList suppliers={suppliers} />

                {/* Lista de pedidos */}
                <OrderList orders={orders} />
            </div>
        </div>
    );
};

export default OrdersPage;