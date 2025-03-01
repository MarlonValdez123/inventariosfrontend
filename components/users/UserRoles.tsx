import React from 'react';

const UserRoles: React.FC<{ selectedRole: string; onSelect: (role: string) => void }> = ({ selectedRole, onSelect }) => {
    const roles = ['Admin', 'User ', 'Manager']; // Ejemplo de roles

    return (
        <select value={selectedRole} onChange={(e) => onSelect(e.target.value)} className="border p-2 mr-2">
            <option value="">Select Role</option>
            {roles.map((role) => (
                <option key={role} value={role}>{role}</option>
            ))}
        </select>
    );
};

export default UserRoles;