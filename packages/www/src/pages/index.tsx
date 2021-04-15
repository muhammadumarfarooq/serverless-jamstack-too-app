import React, { useState } from 'react';
import Navbar from "../components/navbar";
import AddTodoForm from "../components/AddTodoForm";
import TodoList from "../components/TodoList";

const inititalState: todoInterface[] = [];
const App = () => {
  const [todos, setTodos] = useState(inititalState);
  
  const handleAddTodo = (value: string) => {
    setTodos([...todos, { text: value, completed: false, id: "1" }]);
  };
  console.log(todos);
  return (
    <div className="app">
      <Navbar/>
      <AddTodoForm handleAddTodo={handleAddTodo}/>
      <TodoList/>
    </div>
  );
};

export default App;
