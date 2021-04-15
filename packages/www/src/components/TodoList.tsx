import * as React from 'react';
import TodoSingle from "./TodoSingle";

interface TodoListInterface {
  todos: todoInterface[]
  toggleTodo: ToggleTodo
}

const TodoList = ({ todos, toggleTodo }: TodoListInterface): JSX.Element => {
  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoSingle key={todo.id} toggleTodo={toggleTodo} todo={todo}/>
      ))}
    </ul>
  );
}

export default TodoList;
