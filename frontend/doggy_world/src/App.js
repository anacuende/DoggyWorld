import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import InicioSesion from './screens/InicioSesion';
import Registro from './screens/Registro';
import Cabecera from './components/Cabecera';
import Inicio from './screens/Inicio';
import Productos from './screens/Productos';
import DetalleProducto from './screens/DetalleProducto';
import PreguntasFrecuentes from './screens/PreguntasFrecuentes';
import Carrito from './screens/Carrito';
import PerfilModificarDatos from './screens/PerfilModificarDatos';
import PerfilListaDeseos from './screens/PerfilListaDeseos';
import PerfilPedidos from './screens/PerfilPedidos';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/inicioSesion"/>}/>
        <Route path="/inicioSesion" element={<InicioSesion/>}/>
        <Route path="/registro" element={<Registro/>}/>
        <Route element={<Cabecera/>}>
		      <Route path="inicio" element={<Inicio/>}/>
          <Route path="productos" element={<Productos/>}/>
          <Route path="productos/:productId" element={<DetalleProducto/>}/>
          <Route path="preguntasFrecuentes" element={<PreguntasFrecuentes/>}/>
          <Route path="carrito" element={<Carrito/>}/>
          <Route path="perfilModificarDatos" element={<PerfilModificarDatos/>}/>
          <Route path="perfilListaDeseos" element={<PerfilListaDeseos/>}/>
          <Route path="perfilPedidos" element={<PerfilPedidos/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;