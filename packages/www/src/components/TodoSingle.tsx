import * as React from 'react';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

interface TodoSingleProps {
  todo: todoInterface
  toggleTodo: ToggleTodo
  handleRemoveTodo: (string) => void
}

const TodoSingle = ({ todo, toggleTodo, handleRemoveTodo }: TodoSingleProps): JSX.Element => {
  const { text, completed, id } = todo;
  return (
    <li className="todo-single">
      <label style={{ textDecoration: completed ? "line-through" : "none" }}>
        <input onChange={() => toggleTodo(todo)} value={id} type="checkbox" checked={completed}/> {text}
      </label>
      <IconButton onClick={() => handleRemoveTodo(id)} aria-label="delete">
        <DeleteIcon/>
      </IconButton>
    </li>
  );
}

export default TodoSingle;
