import React, { useEffect, useState } from 'react';

interface InventoryFormProps {
    onSubmit: (data: any) => void; // Cambia 'any' por el tipo adecuado
    initialProduct: any | null; // Cambia 'any' por el tipo adecuado
}

const InventoryForm: React.FC<InventoryFormProps> = ({ onSubmit, initialProduct }) => {
    const [idEmpresa, setIdEmpresa] = useState<number | undefined>(initialProduct?.id_empresa);
    const [fechaActualizacion, setFechaActualizacion] = useState<string>(new Date().toISOString());

    useEffect(() => {
        if (initialProduct) {
            setIdEmpresa(initialProduct.id_empresa);
            setFechaActualizacion(initialProduct.fecha_actualizacion || new Date().toISOString());
        }
    }, [initialProduct]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const inventoryData = {
            id_empresa: idEmpresa,
            fecha_actualizacion: fechaActualizacion,
        };
        onSubmit(inventoryData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="field">
                <label className="label">ID Empresa</label>
                <div className="control">
                    <input
                        type="number"
                        value={idEmpresa}
                        onChange={(e) => setIdEmpresa(Number(e.target.value))}
                        placeholder="ID de la Empresa"
                        required
                        className="input"
                    />
                </div>
            </div>
            <div className="field">
                <label className="label">Fecha de Actualización</label>
                <div className="control">
                    <input
                        type="datetime-local"
                        value={fechaActualizacion}
                        onChange={(e) => setFechaActualizacion(e.target.value)}
                        required
                        className="input"
                    />
                </div>
            </div>
            <div className="field">
                <div className="control">
                    <button type="submit" className="button is-primary">
                        {initialProduct ? 'Actualizar Inventario' : 'Agregar Inventario'}
                    </button>
                </div>
            </div>
        </form>
    );
};

export default InventoryForm;