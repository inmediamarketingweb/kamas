import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PaginaProducto = () => {
    const { categoria, subcategoria } = useParams();
    const [producto, setProducto] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducto = async () => {
            try {
                const response = await fetch(`/assets/json/categorias/${categoria}/sub-categorias/${subcategoria}.json`);
                
                if (!response.ok) throw new Error("No se pudo cargar el archivo JSON");

                const data = await response.json();

                // Buscar el producto basado en la URL
                const productoEncontrado = data.productos.find(prod => prod.ruta === window.location.pathname);

                if (!productoEncontrado) throw new Error("Producto no encontrado");

                setProducto(productoEncontrado);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducto();
    }, [categoria, subcategoria]);

    if (loading) return <p>Cargando producto...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!producto) return <p>No se encontró el producto.</p>;

    return (
        <div>
            <h1>{producto.nombre}</h1>
            <img src={producto.fotos} alt={producto.nombre} width="300" />
            <p>Precio Normal: ${producto.precioNormal}</p>
            <p>Precio Oferta: ${producto.precioVenta}</p>
            <p>Stock disponible: {producto.stock}</p>
            <h3>Detalles del Producto</h3>
            <ul>
                {Object.entries(producto.detallesDelProducto).map(([key, value]) => (
                    <li key={key}><strong>{key}:</strong> {value}</li>
                ))}
            </ul>
            <h3>Descripción</h3>
            <ul>
                {Object.values(producto.descripcion).map((desc, index) => (
                    <li key={index}>{desc}</li>
                ))}
            </ul>
        </div>
    );
};

export default PaginaProducto;
