import express from "express";
import articleData from "./articleData.js";
import dotenv from "dotenv";
import mongoose from "mongoose";

// dotenv config
dotenv.config();

// express app initialized
const app = express();

// routes
app.get("/", (req, res) => {
    res.send("Hello fromt the root!");
}
);

app.get("/api/articles", (req, res) => {
    res.send(articleData.articles);
    }
);
// db connection
mongoose.connect(process.env.MONGODB_URI, { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
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



