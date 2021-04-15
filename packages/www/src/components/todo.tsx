import React from 'react';

type TodoProp = {
  message: string
};

const Todo = ({ message }: TodoProp): JSX.Element => {
  return (
    <div className="todo">
      <h1>Todo component...</h1>
      <p>{message}</p>
    </div>
  );
};

export default Todo;
