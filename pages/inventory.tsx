import React, { useEffect, useState } from 'react';
import InventoryTable from '../components/inventory/InventoryTable';
import axios from 'axios';
import Alerts from '../components/inventory/Alerts';
import Modal from 'react-modal';
import InventoryForm from '../components/inventory/InventoryForm'; // Asegúrate de tener este componente
import Navbar from '../components/dashboard/Navbar';

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

const Inventory: React.FC = () => {
    const [products, setProducts] = useState<any[]>([]);
    const [lowStockProducts, setLowStockProducts] = useState<any[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
    const [notification, setNotification] = useState<{ message: string, type: 'success' | 'error' | null }>({ message: '', type: null });
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false); // Estado para controlar el modal de creación
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false); // Estado para controlar el modal de actualización

    useEffect(() => {
        axios.get('http://localhost:3000/producto')
            .then((response) => {
                setProducts(response.data);
                checkLowStock(response.data);
            })
            .catch((error) => console.error('Error al obtener productos:', error));
    }, []);

    const checkLowStock = (products: any[]) => {
        const lowStock = products.filter(product => product.stock < 10);
        setLowStockProducts(lowStock);
    };

    const handleSelectProduct = (product: any) => {
        setSelectedProduct(product);
        setNotification({ message: '', type: null }); // Limpiar notificación al seleccionar un producto
    };

    const handleCreateInventory = () => {
        if (!selectedProduct) return;

        const newInventory = {
            id_empresa: selectedProduct.id_empresa,
            fecha_actualizacion: formatDateForMySQL(new Date()), // Usar la función para formatear la fecha
        };

        axios.post('http://localhost:3000/inventario', newInventory)
            .then((response) => {
                setNotification({ message: 'Inventario creado exitosamente!', type: 'success' });
                setSelectedProduct(null);
                setIsCreateModalOpen(false);
            })
            .catch((error) => {
                console.error('Error al crear inventario:', error);
                setNotification({ message: 'Hubo un error al crear el inventario.', type: 'error' });
            });
    };

    const handleUpdateInventory = () => {
        if (!selectedProduct) return;

        const updatedInventory = {
            fecha_actualizacion: formatDateForMySQL(new Date()), // Usar la función para formatear la fecha
        };

        axios.put(`http://localhost:3000/inventario/${selectedProduct.id_producto}`, updatedInventory)
            .then((response) => {
                setNotification({ message: 'Inventario actualizado exitosamente!', type: 'success' });
                setSelectedProduct(null);
                setIsUpdateModalOpen(false);
            })
            .catch((error) => {
                console.error('Error al actualizar inventario:', error);
                setNotification({ message: 'Hubo un error al actualizar el inventario.', type: 'error' });
            });
    };

    return (
        <div className="container is-fluid" style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem', backgroundColor: '#F5F7FA', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
            <Navbar />
            <h1 className="title is-3 has-text-centered" style={{ color: '#4A90E2' }}>Gestión de Inventario</h1>

            {/* Componente de Alertas de Stock Bajo */}
            <Alerts lowStockProducts={lowStockProducts} />

            {/* Notificación */}
            {notification.message && (
                <div className={`notification ${notification.type === 'success' ? 'is-success' : 'is-danger'}`}>
                    {notification.message}
                </div>
            )}

            {/* Pasa la función onSelectProduct como prop */}
            <InventoryTable products={products} onSelectProduct={handleSelectProduct} />

            {/* Mostrar botones solo cuando un producto está seleccionado */}
            {selectedProduct && (
                <div className="mt-6">
                    <h2 className="title is-4" style={{ color: '#4A90E2' }}>Gestionar Inventario para {selectedProduct.nombre}</h2>
                    <div className="buttons">
                        <button
                            className="button is-success"
                            onClick={() => { setIsCreateModalOpen(true); }} // Abrir modal para crear inventario
                        >
                            Crear Inventario
                        </button>
                        <button
                            className="button is-info"
                            onClick={() => { setIsUpdateModalOpen(true); }} // Abrir modal para actualizar inventario
                        >
                            Actualizar Inventario
                        </button>
                    </div>
                </div>
            )}

            {/* Modal para crear inventario */}
            <Modal isOpen={isCreateModalOpen} onRequestClose={() => setIsCreateModalOpen(false)} className="modal-content" overlayClassName="modal-overlay">
                <div className="box" style={{ borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                    <h2 className="title is-4" style={{ color: '#4A90E2' }}>Agregar Inventario</h2>
                    <InventoryForm 
                        onSubmit={handleCreateInventory} 
                        initialProduct={null} // No hay producto inicial para crear
                    />
                    <button className="button is-light mt-2" onClick={() => setIsCreateModalOpen(false)}>Cancelar</button>
                </div>
            </Modal>

            {/* Modal para actualizar inventario */}
            <Modal isOpen={isUpdateModalOpen} onRequestClose={() => setIsUpdateModalOpen(false)} className="modal-content" overlayClassName="modal-overlay">
                <div className="box" style={{ borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                    <h2 className="title is-4" style={{ color: '#4A90E2' }}>Gestionar Inventario</h2>
                    <InventoryForm 
                        onSubmit={handleUpdateInventory} 
                        initialProduct={selectedProduct} // Pasar el producto seleccionado para editar
                    />
                    <button className="button is-light mt-2" onClick={() => setIsUpdateModalOpen(false)}>Cancelar</button>
                </div>
            </Modal>
        </div>
    );
};

export default Inventory;