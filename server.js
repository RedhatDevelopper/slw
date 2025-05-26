const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const FILE = "scores.json";

app.get("/scores", (req, res) => {
  const scores = JSON.parse(fs.readFileSync(FILE));
  res.json(scores.sort((a, b) => b.score - a.score).slice(0, 10));
});

app.post("/scores", (req, res) => {
  const { name, score } = req.body;
  if (!name || typeof score !== "number") return res.status(400).send("Erreur");
  const scores = JSON.parse(fs.readFileSync(FILE));
  scores.push({ name, score });
  fs.writeFileSync(FILE, JSON.stringify(scores, null, 2));
  res.send("OK");
});

app.listen(3000, () => console.log("Serveur sur http://localhost:3000"));
