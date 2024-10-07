import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CSSScreens/Carrito.css';

function Carrito() {
    const [productosCarrito, setProductosCarrito] = useState([]);
    const [errorGeneral, setErrorGeneral] = useState(null);
    const [pedidoExitoso, setPedidoExitoso] = useState(false);
    const [formData, setFormData] = useState({
        direccion: '',
        localidad: '',
        pais: '',
        titularTarjeta: '',
        numTarjeta: '',
        cadTarjeta: '',
        cvv: ''
    });
    const [erroresCampos, setErroresCampos] = useState({}); // Errores específicos por campo

    const navigate = useNavigate();

    useEffect(() => {
        // Petición para obtener los productos del carrito del usuario
        const obtenerProductosCarrito = async () => {
            try {
                const token = localStorage.getItem('token');
                const respuesta = await axios.get('http://localhost:8000/api/doggyWorld/cart', {
                    headers: {
                        'token': token,
                        'Content-Type': 'application/json',
                    },
                });
                setProductosCarrito(respuesta.data);
            } catch (err) {
                console.error('Error al obtener productos del carrito:', err);
                setErrorGeneral('No se pudieron cargar los productos del carrito.');
                setProductosCarrito([]);
            }
        };
        obtenerProductosCarrito();
    }, []);

    // Petición para eliminar un producto del carrito del usuario
    const eliminarProducto = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:8000/api/doggyWorld/cart?productId=${id}`, {
                headers: {
                    'token': token,
                },
            });
            setProductosCarrito(productosCarrito.filter((producto) => producto.id !== id));
        } catch (err) {
            console.error('Error al eliminar producto:', err);
        }
    };

    // Controla lsn cambios en los valores de los inputs
    const manejarCambioInput = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
        setErroresCampos((prevErrores) => ({ ...prevErrores, [name]: null })); 
    };

    // Almacena la cantidad de cada producto en la base de datos
    const cambiarCantidadProducto = async (e, id) => {
        var nuevaCantidad = parseInt(e.target.value, 10);
        
        if (!nuevaCantidad || nuevaCantidad < 1) {
            nuevaCantidad = 1;
        }

        try {
            const token = localStorage.getItem('token');
    
            // Crear la estructura de datos a enviar
            const productoData = {
                producto_id: id,
                cantidad: nuevaCantidad
            };
    
            // Petición para almacenar los datos
            const respuesta = await axios.post('http://localhost:8000/api/doggyWorld/cart', productoData, {
                headers: {
                    'token': token,
                    'Content-Type': 'application/json',
                },
            });
            
        } catch (err) {}
    };

    // Valida los campos del formulario antes de enviarlos al servidor
    const validarCampos = () => {
        const nuevosErrores = {};

        // Validación del número de tarjeta (16 dígitos numéricos)
        const numTarjetaRegex = /^\d{16}$/;
        if (!numTarjetaRegex.test(formData.numTarjeta)) {
            nuevosErrores.numTarjeta = 'El número de tarjeta debe tener 16 dígitos.';
        }

        // Validación de la fecha de caducidad (MM/AA)
        const cadTarjetaRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
        if (!cadTarjetaRegex.test(formData.cadTarjeta)) {
            nuevosErrores.cadTarjeta = 'La fecha de caducidad debe estar en formato MM/AA.';
        }

        // Validación del CVV (3 dígitos)
        const cvvRegex = /^\d{3}$/;
        if (!cvvRegex.test(formData.cvv)) {
            nuevosErrores.cvv = 'El CVV debe tener 3 dígitos.';
        }

        return nuevosErrores;
    };

    // Tramita el pedido
    const tramitarPedido = async (e) => {
        e.preventDefault();
        setErrorGeneral(null);
        setErroresCampos({});
    
        const nuevosErrores = validarCampos();
        
        // Si hay algún error no realiza la solicitud
        if (Object.keys(nuevosErrores).length > 0) {
            setErroresCampos(nuevosErrores);
            return;
        }
    
        try {
            const token = localStorage.getItem('token');
    
            // Crear la estructura de datos a enviar
            const pedidoData = {
                direccion: formData.direccion,
                localidad: formData.localidad,
                pais: formData.pais,
                titularTarjeta: formData.titularTarjeta,
                numTarjeta: formData.numTarjeta,
                cadTarjeta: formData.cadTarjeta,
                CVV: parseInt(formData.cvv),
                productos: productosCarrito.map((producto) => ({
                    id: producto.id,
                    cantidad: producto.cantidad
                }))
            };
    
            // Petición para tramitar el pedido
            const respuesta = await axios.post('http://localhost:8000/api/doggyWorld/pedidos', pedidoData, {
                headers: {
                    'token': token,
                    'Content-Type': 'application/json',
                },
            });
    
            // Verificar la respuesta
            if (respuesta.status === 201) {
                setPedidoExitoso(true);
                setProductosCarrito([]); // Vaciar el carrito después de realizar el pedido
                setTimeout(() => {
                    navigate('/inicio');
                }, 3000);
            }
        } catch (err) {
            console.error('Error al tramitar el pedido:', err);
    
            // Manejo detallado de errores
            if (err.response) {
                console.log('Datos del error:', err.response.data);
                if (err.response.data.errors) {
                    // Mostrar errores específicos si los hay
                    setErroresCampos(err.response.data.errors);
                } else {
                    setErrorGeneral('Hubo un error al tramitar el pedido. Por favor, inténtalo de nuevo.');
                }
            } else {
                setErrorGeneral('Hubo un error en la conexión al servidor.');
            }
        }
    };    

    return (
        <div className="carritoContenedor">
            <div className="carritoColumna carritoIzquierda">
              <h2>Resumen de compra</h2>
              <hr className="subrayadoCarrito"/>

              {errorGeneral && (
                <p className="mensajeErrorCarrito">{errorGeneral}</p>
              )}

              {productosCarrito.length > 0 ? (
                <div className="productosCarrito">
                  {productosCarrito.map((producto) => (
                    <div key={producto.id} className="productoCarrito">
                      <img src={producto.imagen} alt={producto.nombre} className="imagenProductoCarrito"/>
                      <div className="carritoInfoProducto">
                        <div className="nombrePrecioCantidad">
                          <p className="nombreProducto">{producto.nombre}</p>
                          <div className="precioCantidad">
                            <p className="precioProducto">{producto.precio.toFixed(2)} €</p>
                            <input type="number" min="1" defaultValue={producto.cantidad} className="carritoInputCantidad" onChange={(e) => cambiarCantidadProducto(e, producto.id)}/>
                          </div>
                        </div>
                        <button onClick={() => eliminarProducto(producto.id)} className="carritoBotonEliminar">Eliminar</button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="carritoVacio">No hay productos en el carrito</p>
              )}
            </div>

            <div className="carritoColumna carritoDerecha">
                <h2>Dirección de entrega</h2>
                <hr className="subrayadoCarrito"/>
                <div className="cuerpoCarrito">
                    {pedidoExitoso ? (
                        alert('¡Pedido realizado correctamente!')
                    ) : (
                        <form onSubmit={tramitarPedido}>
                            <div>
                                <label htmlFor="direccion">Dirección:</label>
                                <input type="text" id="direccion" name="direccion" className="carritoInput" value={formData.direccion} onChange={manejarCambioInput} required/>
                                {erroresCampos.direccion && <p className="mensajeErrorCarrito">{erroresCampos.direccion}</p>}
                            </div>
                            <div>
                                <label htmlFor="localidad">Localidad:</label>
                                <input type="text" id="localidad" name="localidad" className="carritoInput" value={formData.localidad} onChange={manejarCambioInput} required/>
                                {erroresCampos.localidad && <p className="mensajeErrorCarrito">{erroresCampos.localidad}</p>}
                            </div>
                            <div>
                                <label htmlFor="pais">País:</label>
                                <input type="text" id="pais" name="pais" className="carritoInput" value={formData.pais} onChange={manejarCambioInput} required/>
                                {erroresCampos.pais && <p className="mensajeErrorCarrito">{erroresCampos.pais}</p>}
                            </div>
                            <h2>Datos de pago</h2>
                            <hr className="subrayadoCarrito"/>
                            <div>
                                <label htmlFor="titularTarjeta">Titular de la tarjeta:</label>
                                <input type="text" id="titularTarjeta" name="titularTarjeta" className="carritoInput" value={formData.titularTarjeta} onChange={manejarCambioInput} required/>
                                {erroresCampos.titularTarjeta && <p className="mensajeErrorCarrito">{erroresCampos.titularTarjeta}</p>}
                            </div>
                            <div>
                                <label htmlFor="numTarjeta">Número de tarjeta:</label>
                                <input type="text" id="numTarjeta" name="numTarjeta" className="carritoInput" value={formData.numTarjeta} onChange={manejarCambioInput} required/>
                                {erroresCampos.numTarjeta && <p className="mensajeErrorCarrito">{erroresCampos.numTarjeta}</p>}
                            </div>
                            <div>
                                <label htmlFor="cadTarjeta">Fecha de caducidad (MM/AA):</label>
                                <input type="text" id="cadTarjeta" name="cadTarjeta" className="carritoInput" value={formData.cadTarjeta} onChange={manejarCambioInput} required/>
                                {erroresCampos.cadTarjeta && <p className="mensajeErrorCarrito">{erroresCampos.cadTarjeta}</p>}
                            </div>
                            <div>
                                <label htmlFor="cvv">CVV:</label>
                                <input type="text" id="cvv" name="cvv" className="carritoInput" value={formData.cvv} onChange={manejarCambioInput} required/>
                                {erroresCampos.cvv && <p className="mensajeErrorCarrito">{erroresCampos.cvv}</p>}
                            </div>
                            <button type="submit" className="botonComprarCarrito">Realizar pedido</button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Carrito;
