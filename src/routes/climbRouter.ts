import { Router } from "express";
import {
  deleteClimb,
  saveNewClimb,
  searchAllClimbs,
  searchOneClimb,
} from "../models/climb";

const climbRouter = Router();

type Data = {
  locals: string[];
};

// CRUD - Read

// === Tratar erros: erro no banco(500), sem conteúdo(204), ok(200) ?
climbRouter.get("/:query", (req, res) => {
  const query = req.params.query;

  const searchQuery = searchOneClimb(query);

  if (res.statusCode === 404) {
    return res.json("Não encontrado");
  }
  res.status(200).json(searchQuery);
});

// === Tratar erros: erro no banco(500), sem conteúdo(204), ok(200) ?
climbRouter.get("/", async (req, res) => {
  const allLocals = searchAllClimbs();

  if (res.statusCode === 404) {
    return res.json("Não encontrado");
  }

  res.status(200).send(allLocals);
});

// CRUD - Create
climbRouter.post("/", (req, res) => {
  const newLocal = { ...req.body };

  if (
    !newLocal.name ||
    !newLocal.local ||
    !newLocal.category ||
    !newLocal.graduation ||
    !newLocal.description ||
    !newLocal.conditions
  ) {
    return res
      .status(400)
      .send("Alguns dados obrigatórios não foram preenchidos.");
  }

  const { name, local, category, graduation, description, conditions } =
    req.body;

  saveNewClimb(name, local, category, graduation, description, conditions);

  res.status(201).send(newLocal);
});

// CRUD - Update
climbRouter.put("/:id", (req, res) => {
  const id = req.params.id;

  const eraseClimb = deleteClimb(id);

  res.status(201).json(eraseClimb);
});

// CRUD - Delete
climbRouter.delete("/:id", (req, res) => {
  const id = req.params.id;

  const eraseClimb = deleteClimb(id);
  if (res.statusCode === 404) {
    return res.json("Não encontrado");
  }
  res.status(200).json(eraseClimb);
});

export default climbRouter;
