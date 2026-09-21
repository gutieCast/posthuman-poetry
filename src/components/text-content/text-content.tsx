import React, { FC, ReactNode, useEffect, useState, useRef } from "react";
import './text-content.scss';
import PoemComponent from "../poem-container/poem-component.tsx";
import CustomTooltip from "../tooltip/tooltip.tsx";
import AudioPlayer from "../audio-player/audio-player.tsx";
import { PoetCard, Work } from "../poet-card/poet-card";
import DefinitionCard from "../definition-card/definition-card.tsx";
import FileLink from "../file-link/file-link.tsx";
import useScrollAnimation from "../../hooks/use-scroll-content-animation.tsx";

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

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
  term?: string;
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

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Applies text styling (tooltips and cursive) to content
 */
const applyTextStyling = (
  key: string,
  text: string,
  tooltips: Tooltip[] = [],
  cursives: string[] = []
): JSX.Element => {
  let parts: (string | JSX.Element)[] = [text];

  // Apply tooltips
  tooltips.forEach((tooltip, tooltipIndex) => {
    let tooltipApplied = false;
    parts = parts.flatMap(part => {
      if (typeof part === 'string') {
        const splitParts = part.split(new RegExp(`(${tooltip.word})`, 'g'));
        return splitParts.map((text, textIndex) => {
          if (text === tooltip.word && !tooltipApplied) {
            tooltipApplied = true;
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
                  <span className="tooltip-text">
                    {applyTextStyling(`${key}-${textIndex}-${tooltipIndex}-source`, tooltip.source, [], tooltip.cursives || [])}
                  </span>
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

  // Apply cursive styling
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

// ============================================================================
// CONTENT RENDERERS
// ============================================================================

const renderParagraph = (item: Content, index: number) => (
  <div key={index} className="paragraph-content">
    {applyTextStyling('paragraph', item.content, item.tooltips, item.cursives)}
  </div>
);

const renderPoem = (item: Content, index: number) => (
  <PoemComponent
    key={index}
    title={item.title}
    author={item.author}
    verses={item.verses!}
  />
);

const renderDefinition = (item: Content, index: number) => (
  <DefinitionCard
    key={index}
    term={item.term!}
    root={item.root}
    cursives={item.cursives}
    definitions={item.definitions!}
    source={item.source}
  />
);

const renderImage = (item: Content, index: number) => {
  if (!item.caption) {
    return (
      <figure key={index} className="figure-container">
        <img src={item.source} alt="figure" />
      </figure>
    );
  }

  const [mainCaption, sourceCaption] = item.caption.split('Fuente:');

  return (
    <figure key={index} className="figure-container">
      <img src={item.source} alt="figure" />
      <figcaption>
        <span>
          {item.cursives
            ? applyTextStyling('caption', mainCaption, [], item.cursives)
            : mainCaption}
        </span>
        {sourceCaption && (
          <span>
            <span className="bold">Fuente:</span>
            {item.cursives
              ? applyTextStyling('source', sourceCaption, [], item.cursives)
              : sourceCaption}
          </span>
        )}
      </figcaption>
    </figure>
  );
};

const renderPoet = (item: Content, index: number) => (
  <PoetCard
    key={index}
    photo={item.photo}
    biography={item.biography!}
    cursives={item.cursives}
    location={item.location!}
    education={item.education!}
    works={item.works!}
    link={item.link!}
  />
);

const renderAudio = (item: Content, index: number) => (
  <div key={index}>
    <AudioPlayer imgCoverAudio={item.imgCoverAudio!} url={item.url!} />
  </div>
);

const renderFileLink = (item: Content, index: number) => (
  <FileLink
    key={index}
    item={item}
    index={index}
  />
);

/**
 * Main content item renderer with type-based routing
 */
const renderContentItem = (item: Content, index: number): JSX.Element | null => {
  const renderers: Record<string, () => JSX.Element | null> = {
    paragraph: () => renderParagraph(item, index),
    poem: () => item.verses ? renderPoem(item, index) : null,
    definition: () => (item.term && item.definitions) ? renderDefinition(item, index) : null,
    image: () => item.source ? renderImage(item, index) : null,
    poet: () => renderPoet(item, index),
    audio: () => renderAudio(item, index),
    link: () => (item.address && item.display) ? renderFileLink(item, index) : null,
  };

  const renderer = renderers[item.type];
  return renderer ? renderer() : null;
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

const TextContent: FC<ITextContentProps> = ({
  title,
  cursivesTitle,
  content,
  theme = 'default',
  effect = '',
  children = [],
  childrenPositions = []
}) => {
  const [themeSection, setThemeSection] = useState(theme);
  const [effectClass, setEffectClass] = useState(effect);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setThemeSection(theme);
    setEffectClass(effect);
  }, [theme, effect]);

  useScrollAnimation(sectionRef);

  const childrenArray = React.Children.toArray(children);

  const renderTitle = () => {
    if (!title) return null;

    if (cursivesTitle) {
      return (
        <h2 className="text-title">
          {applyTextStyling(title, title, [], cursivesTitle)}
        </h2>
      );
    }

    return <h2 className="text-title">{title}</h2>;
  };

  const renderChildrenAtPosition = (position: 'before' | 'after') => {
    return childrenArray.map((child, index) =>
      childrenPositions[index] === position && (
        <div key={`${position}-${index}`}>{child}</div>
      )
    );
  };

  return (
    <section className={`section text-content ${themeSection}`}>
      {renderTitle()}
      <div ref={sectionRef} className={`section-content --text-content ${effectClass}`}>
        {renderChildrenAtPosition('before')}
        {content.map(renderContentItem)}
        {renderChildrenAtPosition('after')}
        <div className="space" />
      </div>
    </section>
  );
};

export default TextContent;
