// types/User.ts
export interface User {
    id_usuario?: number; // Opcional si se usa para edición
    nombre_completo: string;
    email: string;
    telefono?: string; // Opcional
    estado: 'Activo' | 'Inactivo'; // Asegúrate de que el estado sea un tipo restringido
    fecha_creacion: string; // O Date, dependiendo de cómo lo manejes
    password_hash?: string; // Agrega esta línea para incluir password_hash
    ultima_conexion?: string | null; // Opcional
    id_empresa?: number | null; // Opcional
}