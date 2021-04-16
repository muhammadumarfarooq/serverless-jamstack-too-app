import React, { useState } from 'react';
import Navbar from "../components/navbar";
import AddTodoForm from "../components/AddTodoForm";
import TodoList from "../components/TodoList";
import { useQuery } from '@apollo/client';
import gql from "graphql-tag"

const inititalState: todoInterface[] = [];

const todosQuery = gql`{
  todos{
  text
  completed
  id
  }
}`

const App = () => {
  const { loading, error, data } = useQuery(todosQuery);
  
  console.log({ loading, error, data });
  
  const [todos, setTodos] = useState(inititalState);
  
  const handleAddTodo = (value: string) => {
    setTodos([...todos, { text: value, completed: false, id: new Date().toISOString() }]);
  };
  
  const handleRemoveTodo = (id: string) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
  }
  
  const toggleTodo = (currentTodo: todoInterface) => {
    const updatedTodos = todos.map(todo => {
      if ( todo.id === currentTodo.id ) {
        return { ...todo, completed: !todo.completed }
      }
      return todo;
    })
    setTodos(updatedTodos);
  }
  
  const handleConnectWithApollo = () => {
    console.log("data");
  }
  
  
  return (
    <div className="app">
      <Navbar/>
      <AddTodoForm handleAddTodo={handleAddTodo}/>
      {data ? (
        <TodoList
          handleRemoveTodo={handleRemoveTodo}
          toggleTodo={toggleTodo}
          todos={data.todos}
        />
      ) : <p>Loading...</p>}
      
      <button onClick={handleConnectWithApollo}>
        Demo text button is here
      </button>
    </div>
  );
};

export default App;
