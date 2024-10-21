import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './CSSScreens/PerfilPedidos.css';
import MenuPerfil from '../components/MenuPerfil.js';

function PerfilPedidos() {
    const [pedidos, setPedidos] = useState([]);

    useEffect(() => {
        // Petición para obtener los pedidos
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
                if (respuesta.status === 200) {
                    setPedidos(respuesta.data);
                } else if (respuesta.status === 204) {
                    alert('No hay pedidos disponibles');
                }
            } catch (error) {
                console.error('Error al obtener los pedidos:', error.response ? error.response.data : error.message);
            }
        };
        obtenerPedidos();
    }, []);

    // Petición para canelar el pedido seleccionado
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
                pedidos.map((pedido) => (
                    <div key={pedido.id} className="PedidosPedido">
                        <div className="pedidosCabecera">
                            <h2 className="pedidosTitulo">Pedido: {pedido.id}</h2>
                            <div className="pedidosCancelar">
                                <button className="pedidosbtnCancelar" onClick={() => cancelarPedido(pedido.id)}>Cancelar pedido</button>
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