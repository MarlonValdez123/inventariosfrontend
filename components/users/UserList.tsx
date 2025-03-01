import React from 'react';

const CategorySelector: React.FC<{ selectedCategory: string; onSelect: (category: string) => void }> = ({ selectedCategory, onSelect }) => {
    const categories = ['Electronics', 'Clothing', 'Food', 'Books']; // Ejemplo de categorías

    return (
        <select value={selectedCategory} onChange={(e) => onSelect(e.target.value)} className="border p-2 mr-2">
            <option value="">Select Category</option>
            {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
            ))}
        </select>
    );
};

export default CategorySelector;