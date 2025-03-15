import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { HelmetProvider } from 'react-helmet-async';

import PaginaPrincipal from "./Paginas/PaginaPrincipal/PaginaPrincipal";
import PaginaDeCategoria from "./Paginas/Categorias/PaginaDeCategoria";

import './App.css';

function App() {
    return(
        <HelmetProvider>
            <Router>
                <Routes>
                <Route path="/" element={<PaginaPrincipal/>}/>

                <Route path="/productos/:categoria" element={<PaginaDeCategoria/>}/>
                </Routes>
            </Router>
        </HelmetProvider>
    );
}

export default App;
