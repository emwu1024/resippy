import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';
import logo from '../../assets/round-logo.png';

const Navbar = () => {
  return (
    <div>
      <header className="header-container">
        <nav className="nav-container">
          <ul className="nav-list">
            <li className="nav-item">
              <NavLink to="/" className="nav-link">
                Home
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/recipes" className="nav-link">
                Recipes
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

            <li className="nav-item">
              <NavLink to="/" className="nav-link">
                Atlas
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/" className="nav-link">
                About
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
