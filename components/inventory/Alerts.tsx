import React from 'react';

// Definimos las propiedades de Alerts
interface AlertsProps {
    lowStockProducts: any[];  // Se espera un array de productos con bajo stock
}

const Alerts: React.FC<AlertsProps> = ({ lowStockProducts }) => {
    return (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4">
            <h2 className="font-bold">Alertas de Bajo Stock</h2>
            {lowStockProducts.length === 0 ? (
                <p>No hay alertas de bajo stock.</p>
            ) : (
                <ul>
                    {lowStockProducts.map((product) => (
                        <li key={product.id}>{product.name} - Stock: {product.stock}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Alerts;
