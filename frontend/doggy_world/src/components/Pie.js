import React from 'react';
import './CSSComponents/Pie.css';
import visa from './Imágenes/visa.png';
import mastercard from './Imágenes/mastercard.png';
import android from './Imágenes/android.png';
import instagram from './Imágenes/instagram.png';
import tiktok from './Imágenes/tiktok.png';

function Pie() {
    return (
        <footer className="pie">
            <div className="contenedorPie">
                <div className="enlacesPie">
                    <a href="">Política de privacidad</a>
                    <a href="">Aviso legal</a>
                </div>

                <div className="metodosPago">
                    <h4>Métodos de pago</h4>
                    <div className="iconosPago">
                        <img src={visa} alt="Visa"/>
                        <img src={mastercard} alt="Mastercard"/>
                    </div>
                </div>

                <div className="android">
                    <a href="https://github.com/anacuende/Doggy_World" target="_blank" className="enlaceRepoAndroid">
                        <img src={android} alt="Android"/>
                        <span>Android</span>
                    </a>
                </div>

                <div className="RRSS">
                    <a href=""><img src={instagram} alt="Instagram"/></a>
                    <a href=""><img src={tiktok} alt="TikTok"/></a>
                </div>
            </div>

            <div className="copyright">
                <p>Copyright Doggy World 2024</p>
            </div>
        </footer>
    );
}

export default Pie;