import React, { useEffect } from 'react';
import netlifyIdentity from 'netlify-identity-widget';
import Navbar from "../components/navbar";

const App = () => {
  const handleLogin = () => {
    netlifyIdentity.open("login");
  };
  
  
  const handleSignup = () => {
    netlifyIdentity.open("signup");
  };
  
  netlifyIdentity.on('init', user => console.log('init', user));
  netlifyIdentity.on('login', user => console.log('login', user));
  netlifyIdentity.on('logout', () => console.log('Logged out'));
  
  return (
    <div className="app">
      <Navbar
        handleLogin={handleLogin}
        handleSignup={handleSignup}
      />
    </div>
  );
};

export default App;
