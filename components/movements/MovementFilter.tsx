import React, { useState } from 'react';

const MovementFilter: React.FC<{ onFilter: (startDate: string, endDate: string, type: string) => void }> = ({ onFilter }) => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [type, setType] = useState('all'); // 'all', 'add', 'remove'

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onFilter(startDate, endDate, type);
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <h2 className="text-xl font-bold mb-2">Filter Movements</h2>
            <div className="flex items-center">
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="border p-2 mr-2"
                />
                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="border p-2 mr-2"
                />
                <select value={type} onChange={(e) => setType(e.target.value)} className="border p-2 mr-2">
                    <option value="all">All</option>
                    <option value="add">Add</option>
                    <option value="remove">Remove</option>
                </select>
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">Filter</button>
            </div>
        </form>
    );
};

export default MovementFilter;