import { FC } from "react";
// interface INatureCulturePageProps {};
import TextContent, { Content } from "../components/text-content/text-content";
import { FooterNav } from "../components/footer/footer";

const itemsMenuFooter = [
  { title: 'Poesía-ritual y poesía-pústula', href: '/perfiles', dir: 'left'  },
  { title: 'Poesía', href: '/', dir: 'right' }
];

import textContent from "../utils/content.json"


const NatureCulturePage: FC = () => {
    return (
      <div className="profiles-sections-container">
        <TextContent title={textContent["nature-culture"].title} theme="light" content={textContent["nature-culture"].content as Content[]} />
        <TextContent title={textContent.illusion.title} content={textContent.illusion.content as unknown as Content[]} />
        <TextContent title={textContent.virginity.title} theme="light" content={textContent.virginity.content as unknown as Content[]} />
        <TextContent title={textContent.demythologizing.title} content={textContent.demythologizing.content as unknown as Content[]} />
        <TextContent title={textContent.art.title} content={textContent.art.content as unknown as Content[]} />
        <FooterNav items={itemsMenuFooter} />
      </div>

    );
}

export default NatureCulturePage;
