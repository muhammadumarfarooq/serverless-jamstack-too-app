import React, { useEffect, useState } from 'react';
import Navbar from "../components/navbar";
import AddTodoForm from "../components/AddTodoForm";
import TodoList from "../components/TodoList";
import { useQuery, useMutation } from '@apollo/client';
import gql from "graphql-tag"

const inititalState: todoInterface[] = [];

const todosQuery = gql`{
  todos{
    text
    completed
    id
  }
}`

const addTodoMutation = gql`
  mutation addTodo($text: String!, $completed: Boolean!){
     addTodo(text: $text, completed: $completed){
       text
       completed
       id
    }
  }
`;

const removeTodoMutation = gql`
  mutation removeTodo($id: String!){
    removeTodo(id: $id){
      id
    }
  }
`;

const updateTodoMutation = gql`
  mutation updateTodo($id: String!, $completed: Boolean!){
    updateTodo(id: $id, completed: $completed){
       completed
    }
  }
`;

const App = () => {
  const { loading, data, error } = useQuery(todosQuery);
  const [addTodo] = useMutation(addTodoMutation);
  const [removeTodo] = useMutation(removeTodoMutation);
  const [updateTodo] = useMutation(updateTodoMutation);
  const [todos, setTodos] = useState(inititalState);
  useEffect(() => {
    if ( data )
      setTodos(data.todos);
    //  eslint-disable-next-line
  }, [loading])
  
  const handleAddTodo = async (value: string) => {
    try {
      const resp = await addTodo({
        variables: {
          text: value,
          completed: false,
        }
      });
      setTodos([...todos, resp.data.addTodo]);
    } catch (e) {
      console.log("Something went wrong!");
    }
  };
  
  const handleRemoveTodo = async (id: string) => {
    try {
      const resp = await removeTodo({
        variables: { id }
      });
      
      const updatedTodos = todos.filter(todo => todo.id !== resp.data.removeTodo.id);
      setTodos(updatedTodos);
    } catch (e) {
      console.log("Something went wrong!", e);
    }
  }
  
  const toggleTodo = async (currentTodo: todoInterface) => {
    const resp = await updateTodo({
      variables: { id: currentTodo.id, completed: !currentTodo.completed }
    });
    
    const updatedTodos = todos.map(todo => {
      if ( todo.id === currentTodo.id ) {
        return { ...todo, completed: resp.data.updateTodo.completed }
      }
      return todo;
    })
    setTodos(updatedTodos);
  }
  
  return (
    <div className="app">
      <Navbar/>
      <AddTodoForm handleAddTodo={handleAddTodo}/>
      {loading ? <p>Loading...</p> : (
        <TodoList
          handleRemoveTodo={handleRemoveTodo}
          toggleTodo={toggleTodo}
          todos={todos}
        />
      )}
    </div>
  );
};

export default App;
