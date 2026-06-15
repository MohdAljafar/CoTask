import express from "express";

import auth from "../middleware/auth.js";

import {
  createWorkspace,
  getWorkspaces,
  getWorkspace,
  inviteMember,
  deleteWorkspace,
} from "../controllers/workspaceController.js";

const router = express.Router();

router.post("/", auth, createWorkspace);

router.get("/", auth, getWorkspaces);

router.post("/:workspaceId/invite", auth, inviteMember);

router.delete("/:workspaceId", auth, deleteWorkspace);

router.get("/:workspaceId", auth, getWorkspace);

export default router;
