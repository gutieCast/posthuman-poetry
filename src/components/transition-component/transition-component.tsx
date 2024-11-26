import { FC } from "react";
interface ITransitionComponentProps {
  colorFrom: string;
  colorTo: string;
};
import './transition-component.scss'

export const TransitionComponent: FC<ITransitionComponentProps> = ({ colorFrom, colorTo }) => {
    return (
      <section
      className="section"
    >
      <div
      className="transition"
      style={{
        '--color-from': colorFrom,
        '--color-to': colorTo,
      } as React.CSSProperties}
      ></div>
    </section>
    );
}
