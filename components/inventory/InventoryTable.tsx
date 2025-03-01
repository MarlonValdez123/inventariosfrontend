import React from 'react';

const InventoryTable: React.FC<{ products: any[]; onSelectProduct: (product: any) => void }> = ({ products, onSelectProduct }) => {
    return (
        <div className="overflow-x-auto">
            <h2 className="title is-4" style={{ color: '#4A90E2', marginBottom: '1rem' }}>Inventario</h2>
            <table className="table is-striped is-fullwidth" style={{ backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                <thead>
                    <tr>
                        <th className="has-text-centered" style={{ color: '#4A90E2' }}>Nombre del Producto</th>
                        <th className="has-text-centered" style={{ color: '#4A90E2' }}>Stock</th>
                        <th className="has-text-centered" style={{ color: '#4A90E2' }}>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(products) && products.length > 0 ? (
                        products.map((product) => (
                            <tr key={product.id_producto} onClick={() => onSelectProduct(product)} style={{ cursor: 'pointer' }}>
                                <td className="border-b p-2">{product.nombre}</td>
                                <td className="border-b p-2">{product.stock}</td>
                                <td className="border-b p-2">
                                    <button className="button is-link is-light" onClick={() => onSelectProduct(product)}>
                                        Seleccionar
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={3} className="border-b p-2 text-center">No hay productos disponibles</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default InventoryTable;