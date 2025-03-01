import axios from 'axios';

// Configura la instancia de Axios
const api = axios.create({
    baseURL: 'http://localhost:3000', // Cambia esto a la URL de tu API
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor para agregar el token de autenticación si es necesario
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Funciones para realizar llamadas a la API

// Usuarios
export const getUsers = async () => {
    const response = await api.get('/usuario');
    return response.data;
};

export const createUser  = async (userData: any) => {
    const response = await api.post('/usuario', userData);
    return response.data;
};

export const updateUser  = async (userId: number, userData: any) => {
    const response = await api.put(`/usuario/${userId}`, userData);
    return response.data;
};

export const deleteUser  = async (userId: number) => {
    const response = await api.delete(`/usuario/${userId}`);
    return response.data;
};

// Productos
export const getProducts = async () => {
    const response = await api.get('/producto');
    return response.data;
};

export const createProduct = async (productData: any) => {
    const response = await api.post('/producto', productData);
    return response.data;
};

// Inventario
export const getInventory = async () => {
    const response = await api.get('/inventario');
    return response.data;
};

// Movimientos
export const getMovements = async () => {
    const response = await api.get('/movimiento');
    return response.data;
};

// Pedidos
export const getOrders = async () => {
    const response = await api.get('/pedido');
    return response.data;
};

// Proveedores
export const getSuppliers = async () => {
    const response = await api.get('/proveedor');
    return response.data;
};

// Categorías
export const getCategories = async () => {
    const response = await api.get('/categoria');
    return response.data;
};

// Reportes
export const getReports = async () => {
    const response = await api.get('/reporte');
    return response.data;
};

// Alertas de stock
export const getStockAlerts = async () => {
    const response = await api.get('/alerta-stock');
    return response.data;
};

// Roles
export const getRoles = async () => {
    const response = await api.get('/rol');
    return response.data;
};

// Autenticación
export const login = async (credentials: any) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
};

export const register = async (userData: any) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
};

// Puedes agregar más funciones para otras llamadas a la API según sea necesario

export default api;