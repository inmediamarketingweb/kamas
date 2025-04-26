import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import Header from '../../Componentes/Header/Header';

import Jerarquia from './Componentes/Jerarquia/Jerarquia';
import Imagenes from './Componentes/Imagenes/Imagenes';
import Regalos from './Componentes/Regalos/Regalos';
import Medidas from './Componentes/Medidas/Medidas';
import Envios from './Componentes/Envios/Envios';
import TiposDeEnvio from './Componentes/TiposDeEnvio/TiposDeEnvio';

import MasProductos from './Componentes/MasProductos/MasProductos';

import Footer from '../../Componentes/Footer/Footer';

import './PaginaProducto.css';

function PaginaProducto(){
    const [shippingInfo, setShippingInfo] = useState(null);
    const [shippingOptions, setShippingOptions] = useState([]);
    const [selectedShipping, setSelectedShipping] = useState({ tipo: null, precio: null });
    const location = useLocation();
    const [producto, setProducto] = useState(null);
    const [error, setError] = useState(false);
    const [imagenes, setImagenes] = useState([]);

    const handleCopy = () => {
        const skuElement = document.querySelector('.sku');
        if (!skuElement) return;
        const skuText = skuElement.textContent.trim();
        navigator.clipboard.writeText(skuText)
        .then(() => {
            const copiedElement = document.querySelector('.copied');
                if (copiedElement){
                copiedElement.classList.add('active');
                setTimeout(() => {
                    copiedElement.classList.remove('active');
                }, 3000);
            }
        })
        .catch(err => {
            console.error("Error al copiar el SKU: ", err);
        });
    };

    useEffect(() => {
        const fetchProducto = async () => {
            try{
                const categorias = ["colchones", "cama-box-tarimas", "dormitorios", "camas-funcionales", "cabeceras", "sofas", "complementos"];
                let productoEncontrado = null;

                for (const categoria of categorias){
                    const subcategorias = await fetch(`/assets/json/categorias/${categoria}/sub-categorias/sub-categorias.json`)
                        .then(response => response.json())
                        .catch(() => ({ subcategorias: [] }));

                    for (const subcat of subcategorias.subcategorias || []){
                        const subcatNombre = subcat.subcategoria.toLowerCase().replace(/\s+/g, "-");
                        const jsonPath = `/assets/json/categorias/${categoria}/sub-categorias/${subcatNombre}.json`;

                        const data = await fetch(jsonPath).then(response => response.json()).catch(() => null);

                        if (data && data.productos){
                            const prod = data.productos.find(p => p.ruta === location.pathname);
                            if (prod) {
                                productoEncontrado = prod;
                                break;
                            }
                        }
                    }

                    if (productoEncontrado) break;
                }

                if (productoEncontrado) {
                    setProducto(productoEncontrado);
                    cargarImagenes(productoEncontrado.fotos);
                } else {
                    setError(true);
                }
            } catch (error) {
                console.error("Error al buscar el producto:", error);
                setError(true);
            }
        };

        const cargarImagenes = (carpetaFotos) => {
            const imgs = [];
            for (let i = 1; i <= 5; i++){
                const path = `${carpetaFotos}${i}.jpg`;
                const img = new Image();
                img.src = path;
                img.onload = () => {
                    imgs.push(path);
                    setImagenes([...imgs]);
                };
            }
        };

        fetchProducto();

    }, [location.pathname]);

    useEffect(() => {
        if (producto){
            document.title = producto.nombre;
        }
    }, [producto]);

    if (error){
        return <p>Producto no encontrado o no se pudo cargar la información.</p>;
    }

    if (!producto){
        return <p>Cargando información del producto...</p>;
    }

    const handleContinuarClick = (e) => {
        if(!selectedShipping.tipo){
            e.preventDefault();
        }
    };

    const getWhatsAppLink = () => {
        if (!selectedShipping.tipo) return "#";

        const numeroWhatsApp = "+51907057521";
        const userName = localStorage.getItem('nombre') || '';

        const mensaje = `Hola KAMAS! Vengo de su sitio web y estoy interesado en adquirir:\n`
            + `*${producto.nombre}*\n\n`
            + `Cliente: ${userName}\n`
            + `Departamento: ${shippingInfo?.locationData?.departamento || ''}\n`
            + `Provincia: ${shippingInfo?.locationData?.provincia || ''}\n`
            + `Distrito: ${shippingInfo?.locationData?.distrito || ''}\n\n`
            + (shippingInfo?.selectedAgency ? `Agencia seleccionada: ${shippingInfo.selectedAgency}\n` : "")
            + (shippingInfo?.selectedSede ? `Sede de agencia: ${shippingInfo.selectedSede}\n` : "")
            + `Tipo de envío seleccionado: ${selectedShipping.tipo}\n`
            + `Costo de envío: S/.${selectedShipping.precio || 0}`;
    
        return `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
    };

    return(
        <>
            <Header/>

            <main>
                <div className='block-container product-page-block-container'>
                    <section className='block-content product-page-block-content'>
                        <Jerarquia producto={producto} />

                        <div className='product-page-container'>
                            <div className='product-page-target product-page-target-1'>
                                <Imagenes imagenes={imagenes}/>
                            </div>

                            <div className='product-page-target product-page-target-2 d-flex-column gap-20'>
                                <div className='product-page-top-info'>
                                    <p className='product-page-category'>{producto.categoria}</p>
                                    <h1 className='product-page-name'>{producto.nombre}</h1>
                                    <button type='button' className='product-page-sku' onClick={handleCopy}>
                                        <p>SKU:</p>
                                        <p className='sku'>{producto.sku}</p>
                                        <span className="material-icons">content_copy</span>

                                        <span className='copied'>¡SKU copiado al portapapeles!</span>
                                    </button>
                                </div>

                                <div className='d-grid-2-1fr gap-20'>
                                    <div className='d-flex-column gap-20'>
                                        <div className='page-product-prices'>
                                            <p className='page-product-normal-price'>Antes: S/.{producto.precioNormal}</p>
                                            <p className='page-product-sale-price'>Ahora: S/.{producto.precioVenta}</p>
                                        </div>

                                        <Regalos producto={producto} />

                                        <div className='d-grid-auto-1fr gap-20'>
                                            <div className='d-flex-column gap-10'>
                                                <p className='text title'>Resumen:</p>

                                                <ul className='product-page-resume'>
                                                    {producto["resumen-del-producto"] && producto["resumen-del-producto"].map((detalle, index) => (
                                                        Object.entries(detalle).map(([key, value]) => (
                                                            <li key={index + key}>
                                                                <span className="material-icons">check</span>
                                                                <div>
                                                                    <b>{key.replace(/-/g, ' ').charAt(0).toUpperCase() + key.replace(/-/g, ' ').slice(1)}:</b>
                                                                    <p className='text'>{value}</p>
                                                                </div>
                                                            </li>
                                                        ))
                                                    ))}
                                                </ul>
                                            </div>

                                            <Medidas producto={producto}/>
                                        </div>

                                        <div className='d-flex-column'>
                                            <div className='d-flex-start gap-5'>
                                                <span className='color-red'>*</span>
                                                <p className='text font-14'>Realizamos envios inmediatos a provincia</p>
                                            </div>
                                            <div className='d-flex-start gap-5'>
                                                <span className='color-red'>*</span>
                                                <p className='text font-14'>Entregas el mismo día para Lima y Callao</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='d-flex-column gap-20'>
                                        <Envios producto={producto} onConfirm={(data) => {
                                            setShippingInfo(data); setShippingOptions(data.shippingOptions);
                                            if (data.shippingOptions.length === 1) {setSelectedShipping({
                                                    tipo: data.shippingOptions[0].tipo,
                                                    precio: data.shippingOptions[0].precio
                                                });
                                            }
                                        }}/>

                                        <TiposDeEnvio shippingOptions={shippingOptions} provincia={shippingInfo?.locationData?.provincia || ''} distrito={shippingInfo?.locationData?.distrito || ''} hasAgency={shippingInfo?.hasAgency} selectedTipo={selectedShipping.tipo} onSelect={(tipo, precio) => setSelectedShipping({ tipo, precio })} />

                                        {!selectedShipping.tipo && shippingOptions.length > 0 && (
                                            <div className='message message-warning'>
                                                <span className="material-icons">warning</span>
                                                <p>Seleccione el tipo de envío para continuar</p>
                                            </div>
                                        )}

                                        <div className='d-flex-center-center gap-10'>
                                            <div className='d-flex-column gap-10'>
                                                <div className='quantity'>
                                                    <button type='button'>
                                                        <span className="material-icons">remove</span>
                                                    </button>
                                                    <div className='quantity-input'>1</div>
                                                    <button type='button'>
                                                        <span className="material-icons">add</span>
                                                    </button>
                                                </div>
                                            </div>

                                            <a href={getWhatsAppLink()} className='product-page-whatsapp' target="_blank" rel="noopener noreferrer" onClick={handleContinuarClick}>
                                                <img src="/assets/imagenes/iconos/whatsapp-blanco.svg" alt="WhatsApp | Kamas"/>
                                                <p>Continuar</p>
                                            </a>
                                        </div>

                                        <div className='product-page-beneficts'>
                                            <div>
                                                <div className='d-flex-column'>
                                                    <p>Compras</p>
                                                    <p>seguras</p>
                                                </div>
                                                <span className="material-icons">verified_user</span>
                                            </div>
                                            <div>
                                                <div className='d-flex-column'>
                                                    <p>Envios</p>
                                                    <p>inmediatos</p>
                                                </div>
                                                <span className="material-icons">local_shipping</span>
                                            </div>
                                            <div>
                                                <div className='d-flex-column'>
                                                    <p>Entregas</p>
                                                    <p>seguras</p>
                                                </div>
                                                <span className="material-icons">inventory_2</span>
                                            </div>
                                            <div>
                                                <div className='d-flex-column'>
                                                    <p>Entregas</p>
                                                    <p>seguras</p>
                                                </div>
                                                <span className="material-icons">inventory_2</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='product-page-description d-grid-2-1fr gap-20'>
                            <div>
                                <h4 className='title'>Detalles del producto:</h4>
                                <ul>
                                    {producto["detalles-del-producto"] && producto["detalles-del-producto"].map((detalle, index) => (
                                        Object.entries(detalle).map(([key, value]) => (
                                            <li key={index + key}>
                                                <div>
                                                    <strong>{key.replace(/-/g, ' ').charAt(0).toUpperCase() + key.replace(/-/g, ' ').slice(1)}:</strong>
                                                </div>
                                                <div>
                                                    <p className='text'>{value}</p>
                                                </div>
                                            </li>
                                        ))
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h4 className='title'>Descripción del producto:</h4>
                                <ul>
                                    {producto["descripcion"] && producto["descripcion"].map((detalle, index) => (
                                        Object.entries(detalle).map(([key, value]) => (
                                            <li key={index + key}>
                                                <div>
                                                    <strong>{key.replace(/-/g, ' ').charAt(0).toUpperCase() + key.replace(/-/g, ' ').slice(1)}:</strong>
                                                </div>
                                                <div>
                                                    <p className='text'>{value}</p>
                                                </div>
                                            </li>
                                        ))
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </section>
                </div>

                <MasProductos categoriaActual={producto.categoria}/>
            </main>

            <Footer/>
        </>
    );
}

export default PaginaProducto;
