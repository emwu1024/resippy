import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { NavLink } from 'react-router-dom';
import './Navbar.css';
import logo from '../../assets/resippy-logo-v2.png';

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: '1150px' });

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const closeMenuOnMobile = () => {
    if (window.innerWidth <= 1150) {
      setShowMenu(false);
    }
  };

  const renderNavLinks = () => {
    const listClassName = isMobile ? 'nav__list' : 'nav__list__web';
    const linkClassName = 'nav__link';
    const buttonClassName = 'nav__cta';
    return (
      <ul className={listClassName}>
        <li>
          <NavLink to="/" className={linkClassName} onClick={closeMobileMenu}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/news"
            className={linkClassName}
            onClick={closeMobileMenu}
          >
            News
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about-us"
            className={linkClassName}
            onClick={closeMobileMenu}
          >
            About Us
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/favorite"
            className={linkClassName}
            onClick={closeMobileMenu}
          >
            Favorite
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/location"
            className={linkClassName}
            onClick={closeMobileMenu}
          >
            Location
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/get-started"
            className={`${linkClassName} ${buttonClassName}`}
            onClick={closeMobileMenu}
          >
            Get Started
          </NavLink>
        </li>
      </ul>
    );
  };

  return (
    <div>
      <header className="header-container">
        <nav className="nav-container">
          <ul className="nav-list">
            <li className="nav-item" data-text="HOME">
              <NavLink to="/" className="nav-link">
                HOME
              </NavLink>
            </li>

            <li className="nav-item" data-text="RECIPES">
              <NavLink to="/recipes" className="nav-link">
                RECIPES
              </NavLink>
            </li>
          </ul>

          <img src={logo} alt="Logo" className="nav-logo-img" />

          <ul className="nav-list">
            {/* <li className="nav-item">
              <NavLink to="/" className="nav-logo">
                Resippys
              </NavLink>
            </li> */}

            <li className="nav-item" data-text="ATLAS">
              <NavLink to="/" className="nav-link">
                ATLAS
              </NavLink>
            </li>
            <li className="nav-item" data-text="ABOUT">
              <NavLink to="/" className="nav-link">
                ABOUT
              </NavLink>
            </li>
          </ul>

          {/* Hamburger Menu Icon - should I turn this into a component?? that seems kinda redundant idk*/}
          <div className="hamburger-icon" id="nav-toggle" onClick={toggleMenu}>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
