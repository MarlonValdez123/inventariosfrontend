import React from 'react';

const MovementHistory: React.FC<{ movements: any[] }> = ({ movements }) => {
    return (
        <div className="overflow-x-auto">
            <h2 className="text-xl font-bold mb-4">Movement History</h2>
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr>
                        <th className="border-b p-2">Product Name</th>
                        <th className="border-b p-2">Type</th>
                        <th className="border-b p-2">Amount</th>
                        <th className="border-b p-2">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {movements.map((movement) => (
                        <tr key={movement.id}>
                            <td className="border-b p-2">{movement.productName}</td>
                            <td className="border-b p-2">{movement.type}</td>
                            <td className="border-b p-2">{movement.amount}</td>
                            <td className="border-b p-2">{new Date(movement.date).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MovementHistory;