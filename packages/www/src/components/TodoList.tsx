import * as React from 'react';
import TodoSingle from "./TodoSingle";


const TodoList = (): JSX.Element => {
  const todo = {
    text: "Some text",
    completed: false,
    id: "abc."
  }
  
  const handleToggleTodo = () => {
    console.log("handleToggleTodo");
  }
  
  return (
    <div className="todo-list">
      <TodoSingle toggleTodo={handleToggleTodo} todo={todo}/>
    </div>
  );
}

export default TodoList;
