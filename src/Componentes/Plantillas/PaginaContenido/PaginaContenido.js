// // import { Helmet } from "react-helmet-async";

// // import Header from "../../Componentes/Header/Header";
// // import Footer from "../../Componentes/Footer/Footer";

// // function PaginaContenido(){
// //     return(
// //         <>
// //             <Helmet>
// //                 <title>Nosotros | Kamas</title>
// //                 <meta name="description" content="Sobre nosotros"/>

// //                 <meta property="og:title" content="Nosotros | Kamas"/>
// //                 <meta property="og:site_name" content="Nosotros"/>
// //                 <meta property="og:description" content="Sobre nosotros"/>
// //                 <meta property="og:type" content="website"/>
// //                 <meta property="og:url" content="https://www.kamas.pe/nosotros/"/>
// //                 <meta property="og:image" content="https://kamas.pe/assets/imagenes/paginas/pagina-principal/homepage-video.jpg"/>
// //             </Helmet>

// //             <Header/>

// //             <main>
// //                 <div className="block-container">
// //                     <section className="block-content">
// //                         <div className="block-title-container">
// //                             <h1 className="block-title">asdsad</h1>
// //                         </div>
// //                     </section>
// //                 </div>
// //             </main>

// //             <Footer/>
// //         </>
// //     )
// // }

// // export default PaginaContenido;

// import { Helmet } from "react-helmet-async";

// import Header from "../../../Componentes/Header/Header";
// import Footer from "../../../Componentes/Footer/Footer";

// function PaginaContenido({ data }) {
//     const metadatos = data.metadatos[0];
//     const banner = data.banner[0];
//     const contenido = data.contenido;

//     return (
//         <>
//             <Helmet>
//                 <title>{metadatos.metatitulo} | Kamas</title>
//                 <meta name="description" content={metadatos.metadescripcion}/>

//                 <meta property="og:title" content={metadatos.title}/>
//                 <meta property="og:site_name" content={metadatos.title}/>
//                 <meta property="og:description" content={metadatos.metadescripcion}/>
//                 <meta property="og:type" content="website"/>
//                 <meta property="og:url" content={window.location.href}/>
//                 <meta property="og:image" content={banner.banner}/>
//             </Helmet>

//             <Header/>

//             <main>
//                 <div className="block-container">
//                     <section className="block-content">
//                         <div className="block-title-container">
//                             <h1 className="block-title">{metadatos.metatitulo}</h1>
//                         </div>

//                         <div className="d-flex-column gap-20">
//                             <img src={banner.banner} alt={metadatos.metatitulo} className="page-banner-img" />

//                             <div className="d-flex-column gap-20">
//                                 {contenido.map((item, index) => (
//                                     <div key={index} className="d-flex-columm gap-10">
//                                         <p className="title">{item.titulo}</p>
//                                         <p className="text">{item.texto}</p>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                     </section>
//                 </div>
//             </main>

//             <Footer />
//         </>
//     );
// }

// export default PaginaContenido;

import { Helmet } from "react-helmet-async";
import Header from "../../../Componentes/Header/Header";
import Footer from "../../../Componentes/Footer/Footer";

function PaginaContenido({ data }) {
    const metadatos = data.metadatos?.[0];
    const banner = data.banner?.[0];
    const contenido = data.contenido;

    return (
        <>
            <Helmet>
                <title>{metadatos?.metatitulo || "Kamas"}</title>
                <meta name="description" content={metadatos?.metadescripcion || ""} />

                <meta property="og:title" content={metadatos?.metatitulo || ""} />
                <meta property="og:site_name" content={metadatos?.metatitulo || ""} />
                <meta property="og:description" content={metadatos?.metadescripcion || ""} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={window.location.href} />
                {banner?.banner && (
                    <meta property="og:image" content={banner.banner} />
                )}
            </Helmet>

            <Header />

            <main>
                <div className="block-container">
                    <section className="block-content">
                        {metadatos?.metatitulo && (
                            <div className="block-title-container">
                                <h1 className="block-title">{metadatos.metatitulo}</h1>
                            </div>
                        )}

                        <div className="d-flex-column gap-20">
                            {banner?.banner && (
                                <img src={banner.banner} alt={metadatos.metatitulo} className="page-banner-img"/>
                            )}

                            {contenido?.length > 0 && contenido.map((item, index) => (
                                <div key={index} className="block-section">
                                    <h2 className="title">{item.titulo}</h2>
                                    <p className="text">{item.texto}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </main>

            <Footer />
        </>
    );
}

export default PaginaContenido;
