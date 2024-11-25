import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import './CSSScreens/Productos.css';

function Productos() {
    const navegar = useNavigate();
    const [productos, setProductos] = useState([]);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(0);
    const [error, setError] = useState(null);

    // Definición de las categorías
    const categorias = [
        {id: 0, nombre: 'Todos'},
        {id: 1, nombre: 'Alimentación'},
        {id: 2, nombre: 'Juguetes'},
        {id: 3, nombre: 'Paseo'},
        {id: 4, nombre: 'Higiene'},
        {id: 5, nombre: 'Hogar'}
    ];

    useEffect(() => {
        // Petición para obtener los productos según su categoría
        const obtenerProductos = async () => {
            try {
                const token = localStorage.getItem('token');
                let url = 'http://localhost:8000/api/doggyWorld/products';

                // Parámetros para la petición según la categoría seleccionada
                // Si la categoría es "0" se obtendrán todos los productos de la base de datos de forma desordenada mediante un random
                if (categoriaSeleccionada === 0) {
                    url += '?random=50';
                // Si la categoría es otra se obtendrán los productos ordenados por id correspondientes a la categoría seleccionada
                } else {
                    url += `?category=${categoriaSeleccionada}`;
                }

                const respuesta = await axios.get(url, {
                    headers: {
                        'token': token,
                        'Content-Type': 'application/json'
                    }
                });

                // Lista de productos a mostrar por pantalla obtenida
                setProductos(respuesta.data);
            } catch (err) {
                console.error('Error al obtener productos:', err);
                setError('No se pudieron cargar los productos.');
                // Si el usuario no tiene una sesión iniciada se le devolverá a la pantalla de Inicio de sesión
                if (err.response && err.response.status === 401) {
                    localStorage.removeItem('token');
                    navegar('/inicioSesion');
                }
            }
        };

        obtenerProductos();
    }, [categoriaSeleccionada]);

    // Cambiar a la categoría seleccionada
    const manejarCambioCategoria = (idCategoria) => {
        setCategoriaSeleccionada(idCategoria);
    };

    // Navegar al detalle del producto seleccionado
    const irADetalleProducto = (productId) => {
        navegar(`/productos/${productId}`);
    };

    return (
        <div className="productosPagina">
            <h1 className="tituloProductos">Productos</h1>
            <hr className="subrayadoProductos"/>
            {/* Mapea el id del producto de la categoría seleccionada */}
            <div className="botonesCategorias">
                {categorias.map((categoria) => (
                    <button key={categoria.id} className={`botonCategoria ${categoriaSeleccionada === categoria.id ? 'activo' : ''}`} onClick={() => manejarCambioCategoria(categoria.id)}>
                        {categoria.nombre}
                    </button>
                ))}
            </div>
            
            {/* Mapea los productos de la categoría seleccionda */}
            <div className="productosProductos">
                {productos.map((producto) => (
                    <div key={producto.id} className="producto" onClick={() => irADetalleProducto(producto.id)}>
                        <img src={producto.imagen} alt={producto.nombre} className="imagenProducto"/>
                        <p className="pProductos">{producto.nombre}</p>
                        <p className="pProductos">{producto.precio.toFixed(2)} €</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Productos;