import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32
        }
    },
    { timestamps: true }
);

export default mongoose.model("Project", projectSchema);
