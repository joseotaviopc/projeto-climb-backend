import { Router } from "express";
import { createToken } from "../models/token";
import {
  createNewClimber,
  getClimberByEmail,
  searchAllClimbers,
  searchOneClimber,
} from "../models/user";
import tokenDTO from "../views/tokenDTO";
import UserDTO from "../views/userDTO";

const userRouter = Router();

// Buscar climbers ??
userRouter.get("/", (req, res) => {
  // const email = req.body;

  // if (!email) {
  //   return res.status(400).send("Climber não foram enviado.");
  // }

  // const climber = searchOneClimber(email);

  // res.status(200).send(climber);
  searchAllClimbers().then((doc) => {
    res.status(200);
    res.json(doc);
  });
});

// New climber
userRouter.post("/register", async (req, res) => {
  // só os dados que necessitam
  const { email, password, name, lastName } = req.body;

  if (!email || !password || !name || !lastName) {
    res.status(400).send("Alguns dados obrigatórios não foram preenchidos.");
  }

  const newClimber = await createNewClimber(email, password, name, lastName);

  res.status(201).json(new UserDTO(newClimber));
});

// login
userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const climber = await getClimberByEmail(email);

  // verifica usuario
  if (!climber) {
    res.status(403).send("Não autorizado");
    return;
  }

  //  verifica senha
  if (climber.password !== password) {
    res.status(403).send("Não autorizado");
    return;
  }

  // cria token
  const token = await createToken(new Date(), true, climber._id);

  res.status(201).send(new tokenDTO(token));
});

// logout
userRouter.post("/logoff", (req, res) => {
  res.status(200).send(`<h2>Usuário apagado</h2>`);
});

export default userRouter;
