import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import PaginaPrincipal from "./Paginas/PaginaPrincipal/PaginaPrincipal";

import './App.css';

function App() {
    return(
        <Router>
            <Routes>
                <Route path="/" element={<PaginaPrincipal/>}/>
            </Routes>
        </Router>
    );
}

export default App;
