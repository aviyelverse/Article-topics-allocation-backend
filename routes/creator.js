import express from "express";
const router = express.Router();

import {requireLogin} from "../controllers/authentication.js";
import {creatorById} from "../controllers/creator.js";

router.get("/secret/:creatorId", requireLogin, (req, res) => {
    res.json({
        creator: req.profile
    });
});

router.param("creatorId", creatorById);

export default router;