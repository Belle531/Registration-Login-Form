import { useAuth } from "react-oidc-context";

export default function App() {
  const auth = useAuth();

  if (auth.isLoading) return <p>Loading authentication...</p>;

  if (auth.error) {
   console.error("OIDC Auth Error:", JSON.stringify(auth.error, null, 2));
    return <p>Login pages unavailable<br />Please contact an administrator.</p>;
  }

  if (!auth.isAuthenticated) {
    return (
      <div>
        <p>You are currently signed out.</p>
        <button onClick={() => auth.signinRedirect()}>Sign in</button>
      </div>
    );
  }

  return (
    <div>
      <h2>Hello, Authenticated User!</h2>
      <pre>Email: {auth.user?.profile.email || "N/A"}</pre>
      <pre>ID Token Status: {auth.user?.id_token ? "Available" : "Missing"}</pre>
      <pre>Access Token Status: {auth.user?.access_token ? "Available" : "Missing"}</pre>
      <button onClick={() => auth.signoutRedirect()}>Sign out</button>
    </div>
  );
}