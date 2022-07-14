import express from "express";
const router = express.Router();

import {requireLogin, isAuthenticated, isMaintainer} from "../controllers/authentication.js";
import {creatorById} from "../controllers/creator.js";

router.get("/secret/:creatorId", requireLogin, isAuthenticated, isMaintainer, (req, res) => {
    res.json({
        creator: req.profile
    });
});

router.param("creatorId", creatorById);

export default router;