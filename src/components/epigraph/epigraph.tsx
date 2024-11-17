import { FC } from "react";
// interface IEpigraphProps {};
import './epigraph.scss';

const Epigraph: FC = () => {
    return (
        <section className="section epigraph">
          <div className="section-content --epigraph">
            <h3 className="text-title text-epigraph">
              <span className="text-green">Seis obras </span>sugieren la presencia de poéticas posthumanas en el territorio, un posible indicio de <span className="text-black">alteración excesiva al planeta</span> por parte de los seres humanos
            </h3>
            <p>poéticas</p>
            <p>posthumanas</p>
            <p>alteración</p>
            <p>excesiva</p>
            <p>planeta</p>
          </div>
        </section>
    );
}

export default Epigraph;
