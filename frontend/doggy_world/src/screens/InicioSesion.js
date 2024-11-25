import React, { useState } from 'react';
import './CSSScreens/InicioSesion.css';
import {useNavigate} from 'react-router-dom';
import Logo from './ImagenesScreens/logo.png';

function InicioSesion() {
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [mensajeError, setMensajeError] = useState('');
  const navegar = useNavigate();

  // Petición para iniciar sesión
  const manejarInicioSesion = async (e) => {
    e.preventDefault();
    try {
      const respuesta = await fetch('http://localhost:8000/api/doggyWorld/session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Datos del usuario que trata de iniciar sesión
        body: JSON.stringify({
          user: nombreUsuario,
          password: contrasena,
        }),
      });

      // Si se puede iniciar sesión se redirige a Inicio.js
      if (respuesta.status === 201) {
        const datos = await respuesta.json();
        console.log('Sesión iniciada:', datos);
        // Guardar el token
        localStorage.setItem('token', datos.token);
        navegar('/inicio');
      } else {
        const datosError = await respuesta.json();
        setMensajeError(datosError.error || 'Error al iniciar sesión');
      }
    } catch (err) {
      console.error('Error al iniciar sesión:', err);
      setMensajeError('Error de conexión');
    }
  };

  // Navegar a Registro.js (para el botón "Registrarse")
  const manejarRedireccionRegistro = () => {
    navegar('/registro');
  };

  return (
    <div className="contenedorInicioSesion">
      <div className="tarjetaInicioSesion">
        <div className="seccionImagen">
          <img src={Logo} alt="Logo" className="logoImagen"/>
        </div>
        <div className="seccionFormulario">
          <div className="cabeceraInicioSesion">
            <h1>Inicia sesión</h1>
            <p>Inicia sesión para disfrutar de Doggy World</p>
            {/* Solo se muestra en caso de error */}
            {mensajeError && <p className="mensajeError">{mensajeError}</p>}
          </div>
          <div className="cuerpoInicioSesion">
            <form onSubmit={manejarInicioSesion}>
              <label htmlFor="usuario">Nombre de usuario o correo electrónico</label>
              <input type="text" id="usuario" name="usuario" value={nombreUsuario} onChange={(e) => setNombreUsuario(e.target.value)} required/>

              <label htmlFor="contrasena">Contraseña</label>
              <input type="password" id="contrasena" name="contrasena" value={contrasena} onChange={(e) => setContrasena(e.target.value)} required/>

              <button type="submit" className="botonInicioSesionIS">Iniciar sesión</button>
              <button type="button" className="botonRegistroIS" onClick={manejarRedireccionRegistro}>Registrarse</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InicioSesion;