import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import InicioSesion from './screens/InicioSesion';
import Registro from './screens/Registro';
import Cabecera from './components/Cabecera';
import Inicio from './screens/Inicio';
import Productos from './screens/Productos';
import DetalleProducto from './screens/DetalleProducto';
import Carrito from './screens/Carrito';
import PerfilModificarDatos from './screens/PerfilModificarDatos';
import PerfilListaDeseos from './screens/PerfilListaDeseos';

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
          <Route path="carrito" element={<Carrito/>}/>
          <Route path="perfilModificarDatos" element={<PerfilModificarDatos/>}/>
          <Route path="perfilListaDeseos" element={<PerfilListaDeseos/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;