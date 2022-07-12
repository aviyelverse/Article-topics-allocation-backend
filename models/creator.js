import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';
import crypto from "crypto";

const creatorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
        trim: true
    },
    email: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255,
        trim: true,
        unique: true
    },
    hashed_password: {
        type: String,
        required: true
    },
    about: {
        type: String,
        maxlength: 255,
        trim: true
    },
    salt: {
        type: String,
    },
    role: {
        type: Number,
        default: 0
    },
    history: {
        type: Array,
        default: []
    }
}, { timestamps: true });

// virtual field
creatorSchema.virtual("password")
    .set(function (password) {
        this._password = password;
        this.salt = uuidv4();
        this.hashed_password = this.encryptPassword(password);
    }
    )
    .get(function () {
        return this._password;
    }
);

creatorSchema.methods = {
    encryptPassword: function (password) {
        if (!password) return "";
        try {
            return crypto.createHmac("sha1", this.salt)
                .update(password)
                .digest("hex");
        } catch (err) {
            return "";
        }
    }
}
