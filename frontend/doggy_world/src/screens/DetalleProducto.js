import React, {useState, useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import axios from 'axios';
import ListaDeseos from './ImagenesScreens/listaDeseos.png';
import './CSSScreens/DetalleProducto.css';

function DetalleProducto() {
    const { productId } = useParams();
    const [producto, setProducto] = useState(null);
    const [productosRandom, setProductosRandom] = useState([]);
    const navegar = useNavigate();

    useEffect(() => {
        // Petición para obtener la información del producto seleccionado
        const obtenerProducto = async () => {
            try {
                const token = localStorage.getItem('token');
                const respuesta = await axios.get(`http://localhost:8000/api/doggyWorld/products/${productId}`, {
                    headers: {
                        token,
                        'Content-Type': 'application/json'
                    },
                });
                setProducto(respuesta.data);
            } catch (err) {
                console.error('Error al obtener el producto:', err);
            }
        };

        // Petición para obtener productos random
        const obtenerProductosRandom = async () => {
            try {
                const token = localStorage.getItem('token');
                const respuesta = await axios.get('http://localhost:8000/api/doggyWorld/products?random=8', {
                    headers: {
                        token,
                        'Content-Type': 'application/json'
                    },
                });
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

    // Añade el producto al carrito
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
            alert('Producto agregado al carrito correctamente');
        } catch (err) {
            console.error('Error al añadir al carrito:', err);
            alert('Error al añadir el producto al carrito');
        }
    };

    // Añade el producto a la lista de deseos
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
        <div className="detalle-producto-pagina">
            <h1 className="tituloDetalle">Detalle del producto</h1>
            <hr className="subrayadoDetalle" />

            {/* Muestra la información del producto seleccionado y permite añadirlo al carrito o a la lista de deseos */}
            {producto && (
                <div className="detalle-contenido">
                    <div className="imagen-contenedor">
                        <img src={producto.imagen} alt={producto.nombre} className="imagen-detalle" />
                    </div>

                    <div className="informacion-producto">
                        <h2 className="nombre-producto">{producto.nombre}</h2>
                        <p className="descripcion-producto">{producto.descripcion}</p>

                        <p className="precio-producto">{producto.precio.toFixed(2)} €</p>

                        <div className="botones-contenedor">
                            <button className="btn-carrito" onClick={manejadorCarrito}>
                                Añadir al carrito
                            </button>
                            <button className="btn-deseos" onClick={manejadorListaDeseos}>
                                <img src={ListaDeseos} alt="Añadir a lista de deseos" className="icono-deseos" />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Mapea el producto seleccionado para obtener su detalle */}
            <h2 className="tituloProductosDetalle">Te podría interesar</h2>
            <hr className="subrayadoProductosDetalle" />
            <div className="productos-random">
                {productosRandom.map((producto) => (
                    <div key={producto.id} className="producto-random" onClick={() => irADetalleProducto(producto.id)}>
                        <img src={producto.imagen} alt={producto.nombre} className="imagen-random" />
                        <p>{producto.nombre}</p>
                        <p>{producto.precio.toFixed(2)} €</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DetalleProducto;