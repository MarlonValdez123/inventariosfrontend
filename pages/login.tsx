import React, { useState } from 'react';
import { useAuth } from '../components/auth/AuthProvider';
import Link from 'next/link';
import { useRouter } from 'next/router';

const LoginForm: React.FC = () => {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await login(email, password);
            router.push('/dashboard');
        } catch (err) {
            setError('Inicio Fallido. Por favor revise sus credenciales.');
        }
    };

    return (
        <div className="container is-fluid" style={{ maxWidth: '400px', margin: '0 auto', padding: '2rem', backgroundColor: '#F5F7FA', borderRadius: '8px', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)' }}>
            <form onSubmit={handleSubmit} className="box" style={{ borderRadius: '8px' }}>
                <h2 className="title is-4 has-text-centered" style={{ color: '#4A90E2' }}>Iniciar Sesión</h2>
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
                            style={{ borderColor: '#4A90E2' }}
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
                            style={{ borderColor: '#4A90E2' }}
                        />
                    </div>
                </div>
                <div className="field">
                    <div className="control">
                        <button type="submit" className="button is-primary is-fullwidth" style={{ backgroundColor: '#4A90E2', borderColor: '#4A90E2' }}>
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