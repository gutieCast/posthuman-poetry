import { FC } from "react";
import ScrollIcon from "../scroll-icon/scroll-icon";

import "./initial-scene.scss";

const InitialScene: FC = () => {

  return (
    <section className="section initial-scene">
      <div className="section-content --initial-scene" data-content>
        <h1 className="main-title">
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
        <ScrollIcon />
      </div>
    </section>
  );
}

export default InitialScene;