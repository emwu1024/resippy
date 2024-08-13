import React, { useState } from "react";
import "./HideyPanel.css";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../Buttons/LoginButton/LoginButton";

const HideyPanel = () => {
  const { isAuthenticated } = useAuth0();

  return (
    !isAuthenticated && (
      <div className="draw-outline-container">
        <div className="hidey-panel-container">
          <div className="hidey-panel">
            <LoginButton></LoginButton>
          </div>
        </div>
      </div>
    )
  );
};

export default HideyPanel;
