import { RequestHandler } from "express";
import { Todo } from "../models/todos";

const TODOS: Todo[] = [];

const generateId = () => "todos_" + Math.random().toString(36).substr(2, 9);

export const createTodo: RequestHandler = (req, res, next) => {
  const text: string = req.body.text;
  const newTodo = new Todo(generateId(), text);
  TODOS.push(newTodo);
  res.status(201).json(newTodo);
};

export const listTodos: RequestHandler = (req, res, next) => {
  return res.status(200).json(TODOS);
};

export const updateTodo: RequestHandler<{ id: string }, {}, { text: string }> =
  (req, res, next) => {
    const id = req.params.id;
    const text = req.body.text;
    const todo = TODOS.find((td) => td.id === id);
    if (!todo) {
      throw new Error(`Todo with id ${id} not found.`);
    }
    todo.text = text;
    return res.status(200).json(todo);
  };

export const deleteTodo: RequestHandler<{ id: string }> = (req, res, next) => {
  const id = req.params.id;
  const todoIndex = TODOS.findIndex((td) => td.id === id);
  if (todoIndex < 0) {
    throw new Error(`Todo with id ${id} not found.`);
  }
  TODOS.splice(todoIndex, 1);
  return res.status(204).end();
};
