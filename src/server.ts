import express from "express";
import dotenv from "dotenv";
import { loginRouter, userRouter, climbRouter } from "./routes";
import authenticationMiddleware from "./middlewares/authentication";

dotenv.config();

const PORT = process.env.PORT;

const server = express();

server.use(express.json());

// primeiro verifica login
server.use("/", userRouter);

server.use(authenticationMiddleware);

// Entidades (roteadores)
// A ordem das rotas são importantes
server.use("/locais", climbRouter);
// server.use("/login", loginRouter);

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
