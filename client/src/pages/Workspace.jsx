import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import API from "../api/axios";
import socket from "../hooks/useSocket";

function Workspace() {
  const { id } = useParams();

  const [todos, setTodos] = useState([]);

  const [title, setTitle] = useState("");

  const [description, setDescription] = useState("");

  const [email, setEmail] = useState("");

  const [workspace, setWorkspace] = useState(null);

  const fetchTodos = async () => {
    try {
      const res = await API.get(`/todos/workspace/${id}`);

      setTodos(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTodos();
    fetchWorkspace();
  }, [id]);

  useEffect(() => {
    socket.emit("joinWorkspace", id);

    socket.on("todoCreated", (newTodo) => {
      setTodos((prev) => {
        const exists = prev.some((todo) => todo._id === newTodo._id);

        if (exists) return prev;

        return [...prev, newTodo];
      });
    });

    socket.on("todoUpdated", (updatedTodo) => {
      setTodos((prev) =>
        prev.map((todo) => (todo._id === updatedTodo._id ? updatedTodo : todo)),
      );
    });

    socket.on("todoDeleted", ({ todoId }) => {
      setTodos((prev) => prev.filter((todo) => todo._id !== todoId));
    });

    return () => {
      socket.off("todoCreated");

      socket.off("todoUpdated");

      socket.off("todoDeleted");
    };
  }, [id]);

  const createTodo = async () => {
    if (!title.trim()) return;

    try {
      await API.post("/todos", {
        title,
        description,
        workspace: id,
      });

      setTitle("");
      setDescription("");
    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async (todoId, status) => {
    try {
      await API.put(`/todos/${todoId}`, {
        status,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTodo = async (todoId) => {
    try {
      await API.delete(`/todos/${todoId}`);
    } catch (error) {
      console.log(error);
    }
  };

  const inviteMember = async () => {
    if (!email.trim()) return;

    try {
      const res = await API.post(`/workspaces/${id}/invite`, {
        email,
      });

      alert(res.data.message);

      setEmail("");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to invite");
    }
  };

  const fetchWorkspace = async () => {
    try {
      const res = await API.get(`/workspaces/${id}`);

      setWorkspace(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const pendingTodos = todos.filter((todo) => todo.status === "Pending");

  const progressTodos = todos.filter((todo) => todo.status === "In Progress");

  const doneTodos = todos.filter((todo) => todo.status === "Done");

  return (
    <div
      style={{
        padding: "20px",
      }}
    >
      <h1>{workspace ? workspace.name : "Loading..."}</h1>
      {workspace && <p>Owner: {workspace.owner?.name}</p>}
      {workspace && <p>Members: {workspace.members?.length}</p>}

      <hr />

      <h2>Invite Member</h2>

      <input
        placeholder="User Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button onClick={inviteMember}>Invite</button>

      <hr />

      <h2>Create Todo</h2>

      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <br />
      <br />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <br />
      <br />

      <button onClick={createTodo}>Create Todo</button>

      <hr />

      <div
        style={{
          display: "flex",
          gap: "20px",
        }}
      >
        <Column
          title="Pending"
          todos={pendingTodos}
          updateStatus={updateStatus}
          deleteTodo={deleteTodo}
        />

        <Column
          title="In Progress"
          todos={progressTodos}
          updateStatus={updateStatus}
          deleteTodo={deleteTodo}
        />

        <Column
          title="Done"
          todos={doneTodos}
          updateStatus={updateStatus}
          deleteTodo={deleteTodo}
        />
      </div>
    </div>
  );
}

function Column({ title, todos, updateStatus, deleteTodo }) {
  return (
    <div
      style={{
        flex: 1,
        border: "1px solid #ccc",
        padding: "10px",
        minHeight: "500px",
      }}
    >
      <h2>{title}</h2>

      {todos.map((todo) => (
        <TodoCard
          key={todo._id}
          todo={todo}
          updateStatus={updateStatus}
          deleteTodo={deleteTodo}
        />
      ))}
    </div>
  );
}

function TodoCard({ todo, updateStatus, deleteTodo }) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        marginBottom: "10px",
        padding: "10px",
      }}
    >
      <h4>{todo.title}</h4>

      <p>{todo.description}</p>

      <p>{todo.status}</p>

      {todo.status !== "Pending" && (
        <button onClick={() => updateStatus(todo._id, "Pending")}>
          Pending
        </button>
      )}

      {todo.status !== "In Progress" && (
        <button onClick={() => updateStatus(todo._id, "In Progress")}>
          Progress
        </button>
      )}

      {todo.status !== "Done" && (
        <button onClick={() => updateStatus(todo._id, "Done")}>Done</button>
      )}

      <button onClick={() => deleteTodo(todo._id)}>Delete</button>
    </div>
  );
}

export default Workspace;
