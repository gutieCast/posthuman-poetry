import { Children, FC, ReactNode, useEffect, useState } from "react";
import './text-content.scss';
import PoemComponent from "../poem-container/poem-component.tsx";
import CustomTooltip from "../tooltip/tooltip.tsx";
import AudioPlayer from "../audio-player/audio-player.tsx";

import { PoetCard, Work } from "../poet-card/poet-card";

interface ITextContentProps {
  theme?: string;
  effect?: string;
  title: string | null;
  content: Content[];
  children?: ReactNode;
  childrenPositions?: ('before' | 'after')[];
}

export interface Content {
  type: string;
  content: string;
  title?: string;
  author?: string;
  verses?: string[];
  tooltip?: {
    word: string;
    content: string;
    source: string;
  };
  source?: string;
  caption?: string;
  photo: string;
  biography?: string[];
  location?: string[];
  education?: string[];
  works?: Work[],
  link?: string,
  imgCoverAudio?: string;
  url?: string;
}

const TextContent: FC<ITextContentProps> = (props) => {
  const { title, content, theme, effect, children = [], childrenPositions = [] } = props;

  const [themeSection, setThemeSection] = useState('');
  const [effectClass, setEffectClass] = useState('');

  useEffect(() => {
    setThemeSection(theme || 'default');
    setEffectClass(effect || '');
  }, [theme, effect]);

  const childrenArray = Children.toArray(children);

  return (
    <section className={`section text-content ${themeSection}`}>
      {title && <h2 className="text-title">{title}</h2>}
      <div className={`section-content --text-content ${effectClass}`}>
        {childrenArray?.map((child, index) => (
          childrenPositions[index] === 'before' && <div key={`before-${index}`}>{child}</div>
        ))}

        {content.map((item, index) => {
          if (item.type === 'paragraph') {
            const { content, tooltip } = item;
            if (tooltip) {
              const parts = content.split(tooltip.word);
              return (
                <div key={index} className="paragraph-content" style={{ display: 'inline' }}>
                  <span>{parts[0]}</span>
                  <CustomTooltip content={
                    <>
                      <p>{tooltip.content}</p>
                      <span className="bold">Fuente: </span>
                      <span>{tooltip.source}</span>
                    </>
                    }>
                    <span className="tooltip-anchor tooltip-container">{tooltip.word}</span>
                  </CustomTooltip>
                  <span>{parts[1]}</span>
                </div>
              );
            }
            
            return <p key={index}>{content}</p>;
          } else if (item.type === 'poem' && item.verses) {
            return (
              <PoemComponent
                key={index}
                title={item.title ?? undefined}
                author={item.author ?? undefined}
                verses={item.verses}
              />
            );
          } else if (item.type === 'image' && item.source) {
            {
              if (item.caption && item.caption !== '') {
                const parts = item.caption.split('Fuente:');
                return (
                  <figure key={index} className="figure-container">
                    <img src={item.source} alt="figure" />
                    <figcaption>
                      <p>{parts[0]}</p>
                      {parts[1] && (
                        <p>
                          <span className="bold">Fuente:</span> {parts[1]}
                        </p>
                      )}
                    </figcaption>
                  </figure>
                );
              } else {
                return (
                  <figure key={index} className="figure-container">
                    <img src={item.source} alt="figure" />
                  </figure>
                );
              }
              
            }            
          } else if (item.type === 'poet') {
            return (
              <PoetCard photo={item.photo} biography={item.biography!} location={item.location!} education={item.education!}  works={item.works!} link={item.link!} ></PoetCard>
            );
          } else if (item.type === 'audio') {
            return (
              <AudioPlayer imgCoverAudio={item.imgCoverAudio!} url={item.url!} />
            )
          }

          return null;
        })}

        {childrenArray?.map((child, index) => (
          childrenPositions[index] === 'after' && <div key={`after-${index}`}>{child}</div>
        ))}
        <div className="space"></div>
      </div>
    </section>
  );
};

export default TextContent;
