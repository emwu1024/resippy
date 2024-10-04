import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
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

const theme = createTheme({
  palette: {
    background: {
      default: "#0e1309",
      // default: "white",
    },
    text: {
      primary: "#e1be96",
    },
  },
  typography: {
    fontFamily: '"Quicksand"',
  },
});

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
      <ThemeProvider theme={theme}>
        <CssBaseline /> {/* Normalize CSS across browsers */}
        <App />
      </ThemeProvider>
    </Auth0Provider>
  </BrowserRouter>
);
