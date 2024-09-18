import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import './CSSComponents/Cabecera.css';
import banner from './Imágenes/banner.png';
import carrito from './Imágenes/carrito.png';
import usuario from './Imágenes/usuario.png';
import menuIcon from './Imágenes/menu.png';
import Pie from './Pie';

function Cabecera(props) {
    const [menuAbierto, setMenuAbierto] = React.useState(false);

    // Función que alterna el estado del menú desplegable (abierto/cerrado)
    const alternarMenu = () => {
        setMenuAbierto(prevState => !prevState);
    };

    // Función para cerrar el menú desplegable
    const cerrarMenu = () => {
        setMenuAbierto(false);
    };

    // Efecto que cierra el menú desplegable clicando fuera de él
    React.useEffect(() => {
        const manejarClickFuera = (event) => {
            if (menuAbierto && !event.target.closest('.menuDesplegable')) {
                cerrarMenu();
            }
        };

        // EventListener para detectar clics fuera del menú desplegable
        document.addEventListener('mousedown', manejarClickFuera);

        // Limpia el EventListener cuando cierra el menú desplegable
        return () => document.removeEventListener('mousedown', manejarClickFuera);
    }, [menuAbierto]);

    return (
        <div>
            <div className="cabeceraSup">
                {/* Icono de menú desplegable (pantallas pequeñas) */}
                <div className={`menuIcono ${menuAbierto ? 'show-user' : ''}`} onClick={alternarMenu}>
                    <img className="menuIcono" src={menuIcon} alt="Menu"/>
                </div>
                <div className="banner">
                    <NavLink to="/inicio">
                        <img src={banner} alt="Banner" className="logo"/>
                    </NavLink>
                </div>
            </div>

            <nav className={`navSup ${menuAbierto ? 'hidden' : ''}`}>
                <ul>
                    <li><NavLink to="/inicio" activeClassName="active">Inicio</NavLink></li>
                    <li><NavLink to="/productos" activeClassName="active">Productos</NavLink></li>
                    <li><NavLink to="/contacto" activeClassName="active">Contacto</NavLink></li>
                    <li><NavLink to="/preguntasFrecuentes" activeClassName="active">Preguntas Frecuentes</NavLink></li>
                    <li><NavLink to="/carrito"><img src={carrito} alt="Carrito" className="iconoCarrito"/></NavLink></li>
                    <li><NavLink to="/perfil"><img src={usuario} alt="Usuario" className="iconoUsuario"/></NavLink></li>
                </ul>
            </nav>

            {/* Menú desplegable (pantallas pequeñas) */}
            <div className={`menuDesplegable ${menuAbierto ? 'open' : ''}`}>
                <span className="cerrarMenu" onClick={cerrarMenu}>×</span>
                <ul>
                    <li><NavLink to="/inicio" onClick={cerrarMenu} activeClassName="active">Inicio</NavLink></li>
                    <li><NavLink to="/productos" onClick={cerrarMenu} activeClassName="active">Productos</NavLink></li>
                    <li><NavLink to="/contacto" onClick={cerrarMenu} activeClassName="active">Contacto</NavLink></li>
                    <li><NavLink to="/preguntasFrecuentes" onClick={cerrarMenu} activeClassName="active">Preguntas Frecuentes</NavLink></li>
                    <li><NavLink to="/carrito" onClick={cerrarMenu} activeClassName="active">Carrito</NavLink></li>
                    <li><NavLink to="/perfil" onClick={cerrarMenu} activeClassName="active">Perfil</NavLink></li>
                </ul>
            </div>
            <Outlet/>
            <Pie/>
        </div>
    );
}

export default Cabecera;