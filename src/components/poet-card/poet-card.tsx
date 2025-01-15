import { FC } from "react";
interface IPoetCardProps {
  photo: string; // URL of the poet's photo or image
  biography: string[]; // Poet's name, title, and biography,
  cursives?: string[];
  location: string[];
  education: string[];
  works: Work[],
  link: string
};

import './poet-card.scss';

export interface Work {
  title: string; // Title of the work
  year: number; // Year of publication
}

import iconLocation from '../../assets/icons/location-icon.svg';
import iconEducation from '../../assets/icons/education-icon.svg';
import iconWorks from '../../assets/icons/works-icon.svg';

import iconInstagram from '../../assets/icons/instagram-icon.svg';


export const PoetCard: FC<IPoetCardProps> = ({ photo, biography, cursives, location, education, works, link }) => {
  const renderContent = () => {
    let renderedContent = biography;
    if (cursives && cursives.length > 0) {
      cursives.forEach((cursive) => {
        const parts = renderedContent[0].split(cursive);
        renderedContent = [parts.join(`<span class="cursive">${cursive}</span>`)];
      });
    }

    return (
      <span dangerouslySetInnerHTML={{ __html: renderedContent }} />
    );
  };

    return (
        <div className="poet-card">
          <div className="poet-card-body">
            <div className="poet-photo">
              <img src={photo} alt="" />
            </div>
            <div className="poet-card-content">
              <div className="poet-biography">
              {
                // biography.map((item, index) => (
                //   <div className="text-container" key={index}>
                //     <span>{item}</span>
                //   </div>
                // ))
                renderContent()
              }
              </div>
              <div className="poet-info">
                <div className="info-item">
                  <img src={ iconLocation } alt="location-icon" />
                  <div>
                  {location && location.map((loc, index) => (
                    <p key={`loc-${index}`}>{loc} </p>
                  ))}
                  </div>
                </div>
                <div className="info-item">
                  <img src={ iconEducation } alt="education-icon" />
                  {education && education.map((edu, index) => (
                    <span key={`edu-${index}`}>{edu} </span>
                  ))}
                </div>
              {
                works && (
                  <div className="info-item">
                    <img src={ iconWorks } alt="works-icon" />
                    <ul>
                      {
                        works.map((work, index) => (
                          <li key={index} className="work-item">
                            <span className="work-title cursive">{work.title}</span>
                            <span>, </span>
                            <span className="work-year">{work.year}</span>
                          </li>
                        ))
                      }
                    </ul>
                  </div>
                )
              }
              </div>
            </div>
          </div>
          <footer>
            <a href={link}>
              <img src={ iconInstagram } alt="icon" />
            </a>
          </footer>
        </div>
    );
}
