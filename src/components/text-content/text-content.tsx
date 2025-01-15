import React, { FC, ReactNode, useEffect, useState } from "react";
import './text-content.scss';
import PoemComponent from "../poem-container/poem-component.tsx";
import CustomTooltip from "../tooltip/tooltip.tsx";
import AudioPlayer from "../audio-player/audio-player.tsx";
import { PoetCard, Work } from "../poet-card/poet-card";
import { Link } from "react-router-dom";
import DefinitionCard from "../definition-card/definition-card.tsx";

interface ITextContentProps {
  theme?: string;
  effect?: string;
  title: string | null;
  cursivesTitle?: string[];
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
  term?: string,
  root?: string;
  definitions?: string[];
  tooltips?: Tooltip[];
  cursives?: string[];
  source?: string;
  caption?: string;
  photo: string;
  biography?: string[];
  location?: string[];
  education?: string[];
  works?: Work[];
  link?: string;
  display?: string;
  address?: string;
  imgCoverAudio?: string;
  url?: string;
}

export interface Tooltip {
  word: string;
  content: string;
  cursives?: string[];
  source: string;
}

const TextContent: FC<ITextContentProps> = (props) => {
  const { title, cursivesTitle, content, theme, effect, children = [], childrenPositions = [] } = props;

  const [themeSection, setThemeSection] = useState('');
  const [effectClass, setEffectClass] = useState('');

  useEffect(() => {
    setThemeSection(theme || 'default');
    setEffectClass(effect || '');
  }, [theme, effect]);

  const childrenArray = React.Children.toArray(children);

  const renderText = (key: string, paragraphContent: string, tooltips: Tooltip[] = [], cursives: string[] = []) => {
    let parts: (string | JSX.Element)[] = [paragraphContent];

    // Apply tooltips
    tooltips.forEach((tooltip, tooltipIndex) => {
      let tooltipApplied = false; // Flag to track if a tooltip has been applied
      parts = parts.flatMap(part => {
        if (typeof part === 'string') {
          const splitParts = part.split(new RegExp(`(${tooltip.word})`, 'g'));
          return splitParts.map((text, textIndex) => {
            if (text === tooltip.word && !tooltipApplied) {
              tooltipApplied = true; // Set the flag to true once the tooltip is applied
              return (
                <CustomTooltip
                  key={`${key}-${textIndex}-${tooltipIndex}-${tooltip.word}`}
                  id={`${key}-${textIndex}-${tooltipIndex}-${tooltip.word}`}
                  word={tooltip.word}
                  content={tooltip.content}
                  cursives={tooltip.cursives}
                >
                  <span className="tooltip-text">
                    <span className="bold">Fuente: </span>
                    <span className="tooltip-text">{renderText(`${key}-${textIndex}-${tooltipIndex}-source`, tooltip.source, [], tooltip.cursives)}</span>
                  </span>
                </CustomTooltip>
              );
            }
            return text;
          });
        }
        return [part];
      });
    });

    // Apply cursives
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

    return <span key={key} className="inline-text">{parts}</span>;
  };

  return (
    <section className={`section text-content ${themeSection}`}>
      {title && cursivesTitle ? (<h2 className="text-title">{renderText(title, title, [], cursivesTitle)}</h2>)
       : title && !cursivesTitle? (<h2 className="text-title">{title}</h2>) : null}
      <div className={`section-content --text-content ${effectClass}`}>
        {childrenArray?.map((child, index) => (
          childrenPositions[index] === 'before' && <div key={`before-${index}`}>{child}</div>
        ))}

        {content.map((item, index) => {
          if (item.type === 'paragraph') {
            return (
            <div key={index} className="paragraph-content">{ renderText('index', item.content, item.tooltips, item.cursives) }</div>
            );
          } else if (item.type === 'poem' && item.verses) {
            return (
              <PoemComponent
                key={index}
                title={item.title ?? undefined}
                author={item.author ?? undefined}
                verses={item.verses}
              />
            );
          } else if (item.type === 'definition' && item.term && item.definitions) {
            return (
              <DefinitionCard
                term={item.term}
                root={item.root}
                cursives={item.cursives}
                definitions={item.definitions}
                source={item.source}
              />
            )
          } else if (item.type === 'image' && item.source) {
            if (item.caption && item.caption !== '') {
              const parts = item.caption.split('Fuente:');
              return (
                <figure key={index} className="figure-container">
                  <img src={item.source} alt="figure" />
                  <figcaption>
                    <span>{item.cursives ? renderText('index', parts[0], [], item.cursives) : parts[0]}</span>
                    {parts[1] ? (
                      <span>
                        <span className="bold">Fuente:</span> 
                        {item.cursives ? renderText('index', parts[1], [], item.cursives) : parts[1]}
                      </span>
                    ) : null}
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
          } else if (item.type === 'poet') {
            return (
              <div key={index}>
                <PoetCard photo={item.photo} biography={item.biography!} cursives={item.cursives} location={item.location!} education={item.education!} works={item.works!} link={item.link!} ></PoetCard>
              </div>
            );
          } else if (item.type === 'audio') {
            return (
              <div key={index}>
                <AudioPlayer imgCoverAudio={item.imgCoverAudio!} url={item.url!} />
              </div>
            )
          } else if(item.type === 'link' && item.address && item.display) {
            return (
              <span key={index}>
                <Link
                  className="PDF-downloader"
                  to={item.address} target="_blank" download>
                  <figure key={index} className="figure-container">
                    <img src={item.display} alt="image-for-link" />
                  </figure>
                  <figcaption>
                    <p>{ item.title }</p>
                  </figcaption>
                </Link>
              </span>
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

