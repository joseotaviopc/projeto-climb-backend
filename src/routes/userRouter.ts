import { Router } from "express";
import { createToken, TToken } from "../models/token";
import {
  createNewClimber,
  getClimberByEmail,
  searchAllClimbers,
  searchOneClimber,
  TClimber,
} from "../models/user";
import tokenDTO from "../views/tokenDTO";
import UserDTO from "../views/userDTO";
import bcrypt from "bcrypt";

const userRouter = Router();

// cria um salt com uma palavra aleatória de 15 caracteres
const SALT = 15;

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
  const { email, password, name, lastName, role } = req.body;

  const hash = bcrypt.hashSync(password, SALT);

  if (!email || !password || !name || !lastName) {
    res.status(400).send("Alguns dados obrigatórios não foram preenchidos.");
  }

  const newClimber: TClimber = await createNewClimber(email, password, name, lastName, hash, role);

  res.status(201).json(new UserDTO(newClimber));
});

// login
userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const climber = await getClimberByEmail(email);

  if (!climber) {
    res.status(403).send("Não encontrado");
    return;
  }

  // if (!bcrypt.compareSync(password, climber.password)) {
  //   res.status(403).send("Email ou senha inválidos");
  //   return;
  // }

  // const token = await createToken(new Date(), true, climber.id);

  res.status(201).send("new tokenDTO(token)");
});

// logout
userRouter.post("/logoff", (req, res) => {
  res.status(200).send(`<h2>Usuário apagado</h2>`);
});

export default userRouter;
