import express from "express";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT;
const server = express();

server.get("/", (req, res) => {
  res.status(200).send(`<h2>Status OK</h2>`);
});

server.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(401).send(`
      <h2>Dados inválidos</h2>
    `);
  }

  res.status(200).send(`<h2>Logado</h2>`);
});

server.put("/user", (req, res) => {
  res.status(200).send(`<h2>Dados alterados</h2>`);
});

server.get("/user", (req, res) => {
  res.status(200).send(`<h2>Usuário apagado</h2>`);
});

server.listen(port, () => {
  console.log(`Server running at https://localhost/${port}`);
});
