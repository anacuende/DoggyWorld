import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Cabecera from './components/Cabecera';
import Inicio from './screens/Inicio';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Cabecera/>}>
          <Route index element={<Inicio/>}/>
		      <Route path="inicio" element={<Inicio/>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;