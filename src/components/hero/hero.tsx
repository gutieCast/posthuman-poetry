import { FC } from "react";

import videoLaPazSmoke from '../../assets/video/la-paz-smoke.mp4';
import './hero.scss';

const Hero: FC = () => {
  return (
    <section className="section hero">
      <div className="section-content --hero" data-content>
        <h2 className="text-title title-hero">
          Ecos de una nueva época geológica en la poesía de Bolivia
          </h2>
        <video autoPlay loop muted >
            <source src={ videoLaPazSmoke } type="video/mp4" />
        </video>
      </div>
    </section>
  )
}

export default Hero;