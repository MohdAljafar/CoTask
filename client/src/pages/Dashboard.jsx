import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../api/axios";

import { useAuth } from "../context/AuthContext";

function Dashboard() {
  const [workspaces, setWorkspaces] = useState([]);

  const [name, setName] = useState("");

  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const fetchWorkspaces = async () => {
    try {
      const res = await API.get("/workspaces");

      setWorkspaces(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchWorkspaces();
  }, []);

  const createWorkspace = async () => {
    if (!name.trim()) return;

    try {
      await API.post("/workspaces", { name });

      setName("");

      fetchWorkspaces();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        padding: "20px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>Collaborative Todo</h1>

        <div
          style={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
          }}
        >
          <span>
            Welcome, <strong>{user?.name}</strong>
          </span>

          <button onClick={logout}>Logout</button>
        </div>
      </div>

      <hr />

      <h2>Create Workspace</h2>

      <input
        placeholder="Workspace Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button onClick={createWorkspace}>Create</button>

      <hr />

      <h2>My Workspaces</h2>

      {workspaces.map((workspace) => (
        <div
          key={workspace._id}
          style={{
            border: "1px solid gray",
            padding: "10px",
            margin: "10px 0",
            cursor: "pointer",
          }}
          onClick={() => navigate(`/workspace/${workspace._id}`)}
        >
          <h3>{workspace.name}</h3>
          <button
            onClick={async (e) => {
              e.stopPropagation();

              try {
                await API.delete(`/workspaces/${workspace._id}`);

                fetchWorkspaces();
              } catch (error) {
                alert(error.response?.data?.message);
              }
            }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;
