import express from "express";

import auth from "../middleware/auth.js";

import {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo,
} from "../controllers/todoController.js";

const router = express.Router();

router.post("/", auth, createTodo);

router.get("/workspace/:workspaceId", auth, getTodos);

router.put("/:id", auth, updateTodo);

router.delete("/:id", auth, deleteTodo);

export default router;
