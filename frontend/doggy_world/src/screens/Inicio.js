import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import Yorkies from './ImagenesScreens/yorkies.png';
import './CSSScreens/Inicio.css';

function Inicio() {
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState(null);
  const navegar = useNavigate();

  // Petición para obtener productos aleatorios
  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const token = localStorage.getItem('token');
        const respuesta = await axios.get('http://localhost:8000/api/doggyWorld/products?random=9', {
          headers: {
            'token': token,
            'Content-Type': 'application/json'
          },
        });
        // Guardar los productos obtenidos
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
  }, [navegar]);

  // Navegar al detalle del producto seleccionado
  const irADetalleProducto = (productId) => {
    navegar(`/productos/${productId}`);
  };

  return (
    <div className="inicioContenedor">
      <div className="inicioColumna izquierda">
        <h2>Inicio</h2>
        <hr className="subrayadoInicio"/>
        <p>A veces es agotador buscar un producto concreto para tu perro, sobre todo cuando se trata de algún producto medicinal como un alimento específico o un champú que trate su tipo de pelaje de la mejor forma. En Doggy World esto se acabó, ya que disponemos de una amplia variedad de productos y tú podrás obtenerlos todos aquí, con solo un click. Explora nuestra página y descubre el lugar donde conseguir todo lo que necesitas para tu mejor amigo.</p>
        <img src={Yorkies} alt="Yorkies" className="imagenYorkies"/>
      </div>
      
      <div className="inicioColumna derecha">
        <h2>Últimas novedades</h2>
        <hr className="subrayadoInicio"/>
        {/* Mapeo para mostrar los datos de los productos obtenidos en "obtenerProductos" */}
        {error ? (
          <p className="mensajeError">{error}</p>
        ) : (
          <div className="productosInicio">
            {productos.map((producto) => (
              <div key={producto.id} className="producto" onClick={() => irADetalleProducto(producto.id)}>
                <img src={producto.imagen} alt={producto.nombre} className="imagenProducto"/>
                <p>{producto.nombre}</p>
                <p>{producto.precio.toFixed(2)} €</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Inicio;