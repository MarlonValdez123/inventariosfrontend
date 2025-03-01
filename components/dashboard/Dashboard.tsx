import React from 'react';
import Sidebar from './Sidebar';

const Dashboard: React.FC = () => {
    return (
        <div className="columns is-fullheight">
            <Sidebar />
            <div className="column is-three-quarters">
                <div className="section">
                    <h1 className="title is-3">Dashboard</h1>
                    <p className="subtitle">Bienvenido al panel de control. Aquí puedes ver las estadísticas generales.</p>
                    
                    {/* Sección de estadísticas */}
                    <div className="columns is-multiline">
                        <div className="column is-4">
                            <div className="box">
                                <h2 className="title is-5">Estadística 1</h2>
                                <p>Descripción de la estadística 1.</p>
                            </div>
                        </div>
                        <div className="column is-4">
                            <div className="box">
                                <h2 className="title is-5">Estadística 2</h2>
                                <p>Descripción de la estadística 2.</p>
                            </div>
                        </div>
                        <div className="column is-4">
                            <div className="box">
                                <h2 className="title is-5">Estadística 3</h2>
                                <p>Descripción de la estadística 3.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;