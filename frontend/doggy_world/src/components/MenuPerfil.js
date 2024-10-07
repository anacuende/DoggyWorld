import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './CSSComponents/MenuPerfil.css';

function MenuPerfil() {
    const navegar = useNavigate();
    const location = useLocation(); // Hook para obtener la ruta actual
    const [paginaSeleccionada, setPaginaSeleccionada] = useState('/perfilModificarDatos');

    // Actualizar la página seleccionada cuando la ruta cambia
    useEffect(() => {
        setPaginaSeleccionada(location.pathname);
    }, [location.pathname]);

    // Cambiar al apartado seleccionado
    const navegarAPagina = (ruta) => {
        navegar(ruta);
    };

    // Petición para cerrar sesión
    const cerrarSesion = async () => {
        const token = localStorage.getItem('token');
        try {
            const respuesta = await axios.delete('http://localhost:8000/api/doggyWorld/session', {
                headers: {
                    'token': token,
                    'Content-Type': 'application/json'
                }
            });

            if (respuesta.status === 200) {
                alert('Sesión cerrada correctamente');
                localStorage.removeItem('token'); // Eliminar el token de localStorage
                navegar('/inicioSesion');
            }
        } catch (error) {
            // Manejo detallado de errores
            console.error('Error al cerrar la sesión:', error);
            if (error.response && error.response.data) {
                alert(`Error: ${error.response.data.error}`);
            } else {
                alert('Error desconocido al cerrar la sesión');
            }
        }
    };

    return (
        <div className="perfilUsuarioMenu">
            <h1 className="tituloPerfil">Perfil de usuario</h1>
            <hr className="subrayadoPerfil" />

            {/* Botones de menú */}
            <div className="botonesMenu">
                <button className={`botonMenu ${paginaSeleccionada === '/perfilModificarDatos' ? 'activo' : ''}`} onClick={() => navegarAPagina('/perfilModificarDatos')}>
                    Modificar mis datos
                </button>
                <button className={`botonMenu ${paginaSeleccionada === '/perfilListaDeseos' ? 'activo' : ''}`} onClick={() => navegarAPagina('/perfilListaDeseos')}>
                    Lista de deseos
                </button>
                <button className={`botonMenu ${paginaSeleccionada === '/perfilPedidos' ? 'activo' : ''}`} onClick={() => navegarAPagina('/perfilPedidos')}>
                    Mis pedidos
                </button>
                <button className="botonMenu cerrarSesion" onClick={cerrarSesion}>
                    Cerrar sesión
                </button>
            </div>
        </div>
    );
}

export default MenuPerfil;
