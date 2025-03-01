import React from 'react';

const SupplierList: React.FC<{ suppliers: any[] }> = ({ suppliers }) => {
    return (
        <div>
            <h2 className="title is-4" style={{ color: '#4A90E2', marginBottom: '1rem' }}>Lista de Proveedores</h2>
            <ul>
                {suppliers.map((supplier) => (
                    <li key={supplier.id}>{supplier.name}</li> // Asegúrate de que 'id' sea único
                ))}
            </ul>
        </div>
    );
};

export default SupplierList;