import { FC } from "react";
interface IDefinitionCardProps {
  term: string;
  root?: string;
  definitions: string[];
  source?: string;
  cursives?: string[];
};

import './definition-card.scss';

const DefinitionCard: FC<IDefinitionCardProps> = ({ term, root, cursives, definitions, source }) => {
  const renderText = (text: string, cursives: string[] = []) => {
    let parts: (string | JSX.Element)[] = [text];

    cursives.forEach((cursive, cursiveIndex) => {
      parts = parts.flatMap(part => {
        if (typeof part === 'string') {
          const splitParts = part.split(new RegExp(`(${cursive})`, 'g'));
          return splitParts.map((text, textIndex) => {
            if (text === cursive) {
              return <span key={`${cursive}-${cursiveIndex}-${textIndex}`} className="cursive">{cursive}</span>;
            }
            return text;
          });
        }
        return [part];
      });
    });

    return <div>{parts}</div>;
  };
  return (
    <div className="definition-container">
      <h3 className="term">{term}</h3>
      {root && <div className="root">{renderText(root, cursives)}</div>}
      <ol className="definitions">
        {definitions.map((item, index) => (
          <li key={`${term}-${index}`}>{item}</li>
        ))}
      </ol>
      {source && <div className="source"><span className="bold">Fuente:</span> {renderText(source, cursives)}</div>}
    </div>
  );
}

export default DefinitionCard;
