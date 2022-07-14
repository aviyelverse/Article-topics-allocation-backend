import express from "express";
const router = express.Router();

import {createProject} from "../controllers/project.js";

router.post("/project/create-project", createProject);

export default router;