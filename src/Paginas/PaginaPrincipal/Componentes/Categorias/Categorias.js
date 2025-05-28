// function Categorias(){
//     return(
//         <div className='block-container'>
//             <section className='block-content'>
//                 <div className='block-title-container'>
//                     <p className='block-title margin-auto'>Nuestros productos</p>
//                 </div>

//                 <ul className='homepage-categories'>
//                     {categorias.map((categoria) => (
//                         <li key={categoria.id}>
//                             <a href={categoria.ruta}>
//                                 <div>
//                                     <img width={isSmallScreen ? 80 : 160} height={isSmallScreen ? 80 : 160} loading="lazy" src={categoria.menuImg ? categoria.menuImg[0].imgSrc : ''} alt={categoria.menuImg ? categoria.menuImg[0].imgAlt : categoria.categoria}/>
//                                 </div>
//                                 <p className='text'>{categoria.categoria}</p>
//                             </a>
//                         </li>
//                     ))}
//                 </ul>
//             </section>
//         </div>
//     )
// }

// export default Categorias;
