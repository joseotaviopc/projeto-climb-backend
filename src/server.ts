import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { loginRouter, userRouter, climbRouter } from "./routes";
import { authenticationMiddleware, authorizationMiddleware, errorHandler } from "./middlewares";
import fileUpload from "express-fileupload";

dotenv.config();

const PORT = process.env.PORT;

const server = express();

server.use(
  cors({
    origin: "localhost",
    allowedHeaders: "localhost",
  })
);

server.use(express.json());
server.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
  })
);
// deixa a pasta pública para GET
server.use("/images", express.static("images"));

// primeiro verifica login
server.use("/", userRouter);

// server.use(authenticationMiddleware);
// server.use(authorizationMiddleware);

// Entidades (roteadores)
// A ordem das rotas são importantes
server.use("/locais", climbRouter);
// server.use("/login", loginRouter);
server.use(errorHandler);

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
