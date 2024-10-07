import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CSSScreens/PerfilListaDeseos.css';
import MenuPerfil from '../components/MenuPerfil.js';

function PerfilListaDeseos() {
    const navegar = useNavigate();
    const [productosDeseados, setProductosDeseados] = useState([]);
    const [error, setError] = useState(null);

    // Petición para obtener los productos de la lista de deseos
    useEffect(() => {
        const obtenerListaDeseos = async () => {
            try {
                const token = localStorage.getItem('token');
                const respuesta = await axios.get('http://localhost:8000/api/doggyWorld/wishlist', {
                    headers: {
                        'token': token,
                        'Content-Type': 'application/json'
                    }
                });

                if (respuesta.status === 204) {
                    setError('La lista de deseos está vacía.');
                } else {
                    setProductosDeseados(respuesta.data);
                }
            } catch (err) {
                // Manejo detallado de errores
                console.error('Error al obtener la lista de deseos:', err);
                setError('No se pudo cargar la lista de deseos.');
            }
        };

        obtenerListaDeseos();
    }, []);

    // Petición para eliminar el producto seleccionado de la lista de deseos
    const eliminarDeListaDeseos = async (productId) => {
        const token = localStorage.getItem('token');
        try {
            await axios.delete(`http://localhost:8000/api/doggyWorld/wishlist?productId=${productId}`, {
                headers: {
                    'token': token,
                    'Content-Type': 'application/json'
                }
            });
            setProductosDeseados(productosDeseados.filter(producto => producto.id !== productId));
        } catch (err) {
            console.error('Error al eliminar producto:', err);
        }
    };

    // Petición para añadir el producto seleccionado al carrito
    const anadirAlCarrito = async (productoId) => {
        const token = localStorage.getItem('token');
        try {
            await axios.post('http://localhost:8000/api/doggyWorld/cart', {
                producto_id: productoId,
                cantidad: 1
            }, {
                headers: {
                    'token': token,
                    'Content-Type': 'application/json'
                }
            });
            alert('Producto añadido al carrito');
        } catch (err) {
            console.error('Error al agregar producto al carrito:', err);
        }
    };

    // Navegar al detalle del producto
    const irADetalleProducto = (productId) => {
        navegar(`/productos/${productId}`);
    };

    return (
        <div className="listaDeseosPagina">
            <MenuPerfil />
            {/* Mostrar errores */}
            {error && <p className="listaDeseosError">{error}</p>}

            <div className="listaDeseosProductos">
                {productosDeseados.map((producto) => (
                    <div key={producto.id} className="listaDeseosProducto" onClick={() => irADetalleProducto(producto.id)}>
                        <img src={producto.imagen} alt={producto.nombre} className="listaDeseosImagenProducto"/>
                        <p className="listaDeseospProductos">{producto.nombre}</p>
                        <p className="listaDeseospProductos">{producto.precio.toFixed(2)} €</p>
                        <button className="listaDeseosBtnCarrito" onClick={(e) => { e.stopPropagation(); anadirAlCarrito(producto.id); }}>Añadir al carrito</button>
                        <button className="listaDeseosBtnEliminar" onClick={(e) => { e.stopPropagation(); eliminarDeListaDeseos(producto.id); }}>Eliminar</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PerfilListaDeseos;
