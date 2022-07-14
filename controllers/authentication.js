import jwt from "jsonwebtoken";
import expressJwt from "express-jwt";
import dotenv from "dotenv";
import Creator from '../models/creator.js';
import {dbErrorHandle} from "../helpers/databaseErrorHandle.js";

// dotenv config
dotenv.config();

const signup = (req, res) => {
    console.log("req.body",req.body);
   const creator = new Creator(req.body);
   creator.save()
   .then(() => {
       res.send({
           message: 'Creator created successfully'
       });
   }   // save the new Creator object to the database
   )
   .catch(err => {
       res.status(400).json({
              message: dbErrorHandle(err)
       });
   }
   );
}   

const login = (req, res) => {
    // find the creator based on email
    const { email, password } = req.body;
    Creator.findOne({ email }, (err, creator) => {
        if (err || !creator) {
            return res.status(400).json({
                error: "Creator with this email does not exist. Please signup."
            });
        }
        if (!creator.authenticate(password)) {
            return res.status(401).json({
                error: "Email and password dosent match"
            });
        }
        const token = jwt.sign({ _id: creator._id }, process.env.JWT_SECRET_token);
        res.cookie("t", token, { expire: new Date() + 9999 });
        const { _id, name, email, role } = creator;
        return res.json({ token, creator: { _id, email, name, role } });
    });
};

const logout = (req, res) => {
    res.clearCookie("t");
    res.json({ message: "You are logged out" });
}


const requireLogin = expressJwt({
    secret: process.env.JWT_SECRET_token,
    userProperty: "auth"
});



const isAuthenticated = (req, res, next) => {
    let creator = req.profile && req.auth && req.profile._id == req.auth._id;
    if (!creator) {
        return res.status(403).json({
            error: "Access denied"
        });
    }
    next();
};

const isMaintainer = (req, res, next) => {
    if (req.profile.role === 0) {
        return res.status(403).json({
            error: "Maintainer only!"
        });
    }
    next();
};

export { signup, login, logout, requireLogin, isAuthenticated, isMaintainer };