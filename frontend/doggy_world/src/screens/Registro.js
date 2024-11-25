import React, {useState} from 'react';
import './CSSScreens/Registro.css';
import {useNavigate} from 'react-router-dom';
import Logo from './ImagenesScreens/logo.png';

function Registro() {
  const [nombre, setNombre] = useState('');
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [confirmarContrasena, setConfirmarContrasena] = useState('');
  const [mensajeError, setMensajeError] = useState('');
  const navegar = useNavigate();

  // Petición para registrar usuario
  const manejarRegistro = async (e) => {
    e.preventDefault();
    try {
      const respuesta = await fetch('http://localhost:8000/api/doggyWorld/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Datos del nuevo usuario
        body: JSON.stringify({
          name: nombre,
          username: nombreUsuario,
          email: email,
          password: contrasena,
          confirm_password: confirmarContrasena,
        }),
      });

      if (respuesta.status === 201) {
        const datos = await respuesta.json();
        console.log('Usuario registrado:', datos);
        // Guardar el token
        localStorage.setItem('token', datos.token);
        navegar('/inicio');
      } else {
        const datosError = await respuesta.json();
        setMensajeError(datosError.error || 'Error al registrar el usuario');
      }
    } catch (err) {
      console.error('Error al registrar el usuario:', err);
      setMensajeError('Error de conexión');
    }
  };

  // Navegar a InicioSesion.js (para el botón "Iniciar sesión")
  const manejarRedireccionInicioSesion = () => {
    navegar('/inicioSesion');
  };

  return (
    <div className="contenedorRegistro">
      <div className="tarjetaRegistro">
        <div className="seccionImagen">
          <img src={Logo} alt="Logo" className="logoImagen"/>
        </div>
        <div className="seccionFormulario">
          <div className="cabeceraRegistro">
            <h1>Regístrate</h1>
            <p>Crea una cuenta para disfrutar de Doggy World</p>
            {/* Solo se muestra en caso de error */}
            {mensajeError && <p className="mensajeError">{mensajeError}</p>}
          </div>
          <div className="cuerpoRegistro">
            <form onSubmit={manejarRegistro}>
              <label htmlFor="nombre">Nombre</label>
              <input type="text" id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required/>

              <label htmlFor="nombreUsuario">Nombre de usuario</label>
              <input type="text" id="nombreUsuario" value={nombreUsuario} onChange={(e) => setNombreUsuario(e.target.value)} required/>

              <label htmlFor="email">Correo electrónico</label>
              <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>

              <label htmlFor="contrasena">Contraseña</label>
              <input type="password" id="contrasena" value={contrasena} onChange={(e) => setContrasena(e.target.value)} required/>

              <label htmlFor="confirmarContrasena">Repetir contraseña</label>
              <input type="password" id="confirmarContrasena" value={confirmarContrasena} onChange={(e) => setConfirmarContrasena(e.target.value)} required/>

              <button type="submit" className="botonRegistroR">Registrarse</button>
              <button type="button" className="botonInicioSesionR" onClick={manejarRedireccionInicioSesion}>Iniciar sesión</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registro;