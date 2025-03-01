import React, { useEffect, useState } from 'react';
import UserForm from '../components/users/UserForm';
import { User } from '../components/types/User';
import Modal from 'react-modal';
import Navbar from '../components/dashboard/Navbar';

const Users: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Asegurar que Modal.setAppElement() solo se ejecuta en el cliente
    useEffect(() => {
        if (typeof window !== 'undefined') {
            Modal.setAppElement('#__next'); // Usamos #__next en Next.js
        }
    }, []);

    // Función para formatear la fecha en formato MySQL DATETIME (YYYY-MM-DD HH:MM:SS)
    const formatFecha = (fecha: string) => {
        const date = new Date(fecha);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };

    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:3000/usuario');
            if (!response.ok) throw new Error('Error obteniendo los usuarios');

            const data: User[] = await response.json();
            setUsers(data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleAddUser = async (user: User) => {
        try {
            const response = await fetch('http://localhost:3000/usuario', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });

            if (!response.ok) {
                const errorMessage = await response.text(); // Obtiene el cuerpo de la respuesta
                console.error(`Error al agregar usuario: ${response.status} - ${errorMessage}`);
                throw new Error(`Error al agregar usuario: ${response.status} - ${errorMessage}`);
            }

            const newUser = await response.json();
            setUsers([...users, newUser]);
        } catch (error) {
            console.error('Error en la solicitud:', error);
        }
    };

    const handleEditUser = async (user: User) => {
        if (!user.id_usuario) {
            console.error('Error: id_usuario es undefined');
            return;
        }

        const formattedUser = {
            ...user,
            fecha_creacion: formatFecha(user.fecha_creacion || new Date().toISOString()), // Convertir fecha
        };

        try {
            const response = await fetch(`http://localhost:3000/usuario/${user.id_usuario}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formattedUser),
            });

            if (!response.ok) throw new Error('Error al actualizar usuario');

            const updatedUser = await response.json();
            setUsers(users.map((u) => (u.id_usuario === updatedUser.id_usuario ? updatedUser : u)));
            setEditingUser(null);
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleDeleteUser = async (id?: number) => {
        if (id === undefined) {
            console.error('Error: id_usuario es undefined');
            return;
        }

        if (!window.confirm('¿Estás seguro de que deseas eliminar este usuario?')) return;

        try {
            const response = await fetch(`http://localhost:3000/usuario/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) throw new Error('Error al eliminar usuario');

            setUsers(users.filter((user) => user.id_usuario !== id));
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="container is-fluid" style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
                <h1 className="title is-3">Usuarios</h1>
                <button className="button is-primary mb-3" onClick={() => { setEditingUser(null); setIsModalOpen(true); }}>
                    Agregar Usuario
                </button>
                <table className="table is-striped is-fullwidth">
                    <thead>
                        <tr>
                            <th>Nombre Completo</th>
                            <th>Email</th>
                            <th>Teléfono</th>
                            <th>Estado</th>
                            <th>Fecha Creación</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="has-text-centered">No hay usuarios registrados.</td>
                            </tr>
                        ) : (
                            users.map((user) => (
                                <tr key={user.id_usuario}>
                                    <td>{user.nombre_completo}</td>
                                    <td>{user.email}</td>
                                    <td>{user.telefono || 'N/A'}</td>
                                    <td>{user.estado || 'Desconocido'}</td>
                                    <td>{user.fecha_creacion ? new Date(user.fecha_creacion).toLocaleDateString() : 'N/A'}</td>
                                    <td>
                                        <button className="button is-small is-info mr-2" onClick={() => { setEditingUser(user); setIsModalOpen(true); }}>
                                            Editar
                                        </button>
                                        <button className="button is-small is-danger" onClick={() => handleDeleteUser(user.id_usuario)}>
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>

                {/* Modal para crear/editar usuario */}
                <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} className="modal-content" overlayClassName="modal-overlay">
                    <div className="box">
                        <h2 className="title is-4">{editingUser ? 'Editar Usuario' : 'Agregar Usuario'}</h2>
                        <UserForm onSubmit={editingUser ? handleEditUser : handleAddUser} initialUser={editingUser} />
                        <button className="button is-light mt-2" onClick={() => setIsModalOpen(false)}>Cancelar</button>
                    </div>
                </Modal>
            </div>
        </div>
    );
};

export default Users;
