import express from "express";
import articleData from "./articleData.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.get("/", (req, res) => {
    res.send("Hello fromt he root!");
}
);

app.get("/api/articles", (req, res) => {
    res.send(articleData.articles);
    }
);

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`Listening on  http://localhost:${port}`);
}
);



