import React, { useState, useEffect } from 'react';
import CategorySelector from './CategorySelector';

const ProductForm: React.FC<{ onSubmit: (product: any) => void; initialProduct?: any }> = ({ onSubmit, initialProduct }) => {
    const [codigoBarras, setCodigoBarras] = useState(initialProduct ? initialProduct.codigo_barras : '');
    const [nombre, setNombre] = useState(initialProduct ? initialProduct.nombre : '');
    const [descripcion, setDescripcion] = useState(initialProduct ? initialProduct.descripcion : '');
    const [idCategoria, setIdCategoria] = useState(initialProduct ? initialProduct.id_categoria : undefined);
    const [precioCompra, setPrecioCompra] = useState(initialProduct ? initialProduct.precio_compra : 0);
    const [precioVenta, setPrecioVenta] = useState(initialProduct ? initialProduct.precio_venta : 0);
    const [stockMinimo, setStockMinimo] = useState(initialProduct ? initialProduct.stock_minimo : 0);
    const [stockMaximo, setStockMaximo] = useState(initialProduct ? initialProduct.stock_maximo : 0);

    useEffect(() => {
        if (initialProduct) {
            setCodigoBarras(initialProduct.codigo_barras);
            setNombre(initialProduct.nombre);
            setDescripcion(initialProduct.descripcion || '');
            setIdCategoria(initialProduct.id_categoria);
            setPrecioCompra(initialProduct.precio_compra);
            setPrecioVenta(initialProduct.precio_venta);
            setStockMinimo(initialProduct.stock_minimo);
            setStockMaximo(initialProduct.stock_maximo);
        }
    }, [initialProduct]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const product = {
            codigo_barras: codigoBarras,
            nombre,
            descripcion,
            id_categoria: idCategoria,
            precio_compra: precioCompra,
            precio_venta: precioVenta,
            stock_minimo: stockMinimo,
            stock_maximo: stockMaximo,
        };
        onSubmit(product);
        // Reset form
        setCodigoBarras('');
        setNombre('');
        setDescripcion('');
        setIdCategoria(undefined);
        setPrecioCompra(0);
        setPrecioVenta(0);
        setStockMinimo(0);
        setStockMaximo(0);
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <h2 className="text-xl font-bold mb-2">{initialProduct ? 'Editar Producto' : 'Agregar Producto'}</h2>

            <div className="mb-4">
                <label className="block mb-1">Código de Barras:</label>
                <input
                    type="text"
                    value={codigoBarras}
                    onChange={(e) => setCodigoBarras(e.target.value)}
                    placeholder="Código de Barras"
                    required
                    className="border p-2 w-full"
                />
            </div>

            <div className="mb-4">
                <label className="block mb-1">Nombre del Producto:</label>
                <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Nombre del Producto"
                    required
                    className="border p-2 w-full"
                />
            </div>

            <div className="mb-4">
                <label className="block mb-1">Descripción:</label>
                <input
                    type="text"
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    placeholder="Descripción"
                    className="border p-2 w-full"
                />
            </div>

            <div className="mb-4">
                <label className="block mb-1">Categoría:</label>
                <CategorySelector selectedCategory={idCategoria} onSelect={setIdCategoria} />
            </div>

            <div className="mb-4">
                <label className="block mb-1">Precio de Compra:</label>
                <input
                    type="number"
                    value={precioCompra}
                    onChange={(e) => setPrecioCompra(Number(e.target.value))}
                    placeholder="Precio de Compra"
                    required
                    className="border p-2 w-full"
                />
            </div>

            <div className="mb-4">
    <label className="block mb-1">Precio de Venta:</label>
    <input
        type="number"
        value={precioVenta}
        onChange={(e) => setPrecioVenta(Number(e.target.value))}
        placeholder="Precio de Venta"
        required
        className="border p-2 w-full"
    />
</div>  
                <div className="mb-4">
                    <label className="block mb-1">Stock Mínimo:</label>
                    <input
                        type="number"
                        value={stockMinimo}
                        onChange={(e) => setStockMinimo(Number(e.target.value))}
                        placeholder="Stock Mínimo"
                        required
                        className="border p-2 w-full"
                    />
                </div>
    
                <div className="mb-4">
                    <label className="block mb-1">Stock Máximo:</label>
                    <input
                        type="number"
                        value={stockMaximo}
                        onChange={(e) => setStockMaximo(Number(e.target.value))}
                        placeholder="Stock Máximo"
                        required
                        className="border p-2 w-full"
                    />
                </div>
    
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                    {initialProduct ? 'Actualizar' : 'Agregar'}
                </button>
            </form>
        );
    };
    
    export default ProductForm;