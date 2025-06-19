import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet'; // Corregido: Helmet viene de react-helmet
import { useLocation, useNavigate } from 'react-router-dom'; // Cambiado useHistory por useNavigate
import './Colores.css';
import Header from '../../../Componentes/Header/Header';
import Footer from '../../../Componentes/Footer/Footer';

const DEFAULT_BANNER = 'https://concepto.de/wp-content/uploads/2018/09/Historia-Pintura-Van-Gogh-691x451.jpg';

function Colores(){
    const location = useLocation();
    const navigate = useNavigate();
    const [fabricData, setFabricData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedFabric, setSelectedFabric] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const [bannerImage, setBannerImage] = useState(DEFAULT_BANNER);
    const [fabricInfo, setFabricInfo] = useState(null);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const category = params.get('categoria');
        const fabric = params.get('tela');
        const color = params.get('color');

        if (category) setSelectedCategory(category);
        if (fabric) setSelectedFabric(fabric);
        if (color) setSelectedColor({ color });
    }, [location.search]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/assets/json/colores.json');
                if (!response.ok) throw new Error('Error al cargar datos');
                setFabricData(await response.json());
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (!fabricData) return;

        const params = new URLSearchParams();
        if (selectedCategory) params.set('categoria', selectedCategory);
        if (selectedFabric) params.set('tela', selectedFabric);
        if (selectedColor?.color) params.set('color', selectedColor.color);

        navigate(`?${params.toString()}`, { replace: true });

        if (selectedColor?.color && selectedCategory && selectedFabric) {
            const categoryData = fabricData.telas[0][selectedCategory];
            const fabric = categoryData?.telas?.find(f => f.tela === selectedFabric);

            if (fabric) {
                const colorObj = fabric.colores?.find(c => c.color === selectedColor.color);
                if (colorObj){
                    setSelectedColor(colorObj);
                    setBannerImage(colorObj.original);
                }
            }
        }
    }, [selectedCategory, selectedFabric, selectedColor, fabricData, navigate]);

    useEffect(() => {
        if (selectedColor && fabricData){
            setBannerImage(selectedColor.original);
        } else {
            setBannerImage(DEFAULT_BANNER);
        }
    }, [selectedColor, fabricData]);

    useEffect(() => {
        if (fabricData && selectedCategory && selectedFabric) {
            const categoryData = fabricData.telas[0][selectedCategory];
            const fabric = categoryData?.telas?.find(f => f.tela === selectedFabric);

            if (fabric) {
                setFabricInfo({
                    nombre: fabric.tela,
                    descripcion: fabric.descripcion,
                    costoAdicional: categoryData['costo-adicional']
                });
            }
        } else {
            setFabricInfo(null);
        }
    }, [fabricData, selectedCategory, selectedFabric]);

    const handleColorSelect = (color) => {
        setSelectedColor(color);
    };

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        setSelectedFabric(null);
        setSelectedColor(null);
    };

    const handleFabricSelect = (fabric) => {
        setSelectedFabric(fabric);
        setSelectedColor(null);
    };

    if (loading) return (
        <div className="loading-container">
            <div className="spinner"></div>
            <p>Cargando colores...</p>
        </div>
    );

    if (error) return (
        <div className="error-container">
            <h2>Error</h2>
            <p>{error}</p>
            <button onClick={() => window.location.reload()}>Reintentar</button>
        </div>
    );

    if (!fabricData) return null;

    const categories = Object.keys(fabricData.telas[0] || {});

    const getFabricsForCategory = (category) => {
    return fabricData.telas[0][category]?.telas || [];
    };

    const getColorsForFabric = (category, fabricType) => {
        const fabrics = getFabricsForCategory(category);
        const fabric = fabrics.find(f => f.tela === fabricType);
        return fabric?.colores || [];
    };

    const renderAllColors = () => {
        const categoriesToRender = selectedCategory ? [selectedCategory] : categories;

        return categoriesToRender.map(category => {
            const fabrics = getFabricsForCategory(category);

            return (
                <div className="d-flex-column gap-10" key={category}>
                    <h2 className='block-title d-flex-center-left color-black-0'>Telas {category}</h2>

                    {fabrics.map(fabric => {
                        if (selectedFabric && selectedFabric !== fabric.tela) return null;

                        return(
                            <div className="d-flex-column gap-10" key={fabric.tela}>
                                <h3 className='title text'>{fabric.tela}</h3>
                                <ul className="colores">
                                    {fabric.colores.map((color, index) => (
                                        <li key={index}>
                                            <button className={`color-item ${selectedColor?.color === color.color ? 'active' : ''}`} onClick={() => handleColorSelect(color)}>
                                                <img src={color.original} alt={`Color ${color.color}`}/>
                                                <p>{color.color}</p>
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        );
                    })}
                </div>
            );
        });
    };

    return(
        <>
            <Helmet>
                <title>Kamas | Colores</title>
                <meta name="description" content="Explora nuestra variedad de colores y telas" />
            </Helmet>

            <Header />

            <main>
                <div className='block-container'>
                    <section className="block-content">
                        <div className="page-colors-container">
                            <div className="telas-category d-flex-column gap-20">
                                <div className='d-flex-column gap-10'>
                                    <p className='title'>Categoría de tela:</p>
                                    <ul className="d-flex d-flex-wrap gap-5">
                                        {categories.map((category, index) => (
                                            <li key={index}>
                                                <button className={selectedCategory === category ? 'page-colors-filters-button active' : 'page-colors-filters-button'} onClick={() => handleCategorySelect(category)}>
                                                    <h2>{category}</h2>
                                                </button>
                                            </li>
                                        ))}

                                        <li>
                                            <button className={!selectedCategory ? 'page-colors-filters-button active' : 'page-colors-filters-button'} onClick={() => {
                                                setSelectedCategory(null);
                                                setSelectedFabric(null);
                                                setSelectedColor(null);
                                            }}>
                                                <h2>Ver todo</h2>
                                            </button>
                                        </li>
                                    </ul>
                                </div>

                                {selectedCategory && (
                                    <div className='d-flex-column gap-10'>
                                        <p className='title'>Tipos de tela:</p>
                                        <ul className="d-flex d-flex-wrap gap-5">
                                            {getFabricsForCategory(selectedCategory).map((fabric, index) => (
                                                <li key={index}>
                                                    <button className={selectedFabric === fabric.tela ? 'page-colors-filters-button active' : 'page-colors-filters-button'} onClick={() => handleFabricSelect(fabric.tela)} >
                                                        <h3>{fabric.tela}</h3>
                                                    </button>
                                                </li>
                                            ))}

                                            <li>
                                                <button className={!selectedFabric ? 'page-colors-filters-button active' : 'page-colors-filters-button'} onClick={() => handleFabricSelect(null)} >
                                                    <h3>Todas las telas</h3>
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                )}

                                {selectedFabric && (
                                    <div className='d-flex-column gap-10'>
                                        <p className='title'>Colores disponibles:</p>
                                        <ul className="d-flex d-flex-wrap gap-5">
                                            {getColorsForFabric(selectedCategory, selectedFabric).map((color, index) => (
                                                <li key={index}>
                                                    <button className={selectedColor?.color === color.color ? 'page-colors-filters-button active' : 'page-colors-filters-button'} onClick={() => handleColorSelect(color)}>
                                                        <h2>{color.color}</h2>
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>

                            <div className="d-flex-column gap-20">
                                <img src={bannerImage} alt={selectedColor ? `Tela ${selectedFabric} en ${selectedColor.color}` : 'Banner'} className='color-banner' />

                                {renderAllColors()}
                            </div>

                            {/* {fabricInfo && (
                                <div className="tela-info d-flex-column gap-20">
                                    <div className='d-flex-column gap-10'>
                                        <h3 className='title'>{fabricInfo.nombre}:</h3>
                                        <p className='text'>{fabricInfo.descripcion}</p>
                                    </div>

                                    <div className='d-flex-column gap-10'>
                                        <p className='title'>Costos adicionales:</p>

                                        <table className='costos-adicionales' cellspacing="0">
                                            <tr>
                                                <th>
                                                    <p>Producto</p>
                                                </th>
                                                <th>
                                                    <p>Precio</p>
                                                </th>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <p>Dormitorio</p>
                                                </td>
                                                <td>
                                                    <p>S/.{fabricInfo.costoAdicional}.00</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <p>Cabecera sola</p>
                                                </td>
                                                <td>
                                                    <p>S/.{fabricInfo.costoAdicional}.00</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <p>Box - Base sola</p>
                                                </td>
                                                <td>
                                                    <p>S/.{fabricInfo.costoAdicional}.00</p>
                                                </td>
                                            </tr>
                                        </table>

                                        <p className='text font-13'><b className='color-red'>*</b> Sin importar tamaño o modelo</p>
                                    </div>

                                    <a href="/busqueda?query=negro">Ver productos relacionados</a>
                                </div>
                            )} */}


                            {fabricInfo && (
                                <div className="tela-info d-flex-column gap-20">
                                    <div className='d-flex-column gap-10'>
                                        <h3 className='title'>{fabricInfo.nombre}:</h3>
                                        <p className='text'>{fabricInfo.descripcion}</p>
                                    </div>

                                    <div className='d-flex-column gap-10'>
                                        <p className='title'>Costos adicionales:</p>

                                        <table className='costos-adicionales' cellSpacing="0">
                                            <tbody>
                                                <tr>
                                                    <th>
                                                        <p>Producto</p>
                                                    </th>
                                                    <th>
                                                        <p>Precio</p>
                                                    </th>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <p>Dormitorio</p>
                                                    </td>
                                                    <td>
                                                        <p>S/.{fabricInfo.costoAdicional}.00</p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <p>Cabecera sola</p>
                                                    </td>
                                                    <td>
                                                        <p>S/.{fabricInfo.costoAdicional}.00</p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <p>Box - Base sola</p>
                                                    </td>
                                                    <td>
                                                        <p>S/.{fabricInfo.costoAdicional}.00</p>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>

                                        <p className='text font-13'><b className='color-red'>*</b> Sin importar tamaño o modelo</p>
                                    </div>

                                    <a href={`/busqueda?query=${selectedColor ? encodeURIComponent(selectedColor.color) : ''}`} title='Ver productos relacionados' className={`button-link button-link-2 see-ship-products ${selectedColor ? 'active' : ''}`}>
                                        <p className='button-link-text'>Ver productos relacionados</p>
                                    </a>
                                </div>
                            )}
                        </div>
                    </section>
                </div>
            </main>

            <Footer />
        </>
    );
}

export default Colores;
