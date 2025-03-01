import React from 'react';

const SupplierList: React.FC<{ suppliers: any[] }> = ({ suppliers }) => {
    return (
        <div className="overflow-x-auto">
            <h2 className="text-xl font-bold mb-4">Supplier List</h2>
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr>
                        <th className="border-b p-2">Supplier ID</th>
                        <th className="border-b p-2">Name</th>
                        <th className="border-b p-2">Contact</th>
                    </tr>
                </thead>
                <tbody>
                    {suppliers.map((supplier) => (
                        <tr key={supplier.id}>
                            <td className="border-b p-2">{supplier.id}</td>
                            <td className="border-b p-2">{supplier.name}</td>
                            <td className="border-b p-2">{supplier.contact}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SupplierList;