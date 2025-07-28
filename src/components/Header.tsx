import { NavLink } from 'react-router-dom';
import Themeswitch from './ThemeSwitch';

export default function Header() {
  return (
    <header className="bg-white/80 backdrop-blur-md shadow-lg border-b border-gray-100 z-50 w-full fixed top-0 flex justify-center items-center h-[60px]">
      <nav className="layout w-full flex justify-between items-center">
        <ul className="flex items-center justify-center gap-2 py-4">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center gap-1 px-4 py-2 rounded-lg font-semibold transition-all duration-300
     ${isActive ? 'text-purple-600' : 'text-gray-700 hover:text-purple-600 hover:bg-purple-50'}`
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `flex items-center gap-1 px-4 py-2 rounded-lg font-semibold transition-all duration-300
     ${isActive ? 'text-purple-600' : 'text-gray-700 hover:text-purple-600 hover:bg-purple-50'}`
              }
            >
              About
            </NavLink>
          </li>
        </ul>
        <Themeswitch />
      </nav>
    </header>
  );
}
