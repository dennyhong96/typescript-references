import { FC, FormEvent, useRef } from "react";

import "./NewTodo.css";

interface NewTodoProps {
  handleAddToto: (newTodoText: string) => void;
}

const NewTodo: FC<NewTodoProps> = ({ handleAddToto }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    if (!inputRef.current) return;
    const newTodoText = inputRef.current.value.trim();
    if (!newTodoText) return alert("Please enter input text.");
    handleAddToto(newTodoText);
    inputRef.current.value = "";
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-control">
        <label htmlFor="todo-input">Add new todo</label>
        <input ref={inputRef} type="text" id="todo-input" />
      </div>
      <button type="submit">Add</button>
    </form>
  );
};

export default NewTodo;
