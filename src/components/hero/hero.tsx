import './hero.scss';
import videoHero from '../../assets/video/hero.mp4'; 

export function Hero () {
  // const handlePlay = () => {

  // }

  return (
    <div className="hero">
      <video id="video" autoPlay loop muted >
          <source src={ videoHero } type="video/mp4" />
      </video>
      <div className="hero-content">
        <h1 className="text-title">
          {/* <text> */}
            Bienvenidos al Antropoceno
          {/* </text> */}
        </h1>
  </div>
    </div>

  )
}