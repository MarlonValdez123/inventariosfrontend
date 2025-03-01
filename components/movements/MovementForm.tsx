import React, { useState } from 'react';

const MovementForm: React.FC<{ onSubmit: (productId: number, type: string, amount: number) => void }> = ({ onSubmit }) => {
    const [productId, setProductId] = useState(0);
    const [type, setType] = useState('add'); // 'add' or 'remove'
    const [amount, setAmount] = useState(0);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(productId, type, amount);
        setProductId(0);
        setType('add');
        setAmount(0);
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <h2 className="text-xl font-bold mb-2">Register Movement</h2>
            <input
                type="number"
                value={productId}
                onChange={(e) => setProductId(Number(e.target.value))}
                placeholder="Product ID"
                required
                className="border p-2 mr-2"
            />
            <select value={type} onChange={(e) => setType(e.target.value)} className="border p-2 mr-2">
                <option value="add">Add</option>
                <option value="remove">Remove</option>
            </select>
            <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                placeholder="Amount"
                required
                className="border p-2 mr-2"
            />
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">Submit</button>
        </form>
    );
};

export default MovementForm;