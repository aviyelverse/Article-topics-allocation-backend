import express from "express";
const router = express.Router();

import {createArticle} from "../controllers/article.js";
import {requireLogin, isAuthenticated, isMaintainer} from "../controllers/authentication.js";
import {creatorById} from "../controllers/creator.js";


router.post("/article/create-article/:creatorId", requireLogin, isAuthenticated, isMaintainer, createArticle);

router.param("creatorId", creatorById);

export default router;