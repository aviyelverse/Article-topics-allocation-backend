import express from "express";
const router = express.Router();
import {creatorSignUpValidator} from "../validator/validate.js";

import {signup} from "../controllers/creator.js";

router.post("/signup", creatorSignUpValidator, signup);

export default router;