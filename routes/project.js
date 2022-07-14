import express from "express";
const router = express.Router();

import {createProject} from "../controllers/project.js";
import {requireLogin, isAuthenticated, isMaintainer} from "../controllers/authentication.js";
import {creatorById} from "../controllers/creator.js";


router.post("/project/create-project/:creatorId", requireLogin, isAuthenticated, isMaintainer, createProject);

router.param("creatorId", creatorById);

export default router;