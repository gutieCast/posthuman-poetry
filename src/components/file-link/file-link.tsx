import { FC } from "react";
interface IFileLinkProps {
  address?: string;
  display?: string;
  title?: string;
};

import './file-link.scss';

const isValidGoogleDriveUrl = (url: string): boolean => {
  const googleDriveUrlPattern = /^https:\/\/drive\.google\.com\/file\/d\/[a-zA-Z0-9_-]+\/view$/;
  return googleDriveUrlPattern.test(url);
};

const sanitizeUrl = (url: string): string => {
  if (isValidGoogleDriveUrl(url)) {
    return url;
  }
  return '#';
};

const FileLink: FC<{ item: IFileLinkProps; index: number }> = ({ item, index }) => {
  const sanitizedUrl = item.address ? sanitizeUrl(item.address): '#';

  return (
    <a className="PDF-downloader" href={sanitizedUrl} target="_blank" download>
      <figure key={index} className="figure-container">
        <img src={item.display} alt="image-for-link" />
      </figure>
      <figcaption>
        <p>{item.title}</p>
      </figcaption>
    </a>
  );
}

export default FileLink;