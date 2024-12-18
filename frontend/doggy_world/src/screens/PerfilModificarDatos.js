import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './CSSScreens/PerfilModificarDatos.css';
import MenuPerfil from '../components/MenuPerfil.js';

function PerfilModificarDatos() {
    const [errores, setErrores] = useState({});
    const [datosUsuario, setDatosUsuario] = useState({
        nombre: '',
        nombreUsuario: '',
        correoElectronico: ''
    });
    const [contrasenas, setContrasenas] = useState({
        contrasena: '',
        confirmarContrasena: ''
    });

    useEffect(() => {
        // Petición para obtener los datos del usuario
        const obtenerDatosUsuario = async () => {
            try {
                const token = localStorage.getItem('token');
                const respuesta = await axios.get('http://localhost:8000/api/doggyWorld/user/register', {
                    headers: {
                        'token': token,
                        'Content-Type': 'application/json'
                    },
                });
                // Asignar cada dato a su correspondiente campo para mostrarlos por pantalla
                setDatosUsuario({
                    nombre: respuesta.data.name,
                    nombreUsuario: respuesta.data.username,
                    correoElectronico: respuesta.data.email
                });
            } catch (error) {
                console.error('Error al obtener los datos del usuario', error);
            }
        };
        obtenerDatosUsuario();
    }, []);

    // Controla los cambios en los valores de los inputs para posteriormente poder enviar los cambios si el usuario lo desea
    const manejarCambio = (e) => {
        const { name, value } = e.target;
        setDatosUsuario({
            ...datosUsuario,
            [name]: value
        });
    };
    
    // Controla los cambios en los valores de las contrasenas para posteriormente compararlos en caso de ser enviados
    const manejarCambioContrasenas = (e) => {
        const { name, value } = e.target;
        setContrasenas({
            ...contrasenas,
            [name]: value
        });
    };

    // Validar los campos antes de actualizar los datos del usuario (ningún campo puede estar vacío)
    const validarFormulario = () => {
        const erroresTemp = {};

        if (!datosUsuario.nombre.trim()) {
            erroresTemp.nombre = 'El nombre no puede estar vacío.';
        }

        if (!datosUsuario.nombreUsuario.trim()) {
            erroresTemp.nombreUsuario = 'El nombre de usuario no puede estar vacío.';
        }

        if (!datosUsuario.correoElectronico.trim()) {
            erroresTemp.correoElectronico = 'El correo electrónico no puede estar vacío.';
        // El correo electrónico ha de tener un "@" para ser válido
        } else if (!datosUsuario.correoElectronico.includes('@')) {
            erroresTemp.correoElectronico = 'El correo electrónico debe contener un @.';
        }

        setErrores(erroresTemp);
        return Object.keys(erroresTemp).length === 0;
    };

    // Petición para actualizar los datos del usuario
    const actualizarDatosUsuario = async () => {
        // Si algo no es correcto no se realiza la petición
        if (!validarFormulario()) {
            return;
        }
        // Sólo modifica los datos que el usuario desee, el resto permanecerán iguales
        try {
            const token = localStorage.getItem('token');
            const respuesta = await axios.patch('http://localhost:8000/api/doggyWorld/user', {
                ...datosUsuario,
                // Se obtiene la contraseña en caso de que se quiera modificar, sino permenecerá la ya existente
                password: contrasenas.contrasena,
                confirmPassword: contrasenas.confirmarContrasena
            }, {
                headers: {
                    'token': token,
                    'Content-Type': 'application/json'
                }
            });

            // Si todo es correcto, se muestra una alerta de éxito y se recarga la página
            if (respuesta.status === 200) {
                alert('Usuario actualizado correctamente');
                window.scrollTo(0, 0);
                window.location.reload();
            }
        } catch (error) {
            // Manejo detallado de errores
            if (error.response && error.response.data) {
                // Mostrar errores específicos, si los hay
                setErrores(error.response.data);
            } else {
                console.error('Error desconocido', error);
            }
        }
    };

    return (
        <div className="perfilUsuarioPagina">
            <MenuPerfil/>
            <div className="contenidoPerfil">
                <div className="seccionPerfil">
                    {/* Formulario de datos */}
                    <form className="formPerfil">
                        <label>Nombre:</label>
                        <input type="text" name="nombre" value={datosUsuario.nombre} onChange={manejarCambio}/>
                        {errores.nombre && <p className="error">{errores.nombre}</p>}

                        <label>Nombre de Usuario:</label>
                        <input type="text" name="nombreUsuario" value={datosUsuario.nombreUsuario} onChange={manejarCambio}/>
                        {errores.nombreUsuario && <p className="error">{errores.nombreUsuario}</p>}

                        <label>Correo Electrónico:</label>
                        <input type="email" name="correoElectronico" value={datosUsuario.correoElectronico} onChange={manejarCambio}/>
                        {errores.correoElectronico && <p className="error">{errores.correoElectronico}</p>}
                    </form>

                    <h1 className="tituloPerfil">Cambiar Contraseña</h1>
                    <hr className="subrayadoPerfil"/>

                    {/* Formulario de contraseña */}
                    <form className="formPerfil">
                        <label>Contraseña:</label>
                        <input type="password" name="contrasena" value={contrasenas.contrasena} onChange={manejarCambioContrasenas}/>
                        {errores.contrasena && <p className="error">{errores.contrasena}</p>}

                        <label>Repetir Contraseña:</label>
                        <input type="password" name="confirmarContrasena" value={contrasenas.confirmarContrasena} onChange={manejarCambioContrasenas}/>
                        {errores.confirmarContrasena && <p className="error">{errores.confirmarContrasena}</p>}
                    </form>

                    <button className="btnActualizar" onClick={actualizarDatosUsuario}>Actualizar Información</button>
                </div>
            </div>
        </div>
    );
}

export default PerfilModificarDatos;