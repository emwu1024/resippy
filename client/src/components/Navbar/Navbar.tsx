import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { NavLink } from 'react-router-dom';
import { IoClose, IoMenu } from 'react-icons/io5';

import './Navbar.css';
import logo from '../../assets/resippy-logo-v2.png';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: '1100px' });

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMobileMenu = () => {
    if (isMobile) {
      setIsMenuOpen(false);
    }
  };

  //   Conditionally rendered navbar code
  // Real talk this will need some work as i've implemented the list way differently to them oop
  const renderNavLinks = () => {
    const listClassName = isMobile ? 'nav-list-mobile' : 'nav-list';
    const listContainerClassName = isMobile ? '' : 'list-container';

    return (
      <div className={listContainerClassName}>
        <ul className={listClassName}>
          <li className="nav-item" data-text="HOME">
            <NavLink to="/" className="nav-link" onClick={closeMobileMenu}>
              HOME
            </NavLink>
          </li>

          <li className="nav-item" data-text="RECIPES">
            <NavLink
              to="/recipes"
              className="nav-link"
              onClick={closeMobileMenu}
            >
              RECIPES
            </NavLink>
          </li>
        </ul>

        {/* Only render logo when not in mobile view */}
        {!isMobile && <img src={logo} alt="Logo" className="nav-logo-img" />}

        <ul className={listClassName}>
          <li className="nav-item" data-text="ATLAS">
            <NavLink to="/" className="nav-link" onClick={closeMobileMenu}>
              ATLAS
            </NavLink>
          </li>
          <li className="nav-item" data-text="ABOUT">
            <NavLink to="/" className="nav-link" onClick={closeMobileMenu}>
              ABOUT
            </NavLink>
          </li>
        </ul>
      </div>
    );
  };

  return (
    <div>
      <header className="header-container">
        <nav
          className={`nav-container  ${isMobile ? 'nav-container-mobile' : ''}`}
        >
          <div className="bar-hamburger">
            <p>hello</p>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>
          {isMobile && (
            <div
              className={`hamburger  ${isMenuOpen ? 'hide-icon' : 'show-icon'}`}
              id="nav-toggle"
              onClick={toggleMenu}
            >
              <IoMenu />
            </div>
          )}

          {isMobile ? (
            <div
              className={`${isMenuOpen ? 'show-menu' : 'hide-menu'}`}
              id="nav-menu"
            >
              {renderNavLinks()}
              <div
                className={`nav-close  ${
                  isMenuOpen ? 'show-icon' : 'hide-icon'
                }`}
                id="nav-close"
                onClick={toggleMenu}
              >
                <IoClose />
              </div>
            </div>
          ) : (
            renderNavLinks()
          )}
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
