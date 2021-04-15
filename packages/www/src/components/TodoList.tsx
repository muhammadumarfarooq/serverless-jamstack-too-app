import * as React from 'react';
import TodoSingle from "./TodoSingle";

interface TodoListInterface {
  todos: todoInterface[]
  toggleTodo: ToggleTodo
  handleRemoveTodo: (string) => void
}

const TodoList = ({ todos, toggleTodo, handleRemoveTodo }: TodoListInterface): JSX.Element => {
  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoSingle
          key={todo.id}
          toggleTodo={toggleTodo}
          todo={todo}
          handleRemoveTodo={handleRemoveTodo}
        />
      ))}
    </ul>
  );
}

export default TodoList;
