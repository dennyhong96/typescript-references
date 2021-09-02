import { useState } from "react";

import TodoList from "./components/TodoList";
import NewTodo from "./components/NewTodo";
import generateId from "./utils/generateId";

import { Todo } from "./types/Todo";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleAddToto = (newTodoText: string) => {
    setTodos((prevTodos) => [
      ...prevTodos,
      { id: generateId("todos"), text: newTodoText },
    ]);
  };

  const handleDeleteTodo = (todoId: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== todoId));
  };

  return (
    <div className="App">
      <NewTodo handleAddToto={handleAddToto} />
      <TodoList todos={todos} handleDeleteTodo={handleDeleteTodo} />
    </div>
  );
}

export default App;
