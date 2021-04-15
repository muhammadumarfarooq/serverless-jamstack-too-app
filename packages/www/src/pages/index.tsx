import React, { useState } from 'react';
import Navbar from "../components/navbar";
import AddTodoForm from "../components/AddTodoForm";
import TodoList from "../components/TodoList";

const inititalState: todoInterface[] = [];
const App = () => {
  const [todos, setTodos] = useState(inititalState);
  
  const handleAddTodo = (value: string) => {
    setTodos([...todos, { text: value, completed: false, id: new Date().toISOString() }]);
  };
  
  const toggleTodo = (currentTodo: todoInterface) => {
    const updatedTodos = todos.map(todo => {
      if ( todo.id === currentTodo.id ) {
        return { ...todo, completed: !todo.completed }
      }
      return todo;
    })
    setTodos(updatedTodos);
  }
  
  return (
    <div className="app">
      <Navbar/>
      <AddTodoForm handleAddTodo={handleAddTodo}/>
      <TodoList toggleTodo={toggleTodo} todos={todos}/>
    </div>
  );
};

export default App;
