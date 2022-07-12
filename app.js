import express from "express";
import articleData from "./articleData.js";

const app = express();

app.get("/api/articles", (req, res) => {
    res.send(articleData.articles);
    }
);

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`Listening on  http://localhost:${port}`);
}
);



