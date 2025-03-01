import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

interface AuthContextType {
    user: any;
    login: (email: string, password: string) => Promise<void>;
    register: (nombreCompleto: string, email: string, password: string) => Promise<void>; // Actualizado para incluir nombreCompleto
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser ] = useState<any>(null);

    const login = async (email: string, password: string) => {
        const response = await axios.post('http://localhost:3000/auth/login', { email, password });
        setUser (response.data.user);
        localStorage.setItem('token', response.data.token);
    };

    const register = async (nombreCompleto: string, email: string, password: string) => {
        await axios.post('http://localhost:3000/auth/register', { nombre_completo: nombreCompleto, email, password });
    };

    const logout = () => {
        setUser (null);
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};