import express from "express";
import cors from "cors";

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes

app.get("/", (req, res) => {
  res.send("video processing API Running...");
});

export default app;
