import { FC, ReactNode, useEffect, useState } from 'react';
import { Tooltip } from 'react-tooltip';
import './tooltip.scss';

interface ICustomTooltipProps {
  id: string;
  word: string;
  content: string;
  cursives?: string[];
  children?: ReactNode;
}

const CustomTooltip: FC<ICustomTooltipProps> = ({ id, word, content, cursives, children }) => {
  const [isButton, setIsButton] = useState(false);
  useEffect(() => {
    const updateIsButton = () => setIsButton(window.innerWidth < 999);
    updateIsButton();
    window.addEventListener('resize', updateIsButton);
    return () => window.removeEventListener('resize', updateIsButton);
  }, [isButton]);

  const renderContent = () => {
    let renderedContent = content;
    if (cursives && cursives.length > 0) {
      cursives.forEach((cursive) => {
        const parts = renderedContent.split(cursive);
        renderedContent = parts.join(`<span class="cursive">${cursive}</span>`);
      });
    }

    return (
      <span>
        <span dangerouslySetInnerHTML={{ __html: renderedContent }} />
        <br/><br/>
        { children }
      </span>
    );
  };

  return (
    <div className='tooltip-container'>
      {isButton ? (
        <>
          <a className="tooltip-word" data-tooltip-id={ id }>
            <span className="tooltip-anchor tooltip-word">{ word }</span>
          </a>
          <Tooltip
            id={ id }
            place="top"
            openEvents={{click: true}}
            className='tooltip-element'
          >
            {renderContent()}
          </Tooltip>
        </>
      ) : (
        <div className='tooltip-container'>
          <a className="tooltip-word" data-tooltip-id={ id }>
            <span className="tooltip-anchor tooltip-word">{ word }</span>  
          </a>
          <Tooltip
            id={ id }
            place="top"
            className='tooltip-element'
          >
            {renderContent()}
          </Tooltip>
        </div>
      )}
    </div>
  );
};

export default CustomTooltip;