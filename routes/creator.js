import express from "express";
const router = express.Router();
import {creatorSignUpValidator} from "../validator/validate.js";

import {signup,login} from "../controllers/creator.js";

router.post("/signup", creatorSignUpValidator, signup);
router.post("/login", login);

export default router;