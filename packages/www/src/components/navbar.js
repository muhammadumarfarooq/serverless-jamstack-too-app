import React from 'react';

const Navbar = ({ handleLogin, handleSignup }) => {
  return (
    <div className="navbar">
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleSignup}>Signup</button>
    </div>
  );
};

export default Navbar;
