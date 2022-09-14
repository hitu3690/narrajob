import express from "express";
import articleController from "./controllers/articleController";
import tagController from "./controllers/tagController";

const app = express();
app.use(express.json());

app.use("/articles", articleController);
app.use("/articles", tagController);

app.get("/", (req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("hello express\n");
});

export default app;
