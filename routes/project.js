import express from "express";
const router = express.Router();

import {createProject, projectById, readProject} from "../controllers/project.js";
import {requireLogin, isAuthenticated, isMaintainer} from "../controllers/authentication.js";
import {creatorById} from "../controllers/creator.js";

router.get("/project/:projectId", readProject);
router.post("/project/create-project/:creatorId", requireLogin, isAuthenticated, isMaintainer, createProject);

router.param("projectId", projectById);
router.param("creatorId", creatorById);

export default router;