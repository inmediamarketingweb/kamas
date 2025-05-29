// import { useState, useRef, useEffect } from 'react';

// import './Slider.css';

// function Slider(){
//     const [currentIndex, setCurrentIndex] = useState(0);
//     const sliderRef = useRef(null);
//     const totalSlides = 6;

//     useEffect(() => {
//         if (sliderRef.current) {
//             sliderRef.current.style.marginLeft = `-${currentIndex * 100}%`;
//         }
//     }, [currentIndex]);

//     useEffect(() => {
//         const interval = setInterval(() => {
//             setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
//         }, 10000);

//         return () => clearInterval(interval);
//     }, [totalSlides]);

//     const goToNextSlide = () => {
//         setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
//     };

//     const goToPrevSlide = () => {
//         setCurrentIndex((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides);
//     };

//     const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 600);

//     useEffect(() => {
//         const handleResize = () => {
//             setIsSmallScreen(window.innerWidth < 600);
//         };

//         window.addEventListener('resize', handleResize);

//         return () => {
//             window.removeEventListener('resize', handleResize);
//         };
//     }, []);

//     return(
//         <div className="slider-general-container d-flex-column">
//             <div className="hero-container">
//                 <section className="hero">
//                     <div className="slider-container">
//                         <ul className="slider" ref={sliderRef}>
//                             {[1, 2, 3, 4, 5, 6].map((num) => (
//                                 <li key={num}>
//                                     <img width={isSmallScreen ? 400 : 2000} height={isSmallScreen ? 180 : 600} src={`/assets/imagenes/paginas/pagina-principal/slider/${isSmallScreen ? 'thumb/' : ''}slider-${num}.webp`} alt="Kamas | Fabricantes de colchones, camas y dormitorios." />
//                                 </li>
//                             ))}
//                         </ul>
//                     </div>
//                 </section>

//                 <button type='button' className="hero-slider-button hero-slider-button-1" onClick={goToPrevSlide}>
//                     <span className="material-icons">chevron_left</span>
//                 </button>

//                 <button type='button' className="hero-slider-button hero-slider-button-2" onClick={goToNextSlide}>
//                     <span className="material-icons">chevron_right</span>
//                 </button>
//             </div>

//             <img src="/assets/imagenes/paginas/pagina-principal/slider/banner-2.jpg" alt="Kamas | Fabricantes de colchones, camas y dormitorios." />
//         </div>
//     );
// }

// export default Slider;

import { useState, useRef, useEffect } from 'react';
import './Slider.css';

function Slider() {
    const totalSlides = 6;
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 600);
    const sliderRef = useRef(null);

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 600);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
        }, 10000);
        return () => clearInterval(interval);
    }, [totalSlides]);

    const goToNextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
    };

    const goToPrevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides);
    };

    const visibleIndexes = [
        (currentIndex - 1 + totalSlides) % totalSlides,
        currentIndex,
        (currentIndex + 1) % totalSlides
    ];

    return (
        <div className="slider-general-container d-flex-column">
            <div className="hero-container">
                <section className="hero">
                    <div className="slider-container">
                        <ul
                            className="slider"
                            ref={sliderRef}
                            style={{ marginLeft: `-${currentIndex * 100}%` }}
                        >
                            {Array.from({ length: totalSlides }).map((_, index) => (
                                <li key={index}>
                                    {visibleIndexes.includes(index) && (
                                        <img
                                            width={isSmallScreen ? 400 : 2000}
                                            height={isSmallScreen ? 180 : 600}
                                            loading="lazy"
                                            src={`/assets/imagenes/paginas/pagina-principal/slider/${isSmallScreen ? 'thumb/' : ''}slider-${index + 1}.webp`}
                                            alt="Kamas | Fabricantes de colchones, camas y dormitorios."
                                        />
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                <button type="button" className="hero-slider-button hero-slider-button-1" onClick={goToPrevSlide}>
                    <span className="material-icons">chevron_left</span>
                </button>

                <button type="button" className="hero-slider-button hero-slider-button-2" onClick={goToNextSlide}>
                    <span className="material-icons">chevron_right</span>
                </button>
            </div>

            <img src="/assets/imagenes/paginas/pagina-principal/slider/banner-2.jpg" alt="Kamas | Fabricantes de colchones, camas y dormitorios." />
        </div>
    );
}

export default Slider;
