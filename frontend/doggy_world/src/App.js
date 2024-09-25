import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import InicioSesion from './screens/InicioSesion';
import Registro from './screens/Registro';
import Cabecera from './components/Cabecera';
import Inicio from './screens/Inicio';
import Productos from './screens/Productos';

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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;