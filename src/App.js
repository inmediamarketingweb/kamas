import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';

import PaginaPrincipal from "./Paginas/PaginaPrincipal/PaginaPrincipal";

import Productos from './Paginas/Productos/Productos';
import PaginaDeCategoria from "./Paginas/Categorias/PaginaDeCategoria";
import PaginaProducto from './Paginas/PaginaProducto/PaginaProducto';
import SoloPorHoras from "./Paginas/SoloPorHoras/SoloPorHoras";
import Ofertas from "./Paginas/Ofertas/Ofertas";

import Favoritos from "./Paginas/Favoritos/Favoritos";

import Nosotros from "./Paginas/Nosotros/Nosotros";
import Contacto from "./Paginas/Contacto/Contacto";

import Busqueda from "./Paginas/Busqueda/Busqueda";

import Error404 from "./Paginas/Error404/Error404";

import './App.css';

function App(){
    return(
        <HelmetProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<PaginaPrincipal/>} />

                    <Route path="/productos/" element={<Productos/>} />
                    <Route path="/productos/:categoria" element={<PaginaDeCategoria/>} />
                    <Route path="/productos/:categoria/:subcategoria" element={<PaginaDeCategoria/>} />
                    <Route path="/productos/*" element={<PaginaProducto/>} />

                    <Route path="/ofertas/" element={<Ofertas/>} />
                    <Route path="/ofertas/*" element={<PaginaProducto/>} />

                    <Route path="/ofertas/solo-por-horas/" element={<SoloPorHoras/>} />
                    <Route path="/ofertas/solo-por-horas/*" element={<PaginaProducto/>} />

                    <Route path="/mis-favoritos/" element={<Favoritos/>} />

                    <Route path="/nosotros/" element={<Nosotros/>} />
                    <Route path="/contacto/" element={<Contacto/>} />

                    <Route path="/busqueda/" element={<Busqueda/>} />

                    <Route path="*" element={<Error404/>}/>
                </Routes>
            </Router>
        </HelmetProvider>
    );
}

export default App;
