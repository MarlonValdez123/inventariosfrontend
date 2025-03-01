import React, { useState } from 'react';
import { useAuth } from './AuthProvider';
import Link from 'next/link'; // Asegúrate de importar Link desde next/link
import { useRouter } from 'next/router'; // Importa useRouter para la redirección

const LoginForm: React.FC = () => {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter(); // Inicializa el router

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await login(email, password);
            // Redirige al dashboard después de un inicio de sesión exitoso
            router.push('/dashboard');
        } catch (err) {
            setError('Inicio Fallido. Por favor revise sus credenciales.');
        }
    };

    return (
        <div className="container is-fluid" style={{ maxWidth: '400px', margin: '0 auto', padding: '2rem' }}>
            <form onSubmit={handleSubmit} className="box">
                <h2 className="title is-4 has-text-centered">Iniciar Sesión</h2>
                {error && <p className="has-text-danger">{error}</p>}
                <div className="field">
                    <label className="label">Email</label>
                    <div className="control">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            required
                            className="input"
                        />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Contraseña</label>
                    <div className="control">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Contraseña"
                            required
                            className="input"
                        />
                    </div>
                </div>
                <div className="field">
                    <div className="control">
                        <button type="submit" className="button is-primary is-fullwidth">
                            Iniciar Sesión
                        </button>
                    </div>
                </div>
                <div className="field has-text-centered">
                    <p>
                        <Link href="/register" className="has-text-link">¿No tienes una cuenta? Regístrate aquí.</Link>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;