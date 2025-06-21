// import { useState, useEffect } from 'react';

// import './MasProductos.css';

// import { Producto } from '../../../../Componentes/Plantillas/Producto/Producto';
// import SpinnerLoading from '../../../../Componentes/SpinnerLoading/SpinnerLoading';

// export default function MasProductos({ categoriaActual }){
//     const [products, setProducts] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         async function fetchRandomProducts(){
//             try{
//                 const manifestRes = await fetch('/assets/json/manifest.json');
//                 const manifest = await manifestRes.json();
//                 const files = manifest.files;

//                 const allData = await Promise.all(
//                     files.map(async (filePath) => {
//                         const res = await fetch(filePath);
//                         return res.json();
//                     })
//                 );

//                 const categoryProducts = allData.reduce((acc, data) => {
//                     if (Array.isArray(data.productos)) {
//                         const matches = data.productos.filter(
//                             (p) => p.categoria === categoriaActual
//                         );
//                         return acc.concat(matches);
//                     }
//                     return acc;
//                 }, []);

//                 if (!categoryProducts.length) {
//                     setProducts([]);
//                     return;
//                 }

//                 for (let i = categoryProducts.length - 1; i > 0; i--) {
//                     const j = Math.floor(Math.random() * (i + 1));
//                     [categoryProducts[i], categoryProducts[j]] = [
//                         categoryProducts[j],
//                         categoryProducts[i]
//                     ];
//                 }

//                 const selected = categoryProducts.slice(0, 10);

//                 setProducts(selected);
//             } catch (err) {
//                 console.error('Error al cargar:', err);
//             } finally {
//                 setLoading(false);
//             }
//         }

//         if (categoriaActual) {
//             setLoading(true);
//             fetchRandomProducts();
//         } else {
//             setLoading(false);
//         }
//     }, [categoriaActual]);

//     if (loading) {
//         return(
//             <SpinnerLoading/>
//         );
//     }

//     const truncate = (str, maxLength) => str.length <= maxLength ? str : str.slice(0, maxLength) + '...';

//     return(
//         <div className='block-container'>
//             <div className='block-content d-flex-column gap-20'>
//                 <div className='block-title-container'>
//                     <h4 className='block-title'>Más productos</h4>
//                 </div>

//                 <div className="product-page-more-products-container">
//                     <nav className="product-page-more-products-content">
//                         <ul className='d-grid-5-3-2fr gap-10'>
//                             {products.map((producto) => (
//                                 <Producto key={producto.sku} producto={producto} truncate={truncate}/>
//                             ))}
//                         </ul>
//                     </nav>
//                 </div>

//                 <button className='button-link button-link-2 margin-left'>
//                     <p className='button-link-text'>Ver más</p>
//                     <span class="material-icons">cached</span>
//                 </button>
//             </div>
//         </div>
//     );
// }

import { useState, useEffect } from 'react';

import './MasProductos.css';

import { Producto } from '../../../../Componentes/Plantillas/Producto/Producto';
import SpinnerLoading from '../../../../Componentes/SpinnerLoading/SpinnerLoading';

export default function MasProductos({ categoriaActual }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshTrigger, setRefreshTrigger] = useState(0); // <- Nuevo estado

    useEffect(() => {
        async function fetchRandomProducts() {
            try {
                const manifestRes = await fetch('/assets/json/manifest.json');
                const manifest = await manifestRes.json();
                const files = manifest.files;

                const allData = await Promise.all(
                    files.map(async (filePath) => {
                        const res = await fetch(filePath);
                        return res.json();
                    })
                );

                const categoryProducts = allData.reduce((acc, data) => {
                    if (Array.isArray(data.productos)) {
                        const matches = data.productos.filter(
                            (p) => p.categoria === categoriaActual
                        );
                        return acc.concat(matches);
                    }
                    return acc;
                }, []);

                if (!categoryProducts.length) {
                    setProducts([]);
                    return;
                }

                // Mezclar productos aleatoriamente
                for (let i = categoryProducts.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [categoryProducts[i], categoryProducts[j]] = [
                        categoryProducts[j],
                        categoryProducts[i]
                    ];
                }

                const selected = categoryProducts.slice(0, 10);

                setProducts(selected);
            } catch (err) {
                console.error('Error al cargar:', err);
            } finally {
                setLoading(false);
            }
        }

        if (categoriaActual) {
            setLoading(true);
            fetchRandomProducts();
        } else {
            setLoading(false);
        }
    }, [categoriaActual, refreshTrigger]); // <- refrescará cuando cambie `refreshTrigger`

    const handleRefresh = () => {
        setRefreshTrigger(prev => prev + 1); // <- cambiar estado para refrescar
    };

    if (loading) {
        return <SpinnerLoading />;
    }

    const truncate = (str, maxLength) =>
        str.length <= maxLength ? str : str.slice(0, maxLength) + '...';

    return (
        <div className='block-container'>
            <div className='block-content'>
                <div className='block-title-container'>
                    <h4 className='block-title'>Más productos</h4>
                </div>

                <div className='d-flex-column gap-20'>
                    <div className="product-page-more-products-container">
                        <nav className="product-page-more-products-content">
                            <ul className='d-grid-5-3-2fr gap-10'>
                                {products.map((producto) => (
                                    <Producto key={producto.sku} producto={producto} truncate={truncate} />
                                ))}
                            </ul>
                        </nav>
                    </div>

                    <button onClick={handleRefresh} className='button-link button-link-2 margin-left'>
                        <p className='button-link-text'>Ver más</p>
                        <span className="material-icons">cached</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
