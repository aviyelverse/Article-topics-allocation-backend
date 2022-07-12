import express from "express";
import articleData from "./articleData.js";
import dotenv from "dotenv";

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

// port config
const port = process.env.PORT || 4000;

// port listening
app.listen(port, () => {
    console.log(`Listening on  http://localhost:${port}`);
}
);



