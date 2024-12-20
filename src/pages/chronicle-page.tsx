import { FC } from "react";
// interface IChroniclesPageProps {};


import TextContent, { Content } from "../components/text-content/text-content.tsx";
import { FooterNav } from "../components/footer/footer.tsx";

const itemsMenuFooter = [
  { title: 'Reportaje', href: '/', dir: 'left'  },
  { title: 'Poesía-ritual y poesía-pústula', href: '/perfiles', dir: 'right' }
]

import textContent from "../utils/content.json"
const ChroniclePage: FC = () => {
    return (
      <div className="chronicle-sections-container">
      <TextContent title={textContent.chronicle.title} theme="light" content={textContent.chronicle.content as Content[]} />
      <FooterNav items={itemsMenuFooter} />
    </div>
    );
}

export default ChroniclePage;
