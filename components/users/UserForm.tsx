import React, { useState, useEffect } from 'react';
import { User } from '../types/User'; // Importa la interfaz desde types/User.ts

const UserForm: React.FC<{ onSubmit: (user: User) => Promise<void>; initialUser?: User | null }> = ({ onSubmit, initialUser }) => {
    // Asegurarse de que los valores sean siempre cadenas de texto, incluso si initialUser es undefined
    const [nombreCompleto, setNombreCompleto] = useState<string>(initialUser?.nombre_completo || '');
    const [email, setEmail] = useState<string>(initialUser?.email || '');
    const [telefono, setTelefono] = useState<string>(initialUser?.telefono || '');
    const [estado, setEstado] = useState<'Activo' | 'Inactivo'>(initialUser?.estado || 'Activo');
    const [password, setPassword] = useState<string>(''); // Campo para la contraseña
    const [error, setError] = useState<string | null>(null); // Estado para manejar errores

    // Actualizar los campos si initialUser cambia
    useEffect(() => {
        if (initialUser) {
            setNombreCompleto(initialUser.nombre_completo || '');
            setEmail(initialUser.email || '');
            setTelefono(initialUser.telefono || '');
            setEstado(initialUser.estado || 'Activo');
            setPassword(''); // Al editar, no mostramos la contraseña actual por razones de seguridad
        }
    }, [initialUser]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const fechaCreacion = initialUser?.fecha_creacion || new Date().toISOString();
        // Convertir la fecha al formato compatible con MySQL (YYYY-MM-DD HH:MM:SS)
        const formattedFechaCreacion = new Date(fechaCreacion).toISOString().slice(0, 19).replace('T', ' ');

        const user: User = {
            id_usuario: initialUser?.id_usuario || undefined, // Solo asignar si estamos editando
            nombre_completo: nombreCompleto,
            email,
            telefono,
            estado,
            password_hash: password, // Agregar el campo de contraseña
            fecha_creacion: formattedFechaCreacion, // Usar la fecha formateada
        };

        try {
            await onSubmit(user); // Espera a que se complete la operación
            if (!initialUser) {
                // Limpiar campos solo si estamos creando un nuevo usuario
                setNombreCompleto('');
                setEmail('');
                setTelefono('');
                setEstado('Activo');
                setPassword(''); // Limpiar el campo de contraseña
            }
            setError(null); // Limpiar error si la operación fue exitosa
        } catch (error) {
            console.error('Error submitting user:', error);
            setError('Error al enviar el formulario. Inténtalo de nuevo.'); // Establecer mensaje de error
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <h2 className="text-xl font-bold mb-2">{initialUser ? 'Editar Usuario' : 'Agregar Usuario'}</h2>
            {error && <div className="text-red-500 mb-2">{error}</div>} {/* Mostrar mensaje de error */}
            <input
                type="text"
                value={nombreCompleto}
                onChange={(e) => setNombreCompleto(e.target.value)}
                placeholder="Nombre Completo"
                required
                className="border p-2 mr-2"
            />
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                className="border p-2 mr-2"
            />
            <input
                type="text"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                placeholder="Teléfono"
                className="border p-2 mr-2"
            />
            <input
                type="password" // Campo para la contraseña
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contraseña"
                className="border p-2 mr-2"
            />
            <select value={estado} onChange={(e) => setEstado(e.target.value as 'Activo' | 'Inactivo')} className="border p-2 mr-2">
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
            </select>
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">{initialUser ? 'Actualizar' : 'Agregar'}</button>
        </form>
    );
};

export default UserForm;
