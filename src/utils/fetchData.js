export async function fetchJSON(path){
    try{
        const response = await fetch(path);
        if (!response.ok){
            throw new Error(`Error al cargar ${path}: ${response.statusText}`);
        }
        return await response.json();
    } catch (error){
        console.error(error);
        return null;
    }
}