import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './CSSScreens/PerfilPedidos.css';
import MenuPerfil from '../components/MenuPerfil.js';

function PerfilPedidos() {
    const [pedidos, setPedidos] = useState([]);

    useEffect(() => {
        // Petición para obtener los pedidos (mediante el token de sesión se accede al usuario y con el id del usuario se accede a los correspondientes pedidos)
        const obtenerPedidos = async () => {
            try {
                const token = localStorage.getItem('token');
                const respuesta = await axios.get('http://localhost:8000/api/doggyWorld/pedidos', {
                    headers: {
                        'token': token,
                        'Content-Type': 'application/json'
                    }
                });
                console.log('Respuesta de pedidos:', respuesta.data);
                // Obtener los pedidos del usuario correspondiente
                if (respuesta.status === 200) {
                    setPedidos(respuesta.data);
                // En caso del que el usuario no tenga ningun pedido se mostrará una alerta
                } else if (respuesta.status === 204) {
                    alert('No hay pedidos disponibles');
                }
            } catch (error) {
                console.error('Error al obtener los pedidos:', error.response ? error.response.data : error.message);
            }
        };
        obtenerPedidos();
    }, []);

    // Petición para canelar el pedido seleccionado mediante el id del pedido
    const cancelarPedido = async (pedidoId) => {
        try {
            const token = localStorage.getItem('token');
            const respuesta = await axios.delete('http://localhost:8000/api/doggyWorld/pedidos', {
                headers: {
                    'token': token,
                    'Content-Type': 'application/json'
                },
                params: { pedidoId: pedidoId }
            });
            // Mostrar alerta de éxito y actualizar el array de pedidos que se muestran por pantalla
            if (respuesta.status === 200) {
                alert('Pedido cancelado correctamente');
                setPedidos((prevPedidos) => prevPedidos.filter((pedido) => pedido.id !== pedidoId));
            }
        } catch (error) {
            console.error('Error al cancelar el pedido:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className="pedidosPagina">
            <MenuPerfil/>
            {pedidos.length === 0 ? (
                <p>No hay pedidos disponibles.</p>
            ) : (
                // Mapeo para iterar y mostrar todos los pedidos del usuario correspondiente
                pedidos.map((pedido) => (
                    <div key={pedido.id} className="PedidosPedido">
                        <div className="pedidosCabecera">
                            <h2 className="pedidosTitulo">Pedido: {pedido.id}</h2>
                            <div className="pedidosCancelar">
                                <button className="pedidosbtnCancelar" onClick={() => cancelarPedido(pedido.id)}>Cancelar pedido</button>
                                {/* Forzar todos los precios a poseer 2 decimales y el símbolo "€" correspondiente a las unidades al final */}
                                <span className="pedidosTotal">Total: 
                                    {typeof pedido.precioTotal === 'number' ? pedido.precioTotal.toFixed(2).replace('.', ',') : 'N/A'}€
                                </span>
                            </div>
                        </div>
                        <hr className="pedidosSubrayado"/>
                    </div>
                ))
            )}
        </div>
    );
}

export default PerfilPedidos;