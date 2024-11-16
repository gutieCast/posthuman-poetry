import { FC, useEffect, useState } from "react";

import ScrollIcon from "../scroll-icon/scroll-icon";
// import videoSmoke from "../../assets/video/smoke.mp4"
import './welcome.scss'

const Welcome : FC = () => {
  const [screenClass, setScreenClass] = useState(window.innerWidth < 767 ? 'column' : 'row');

  useEffect(() => {
    const handleResize = () => {
        setScreenClass(window.innerWidth < 767 ? 'column' : 'row');
    };

    window.addEventListener('resize', handleResize);

    // Cleanup listener on component unmount
    return () => {
        window.removeEventListener('resize', handleResize);
    };
  }, []);

    return (
        <section className="section welcome">
          <div className="section-content welcome-content">
            <h1 className={`text-title ${screenClass}`}>
              <div className="word">
                <span>B</span>
                <span>i</span>
                <span>e</span>
                <span>n</span>
                <span>v</span>
                <span>e</span>
                <span>n</span>
                <span>i</span>
                <span>d</span>
                <span>o</span>
                <span>s</span>
              </div>
              <div className="word">
                <span></span><span></span><span></span><span></span>
                <span>a</span>
                <span>l</span>
                <span></span><span></span><span></span><span></span>
              </div>
              <div className="word">
                <span>A</span>
                <span>n</span>
                <span>t</span>
                <span>r</span>
                <span>o</span>
                <span>p</span>
                <span>o</span>
                <span>c</span>
                <span>e</span>
                <span>n</span>
                <span>o</span>
              </div>
            </h1>
            {/* <video src={ videoSmoke } autoPlay muted></video> */}
            <ScrollIcon />
          </div>
        </section>
    );
}

export default Welcome;