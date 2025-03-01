import React from 'react';

interface CategorySelectorProps {
    selectedCategory: number | undefined;
    onSelect: (category: number | undefined) => void;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({ selectedCategory, onSelect }) => {
    const categories = [
        { id: 1, name: 'Electronics' },
        { id: 2, name: 'Clothing' },
        { id: 3, name: 'Food' },
        { id: 4, name: 'Books' },
    ]; // Ejemplo de categorías

    return (
        <select
            value={selectedCategory !== undefined ? selectedCategory.toString() : ''}
            onChange={(e) => onSelect(e.target.value ? Number(e.target.value) : undefined)}
            className="border p-2 w-full rounded"
        >
            <option value="">Seleccionar categoría</option>
            {categories.map((category) => (
                <option key={category.id} value={category.id}>
                    {category.name}
                </option>
            ))}
        </select>
    );
};

export default CategorySelector;
