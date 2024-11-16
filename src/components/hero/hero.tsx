import { FC } from "react";

import videoLaPazSmoke from '../../assets/video/la-paz-smoke.mp4';
import './hero.scss';

const Hero: FC = () => {
  return (
    <section className="section video-hero">
      <div className="section-content">
        <video autoPlay loop muted >
            <source src={ videoLaPazSmoke } type="video/mp4" />
        </video>
      </div>
    </section>
  )
}

export default Hero;