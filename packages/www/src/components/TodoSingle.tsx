import * as React from 'react';

interface TodoSingleProps {
  todo: todoInterface
  toggleTodo: ToggleTodo
}

const TodoSingle = ({ todo, toggleTodo }: TodoSingleProps): JSX.Element => {
  const { text, completed, id } = todo;
  return (
    <li className="todo-single">
      <label style={{ textDecoration: completed ? "line-through" : "none" }}>
        <input onChange={() => toggleTodo(todo)} value={id} type="checkbox" checked={completed}/> {text}
      </label>
    </li>
  );
}

export default TodoSingle;
