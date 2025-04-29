import { useEffect, useState } from "react";

import PaginaContenido from "../../../Componentes/Plantillas/PaginaContenido/PaginaContenido";

function PropiedadIntelectual() {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch("/assets/json/paginas/nosotros/propiedad-intelectual.json")
            .then(response => {
                if (!response.ok) throw new Error("Error al cargar el JSON");
                return response.json();
            })
            .then(json => setData(json))
            .catch(error => console.error("Error:", error));
    }, []);

    if (!data) {
        return <p>Cargando contenido...</p>;
    }

    return <PaginaContenido data={data} />;
}

export default PropiedadIntelectual;
