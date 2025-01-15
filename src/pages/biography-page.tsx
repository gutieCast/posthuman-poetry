import { FC } from "react";

import photoAutor from '../assets/images/joan-villanueva.jpg';
import { Link } from "react-router-dom";


const BiographyPage: FC = () => {
    return (
        <div className="biography-container">
          <div className="biography-content">
            {/* Biography photo */}
            <div className="biography-photo">
              <img src={ photoAutor } alt="Joan Loayza Villanueva's photography" />
            </div>

            {/* Biography content */}
            <div className="biography-text">
              <h2>Joan Loayza Villanueva</h2>
              <p>Es escritora. Ha publicado los libros <span className="cursive">la trama artificial</span> (Premio Letras e imágenes del nuevo tiempo, 2022), <span className="cursive">calzar la sombra</span> (premio Franz Tamayo, 2023) y el pódcast <span className="cursive">Lesbotopia: política sáfica especulativa</span>. Colabora con diversas músicas y artistas sonoras.</p>
            {/* Biography links */}
            <div className="biography-links">
              <Link className="bold" to={'/'}>Volver</Link>
            </div>
            </div>
          </div>

        </div>
    );
}

export default BiographyPage;
