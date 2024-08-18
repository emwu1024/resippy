import React, { useState } from "react";
import "./LoginButton.css";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  return (
    !isAuthenticated && (
      <div>
        <button className="btn-login" onClick={() => loginWithRedirect()}>
          Sign In
        </button>
      </div>
    )
  );
};

export default LoginButton;