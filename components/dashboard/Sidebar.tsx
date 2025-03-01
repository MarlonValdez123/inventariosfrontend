import React from 'react';
import Link from 'next/link';

const Sidebar: React.FC = () => {
    return (
        <aside className="menu is-hidden-mobile" style={{ width: '250px', height: '100vh', backgroundColor: '#F5F7FA', padding: '1rem', boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)' }}>
            <h2 className="title is-4" style={{ color: '#4A90E2' }}>Menú</h2>
            <ul className="menu-list">
                <li>
                    <Link href="/dashboard" className="navbar-item" style={{ color: '#4A90E2' }}>
                        Dashboard
                    </Link>
                </li>
                <li>
                    <Link href="/users" className="navbar-item" style={{ color: '#4A90E2' }}>
                        Users
                    </Link>
                </li>
                <li>
                    <Link href="/products" className="navbar-item" style={{ color: '#4A90E2' }}>
                        Products
                    </Link>
                </li>
                <li>
                    <Link href="/inventory" className="navbar-item" style={{ color: '#4A90E2' }}>
                        Inventory
                    </Link>
                </li>
                <li>
                    <Link href="/movements" className="navbar-item" style={{ color: '#4A90E2' }}>
                        Movements
                    </Link>
                </li>
                <li>
                    <Link href="/orders" className="navbar-item" style={{ color: '#4A90E2' }}>
                        Orders
                    </Link>
                </li>
            </ul>
        </aside>
    );
};

export default Sidebar;