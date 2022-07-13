import express from "express";
const router = express.Router();
import {creatorSignUpValidator} from "../validator/validate.js";

import {signup,login,logout,requireLogin} from "../controllers/authentication.js";

router.post("/signup", creatorSignUpValidator, signup);
router.post("/login", login);
router.get("/logout", logout);

router.get("/test", requireLogin, (req, res) => {
    res.send("You are logged in");
    console.log("req.auth", req.auth);
});

export default router;