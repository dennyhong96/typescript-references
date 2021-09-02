import { FC } from "react";

import { Todo } from "../types/Todo";

import "./TodoList.css";

interface TodoListProps {
  todos: Todo[];
  handleDeleteTodo: (todoId: string) => void;
}

const TodoList: FC<TodoListProps> = ({ todos, handleDeleteTodo }) => {
  return (
    <ul>
      {todos.map((todo) => (
        <li id={todo.id} key={todo.id}>
          {todo.text}
          <button onClick={handleDeleteTodo.bind(this, todo.id)}>x</button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
