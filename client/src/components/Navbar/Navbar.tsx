import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { NavLink } from "react-router-dom";
import { IoClose, IoMenu } from "react-icons/io5";
import HideyPanel from "../HideyPanel/HideyPanel";
import LoginButton from "../Buttons/LoginButton/LoginButton";
import { useAuth0 } from "@auth0/auth0-react";

import "./Navbar.css";
// import logo from '../../assets/resippy-logo-v2.png';
import logo from "../../assets/stamp-logo-red-round-2.png";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSigninDisplayed, setIsSigninDisplayed] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: "1100px" });

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMobileMenu = () => {
    if (isMobile) {
      setIsMenuOpen(false);
    }
  };

  const onTripleClick = async (e: React.MouseEvent<HTMLImageElement>) => {
    if (e.detail > 3) {
      console.log("Triple Clicked! :)");
      setIsSigninDisplayed(true);
    } else {
      console.log("Not Triple Clicked...");
      console.log(isAuthenticated);
    }
  };

  const { logout, isAuthenticated } = useAuth0();

  //   Conditionally rendered navbar code
  // Real talk this will need some work as i've implemented the list way differently to them oop
  const renderNavLinks = () => {
    const listClassName = isMobile ? "nav-list-mobile" : "nav-list";
    const listContainerClassName = isMobile ? "" : "list-container";

    return (
      <div>
        {!isAuthenticated && !isMobile && (
          <HideyPanel isDisplayed={isSigninDisplayed}>
            <LoginButton></LoginButton>
          </HideyPanel>
        )}
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

          {isAuthenticated && (
            <li className="nav-item" data-text="CREATE">
              <NavLink
                to="/recipes/create"
                className="nav-link"
                onClick={closeMobileMenu}
              >
                CREATE
              </NavLink>
            </li>
          )}

          <NavLink to="/" className="nav-link" onClick={closeMobileMenu}>
            {/* Only render logo when not in mobile view */}
            {!isMobile && (
              <img
                src={logo}
                alt="Logo"
                onClick={(e) => onTripleClick(e)}
                className="nav-logo-img"
              />
            )}
          </NavLink>

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
            {isAuthenticated && (
              <li className="nav-item" data-text="LOGOUT">
                <NavLink
                  to="/"
                  className="nav-link"
                  // onClick={closeMobileMenu}
                  onClick={() =>
                    logout({
                      logoutParams: { returnTo: window.location.origin },
                    })
                  }
                >
                  LOGOUT
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    );
  };

  return (
    <div>
      <header className="header-container">
        <nav
          className={`nav-container  ${isMobile ? "nav-container-mobile" : ""}`}
        >
          {isMobile && (
            <div
              className={`hamburger  ${isMenuOpen ? "hide-icon" : "show-icon"}`}
              id="nav-toggle"
              onClick={toggleMenu}
            >
              <IoMenu />
            </div>
          )}

          {isMobile ? (
            <div
              className={`${isMenuOpen ? "show-menu" : "hide-menu"}`}
              id="nav-menu"
            >
              {renderNavLinks()}
              <div
                className={`nav-close  ${
                  isMenuOpen ? "show-icon" : "hide-icon"
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
