import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import PaginaPrincipal from "./Paginas/PaginaPrincipal/PaginaPrincipal";
import PaginaDeCategoria from "./Paginas/Categorias/PaginaDeCategoria";

import './App.css';

function App() {
    return(
        <Router>
            <Routes>
                <Route path="/" element={<PaginaPrincipal/>}/>

                {/* <Route path="/pagina-de-categoria/" element={<PaginaDeCategoria/>} /> */}
                <Route path="/categoria/:categoria" element={<PaginaDeCategoria/>}/>
            </Routes>
        </Router>
    );
}

export default App;
