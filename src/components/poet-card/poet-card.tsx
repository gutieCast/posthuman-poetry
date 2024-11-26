import { FC } from "react";
interface IPoetCardProps {
  photo: string; // URL of the poet's photo or image
  biography: string[]; // Poet's name, title, and biography,
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


export const PoetCard: FC<IPoetCardProps> = ({ photo, biography, location, education, works, link }) => {
    return (
        <div className="poet-card">
          <div className="poet-card-body">
            <div className="poet-photo">
              <img src={photo} alt="" />
            </div>
            <div className="poet-card-content">
              <div className="poet-biography">
              {
                biography.map((item, index) => (
                  <div className="text-container" key={index}>
                    <span>{item}</span>
                  </div>
                ))
              }
              </div>
              <div className="poet-info">
                <div className="info-item">
                  <img src="/src/assets/icons/location-icon.svg" alt="location-icon" />
                  {location && location.map((loc, index) => (
                    <span key={`loc-${index}`}>{loc} </span>
                  ))}
                </div>
                <div className="info-item">
                  <img src="/src/assets/icons/education-icon.svg" alt="education-icon" />
                  {education && education.map((edu, index) => (
                    <span key={`edu-${index}`}>{edu} </span>
                  ))}
                </div>
              {
                works && (
                  <div className="info-item">
                    <img src="/src/assets/icons/works-icon.svg" alt="works-icon" />
                    <ul>
                      {
                        works.map((work, index) => (
                          <li key={index} className="work-item">
                            <span className="work-title bold">{work.title} </span>
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
              <img src="/src/assets/icons/instagram-icon.svg" alt="icon" />
            </a>
          </footer>
        </div>
    );
}
