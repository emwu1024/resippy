import React from "react";
import "./Footer.css";

import { IconContext } from "react-icons";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="footer-container">
      <span>
        <a href="https://github.com/emwu1024">
          <IconContext.Provider
            value={{
              color: "#e1be96",
              size: "1.5rem",
              className: "footer-icon",
            }}
          >
            <FaGithub />
          </IconContext.Provider>
        </a>
      </span>
      <span className="footer-text">© 2024 · Resippys</span>
    </div>
  );
};

export default Footer;
