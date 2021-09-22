import { Router } from "express";

import {
  createTodo,
  deleteTodo,
  listTodos,
  updateTodo,
} from "../controllers/todos";

const router = Router();

router.post("/", createTodo);
router.get("/", listTodos);
router.patch("/:id", updateTodo);
router.delete("/:id", deleteTodo);

export default router;
