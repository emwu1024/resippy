import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';
import logo from '../../assets/resippy-logo-v2.png';

const Navbar = () => {
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
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
