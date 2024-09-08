import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import "./index.css";

let domain = "";
let clientId = "";

if (import.meta.env.VITE_RESIPPY_APP_AUTH0_DOMAIN) {
  domain = import.meta.env.VITE_RESIPPY_APP_AUTH0_DOMAIN;
} else {
  throw new Error(
    "VITE_RESIPPY_APP_AUTH0_DOMAIN environment variable is not set"
  );
}

if (import.meta.env.VITE_RESIPPY_APP_AUTH0_CLIENT_ID) {
  clientId = import.meta.env.VITE_RESIPPY_APP_AUTH0_CLIENT_ID;
} else {
  throw new Error(
    "VITE_RESIPPY_APP_AUTH0_CLIENT_ID environment variable is not set"
  );
}

// JS and TS differ slightly here
// JS version:
// ReactDOM.createRoot(document.getElementById('root')).render(
// Without the '!' in the TS version the following error message would appear:
// Argument of type 'HTMLElement | null' is not assignable to parameter of type 'Element | DocumentFragment'.
// Type 'null' is not assignable to type 'Element | DocumentFragment'.

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
      useRefreshTokens={true}
      cacheLocation="localstorage"
    >
      <App />
    </Auth0Provider>
  </BrowserRouter>
);
