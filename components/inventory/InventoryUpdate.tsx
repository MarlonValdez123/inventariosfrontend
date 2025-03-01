import React, { useState } from 'react';

const InventoryUpdate: React.FC<{ productId: number; onUpdate: (id: number, amount: number, isAdding: boolean) => void }> = ({ productId, onUpdate }) => {
    const [amount, setAmount] = useState(0);
    const [isAdding, setIsAdding] = useState(true); // True si estamos agregando stock

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onUpdate(productId, amount, isAdding);
        setAmount(0); // Reset the input after submission
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <h2 className="text-xl font-bold mb-2">Actualizar Stock</h2>
            <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                placeholder="Cantidad"
                required
                className="border p-2 mr-2"
            />
            <div className="mb-2">
                <button
                    type="button"
                    className={`p-2 ${isAdding ? 'bg-green-500' : 'bg-red-500'} text-white rounded mr-2`}
                    onClick={() => setIsAdding(true)} 
                >
                    Agregar
                </button>
                <button
                    type="button"
                    className={`p-2 ${!isAdding ? 'bg-red-500' : 'bg-green-500'} text-white rounded`}
                    onClick={() => setIsAdding(false)}
                >
                    Retirar
                </button>
            </div>
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">Actualizar</button>
        </form>
    );
};

export default InventoryUpdate;
