import Top from './Componentes/Top/Top';
import Center from './Componentes/Center/Center';
import Bottom from './Componentes/Bottom/Bottom';

import './Header.css';

function Header(){
    return (
        <>
            <header>
                <Top/>
                <Center/>
                <Bottom/>
            </header>
        </>
    );
}

export default Header;
