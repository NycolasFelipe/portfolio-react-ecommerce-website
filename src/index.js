import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Router>
    <Auth0Provider
      domain="ecommerce-web.us.auth0.com"
      clientId="tpWFngFlXPAvm244LAhX8pnZ2hYveGQ7"
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
    >
      <App />
    </Auth0Provider>
  </Router>
);
