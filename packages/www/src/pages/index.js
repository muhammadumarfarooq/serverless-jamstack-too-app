import React from 'react';
import netlifyIdentity from 'netlify-identity-widget';
import Navbar from "../components/navbar";
import Todo from "../components/todo";
import AddTodoForm from "../components/AddTodoForm";
import TodoList from "../components/TodoList";

const App = () => {
  const handleLogin = () => {
    netlifyIdentity.open("login");
  };
  
  
  const handleSignup = () => {
    netlifyIdentity.open("signup");
  };
  
  netlifyIdentity.on('init', user => {
    console.log('init', user);
  });
  netlifyIdentity.on('login', user => console.log('login', user));
  netlifyIdentity.on('logout', () => console.log('Logged out'));
  
  return (
    <div className="app">
      <Navbar
        handleLogin={handleLogin}
        handleSignup={handleSignup}
      />
      <AddTodoForm/>
      <TodoList/>
      
      <Todo message="some message"/>
    
    </div>
  );
};

export default App;
