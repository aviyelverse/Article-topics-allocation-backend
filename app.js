import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import expressValidator from "express-validator";
import cors from "cors";

// dotenv config
dotenv.config();

// importing routes
import authenticationRoutes from "./routes/authentication.js";
import creatorRoutes from "./routes/creator.js";
import projectRoutes from "./routes/project.js";
import articleRoutes from "./routes/article.js";



// express app initialized
const app = express();

// middlewares (morgan)
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());

// middlewares (routes)
app.use("/api",authenticationRoutes);
app.use("/api", creatorRoutes);
app.use("/api", projectRoutes);
app.use("/api", articleRoutes);


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



