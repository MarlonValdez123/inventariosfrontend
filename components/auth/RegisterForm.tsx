import React, { useState } from 'react';
import { useAuth } from './AuthProvider';
import Link from 'next/link'; // Asegúrate de importar Link desde next/link

const RegisterForm: React.FC = () => {
    const { register } = useAuth(); // Asegúrate de que el método register esté definido en tu AuthProvider
    const [nombreCompleto, setNombreCompleto] = useState(''); // Nuevo estado para el nombre completo
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Código de depuración para ver los datos que se enviarán al backend
        console.log('Enviando datos al backend:', {
            nombre_completo: nombreCompleto,
            email,
            password
        });

        try {
            // Llama a register con el nuevo campo nombre_completo
            await register(nombreCompleto, email, password);
            alert('¡Registro exitoso! Ahora puedes iniciar sesión.');
        } catch (err) {
            console.error('Error en el registro:', err); // Muestra el error en la consola
            setError('Registro Fallido. Por favor revise sus credenciales.');
        }
    };

    return (
        <div className="container is-fluid" style={{ maxWidth: '400px', margin: '0 auto', padding: '2rem' }}>
            <form onSubmit={handleSubmit} className="box">
                <h2 className="title is-4 has-text-centered">Registro</h2>
                {error && <p className="has-text-danger">{error}</p>}
                <div className="field">
                    <label className="label">Nombre Completo</label>
                    <div className="control">
                        <input
                            type="text"
                            value={nombreCompleto}
                            onChange={(e) => setNombreCompleto(e.target.value)}
                            placeholder="Nombre Completo"
                            required
                            className="input"
                        />
                    </div>
                </div>
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
                            Registrarse
                        </button>
                    </div>
                </div>
                <div className="field has-text-centered">
                    <p>
                        <Link href="/login" className="has-text-link">¿Ya tienes una cuenta? Inicia sesión aquí.</Link>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default RegisterForm;