import { FC } from "react";
import { NavLink } from "react-router-dom";
interface IFooterNavProps {
  items: Array<{ href: string; title: string; dir: string }>;
};
import './footer.scss';

export const FooterNav: FC<IFooterNavProps> = ({ items }) => {
    return (
      <footer className={`nav-footer ${items.length > 1 ? 'space-between' : 'flex-end'}`}>
      {
        items.map(({ href, title, dir }) => (
          <NavLink to={href} key={href}
          className={dir}
          
          >
            {dir === 'left' && <img src="/src/assets/icons/left-btn-icon.svg" alt="left-arrow" />}
            {dir === 'right' && <img src="/src/assets/icons/right-btn-icon.svg" alt="right-arrow" />}
            {title}
          </NavLink>
        ))
      }
    </footer>
    
    );
}
