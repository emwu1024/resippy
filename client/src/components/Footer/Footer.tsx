import React from "react";
import "./Footer.css";

import { IconContext } from "react-icons";
import { FaGithub } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

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
      <span className="footer-text">
        {/* <a href="https://github.com/emwu1024"></a> */}
        <Link className="attribution-text" to={`/attributions`}>
          Attributions
        </Link>
      </span>
    </div>
  );
};

export default Footer;
