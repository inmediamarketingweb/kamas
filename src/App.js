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
import PropiedadIntelectual from "./Paginas/Nosotros/Paginas/PropiedadIntelectual";
import RazonesParaComprar from "./Paginas/Nosotros/Paginas/RazonesParaComprar";

import MediosDePago from './Paginas/ServicioAlCliente/MediosDePago';

import GarantiaDeProductos from "./Paginas/ServicioAlCliente/GarantiaDeProductos/GarantiaDeProductos";
import GarantiaColchones from "./Paginas/ServicioAlCliente/GarantiaDeProductos/Paginas/Colchones";
import GarantiaTarimas from "./Paginas/ServicioAlCliente/GarantiaDeProductos/Paginas/Tarimas";
import GarantiaCabeceras from "./Paginas/ServicioAlCliente/GarantiaDeProductos/Paginas/Cabeceras";

import RecomendacionesDeUso from "./Paginas/ServicioAlCliente/RecomendacionesDeUso/RecomendacionesDeUso";
import RecomendacionesColchones from "./Paginas/ServicioAlCliente/RecomendacionesDeUso/Paginas/Colchones";
import RecomendacionesTarimas from "./Paginas/ServicioAlCliente/RecomendacionesDeUso/Paginas/Tarimas";
import RecomendacionesCabeceras from "./Paginas/ServicioAlCliente/RecomendacionesDeUso/Paginas/Cabeceras";

import PoliticaDeCambiosYDevoluciones from "./Paginas/ServicioAlCliente/PoliticaDeCambiosYDevoluciones";

import PrivacidadYSeguridad from './Paginas/ServicioAlCliente/PrivacidadYSeguridad';

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
                    <Route path="/nosotros/propiedad-intelectual/" element={<PropiedadIntelectual/>}/>
                    <Route path="/nosotros/razones-para-comprar/" element={<RazonesParaComprar/>}/>

                    <Route path="/servicio-al-cliente/medios-de-pago/" element={<MediosDePago/>}/>

                    <Route path="/servicio-al-cliente/garantia-de-productos/" element={<GarantiaDeProductos/>}/>
                    <Route path="/servicio-al-cliente/garantia-de-productos/colchones/" element={<GarantiaColchones/>}/>
                    <Route path="/servicio-al-cliente/garantia-de-productos/box-tarimas/" element={<GarantiaTarimas/>}/>
                    <Route path="/servicio-al-cliente/garantia-de-productos/cabeceras/" element={<GarantiaCabeceras/>}/>

                    
                    <Route path="/servicio-al-cliente/recomendaciones-de-uso/" element={<RecomendacionesDeUso/>}/>
                    <Route path="/servicio-al-cliente/recomendaciones-de-uso/colchones/" element={<RecomendacionesColchones/>}/>
                    <Route path="/servicio-al-cliente/recomendaciones-de-uso/box-tarimas/" element={<RecomendacionesTarimas/>}/>
                    <Route path="/servicio-al-cliente/recomendaciones-de-uso/cabeceras/" element={<RecomendacionesCabeceras/>}/>

                    <Route path="/servicio-al-cliente/politica-de-cambios-y-devoluciones/" element={<PoliticaDeCambiosYDevoluciones/>}/>

                    <Route path="/servicio-al-cliente/privacidad-y-seguridad/" element={<PrivacidadYSeguridad/>}/>

                    <Route path="/contacto/" element={<Contacto/>} />

                    <Route path="/busqueda/" element={<Busqueda/>} />

                    <Route path="*" element={<Error404/>}/>
                </Routes>
            </Router>
        </HelmetProvider>
    );
}

export default App;
