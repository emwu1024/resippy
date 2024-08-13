import React, { useState } from "react";
import "./HideyPanel.css";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../Buttons/LoginButton/LoginButton";

const HideyPanel = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return (
    !isAuthenticated && (
      <div className="draw-outline-container">
        <div className="hidey-panel-container">
          <div className="hidey-panel" />
        </div>
      </div>
    )
  );
};

export default HideyPanel;
