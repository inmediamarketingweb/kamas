import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';

import PaginaPrincipal from "./Paginas/PaginaPrincipal/PaginaPrincipal";
import PaginaDeCategoria from "./Paginas/Categorias/PaginaDeCategoria";
import PaginaProducto from './Paginas/PaginaProducto/PaginaProducto';
import SoloPorHoras from "./Paginas/SoloPorHoras/SoloPorHoras";
import Ofertas from "./Paginas/Ofertas/Ofertas";

import Favoritos from "./Paginas/Favoritos/Favoritos";

import Error404 from "./Paginas/Error404/Error404";

import './App.css';

function App(){
    return(
        <HelmetProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<PaginaPrincipal/>} />
                    <Route path="/productos/:categoria" element={<PaginaDeCategoria/>} />
                    <Route path="/productos/:categoria/:subcategoria" element={<PaginaDeCategoria/>} />
                    <Route path="/productos/*" element={<PaginaProducto/>} />

                    <Route path="/ofertas/" element={<Ofertas/>} />
                    <Route path="/ofertas/solo-por-horas/" element={<SoloPorHoras/>} />
                    <Route path="/ofertas/solo-por-horas/*" element={<PaginaProducto/>} />

                    <Route path="/mis-favoritos/" element={<Favoritos/>} />

                    <Route path="*" element={<Error404/>} />
                </Routes>
            </Router>
        </HelmetProvider>
    );
}

export default App;
