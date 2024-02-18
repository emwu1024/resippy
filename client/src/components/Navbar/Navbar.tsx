import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div>
      <nav className="nav-container">
        <NavLink to="/" className="nav-logo">
          Resippys
        </NavLink>

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
    </div>
  );
};

export default Navbar;
