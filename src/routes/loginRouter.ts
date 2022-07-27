import { Router } from "express";

const loginRouter = Router();

loginRouter.get("/", (req, res) => {
  const { email, password } = req.body;

  try {
  } catch (error) {}
  res.status(200).send(`<h2>Status OK</h2>`);
});

loginRouter.post("/", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(401).send(`
      <h2>Dados inválidos</h2>
    `);
  }

  res.status(200).send(`<h2>Logado</h2>`);
});

loginRouter.put("/", (req, res) => {
  res.status(200).send(`<h2>Dados alterados</h2>`);
});

loginRouter.get("/", (req, res) => {
  res.status(200).send(`<h2>Usuário apagado</h2>`);
});

export default loginRouter;
