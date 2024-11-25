import React, {useState, useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import axios from 'axios';
import ListaDeseos from './ImagenesScreens/listaDeseos.png';
import './CSSScreens/DetalleProducto.css';

function DetalleProducto() {
    const navegar = useNavigate();
    const {productId} = useParams();
    const [producto, setProducto] = useState(null);
    const [productosRandom, setProductosRandom] = useState([]);

    useEffect(() => {
        // Petición para obtener la información del producto seleccionado, mediante su id
        const obtenerProducto = async () => {
            try {
                const token = localStorage.getItem('token');
                const respuesta = await axios.get(`http://localhost:8000/api/doggyWorld/products/${productId}`, {
                    headers: {
                        token,
                        'Content-Type': 'application/json'
                    },
                });
                // Guardar la información obtenida del producto seleccionado
                setProducto(respuesta.data);
            } catch (err) {
                console.error('Error al obtener el producto:', err);
            }
        };

        // Petición para obtener productos random para mostrar como sugerencias al usuario debajo de la información del producto
        const obtenerProductosRandom = async () => {
            try {
                const token = localStorage.getItem('token');
                const respuesta = await axios.get('http://localhost:8000/api/doggyWorld/products?random=8', {
                    headers: {
                        token,
                        'Content-Type': 'application/json'
                    },
                });
                // Guardar los productos obtenidos
                setProductosRandom(respuesta.data);
            } catch (err) {
                console.error('Error al obtener productos aleatorios:', err);
            }
        };
        obtenerProducto();
        obtenerProductosRandom();
    }, [productId]);

    // Scrollear arriba automáticamente la página al cambiar de producto
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [productId]);

    // Añade el producto, mediante su id, al carrito del usuario correspondiente
    const manejadorCarrito = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.post(
                'http://localhost:8000/api/doggyWorld/cart',
                { producto_id: productId, cantidad: 1 },
                {
                    headers: {
                        token, 
                        'Content-Type': 'application/json'
                    },
                }
            );
            // Mostrar alerta en caso de que todo sea correcto
            alert('Producto agregado al carrito correctamente');
        } catch (err) {
            console.error('Error al añadir al carrito:', err);
            alert('Error al añadir el producto al carrito');
        }
    };

    // Añade el producto, mediante su id, a la lista de deseos del usuario correspondiente
    const manejadorListaDeseos = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.post(
                'http://localhost:8000/api/doggyWorld/wishlist',
                { producto_id: productId },
                {
                    headers: {
                        token,
                        'Content-Type': 'application/json'
                    },
                }
            );
            // Mostrar alerta de éxito en caso de que todo sea correcto
            alert('Producto agregado a la lista de deseos correctamente');
        } catch (err) {
            console.error('Error al añadir a la lista de deseos:', err);
            alert('Error al añadir el producto a la lista de deseos');
        }
    };

    // Navegar al detalle del producto seleccionado
    const irADetalleProducto = (productId) => {
        navegar(`/productos/${productId}`);
    };

    return (
        <div className="detalleProductoPagina">
            <h1 className="tituloDetalle">Detalle del producto</h1>
            <hr className="subrayadoDetalle"/>

            {/* Muestra la información del producto seleccionado y permite añadirlo al carrito o a la lista de deseos mediante los botones */}
            {producto && (
                <div className="detalleContenido">
                    <div className="imagenContenedor">
                        <img src={producto.imagen} alt={producto.nombre} className="imagenDetalle"/>
                    </div>

                    <div className="informacionProducto">
                        <h2 className="nombreProducto">{producto.nombre}</h2>
                        <p className="descripcionProducto">{producto.descripcion}</p>
                        <p className="precioProducto">{producto.precio.toFixed(2)} €</p>
                        <div className="botonesContenedor">
                            <button className="botonCarrito" onClick={manejadorCarrito}>Añadir al carrito</button>
                            <button className="botonDeseos" onClick={manejadorListaDeseos}>
                                <img src={ListaDeseos} alt="Añadir a lista de deseos" className="iconoDeseos"/>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Mapea el producto seleccionado para obtener su detalle */}
            <h2 className="tituloProductosDetalle">Te podría interesar</h2>
            <hr className="subrayadoProductosDetalle"/>
            <div className="productosRandom">
                {productosRandom.map((producto) => (
                    <div key={producto.id} className="productoRandom" onClick={() => irADetalleProducto(producto.id)}>
                        <img src={producto.imagen} alt={producto.nombre} className="imagenRandom"/>
                        <p>{producto.nombre}</p>
                        <p>{producto.precio.toFixed(2)} €</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DetalleProducto;