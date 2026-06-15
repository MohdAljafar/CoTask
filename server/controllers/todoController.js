import Todo from "../models/Todo.js";
import Workspace from "../models/Workspace.js";

export const createTodo = async (req, res) => {
  try {
    const { title, description, workspace } = req.body;

    const ws = await Workspace.findById(workspace);

    if (!ws) {
      return res.status(404).json({
        message: "Workspace not found",
      });
    }

    const todo = await Todo.create({
      title,
      description,
      workspace,
      createdBy: req.user.id,
    });

    const io = req.app.get("io");

    io.to(workspace).emit("todoCreated", todo);

    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({
      workspace: req.params.workspaceId,
    })
      .populate("assignedTo", "name email")
      .populate("createdBy", "name email");

    res.json(todos);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({
        message: "Todo not found",
      });
    }

    const { title, description, status, assignedTo } = req.body;

    if (title) todo.title = title;

    if (description) todo.description = description;

    if (status) todo.status = status;

    if (assignedTo) todo.assignedTo = assignedTo;

    await todo.save();

    const io = req.app.get("io");

    io.to(todo.workspace.toString()).emit("todoUpdated", todo);

    res.json(todo);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({
        message: "Todo not found",
      });
    }

    // Save workspace ID before deleting
    const workspaceId = todo.workspace.toString();

    await todo.deleteOne();

    // Emit real-time event
    const io = req.app.get("io");

    io.to(workspaceId).emit("todoDeleted", {
      todoId: req.params.id,
    });

    res.json({
      message: "Todo deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
