import React from 'react';
import Link from 'next/link';

const Home: React.FC = () => {
    return (
        <div className="container is-fluid has-text-centered" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: '100vh' }}>
            <h1 className="title is-2">Sistema de Gestión</h1>
            <h2 className="subtitle is-4">Bienvenido a nuestra aplicación</h2>
            <p className="content">
                Esta aplicación te permite gestionar tus recursos de manera eficiente. 
                Inicia sesión o regístrate para comenzar a utilizar todas las funcionalidades.
            </p>
            <div className="buttons are-large">
                <Link href="/login">
                    <button className="button is-primary">
                        Login
                    </button>
                </Link>
                <Link href="/register">
                    <button className="button is-success">
                        Registro
                    </button>
                </Link>
            </div>
            <footer className="footer" style={{ marginTop: '2rem' }}>
                <div className="content has-text-centered">
                    <p>
                        &copy; {new Date().getFullYear()} Sistema de Gestión. Todos los derechos reservados.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Home;