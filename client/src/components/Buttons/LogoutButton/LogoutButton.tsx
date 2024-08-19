import React, { useState } from "react";
import "./LogoutButton.css";
import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
  const { logout, isAuthenticated } = useAuth0();
  return (
    isAuthenticated && (
      <div>
        <button
          onClick={() =>
            logout({ logoutParams: { returnTo: window.location.origin } })
          }
        >
          Sign Out
        </button>
      </div>
    )
  );
};

export default LogoutButton;
