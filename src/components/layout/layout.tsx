import { NavLink, Outlet } from "react-router-dom";
import './layout.scss';
const Layout = () => {
  // TODO: menu aside navigation for mobile 
  const menuItems = [ 
    {
      href: "/",
      title: "Poesía",
    },
    {
      href: "cronica",
      title: "Crónica",
    },
    {
      href: "perfiles",
      title: "Perfiles",
    },
    {
      href: "cultureza",
      title: "Cultureza",
    },
  ];

  <li>
    <NavLink to="/">Poesía</NavLink>
  </li>;

  return (
    <div className="layout">
      <header className="main-header">
      <nav>
        <ul>
          {menuItems.map(({ href, title }) => (
            <li key={title}>
              <NavLink
                className={({ isActive }) => (isActive ? 'active' : '')}
                to={href}
              >
                {title}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      </header>
      <div className="main-container">
        <aside className="aside"></aside>
        <main className={"flex-1"}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;