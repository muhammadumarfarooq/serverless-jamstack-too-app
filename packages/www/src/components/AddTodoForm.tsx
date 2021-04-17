import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

interface AddTodoFormProps {
  handleAddTodo: (string) => void
  value: String
  setValue: (string) => void
}

const AddTodoForm = ({ handleAddTodo, value, setValue }: AddTodoFormProps): JSX.Element => {
  
  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddTodo(value);
  }
  
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  
  return (
    <form onSubmit={handleSubmit} style={styles.wrapper} className="add-todo-form">
      <div className="add-todo-form--input-wrapper">
        <TextField
          onChange={handleChange}
          value={value}
          id={"add-todo"}
          placeholder={""}
          label={"Add todo"}
        />
      </div>
      <Button type="submit" variant="contained" color="primary">
        Add
      </Button>
    </form>
  );
};

const styles = {
  wrapper: {
    display: "flex",
    alignItems: "cetner"
  }
}


export default AddTodoForm;
