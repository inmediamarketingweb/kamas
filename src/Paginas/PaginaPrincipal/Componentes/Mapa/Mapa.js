import './Mapa.css';

function Mapa(){
    return(
        <section className='block-container mapa-block-container'>
            <div className='block-content mapa-block-content'>
                <div className='block-title-container'>
                    <h2 className='block-title'>Ubícanos</h2>
                </div>

                <div>
                    <iframe className='mapa' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1952.2139802305328!2d-77.03587552630528!3d-11.875259699887424!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105d1689f283b6d%3A0x2cdabc049c86b46!2sKamas!5e0!3m2!1ses-419!2spe!4v1752938848207!5m2!1ses-419!2spe" width="100%" height="450" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>

                    <div className='d-flex-column gap-10'>
                        <p className='title'>Agenda una cita</p>
                        <p className='text'>Para confianza de nuestros clientes hemos habilitado una sala de exhibición con <b className='color-color-1 font-bold'>previa cita</b></p>
                        <form className='cita-formulario d-flex-column gap-10'>
                            <fieldset>
                                <span>Nombres<b className='color-red'>*</b></span>
                                <input type='text' placeholder='Nombres' required/>
                            </fieldset>
                            <fieldset>
                                <span>Teléfono<b className='color-red'>*</b></span>
                                <input type='number' placeholder='Teléfono' required/>
                            </fieldset>
                            <fieldset>
                                <span>Fecha<b className='color-red'>*</b></span>
                                <input type='date' required></input>
                            </fieldset>
                            <fieldset>
                                <button type='submit' className='button-link button-link-2'>
                                    <span className='button-link-text'>Agendar</span>
                                    <span class="material-icons">calendar_today</span>
                                </button>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Mapa;
