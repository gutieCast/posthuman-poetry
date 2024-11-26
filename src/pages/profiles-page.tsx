import { FC } from "react";
// interface IProfilesPageProps {};

import TextContent, { Content } from "../components/text-content/text-content.tsx";
import { FooterNav } from "../components/footer/footer.tsx";

const itemsMenuFooter = [
  { title: 'Especies de compañía', href: '/cronica', dir: 'left'  },
  { title: 'Cultureza', href: '/cultureza', dir: 'right' }
];

import textContent from "../utils/content.json"

const ProfilesPage: FC = () => {
    return (
      <div className="profiles-sections-container">
        <TextContent title={textContent.profile1.title} content={textContent.profile1.content as Content[]} />
        <TextContent title={textContent.profile2.title} theme="light" content={textContent.profile2.content as Content[]} />
        <FooterNav items={itemsMenuFooter} />
      </div>
    );
}

export default ProfilesPage;