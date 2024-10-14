import React, {useState} from 'react';
import './CSSScreens/Contacto.css';

function Contacto() {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [mensaje, setMensaje] = useState('');

    // Comprobar campos, mostrar alerta y recargar la página tras enviar el formulario
    const manejarEnvio = (e) => {
        e.preventDefault();

        // Comprobar que no haya campos vacíos
        if (!nombre || !email || !mensaje) {
            alert('Por favor, completa todos los campos.');
            return;
        }

        // Comprobar que el correo electrónico sea válido
        if (!email.includes('@')) {
            alert('Por favor, introduce un correo electrónico válido.');
            return;
        }

        alert('Formulario enviado correctamente');
        window.scrollTo(0, 0);
        window.location.reload();
    };

    return (
        <div className="contactoContenedor">
            <h1 className="contactoTitulo">Contacto</h1>
            <hr className="contactoSubrayado"/>

            <div className="contactoContenido">
                {/* Formulario de contacto */}
                <div className="contactoFormulario">
                    <div className="contactoTexto">
                        <h2>¿Necesitas ayuda?</h2>
                        <h3>Contáctanos y te responderemos con la mayor brevedad posible.</h3>
                    </div>
                    <form onSubmit={manejarEnvio}>
                        <label htmlFor="nombre">Nombre:</label>
                        <input type="text" required value={nombre} onChange={(e) => setNombre(e.target.value)}/>

                        <label htmlFor="email">Correo electrónico:</label>
                        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}/>

                        <label htmlFor="mensaje">Mensaje:</label>
                        <textarea rows="5" required value={mensaje} onChange={(e) => setMensaje(e.target.value)}/>

                        <button type="submit" className="contactoEnviar">Enviar</button>
                    </form>
                </div>

                {/* Ubicación en Google Maps */}
                <div className="contactoMapa">
                    <iframe title="Ubicación oficinas Doggy World" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3037.528304672869!2d-3.7023913032104585!3d40.4192992!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd4229262237b1f5%3A0x23d9ca4c3f9a6ed8!2sGran%20Via%204!5e0!3m2!1ses!2ses!4v1728410331874!5m2!1ses!2ses"/>
                </div>
            </div>
        </div>
    );
}

export default Contacto;