interface todoInterface {
  text: string
  completed: boolean
  id: string
}

type ToggleTodo = (todo: todoInterface) => void;
