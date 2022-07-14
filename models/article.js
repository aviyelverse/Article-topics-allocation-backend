import mongoose from "mongoose";
const {ObjectId} = mongoose.Schema;

const articleSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32
        },
        description: {
            type: String,
            required: true,
            maxlength: 2000
        },
        project: {
            type: ObjectId,
            ref: "Project",
            required: true
        },
        quantity: {
            type: Number
        },
        photo: {
            data: Buffer,
            contentType: String
        },
        assigned: {
            required: false,
            type: Boolean
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Article", articleSchema);
