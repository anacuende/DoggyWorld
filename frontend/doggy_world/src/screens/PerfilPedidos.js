import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './CSSScreens/PerfilPedidos.css';
import MenuPerfil from '../components/MenuPerfil.js';

function PerfilPedidos() {
    const [pedidos, setPedidos] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        // Petición para obtener los pedidos
        const obtenerPedidos = async () => {
            try {
                const respuesta = await axios.get('http://localhost:8000/api/doggyWorld/pedidos', {
                    headers: { token: token }
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
    }, [token]);

    // Petición para canelar el pedido seleccionado
    const cancelarPedido = async (pedidoId) => {
        try {
            const respuesta = await axios.delete('http://localhost:8000/api/doggyWorld/pedidos', {
                headers: { token: token },
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
                                <span className="pedidosTotal">Total: ${pedido.precioTotal}</span>
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