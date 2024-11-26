import { FC, ReactNode, useEffect, useState } from 'react';
import { Tooltip } from 'react-tooltip';
import './tooltip.scss';

interface ICustomTooltipProps {
  content: ReactNode;
  children: ReactNode;
}

const CustomTooltip: FC<ICustomTooltipProps> = ({ content, children }) => {
  
  const [isButton, setIsButton] = useState(false);
  useEffect(() => {
    const updateIsButton = () => setIsButton(window.innerWidth < 999);
    updateIsButton();
    window.addEventListener('resize', updateIsButton);
    return () => window.removeEventListener('resize', updateIsButton);
  }, [isButton]);

  return (
    <>
      {isButton ? (
        <>
          <a className="tooltip-container" data-tooltip-id='tooltip'>
            {children}
          </a>
          <Tooltip id="tooltip"
            place="top"
            openEvents={{click: true}}
            style={{ backgroundColor: "#429242", color: "#ECECEA", width: "300px" }}
          >
            {content}
          </Tooltip>
        </>
      ) : (
        <>
          <a className="tooltip-container" data-tooltip-id='tooltip'>
            {children}
          </a>
          <Tooltip id="tooltip"
            place="top"
            style={{ backgroundColor: "#429242", color: "#ECECEA", width: "300px" }}
          >
            {content}
          </Tooltip>
        </>
      )}
    </>
  );
};

export default CustomTooltip;
