import { FC, Fragment } from "react";

interface IPoemComponentProps {
  title?: string;
  author?: string;
  verses: string[];
}

import './poem-container.scss';

const PoemComponent: FC<IPoemComponentProps> = ({ title, author, verses }) => {
  return (
    <div className="poem-container">
      { title && <h3 className="title">{title}</h3> }
      { author && <span className="author">{author}</span> }
      <p className="poem">
        {verses.map((verse, index) => (
          <Fragment key={index}>
            <span>{verse}</span>
            <br />
          </Fragment>
        ))}
      </p>
    </div>
  );
}

export default PoemComponent;
