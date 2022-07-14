import express from "express";
const router = express.Router();

import {createProject, projectById, readProject, updateProject, deleteProject, allProjects} from "../controllers/project.js";
import {requireLogin, isAuthenticated, isMaintainer} from "../controllers/authentication.js";
import {creatorById} from "../controllers/creator.js";

router.get("/project/:projectId", readProject);
router.post("/project/create-project/:creatorId", requireLogin, isAuthenticated, isMaintainer, createProject);
router.put("/project/:projectId/:creatorId", requireLogin, isAuthenticated, isMaintainer, updateProject);
router.delete("/project/:projectId/:creatorId", requireLogin, isAuthenticated, isMaintainer, deleteProject);
router.get("/projects",allProjects);

router.param("projectId", projectById);
router.param("creatorId", creatorById);

export default router;