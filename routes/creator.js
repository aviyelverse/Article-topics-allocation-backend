import express from "express";
const router = express.Router();

import {controllerTest} from "../controllers/creator.js";

router.get("/", controllerTest);

export default router;