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
        topicPopularity: {
            type: Number,
            default: 0
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

export default mongoose.model("Article", articleSchema);