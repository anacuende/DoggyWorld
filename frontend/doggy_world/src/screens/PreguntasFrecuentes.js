import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import './CSSScreens/PreguntasFrecuentes.css';

function PreguntasFrecuentes() {
    const [preguntaActiva, setPreguntaActiva] = useState(null);
    // Preguntas y respuestas que se mostrarán por pantalla
    const preguntasRespuestas = [
        { 
            pregunta: '¿Es mejor un alimento genérico o específico/medicinal?', 
            respuesta: 'Cada perro posee unas necesidades distintas. Recomendamos que consulte previamente con su veterinario antes de elegir la alimentación de su mejor amigo. En Doggy World disponemos de una amplia variedad de productos alimenticios donde podrás conseguir tanto un producto en concreto como otras alternativas con las mismas propiedades o similares.' 
        },
        { 
            pregunta: '¿Cómo puedo conocer bien cada alimento para saber si es lo que busco?', 
            respuesta: 'Cada producto de nuestra web posee una breve descripción del mismo. En este caso proporcionamos informacicón sobre a qué perros está enfocado cada alimento, aunque si desea saber las especificaciones del producto le recomendamos visitar el sitio web o aplicación oficial de la marca.' 
        },
        { 
            pregunta: '¿Ofrecen asesoramiento nutricional para elegir una correcta alimentación para mi perro?', 
            respuesta: 'Actualmente no disponemos de este servicio ya que no contamoss con personal altamente cualificado para ello. Recomendamos consultarlo con su veterinario ya que este conocerá la situación del perro de manera más detallada.'
        },
        { 
            pregunta: '¿Qué hago si mi perro es alérgico a un producto?', 
            respuesta: 'Lo primero que deberá hacer si nota una reacción anormal en su perro es llevarlo al veterinario lo antes posible para solucionar cualquier posible problema. Si esta situación ha sido causada por alguno de nuestros productos porque este se encontraba en mal estado o defectuoso o simplemente usted como dueño desconocía dicho problema de salud en su perro respecto a un material, componente alimeticio, etc. podrá pedir una devolución del importe contactando con nosotros, adjuntando una copia del parte médico y de los documentos de confirmación y correcto recibimiento de la compra.'
        },
        { 
            pregunta: '¿Hay ropa como abrigos o jerséis? ¿Se pueden personalizar?', 
            respuesta: 'En este momento no disponemos de prendas de ropa para nuestros peludos, aunque preveemos implementarlas pronto. Les podemos adelantar que sí serán personalizables dichas prendas.' 
        },
        { 
            pregunta: '¿Se pueden personalizar las correas?', 
            respuesta: 'Actualmente no disponemos de ese servicio pero estará disponible próximamente.' 
        },
        { 
            pregunta: '¿Es posible hacer un pedido para regalo?', 
            respuesta: 'No disponemos de este servicio pero estamos valorando su implementación.'
        },
        { 
            pregunta: '¿Existen tarjetas regalo para gastar en tienda?', 
            respuesta: 'No, actualmente no disponemos de este servicio.'
        },
        { 
            pregunta: '¿Cuál es el tiempo de envío?', 
            respuesta: 'Entre 3 y 7 días hábiles (España) y con un máximo de 30 días naturales (internacional).'
        },
        { 
            pregunta: '¿Hay envíos internacionales?', 
            respuesta: 'Sí, enviamos a cualquier parte del mundo. El plazo máximo de entrega para los pedidos fuera de España es de 30 días naturales.' 
        },
        { 
            pregunta: '¿Cómo realizo un pedido?', 
            respuesta: 'Para realizar un pedido, simplemente añade los productos a tu carrito y rellena los campos requeridos con tus datos para completar el proceso de compra. Después pulsa el botón "Realizar pedido" y listo. ¡Tu pedido está en camino!' 
        },
        { 
            pregunta: '¿Cómo puedo rastrear mi pedido?', 
            respuesta: 'Deberás hacerlo mediante la aplicación o sitio web proporcionado por la propia empresa de reparto, ya que desde Doggy World no disponemos de esta función.'
        },
        { 
            pregunta: '¿Puedo cancelar un pedido?', 
            respuesta: 'Sí, tan solo tienes que acceder a tu perfil y seleccionar la opción "Mis pedidos". Busca el pedido que deseas cancelar y selecciona la opción "Cancelar pedido". Esa acción será suficiente para cancelar el pedido. Se realizará el intrego del importe en un plazo máximo de 7 días (puede tardar más o menos tiempo según el banco).' 
        }
    ];

    // Mostrar la respuesta de la pregunta seleccionada
    const manejadorRespuesta = (index) => {
        setPreguntaActiva(preguntaActiva === index ? null : index);
    };

    return (
        <div className="PFContenedor">
            <h1 className="PFTitulo">Preguntas Frecuentes</h1>
            <hr className="PFSubrayado"/>

            <h3 className="PFIntro">Aquí puedes consultar las respuestas a algunas de las preguntas más frecuentes de nuestros usuarios, quizás te sirven de ayuda. Igualmente, si tu duda no está aquí resuelta puedes consultarnos directamente a través de nuestro formulario de <Link to="/contacto">Contacto</Link>.</h3>
            {/* Mapeo para iterar y mostrar todas las preguntas */}
            {preguntasRespuestas.map((item, index) => (
                <div key={index} className="PFItem">
                    <div className="PFPregunta" onClick={() => manejadorRespuesta(index)}>
                        <span>{item.pregunta}</span>
                        <span className={`PFFlecha ${preguntaActiva === index ? 'abierta' : ''}`}>&#9662;</span>
                    </div>
                    {/* Mostrar respuesta de la pregunta seleccionada mediante el "manejadorRespuesta" */}
                    <div className={`PFRespuesta ${preguntaActiva === index ? 'PFRespuestaVisible' : ''}`}>
                        {item.respuesta}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default PreguntasFrecuentes;