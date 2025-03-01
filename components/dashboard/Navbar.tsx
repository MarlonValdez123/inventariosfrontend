import React from 'react';
import { useAuth } from '../auth/AuthProvider';
import Link from 'next/link';

const Navbar: React.FC = () => {
    const { user, logout } = useAuth();

    return (
        <nav className="navbar" style={{ backgroundColor: '#4A90E2' }}>
            <div className="navbar-brand">
                <h1 className="navbar-item has-text-weight-bold has-text-white">Gestión de Inventario</h1>
            </div>
            <div className="navbar-menu">
                <div className="navbar-start">
                    <Link href="/dashboard" className="navbar-item has-text-white" style={{ transition: 'background-color 0.3s, color 0.3s' }}>
                        Dashboard
                    </Link>
                    <Link href="/orders" className="navbar-item has-text-white" style={{ transition: 'background-color 0.3s, color 0.3s' }}>
                        Pedidos
                    </Link>
                    <Link href="/inventory" className="navbar-item has-text-white" style={{ transition: 'background-color 0.3s, color 0.3s' }}>
                        Inventario
                    </Link>
                </div>
                <div className="navbar-end">
                    {user && (
                        <>
                            <div className="navbar-item">
                                <span className="has-text-white">Bienvenido, <strong>{user.email}</strong></span>
                            </div>
                            <div className="navbar-item">
                                <button 
                                    onClick={logout} 
                                    className="button is-danger is-light"
                                    style={{ backgroundColor: '#D0021B', borderColor: '#D0021B' }} // Color de fondo para el botón de logout
                                >
                                    Logout
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;