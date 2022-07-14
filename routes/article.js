import express from "express";
const router = express.Router();

import {createArticle, articleById, readArticle, deleteArticle, updateArticle, allArticles, relatedArticles, allArticlesProjects, articleSearch} from "../controllers/article.js";
import {requireLogin, isAuthenticated, isMaintainer} from "../controllers/authentication.js";
import {creatorById} from "../controllers/creator.js";

router.get("/article/:articletId", readArticle);
router.post("/article/create-article/:creatorId", requireLogin, isAuthenticated, isMaintainer, createArticle);
router.delete("/article/:articleId/:creatorId", requireLogin, isAuthenticated, isMaintainer, deleteArticle);
router.put("/article/:articleId/:creatorId", requireLogin, isAuthenticated, isMaintainer, updateArticle);

router.get("/articles", allArticles);
// relateArticles
router.get("/articles/related/:articleId", relatedArticles);
router.get("/articles/projects", allArticlesProjects);
router.post("/articles/by/search", articleSearch);

router.param("creatorId", creatorById);
router.param("articleId", articleById);

export default router;