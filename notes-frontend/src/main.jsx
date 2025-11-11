import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { AuthProvider } from "react-oidc-context";
import { WebStorageStateStore } from 'oidc-client-ts';

// User Pool ID: us-east-1_8vaYKpJ0H
// Cognito Domain: us-east-18vaykpj0h.auth.us-east-1.amazoncognito.com

const cognitoAuthConfig = {
  authority: "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_8vaYKpJ0H",
  client_id: "4rnhibua9i37pouqasqc4rot3m",
  redirect_uri: "http://localhost:5173/",
  post_logout_redirect_uri: "http://localhost:5173/",
  response_type: "code",
 scope: "email openid phone",

  metadataSeed: {
    authorization_endpoint: "https://us-east-18vaykpj0h.auth.us-east-1.amazoncognito.com/oauth2/authorize",
    token_endpoint: "https://us-east-18vaykpj0h.auth.us-east-1.amazoncognito.com/oauth2/token",
    userinfo_endpoint: "https://us-east-18vaykpj0h.auth.us-east-1.amazoncognito.com/oauth2/userInfo",
    end_session_endpoint: "https://us-east-18vaykpj0h.auth.us-east-1.amazoncognito.com/logout",
  },

  // Persist auth state across reloads to avoid "No matching state found" errors
  userStore: new WebStorageStateStore({ store: window.localStorage }),

  onSigninCallback() {
    window.history.replaceState({}, document.title, "/");
  },
};

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <AuthProvider {...cognitoAuthConfig}>
    <App />
  </AuthProvider>
);