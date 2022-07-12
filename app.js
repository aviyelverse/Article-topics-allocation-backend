import express from "express";
import articleData from "./articleData.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
import morgan from "morgan";
import cookieParser from "cookie-parser";

// dotenv config
dotenv.config();

// importing routes
import creatorRoutes from "./routes/creator.js";


// express app initialized
const app = express();

// middlewares (morgan)
app.use(morgan("dev"));
app.use(cookieParser());

// middlewares (routes)
app.use("/api",creatorRoutes);

// db connection
mongoose.connect(process.env.MONGODB_URI, { 
    useNewUrlParser: true,
    useUnifiedTopology: true
 }).then(() => {
    console.log("Connected to MongoDB");
}
).catch(err => {
    console.log("Error connecting to MongoDB: ", err.message);
}
);

// port config
const port = process.env.PORT || 4000;

// port listening
app.listen(port, () => {
    console.log(`Listening on  http://localhost:${port}`);
}
);



