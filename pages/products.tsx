import React, { useEffect, useState } from 'react';
import ProductForm from '../components/products/ProductForm';
import Modal from 'react-modal';
import Navbar from '../components/dashboard/Navbar';

export interface Producto {
    id_producto?: number;
    codigo_barras: string;
    nombre: string;
    descripcion?: string;
    id_categoria?: number;
    precio_compra: number;
    precio_venta: number;
    stock_minimo: number;
    stock_maximo: number;
    id_empresa?: number;
    id_proveedor?: number;
    fecha_creacion?: Date;
    ultima_actualizacion?: Date;
}

const API_URL = 'http://localhost:3000/producto';

const Productos: React.FC = () => {
    const [productos, setProductos] = useState<Producto[]>([]);
    const [productoEditando, setProductoEditando] = useState<Producto | null>(null);
    const [cargando, setCargando] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        Modal.setAppElement('#__next'); // Usamos #__next en Next.js
    }, []);

    const obtenerProductos = async () => {
        setCargando(true);
        try {
            const respuesta = await fetch(API_URL);
            if (!respuesta.ok) throw new Error('Error al obtener productos');
            const data: Producto[] = await respuesta.json();
            setProductos(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error desconocido');
        } finally {
            setCargando(false);
        }
    };

    useEffect(() => {
        obtenerProductos();
    }, []);

    const manejarEnvioProducto = async (producto: Producto) => {
        try {
            const metodo = producto.id_producto ? 'PUT' : 'POST';
            const url = producto.id_producto ? `${API_URL}/${producto.id_producto}` : API_URL;

            const respuesta = await fetch(url, {
                method: metodo,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(producto),
            });

            if (!respuesta.ok) throw new Error(`Error al ${producto.id_producto ? 'actualizar' : 'agregar'} producto`);

            const responseBody = await respuesta.json();

            if (producto.id_producto) {
                setProductos(productos.map((p) => (p.id_producto === responseBody.id_producto ? responseBody : p)));
            } else {
                setProductos([...productos, responseBody]);
            }

            setProductoEditando(null);
            setIsModalOpen(false);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error desconocido');
        }
    };

    const manejarEditarProducto = (producto: Producto) => {
        setProductoEditando(producto);
        setIsModalOpen(true);
    };

    const manejarEliminarProducto = async (id_producto: number) => {
        if (!window.confirm('¿Seguro que deseas eliminar este producto?')) return;

        try {
            const respuesta = await fetch(`${API_URL}/${id_producto}`, { method: 'DELETE' });
            if (!respuesta.ok) throw new Error('Error al eliminar producto');
            setProductos(productos.filter((p) => p.id_producto !== id_producto));
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error desconocido');
        }
    };

    return (
        <div className="container is-fluid" style={{ padding: '2rem', backgroundColor: '#F5F7FA' }}>
            <Navbar />
            <h1 className="title is-3 has-text-centered" style={{ color: '#4A90E2' }}>Gestión de Productos</h1>

            {error && <p className="has-text-danger">{error}</p>}

            <button className="button is-primary mb-3" onClick={() => { setProductoEditando(null); setIsModalOpen(true); }}>
                Agregar Producto
            </button>

            {cargando ? (
                <p>Cargando productos...</p>
            ) : (
                <div className="overflow-x-auto">
                    <h2 className="title is-4" style={{ color: '#4A90E2' }}>Lista de Productos</h2>
                    <table className="table is-striped is-fullwidth" style={{ backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                        <thead>
                            <tr>
                                <th className="has-text-centered">Código de Barras</th>
                                <th className="has-text-centered">Nombre</th>
                                <th className="has-text-centered">Precio Venta</th>
                                <th className="has-text-centered">Stock Mínimo</th>
                                <th className="has-text-centered">Stock Máximo</th>
                                <th className="has-text-centered">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productos.map((producto) => (
                                <tr key={producto.id_producto}>
                                    <td className="has-text-centered">{producto.codigo_barras}</td>
                                    <td className="has-text-centered">{producto.nombre}</td>
                                    <td className="has-text-centered">${producto.precio_venta}</td>
                                    <td className="has-text-centered">{producto.stock_minimo}</td>
                                    <td className="has-text-centered">{producto.stock_maximo}</td>
                                    <td className="has-text-centered">
                                        <button
                                            className="button is-warning is-light mr-2"
                                            onClick={() => manejarEditarProducto(producto)}
                                        >
                                            Editar
                                        </button>
                                        <button
                                            className="button is-danger is-light"
                                            onClick={() => manejarEliminarProducto(producto.id_producto!)}
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Modal para crear/editar producto */}
            <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} className="modal-content" overlayClassName="modal-overlay">
                <div className="box">
                    <h2 className="title is-4">{productoEditando ? 'Editar Producto' : 'Agregar Producto'}</h2>
                    <ProductForm onSubmit={manejarEnvioProducto} initialProduct={productoEditando} />
                    <button className="button is-light mt-2" onClick={() => setIsModalOpen(false)}>Cancelar</button>
                </div>
            </Modal>
        </div>
    );
};

export default Productos;